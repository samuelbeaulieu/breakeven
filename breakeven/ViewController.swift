//
//  ViewController.swift
//  breakeven
//
//  Created by Samuel Beaulieu on 2020-07-08.
//

import UIKit

class ViewController: UIViewController, UITextFieldDelegate {

    @IBOutlet weak var breakEven: UILabel!
    @IBOutlet weak var buyCommission: UILabel!
    @IBOutlet weak var sellCommission: UILabel!
    @IBOutlet weak var nbShare: UITextField!
    @IBOutlet weak var price: UITextField!
    
    @IBOutlet weak var sellPriceLabel: UILabel!
    @IBOutlet weak var sellPrice: UITextField!
    @IBOutlet weak var stepper: UISegmentedControl!
    @IBOutlet weak var profitImage: UIImageView!
    @IBOutlet weak var profit: UILabel!
    @IBOutlet weak var profitLabel: UILabel!
    @IBOutlet weak var profitView: UIView!
    @IBOutlet weak var marketValueBuy: UILabel!
    @IBOutlet weak var marketValueSell: UILabel!
    @IBOutlet weak var marketValueSellIcon: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        let bar = UIToolbar()
        let reset = UIBarButtonItem(title: "Reset", style: .plain, target: self, action: #selector(resetTextFields))
        let calculate = UIBarButtonItem(title: "Calculate", style: .plain, target: self, action: #selector(calculateBreakEven))
        let flexibleSpace = UIBarButtonItem(barButtonSystemItem: UIBarButtonItem.SystemItem.flexibleSpace, target: self, action: nil)
        
        bar.items = [reset, flexibleSpace, calculate]
        bar.sizeToFit()
        self.nbShare.inputAccessoryView = bar
        self.price.inputAccessoryView = bar
        self.sellPrice.inputAccessoryView = bar
        
        DispatchQueue.main.async {
            self.nbShare.becomeFirstResponder()
        }
    }
    
    @IBAction func changeStepper(_ sender: UISegmentedControl) {
        switch sender.selectedSegmentIndex {
            case 0:
                self.profitView.isHidden = true
                self.sellPriceLabel.isHidden = true
                self.sellPrice.isHidden = true
                self.marketValueSellIcon.isHidden = true
                self.marketValueSell.isHidden = true
                DispatchQueue.main.async {
                    self.price.becomeFirstResponder()
                }
            case 1:
                self.profitImage.image = UIImage(systemName:"arrow.up.arrow.down")
                self.profitImage.tintColor = UIColor.label
                self.profit.text = "$0.00"
                self.profitView.isHidden = false
                self.sellPriceLabel.isHidden = false
                self.sellPrice.isHidden = false
                self.marketValueSellIcon.isHidden = false
                self.marketValueSell.isHidden = false
                self.marketValueSell.text = "$0.00"
                self.sellPrice.text = ""
                DispatchQueue.main.async {
                    self.sellPrice.becomeFirstResponder()
                }
            default:
                break;
        }
    }
    
    @objc func resetTextFields(_ sender: Any) {
        self.nbShare.text = ""
        self.price.text = ""
        self.sellPrice.text = ""
        self.breakEven.text = "$0.00"
        self.buyCommission.text = "$0.00"
        self.sellCommission.text = "$0.00"
        self.marketValueBuy.text = "$0.00"
        self.marketValueSell.text = "$0.00"
        self.profit.text = "$0.00"
        self.profitImage.image = UIImage(systemName:"arrow.up.arrow.down")
        self.profitImage.tintColor = UIColor.label
        
        DispatchQueue.main.async {
            self.nbShare.becomeFirstResponder()
        }
    }
    
    
    @objc func calculateBreakEven(_ sender: Any) {
        if self.nbShare.text! == "" {
            DispatchQueue.main.async {
                self.nbShare.becomeFirstResponder()
            }
            return
        } else if self.price.text! == "" {
            DispatchQueue.main.async {
                self.price.becomeFirstResponder()
            }
            return
        } else if self.sellPrice.isHidden == false && self.sellPrice.text! == "" {
            DispatchQueue.main.async {
                self.sellPrice.becomeFirstResponder()
            }
            return
        }
        var buyCommission: Double
        var sellCommission: Double
        
        let nbShare = Double(self.nbShare.text!) ?? 0.00
        let price = Double(self.price.text!) ?? 0.00
        let sellPrice = Double(self.sellPrice.text!) ?? 0.00
        
//        Calculate Commission at 0.01cent/share with 4.95min/9.95max
        if nbShare <= 495 {
            buyCommission = 4.95
            sellCommission = 4.95
        } else if Double(self.nbShare.text!)! >= 495 && Double(self.nbShare.text!)! <= 995 {
            buyCommission = Double(self.nbShare.text!)! * 0.01
            sellCommission = Double(self.nbShare.text!)! * 0.01
        } else {
            buyCommission = 9.95
            sellCommission = 9.95
        }
        
        self.marketValueBuy.text = "$" + String(Double(round(100*(nbShare * price))/100))
        self.marketValueSell.text = "$" + String(Double(round(100*(nbShare * sellPrice))/100))
        
        self.buyCommission.text = "$" + String(buyCommission)
        
        self.buyCommission.text = "$" + String(buyCommission)
        self.sellCommission.text = "$" + String(sellCommission)
        
//        Calculate Break-Even Share Price
        self.breakEven.text = "$" + String(Double(round(100*(nbShare * price + (buyCommission + sellCommission)) / nbShare)/100))
        
//        Calculate Profit/Loss
        let sellResult = Double(round(100*((nbShare * sellPrice - sellCommission) - (nbShare * price + buyCommission)))/100)

        if sellResult >= 0 {
            self.profitImage.image = UIImage(systemName:"arrow.up")
            self.profitImage.tintColor = UIColor.systemGreen
        } else {
            self.profitImage.image = UIImage(systemName:"arrow.down")
            self.profitImage.tintColor = UIColor.systemRed
        }

        self.profit.text = "$" + String(sellResult)
    }
}
