import React from 'react';
import { Link } from 'react-router-native';
import Text from './Text';

const AppBarTab = ({ text, link }) => {
  return (
    <Link to={link}>
      <Text fontSize="heading" fontWeight="bold" style={{ padding: 20 }}>
        {text}
      </Text>
    </Link>
  );
};

export default AppBarTab;
