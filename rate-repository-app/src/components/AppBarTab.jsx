import React from 'react';
import { Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const AppBarTab = ({ text, link, onPress }) => {
  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        <Text fontSize="heading" fontWeight="bold" style={{ padding: 20 }}>
          {text}
        </Text>
      </Pressable>
    );
  }
  return (
    <Link to={link}>
      <Text fontSize="heading" fontWeight="bold" style={{ padding: 20 }}>
        {text}
      </Text>
    </Link>
  );
};

export default AppBarTab;
