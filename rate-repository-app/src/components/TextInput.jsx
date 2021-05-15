import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

import theme from '../theme';

export const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 20,
    margin: 20,
    marginBottom: 0,
    fontSize: 20,
  },
  error: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, styles.textInput, error && styles.error];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
