import { SET_SHARES, SET_SHAREPRICE, SET_NUMBERLOT, SET_SELLINGPRICE, SET_ISSELLING, SET_BUY_COMMISSION, SET_SELL_COMMISSION } from "../actions/shares"

const initialState = {
    shares: '',
    sharePrice: '',
    numberLot: '1',
    sellingPrice: '',
    isSelling: 0,
    buyCommission: '4.95',
    sellCommission: '4.95'
}

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SHARES:
            state.shares = action.shares
            break
        case SET_SHAREPRICE:
            state.sharePrice = action.price
            break
        case SET_NUMBERLOT:
            state.numberLot = action.number
            break
        case SET_SELLINGPRICE:
            state.sellingPrice = action.price
            break
        case SET_ISSELLING:
            state.isSelling = action.isSelling
            break
        case SET_BUY_COMMISSION:
            state.buyCommission = action.price
            break
        case SET_SELL_COMMISSION:
            state.sellCommission = action.price
            break
        default:
            break
    }
    return state
}

export default transactionReducer
