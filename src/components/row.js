import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import NumberFormat from 'react-number-format';
import { colors, spacing } from '../styles/base'

export const SectionRow = ({ title, data, prefix, suffix, color, type = "number" }) => {
  return (
    <View style={ styles.topSectionRow }>
      <Text style={ styles.topSectionRowTitle }>{title}</Text>
      { type == 'text' ?
        <Text style={ styles.topSectionRowValue(data, color) }>{data}</Text>
        :
        <NumberFormat
          value={data}
          displayType={'text'}
          prefix={prefix}
          suffix={suffix}
          thousandSeparator=','
          renderText={(value) => <Text style={ styles.topSectionRowValue(data, color) }>{value}</Text>}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  topSectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  topSectionRowTitle: {
    fontSize: 17,
    color: colors.label
  },
  topSectionRowValue: (data, color) => ({
    fontSize: 17,
    fontWeight: 'bold',
    color: color && parseFloat(data) > 0 ? colors.success : color && parseFloat(data) < 0 ? colors.error : colors.label
  })
})
