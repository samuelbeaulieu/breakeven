import React from "react";
import { Text, View, TextInput, Pressable, StatusBar, ScrollView, InputAccessoryView } from 'react-native';
import { colors, spacing } from "../styles/base"
import { CustomInput } from "../components/input";
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useSelector, useDispatch } from 'react-redux'
import { setShares, setSharePrice, setNumberLot, setSellingPrice, setIsSelling, setBuyCommission, setSellCommission } from "../store/actions/meals";
import { SectionRow } from "../components/row";

export function MainScreen() {

  const dispatch = useDispatch()

  const shares = useSelector(state => state.transaction.shares)
  const sharePrice = useSelector(state => state.transaction.sharePrice)
  const numberLot = useSelector(state => state.transaction.numberLot)
  const sellingPrice = useSelector(state => state.transaction.sellingPrice)
  const isSelling = useSelector(state => state.transaction.isSelling)
  const buyCommission = useSelector(state => state.transaction.buyCommission)
  const sellCommission = useSelector(state => state.transaction.sellCommission)

  const [marketValue, setMarketValue] = React.useState('0');
  const [netBuyPrice, setNetBuyPrice] = React.useState('0');
  const [netSellPrice, setNetSellPrice] = React.useState('0');
  const [breakevenPrice, setBreakevenPrice] = React.useState('0');
  const [sellingProfit, setSellingProfit] = React.useState('0');

  function reset() {
    dispatch(setShares(''))
    dispatch(setSharePrice(''))
    dispatch(setNumberLot('1'))
    dispatch(setSellingPrice(''))
    setMarketValue('0')
    setNetBuyPrice('0')
    setNetSellPrice('0')
    setBreakevenPrice('0')
    setSellingProfit('0')
    this.shares.focus()
  }

  function getShareInformation() {
    getCommission()
    getMarketValue()
    getNetBuyPrice()
    getBreakevenPrice()

    if (isSelling == 1) {
      getSellingProfit()
      getNetSellPrice()
    }
  }

  const toggleSwitch = (selectedIndex) => {
    if (selectedIndex == 0) {
      dispatch(setSellingPrice(''))
      setNetSellPrice('0')
      setSellingProfit('0')
      this.sharePrice.focus()
    }
    dispatch(setIsSelling(selectedIndex))
  }

  function getMarketValue() {
    setMarketValue(round(shares * sharePrice))
  }

  function getNetBuyPrice() {
    setNetBuyPrice(round((shares * sharePrice) + (buyCommission * numberLot)))
  }

  function getBreakevenPrice() {
    setBreakevenPrice(round((((parseFloat(shares) * parseFloat(sharePrice)) + (parseFloat(buyCommission) + parseFloat(sellCommission))) * 100 / parseFloat(shares)) / 100))
  }

  function getCommission() {
    if (shares <= 495) {
      dispatch(setBuyCommission(round(4.95 * numberLot)))
      dispatch(setSellCommission(round(4.95)))
    } else if (shares >= 495 && shares <= 995) {
      dispatch(setBuyCommission(round((shares * 0.01) * numberLot)))
      dispatch(setSellCommission(round(shares * 0.01)))
    } else {
      dispatch(setBuyCommission(round(9.95 * numberLot)))
      dispatch(setSellCommission(round(9.95)))
    }
  }

  function getNetSellPrice() {
    setNetSellPrice(round((shares * sharePrice) + (buyCommission * numberLot) + (parseFloat(shares) * parseFloat(sellingPrice) - parseFloat(sellCommission)) - (parseFloat(shares) * parseFloat(sharePrice) + parseFloat(buyCommission))))
  }

  function getSellingProfit() {
    setSellingProfit(round((parseFloat(shares) * parseFloat(sellingPrice) - parseFloat(sellCommission)) - (parseFloat(shares) * parseFloat(sharePrice) + parseFloat(buyCommission))))
  }

  function round(number) {
    return (Math.round((number + Number.EPSILON) * 100) / 100).toFixed(2)
  }

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView style={{ paddingTop: spacing.sm, paddingBottom: spacing.md, paddingHorizontal: spacing.md, backgroundColor: '#fff' }} keyboardShouldPersistTaps="always" nestedScrollEnabled={true} scrollIndicatorInsets={{ top: 1, bottom: 1 }} contentInsetAdjustmentBehavior="always">
        <View>
          <View style={{ marginBottom: isSelling == 1 ? spacing.md : 102.7 }}>
            <Text style={{ fontSize: 34, fontWeight: 'bold', color: colors.label }}>Purchase of shares</Text>
            <SectionRow title="Book value" data={marketValue} prefix="$" />
            <SectionRow title="Break even price" data={breakevenPrice} prefix="$" />
            <SectionRow title="Net Buy Price" data={netBuyPrice} prefix="$" />
            { isSelling == 1 &&
            <>
              <SectionRow title="Net Sell Price" data={netSellPrice} prefix="$" />
              <SectionRow title="Profit" data={sellingProfit} prefix="$" color />
              {/* <SectionRow title="Return on investment" data={round(((parseFloat(netSellPrice) - parseFloat(netBuyPrice)) / parseFloat(netBuyPrice)) * 100)} suffix="%" color /> */}
            </>
          }
          </View>
          {/* <View style={{ marginBottom: spacing.md }}>
            <Text style={{ fontSize: fonts.lg, lineHeight: 22, color: colors.label }}>Commission</Text>
            <SectionRow title="Buy" data={shares < 495 ? '$' + buyCommission + ' (min.)': shares > 995 ? '$' + buyCommission + ' (max.)' : '$' + buyCommission} prefix="$" type="text" />
            { isSelling == 1 && <SectionRow title="Sell" data={shares < 495 ? '$' + sellCommission + ' (min.)': shares > 995 ? '$' + sellCommission + ' (max.)' : '$' + sellCommission} prefix="$" type="text" /> }
          </View> */}
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
              placeholderTextColor={colors.secondaryLabel}
              returnKeyType='next'
              secureTextEntry={false}
              selectionColor={colors.accent}
              textContentType='none' //iOS
              onChangeText={text => {
                dispatch(setShares(text))
              }}
              value={shares}
              ref={(input) => { this.shares = input; }}
              style={{ backgroundColor: colors.white, borderColor: colors.border, borderRadius: spacing.smallRadius, borderWidth: .5, color: colors.label, height: 40, width: 150, paddingHorizontal: spacing.sm }} />
          </CustomInput>
          <CustomInput title="Lot">
            <TextInput
              inputAccessoryViewID={'inputAccessoryViewID2'}
              autoCapitalize='none'
              autoCompleteType='off' //Android
              autoCorrect={false}
              blurOnSubmit={false}
              clearButtonMode='while-editing' //iOS
              editable={true}
              keyboardType='number-pad'
              placeholder={'0'}
              placeholderTextColor={colors.secondaryLabel}
              returnKeyType='next'
              secureTextEntry={false}
              selectionColor={colors.accent}
              textContentType='none' //iOS
              onChangeText={text => {
                dispatch(setNumberLot(text))
              }}
              value={numberLot}
              ref={(input) => { this.numberLot = input; }}
              style={{ backgroundColor: colors.white, borderColor: colors.border, borderRadius: spacing.smallRadius, borderWidth: .5, color: colors.label, height: 40, width: 150, paddingHorizontal: spacing.sm }} />
          </CustomInput>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CustomInput title="Buy price">
            <TextInput
              inputAccessoryViewID={'inputAccessoryViewID3'}
              autoCapitalize='none'
              autoCompleteType='off' //Android
              autoCorrect={false}
              blurOnSubmit={false}
              clearButtonMode='while-editing' //iOS
              editable={true}
              keyboardType='decimal-pad'
              placeholder={'$0.00'}
              placeholderTextColor={colors.secondaryLabel}
              returnKeyType='next'
              secureTextEntry={false}
              selectionColor={colors.accent}
              textContentType='none' //iOS
              onChangeText={text => {
                dispatch(setSharePrice(text))
              }}
              value={sharePrice}
              ref={(input) => { this.sharePrice = input; }}
              style={{ backgroundColor: colors.white, borderColor: colors.border, borderRadius: spacing.smallRadius, borderWidth: .5, color: colors.label, height: 40, width: 150, paddingHorizontal: spacing.sm }} />
          </CustomInput>
          { isSelling == 1 &&
            <CustomInput title="Sell price">
              <TextInput
                inputAccessoryViewID={'inputAccessoryViewID4'}
                autoCapitalize='none'
                autoCompleteType='off' //Android
                autoCorrect={false}
                autoFocus={true}
                blurOnSubmit={false}
                clearButtonMode='while-editing' //iOS
                editable={true}
                keyboardType='decimal-pad'
                placeholder={'$0.00'}
                placeholderTextColor={colors.secondaryLabel}
                returnKeyType='go'
                secureTextEntry={false}
                selectionColor={colors.accent}
                textContentType='none' //iOS
                onChangeText={text => {
                  dispatch(setSellingPrice(text))
                }}
                value={sellingPrice}
                ref={(input) => { this.sellingPrice = input; }}
                style={{ backgroundColor: colors.white, borderColor: colors.border, borderRadius: spacing.smallRadius, borderWidth: .5, color: colors.label, height: 40, width: 150, paddingHorizontal: spacing.sm }} />
            </CustomInput>
          }
        </View>
      </ScrollView>
      <InputAccessoryView nativeID={'inputAccessoryViewID1'} backgroundColor={'#FAFAFA'} >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 , borderTopWidth: .5, borderTopColor: colors.border }}>
          <Pressable style={({ pressed }) => [{ width: 100, height: 45, justifyContent: 'center', opacity: pressed ? 0.3 : 1 }]}  onPress={() => reset() } >
            <Text style={{ color: colors.accent, fontSize: 18 }}>Reset</Text>
          </Pressable>
          <SegmentedControl
            values={['Buy', 'Sell']}
            selectedIndex={isSelling}
            onChange={(event) => {
              toggleSwitch(event.nativeEvent.selectedSegmentIndex);
            }}
            style={{width: 120}}
          />
          <Pressable style={({ pressed }) => [{ width: 100, height: 45, justifyContent: 'center', alignItems: 'flex-end', opacity: pressed ? 0.3 : 1 }]}
            onPress={() => {
              if((shares != '' || shares != 0) && (numberLot != '' || numberLot != 0) && (sharePrice != '' || sharePrice != 0) && (sellingPrice != '' || sellingPrice != 0)) {
                getShareInformation()
              } else if (shares == '' || shares == 0) {
                return
              } else {
                this.sharePrice.focus()
              }
            }} >
            <Text style={{ color: colors.accent, fontSize: 18 }}>{(shares != '' || shares != 0) && (numberLot != '' || numberLot != 0) && (sharePrice != '' || sharePrice != 0) && (sellingPrice != '' || sellingPrice != 0) ? 'Calculate' : 'Next'}</Text>
          </Pressable>
        </View>
      </InputAccessoryView>
      <InputAccessoryView nativeID={'inputAccessoryViewID2'} backgroundColor={'#FAFAFA'}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 , borderTopWidth: .5, borderTopColor: colors.border }}>
          <Pressable style={({ pressed }) => [{ width: 100, height: 45, justifyContent: 'center', opacity: pressed ? 0.3 : 1 }]}  onPress={() => reset() } >
            <Text style={{ color: colors.accent, fontSize: 18 }}>Reset</Text>
          </Pressable>
          <SegmentedControl
            values={['Buy', 'Sell']}
            selectedIndex={isSelling}
            onChange={(event) => {
              toggleSwitch(event.nativeEvent.selectedSegmentIndex);
            }}
            style={{width: 120}}
          />
          <Pressable style={({ pressed }) => [{ width: 100, height: 45, justifyContent: 'center', alignItems: 'flex-end', opacity: pressed ? 0.3 : 1 }]}
            onPress={() => {
              if((shares != '' || shares != 0) && (numberLot != '' || numberLot != 0) && (sharePrice != '' || sharePrice != 0) && (sellingPrice != '' || sellingPrice != 0)) {
                getShareInformation()
              } else if (numberLot == '' || numberLot == 0) {
                return
              } else {
                this.sharePrice.focus()
              }
            }} >
            <Text style={{ color: colors.accent, fontSize: 18 }}>{(shares != '' || shares != 0) && (numberLot != '' || numberLot != 0) && (sharePrice != '' || sharePrice != 0) && (sellingPrice != '' || sellingPrice != 0) ? 'Calculate' : 'Next'}</Text>
          </Pressable>
        </View>
      </InputAccessoryView>
      <InputAccessoryView nativeID={'inputAccessoryViewID3'} backgroundColor={'#FAFAFA'}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 , borderTopWidth: .5, borderTopColor: colors.border }}>
          <Pressable style={({ pressed }) => [{ width: 100, height: 45, justifyContent: 'center', opacity: pressed ? 0.3 : 1 }]}  onPress={() => reset() } >
            <Text style={{ color: colors.accent, fontSize: 18 }}>Reset</Text>
          </Pressable>
          <SegmentedControl
            values={['Buy', 'Sell']}
            selectedIndex={isSelling}
            onChange={(event) => {
              toggleSwitch(event.nativeEvent.selectedSegmentIndex);
            }}
            style={{width: 120}}
          />
          <Pressable style={({ pressed }) => [{ width: 100, height: 45, justifyContent: 'center', alignItems: 'flex-end', opacity: pressed ? 0.3 : 1 }]}
            onPress={() => {
              if (isSelling) {
                if((shares != '' || shares != 0) && (numberLot != '' || numberLot != 0) && (sharePrice != '' || sharePrice != 0) && (sellingPrice != '' || sellingPrice != 0)) {
                  getShareInformation()
                } else if (sharePrice == '' || sharePrice == 0) {
                  return
                } else {
                  this.sellingPrice.focus()
                }
              } else {
                if((shares != '' || shares != 0) && (numberLot != '' || numberLot != 0) && (sharePrice != '' || sharePrice != 0)) {
                  getShareInformation()
                }
              }
            }} >
            <Text style={{ color: colors.accent, fontSize: 18 }}>{(shares != '' || shares != 0) && (numberLot != '' || numberLot != 0) && (sharePrice != '' || sharePrice != 0) && (sellingPrice != '' || sellingPrice != 0) ? 'Calculate' : 'Next'}</Text>
          </Pressable>
        </View>
      </InputAccessoryView>
      <InputAccessoryView nativeID={'inputAccessoryViewID4'} backgroundColor={'#FAFAFA'}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 , borderTopWidth: .5, borderTopColor: colors.border }}>
          <Pressable style={({ pressed }) => [{ width: 100, height: 45, justifyContent: 'center', opacity: pressed ? 0.3 : 1 }]}  onPress={() => reset() } >
            <Text style={{ color: colors.accent, fontSize: 18 }}>Reset</Text>
          </Pressable>
          <SegmentedControl
            values={['Buy', 'Sell']}
            selectedIndex={isSelling}
            onChange={(event) => {
              toggleSwitch(event.nativeEvent.selectedSegmentIndex);
            }}
            style={{width: 120}}
          />
          <Pressable style={({ pressed }) => [{ width: 100, height: 45, justifyContent: 'center', alignItems: 'flex-end', opacity: pressed ? 0.3 : 1 }]}
            onPress={() => {
              if((shares != '' || shares != 0) && (numberLot != '' || numberLot != 0) && (sharePrice != '' || sharePrice != 0) && (sellingPrice != '' || sellingPrice != 0)) {
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
