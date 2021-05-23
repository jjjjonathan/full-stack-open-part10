import React from 'react';
import { View, Pressable } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

import { useHistory } from 'react-router-native';
import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';

import Text from './Text';
import { styles as buttonStyles } from './SignIn';

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const history = useHistory();

  const validationSchema = yup.object().shape({
    username: yup.string().min(1).max(30).required('Username is required'),
    password: yup.string().min(5).max(50).required('Password is required'),
    passwordConf: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required'),
  });

  const onSubmit = async ({ username, password }) => {
    try {
      const { data } = await createUser({ username, password });
      console.log(data);
      await signIn({ username, password });
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Formik
        initialValues={{ username: '', password: '', passwordConf: '' }}
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
            <FormikTextInput
              name="passwordConf"
              placeholder="Password confirmation"
              secureTextEntry
            />
            <Pressable onPress={handleSubmit} style={buttonStyles.button}>
              <Text style={buttonStyles.buttonText} fontWeight="bold">
                Sign Up
              </Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignUp;
