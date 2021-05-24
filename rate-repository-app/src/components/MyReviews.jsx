import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-native';
import { FlatList, Pressable, View, StyleSheet, Alert } from 'react-native';
import Text from './Text';
import { styles as buttonStyles } from './SignIn';

import ReviewItem from './ReviewItem';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

import theme from '../theme';
import { DELETE_REVIEW } from '../graphql/mutations';

const MyReviewItem = ({ review, refetch }) => {
  const history = useHistory();
  const [deleteMutation] = useMutation(DELETE_REVIEW);

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    purpleButton: {
      ...buttonStyles.button,
    },
    redButton: {
      ...buttonStyles.button,
      backgroundColor: theme.colors.error,
    },
    buttonText: {
      ...buttonStyles.buttonText,
      fontSize: 15,
    },
  });

  const deleteReview = (id) => {
    deleteMutation({ variables: { id } });
    refetch();
  };

  const confirmDelete = (id) =>
    Alert.alert('Delete?', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Delete', onPress: () => deleteReview(id) },
    ]);

  return (
    <>
      <ReviewItem review={review} title={true} />
      <View style={styles.container}>
        <Pressable
          style={styles.purpleButton}
          onPress={() => {
            history.push(`/repositories/${review.repositoryId}`);
          }}
        >
          <Text style={styles.buttonText}>View Repository</Text>
        </Pressable>
        <Pressable style={styles.redButton}>
          <Text
            style={styles.buttonText}
            onPress={() => {
              confirmDelete(review.id);
            }}
          >
            Delete Review
          </Text>
        </Pressable>
      </View>
    </>
  );
};

const MyReviews = () => {
  const { data, refetch } = useQuery(GET_AUTHORIZED_USER, {
    variables: { includeReviews: true },
  });

  const reviews = data
    ? data.authorizedUser.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <MyReviewItem review={item} refetch={refetch} />
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
