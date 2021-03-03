import React from 'react'
import { Text, View } from 'react-native';
import { colors, spacing } from '../styles/base'

export const CustomInput = ({ title, required, error, children }) => {
  return (
    <View style={{ marginBottom: spacing.sm }}>
      { title &&
        <Text style={{ fontSize: 15, color: colors.label, marginBottom: spacing.xs }}>{title}{required && ' *'}</Text>
      }
      {children}
    </View>
  )
}
