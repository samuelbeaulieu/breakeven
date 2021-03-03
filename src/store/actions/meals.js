export const SET_SHARES = 'SET_SHARES'
export const SET_SHAREPRICE = 'SET_SHAREPRICE'
export const SET_NUMBERLOT = 'SET_NUMBERLOT'
export const SET_SELLINGPRICE = 'SET_SELLINGPRICE'
export const SET_ISSELLING = 'SET_ISSELLING'
export const SET_BUY_COMMISSION = 'SET_BUY_COMMISSION'
export const SET_SELL_COMMISSION = 'SET_SELL_COMMISSION'

export const setShares = (shares) => {
    return { type: SET_SHARES, shares: shares }
}

export const setSharePrice = (price) => {
    return { type: SET_SHAREPRICE, price: price }
}

export const setNumberLot = (number) => {
    return { type: SET_NUMBERLOT, number: number }
}

export const setSellingPrice = (price) => {
    return { type: SET_SELLINGPRICE, price: price }
}
export const setIsSelling = (isSelling) => {
    return { type: SET_ISSELLING, isSelling: isSelling }
}

export const setBuyCommission = (price) => {
    return { type: SET_BUY_COMMISSION, price: price }
}

export const setSellCommission = (price) => {
    return { type: SET_SELL_COMMISSION, price: price }
}
