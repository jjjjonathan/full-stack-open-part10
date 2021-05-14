import React from 'react';
import { Pressable } from 'react-native';
import Text from './Text';

const AppBarTab = ({ text }) => {
  return (
    <Pressable>
      <Text fontSize="heading" fontWeight="bold" style={{ padding: 20 }}>
        {text}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
