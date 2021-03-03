import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import transactionReducer from './src/store/reducers/meals'
import { MainScreen } from './src/views/main'

const rootReducer = combineReducers({
  transaction: transactionReducer
})

const store = createStore(rootReducer)

const RootStack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator headerMode="none">
          <RootStack.Screen name="Main" component={MainScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
