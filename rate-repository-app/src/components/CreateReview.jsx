import React from 'react';
import { View, Pressable } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';
import { useHistory } from 'react-router-native';

import Text from './Text';
import { styles as buttonStyles } from './SignIn';

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const history = useHistory();

  const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Repository owner name is required'),
    repoName: yup.string().required('Repository name is required'),
    rating: yup.number().required('Rating is required').min(0).max(100),
    review: yup.string().optional(),
  });

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview(values);
      const repoId = data.createReview.repositoryId;
      history.push(`/repositories/${repoId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Formik
        initialValues={{ ownerName: '', repoName: '', rating: '', review: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <View>
            <FormikTextInput
              name="ownerName"
              placeholder="Repository owner name"
            />
            <FormikTextInput name="repoName" placeholder="Repository name" />
            <FormikTextInput
              name="rating"
              placeholder="Rating between 0 and 100"
            />
            <FormikTextInput name="review" placeholder="Review" multiline />
            <Pressable onPress={handleSubmit} style={buttonStyles.button}>
              <Text style={buttonStyles.buttonText} fontWeight="bold">
                Submit
              </Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CreateReview;
