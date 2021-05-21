import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

import Text from './Text';
import { styles as textInputStyles } from './TextInput';
import theme from '../theme';

import useSignIn from '../hooks/useSignIn';

export const SignInContainer = ({ onSubmit }) => {
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
  return (
    <View>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <View>
            <FormikTextInput
              name="username"
              placeholder="Username"
              testID="username"
            />
            <FormikTextInput
              name="password"
              placeholder="Password"
              testID="password"
              secureTextEntry
            />
            <Pressable
              onPress={handleSubmit}
              style={styles.button}
              testID="submit"
            >
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

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async ({ username, password }) => {
    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
