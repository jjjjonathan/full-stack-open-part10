import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

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
      textAlign: 'center',
    },
  });

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  const onSubmit = (values) => {
    console.log('logging in with ', values);
  };

  return (
    <View>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
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
              <Text style={styles.buttonText} fontWeight="bold">
                Sign In
              </Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;
