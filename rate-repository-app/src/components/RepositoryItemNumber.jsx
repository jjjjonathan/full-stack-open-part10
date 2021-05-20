import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from './Text';

const RepositoryItemNumber = ({ number, label, testID }) => {
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <Text fontWeight="bold" testID={testID}>
        {number}
      </Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  );
};

export default RepositoryItemNumber;
