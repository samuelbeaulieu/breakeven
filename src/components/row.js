import React from 'react'
import { View, Text } from 'react-native'
import NumberFormat from 'react-number-format'
import { spacing } from '../styles/base'
import { useTheme } from '@react-navigation/native'

export const SectionRow = ({ title, data, secondaryData, prefix, suffix, secondaryPrefix, secondarySuffix, color, type = "number" }) => {
  const { colors } = useTheme()

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: spacing.sm, paddingBottom: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border }}>
      <Text style={{ fontSize: 17, color: colors.text }}>{title}</Text>
      <View style={{ flexDirection: 'row' }}>
        { type == 'text' ?
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: color && parseFloat(data) > 0 ? colors.positive : color && parseFloat(data) < 0 ? colors.negative : colors.text }}>{data}</Text>
          :
          <NumberFormat
            value={data}
            displayType={'text'}
            prefix={prefix}
            suffix={suffix}
            thousandSeparator=','
            renderText={(value) => <Text style={{ fontSize: 17, fontWeight: 'bold', color: color && parseFloat(data) > 0 ? colors.positive : color && parseFloat(data) < 0 ? colors.negative : colors.text }}>{value}</Text>}
          />
        }
        { secondaryData &&
          <NumberFormat
            value={secondaryData}
            displayType={'text'}
            prefix={secondaryPrefix}
            suffix={secondarySuffix}
            thousandSeparator=','
            renderText={(value) => <Text style={{ fontSize: 17, fontWeight: 'bold', color: color && parseFloat(data) > 0 ? colors.positive : color && parseFloat(data) < 0 ? colors.negative : colors.text, opacity: 0.5, marginLeft: spacing.xs }}>({value})</Text>}
          />
        }
      </View>
    </View>
  )
}
