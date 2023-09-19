import Checkbox from 'expo-checkbox';
import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../../constants/color';

const CheckBoxSection = ({ text, value, disabled, onValueChange, ...args }) => {
  return (
    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
      <Checkbox
        disabled={disabled}
        value={value}
        onValueChange={onValueChange}
        style={{
          color: colors.GREEN,
          height: 20,
          width: 20,
        }}
        {...args}
      />
      <Text>{text}</Text>
    </View>
  );
};

export default CheckBoxSection;
