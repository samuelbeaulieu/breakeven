import React from 'react'
import { useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import transactionReducer from './src/store/reducers/shares'
import { MainScreen } from './src/views/main'
import { Theme } from "./src/styles/base"

const rootReducer = combineReducers({
  transaction: transactionReducer
})

const store = createStore(rootReducer)

const RootStack = createStackNavigator()

export default function App() {
  const scheme = useColorScheme()

  return (
    <Provider store={store}>
      <NavigationContainer theme={scheme === 'dark' ? Theme.dark : Theme.default }>
        <RootStack.Navigator headerMode="none">
          <RootStack.Screen name="Main" component={MainScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
