import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import { format } from 'date-fns';

import theme from '../theme';

const ReviewItem = ({ review, title }) => {
  const styles = StyleSheet.create({
    container: {
      marginLeft: 20,
      marginRight: 20,
      marginTop: 30,
      display: 'flex',
      flexDirection: 'row',
    },
    ratingContainer: {
      backgroundColor: theme.colors.appBarBg,
      borderWidth: 2,
      height: 60,
      width: 60,
      borderRadius: 30,
      flexGrow: 0,
    },
    ratingText: {
      fontSize: 22,
      marginTop: 15,
      textAlign: 'center',
    },
    contentContainer: {
      marginLeft: 20,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text fontSize="subheading" fontWeight="bold">
          {!title ? review.user.username : review.repository.fullName}
        </Text>
        <Text color="textSecondary">
          {format(new Date(review.createdAt), 'M/d/y')}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
