import React from 'react';
import { useQuery } from '@apollo/client';
import { FlatList } from 'react-native';

import ReviewItem from './ReviewItem';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const MyReviews = () => {
  const { data } = useQuery(GET_AUTHORIZED_USER, {
    variables: { includeReviews: true },
  });

  const reviews = data
    ? data.authorizedUser.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} title={true} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
