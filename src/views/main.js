import React from "react"
import { Text, View, TextInput, Pressable, StatusBar, ScrollView, InputAccessoryView, useColorScheme } from 'react-native'
import { spacing } from "../styles/base"
import { CustomInput } from "../components/input"
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { useSelector, useDispatch } from 'react-redux'
import { setShares, setSharePrice, setSellingPrice, setIsSelling, setBuyCommission, setSellCommission } from "../store/actions/shares"
import { SectionRow } from "../components/row"
import { useTheme } from '@react-navigation/native'

export function MainScreen() {
  const scheme = useColorScheme()
  const { colors } = useTheme()

  const dispatch = useDispatch()

  const shares = useSelector(state => state.transaction.shares)
  const sharePrice = useSelector(state => state.transaction.sharePrice)
  const sellingPrice = useSelector(state => state.transaction.sellingPrice)
  const isSelling = useSelector(state => state.transaction.isSelling)
  const buyCommission = useSelector(state => state.transaction.buyCommission)
  const sellCommission = useSelector(state => state.transaction.sellCommission)

  const [marketValue, setMarketValue] = React.useState('0')
  const [netBuyPrice, setNetBuyPrice] = React.useState('0')
  const [netSellPrice, setNetSellPrice] = React.useState('0')
  const [breakevenPrice, setBreakevenPrice] = React.useState('0')
  const [sellingProfit, setSellingProfit] = React.useState('0')
  const [returnOnInvestment, setReturnOnInvestment] = React.useState('0')

  function reset() {
    dispatch(setShares(''))
    dispatch(setSharePrice(''))
    dispatch(setSellingPrice(''))
    dispatch(setBuyCommission('0'))
    dispatch(setSellCommission('0'))
    setMarketValue('0')
    setNetBuyPrice('0')
    setNetSellPrice('0')
    setBreakevenPrice('0')
    setSellingProfit('0')
    setReturnOnInvestment('0')
    this.shares.focus()
  }

  function getShareInformation() {
    getCommission()
    getMarketValue()
    getNetBuyPrice()
    getBreakevenPrice()

    if (isSelling == 1) {
      getSellingProfit()
      getReturnOnInvestment()
      getNetSellPrice()
    }
  }

  const toggleSwitch = (selectedIndex) => {
    if (selectedIndex == 0) {
      dispatch(setSellingPrice(''))
      setNetSellPrice('0')
      setSellingProfit('0')
      setReturnOnInvestment('0')
      this.sharePrice.focus()
    }
    dispatch(setIsSelling(selectedIndex))
  }

  function getMarketValue() {
    setMarketValue(round(parseFloat(shares) * parseFloat(sharePrice)))
  }

  function getNetBuyPrice() {
    setNetBuyPrice((parseFloat(shares) * parseFloat(sharePrice)) + parseFloat(buyCommission))
  }

  function getBreakevenPrice() {
    setBreakevenPrice(round((((parseFloat(shares) * parseFloat(sharePrice)) + (parseFloat(buyCommission) + parseFloat(sellCommission))) * 100 / parseFloat(shares)) / 100))
  }

  function getCommission() {
    if (parseFloat(shares) <= 495) {
      dispatch(setBuyCommission(4.95))
      dispatch(setSellCommission(4.95))
    } else if (parseFloat(shares) >= 995) {
      dispatch(setBuyCommission(9.95))
      dispatch(setSellCommission(9.95))
    } else {
      dispatch(setBuyCommission(round(parseFloat(shares) * 0.01)))
      dispatch(setSellCommission(round(parseFloat(shares) * 0.01)))
    }
  }

  function getNetSellPrice() {
    setNetSellPrice(round((parseFloat(shares) * parseFloat(sharePrice)) + parseFloat(buyCommission) + (parseFloat(shares) * parseFloat(sellingPrice) - parseFloat(sellCommission)) - (parseFloat(shares) * parseFloat(sharePrice) + parseFloat(buyCommission))))
  }

  function getSellingProfit() {
    setSellingProfit(round((parseFloat(shares) * parseFloat(sellingPrice) - parseFloat(sellCommission)) - (parseFloat(shares) * parseFloat(sharePrice) + parseFloat(buyCommission))))
  }
  function getReturnOnInvestment() {
    setReturnOnInvestment(round(((round((parseFloat(shares) * parseFloat(sharePrice)) + parseFloat(buyCommission) + (parseFloat(shares) * parseFloat(sellingPrice) - parseFloat(sellCommission)) - (parseFloat(shares) * parseFloat(sharePrice) + parseFloat(buyCommission))) - (parseFloat(shares) * parseFloat(sharePrice)) + parseFloat(buyCommission)) / (parseFloat(shares) * parseFloat(sharePrice)) + parseFloat(buyCommission)) * 100))
  }

  function round(number) {
    return (Math.round((number + Number.EPSILON) * 100) / 100).toFixed(2)
  }

  return (
    <>
      <StatusBar barStyle={ scheme === 'dark' ? 'light-content' : 'dark-content' } />
      <ScrollView style={{ paddingTop: spacing.sm, paddingBottom: spacing.md, paddingHorizontal: spacing.md, backgroundColor: colors.background }} keyboardShouldPersistTaps="always" nestedScrollEnabled={true} scrollIndicatorInsets={{ top: 1, bottom: 1 }} contentInsetAdjustmentBehavior="always">
        <View style={{ marginBottom: isSelling == 1 ? spacing.md : 102.7 }}>
          <Text style={{ fontSize: 34, fontWeight: 'bold', color: colors.text }}>Purchase of shares</Text>
          <SectionRow title="Book value" data={marketValue} prefix="$" />
          <SectionRow title="Break even price" data={breakevenPrice} prefix="$" />
          <SectionRow title="Net Buy Price" data={netBuyPrice} prefix="$" />
          { isSelling == 1 &&
            <>
              <SectionRow title="Net Sell Price" data={netSellPrice} prefix="$" />
              <SectionRow title="Profit" data={sellingProfit} secondaryData={returnOnInvestment} prefix="$" secondarySuffix="%" color />
            </>
          }
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CustomInput title="Quantity">
            <TextInput
              inputAccessoryViewID={'inputAccessoryViewID1'}
              autoCapitalize='none'
              autoCompleteType='off' //Android
              autoCorrect={false}
              autoFocus={true}
              blurOnSubmit={false}
              clearButtonMode='while-editing' //iOS
              editable={true}
              keyboardType='decimal-pad'
              placeholder={"0"}
              placeholderTextColor={colors.placeholder}
              returnKeyType='next'
              secureTextEntry={false}
              selectionColor={colors.accent}
              textContentType='none' //iOS
              onChangeText={text => {
                dispatch(setShares(text))
              }}
              value={shares}
              ref={(input) => { this.shares = input }}
              style={{ backgroundColor: colors.background, borderColor: colors.border, borderRadius: spacing.smallRadius, borderWidth: .5, color: colors.text, height: 40, width: 335, paddingHorizontal: spacing.sm }} />
          </CustomInput>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CustomInput title="Buy price">
            <TextInput
              inputAccessoryViewID={'inputAccessoryViewID2'}
              autoCapitalize='none'
              autoCompleteType='off' //Android
              autoCorrect={false}
              blurOnSubmit={false}
              clearButtonMode='while-editing' //iOS
              editable={true}
              keyboardType='decimal-pad'
              placeholder={'$0.00'}
              placeholderTextColor={colors.placeholder}
              returnKeyType='next'
              secureTextEntry={false}
              selectionColor={colors.accent}
              textContentType='none' //iOS
              onChangeText={text => {
                dispatch(setSharePrice(text))
              }}
              value={sharePrice}
              ref={(input) => { this.sharePrice = input }}
              style={{ backgroundColor: colors.background, borderColor: colors.border, borderRadius: spacing.smallRadius, borderWidth: .5, color: colors.text, height: 40, width: 150, paddingHorizontal: spacing.sm }} />
          </CustomInput>
          { isSelling == 1 &&
            <CustomInput title="Sell price">
              <TextInput
                inputAccessoryViewID={'inputAccessoryViewID3'}
                autoCapitalize='none'
                autoCompleteType='off' //Android
                autoCorrect={false}
                autoFocus={true}
                blurOnSubmit={false}
                clearButtonMode='while-editing' //iOS
                editable={true}
                keyboardType='decimal-pad'
                placeholder={'$0.00'}
                placeholderTextColor={colors.placeholder}
                returnKeyType='go'
                secureTextEntry={false}
                selectionColor={colors.accent}
                textContentType='none' //iOS
                onChangeText={text => {
                  dispatch(setSellingPrice(text))
                }}
                value={sellingPrice}
                ref={(input) => { this.sellingPrice = input }}
                style={{ backgroundColor: colors.background, borderColor: colors.border, borderRadius: spacing.smallRadius, borderWidth: .5, color: colors.text, height: 40, width: 150, paddingHorizontal: spacing.sm }} />
            </CustomInput>
          }
        </View>
      </ScrollView>
      <InputAccessoryView nativeID={'inputAccessoryViewID1'} backgroundColor={colors.accessory} >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 , borderTopWidth: .5, borderTopColor: colors.border }}>
          <Pressable style={({ pressed }) => [{ width: 100, height: 45, justifyContent: 'center', opacity: pressed ? 0.3 : 1 }]}  onPress={() => reset() } >
            <Text style={{ color: colors.accent, fontSize: 18 }}>Reset</Text>
          </Pressable>
          <SegmentedControl
            values={['Buy', 'Sell']}
            selectedIndex={isSelling}
            onChange={(event) => {
              toggleSwitch(event.nativeEvent.selectedSegmentIndex)
            }}
            style={{width: 120}}
          />
          <Pressable style={({ pressed }) => [{ width: 100, height: 45, justifyContent: 'center', alignItems: 'flex-end', opacity: pressed ? 0.3 : 1 }]}
            onPress={() => {
              if((shares != '' || shares != 0) && (sharePrice != '' || sharePrice != 0) && (sellingPrice != '' || sellingPrice != 0)) {
                getShareInformation()
              } else if (shares == '' || shares == 0) {
                return
              } else {
                this.sharePrice.focus()
              }
            }} >
            <Text style={{ color: colors.accent, fontSize: 18 }}>{(shares != '' || shares != 0) && (sharePrice != '' || sharePrice != 0) && (sellingPrice != '' || sellingPrice != 0) ? 'Calculate' : 'Next'}</Text>
          </Pressable>
        </View>
      </InputAccessoryView>
      <InputAccessoryView nativeID={'inputAccessoryViewID2'} backgroundColor={colors.accessory}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 , borderTopWidth: .5, borderTopColor: colors.border }}>
          <Pressable style={({ pressed }) => [{ width: 100, height: 45, justifyContent: 'center', opacity: pressed ? 0.3 : 1 }]}  onPress={() => reset() } >
            <Text style={{ color: colors.accent, fontSize: 18 }}>Reset</Text>
          </Pressable>
          <SegmentedControl
            values={['Buy', 'Sell']}
            selectedIndex={isSelling}
            onChange={(event) => {
              toggleSwitch(event.nativeEvent.selectedSegmentIndex)
            }}
            style={{width: 120}}
          />
          <Pressable style={({ pressed }) => [{ width: 100, height: 45, justifyContent: 'center', alignItems: 'flex-end', opacity: pressed ? 0.3 : 1 }]}
            onPress={() => {
              if (isSelling) {
                if((shares != '' || shares != 0) && (sharePrice != '' || sharePrice != 0) && (sellingPrice != '' || sellingPrice != 0)) {
                  getShareInformation()
                } else if (sharePrice == '' || sharePrice == 0) {
                  return
                } else {
                  this.sellingPrice.focus()
                }
              } else {
                if((shares != '' || shares != 0) && (sharePrice != '' || sharePrice != 0)) {
                  getShareInformation()
                }
              }
            }} >
            <Text style={{ color: colors.accent, fontSize: 18 }}>{(shares != '' || shares != 0) && (sharePrice != '' || sharePrice != 0) && (sellingPrice != '' || sellingPrice != 0) ? 'Calculate' : 'Next'}</Text>
          </Pressable>
        </View>
      </InputAccessoryView>
      <InputAccessoryView nativeID={'inputAccessoryViewID3'} backgroundColor={colors.accessory}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 , borderTopWidth: .5, borderTopColor: colors.border }}>
          <Pressable style={({ pressed }) => [{ width: 100, height: 45, justifyContent: 'center', opacity: pressed ? 0.3 : 1 }]}  onPress={() => reset() } >
            <Text style={{ color: colors.accent, fontSize: 18 }}>Reset</Text>
          </Pressable>
          <SegmentedControl
            values={['Buy', 'Sell']}
            selectedIndex={isSelling}
            onChange={(event) => {
              toggleSwitch(event.nativeEvent.selectedSegmentIndex)
            }}
            style={{width: 120}}
          />
          <Pressable style={({ pressed }) => [{ width: 100, height: 45, justifyContent: 'center', alignItems: 'flex-end', opacity: pressed ? 0.3 : 1 }]}
            onPress={() => {
              if((shares != '' || shares != 0) && (sharePrice != '' || sharePrice != 0) && (sellingPrice != '' || sellingPrice != 0)) {
                getShareInformation()
              }
            }} >
            <Text style={{ color: colors.accent, fontSize: 18 }}>Calculate</Text>
          </Pressable>
        </View>
      </InputAccessoryView>
    </>
  )
}
