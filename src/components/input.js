import React from 'react'
import { Text, View } from 'react-native'
import { spacing } from '../styles/base'
import { useTheme } from '@react-navigation/native'

export const CustomInput = ({ title, required, error, children }) => {
  const { colors } = useTheme()

  return (
    <View style={{ marginBottom: spacing.sm }}>
      { title &&
        <Text style={{ fontSize: 15, color: colors.text, marginBottom: spacing.xs }}>{title}{required && ' *'}</Text>
      }
      {children}
    </View>
  )
}
