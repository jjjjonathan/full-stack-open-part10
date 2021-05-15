import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';

import Text from './Text';
import { styles as textInputStyles } from './TextInput';
import theme from '../theme';

const SignIn = () => {
  const styles = StyleSheet.create({
    button: {
      ...textInputStyles.textInput,
      backgroundColor: theme.colors.primary,
      borderWidth: 0,
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
    },
  });

  const onSubmit = (values) => {
    console.log('logging in with ', values);
  };

  return (
    <View>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <View>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput
              name="password"
              placeholder="Password"
              secureTextEntry
            />
            <Pressable onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;
