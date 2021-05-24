import React from 'react';
import { Pressable, FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import useRepositoryUrl from '../hooks/useRepositoryUrl';
import useReviews from '../hooks/useReviews';
import RepositoryItem from './RepositoryItem';
import { styles as buttonStyles } from './SignIn';
import * as Linking from 'expo-linking';
import theme from '../theme';
import Text from './Text';
import { format } from 'date-fns';

const RepositoryInfo = ({ repository }) => {
  const { data, loading } = useRepositoryUrl(repository.id);

  return (
    <>
      <RepositoryItem item={repository} />
      <Pressable
        style={buttonStyles.button}
        onPress={() => {
          Linking.openURL(data.repository.url);
        }}
      >
        {loading ? null : (
          <Text style={buttonStyles.buttonText}>Open in GitHub</Text>
        )}
      </Pressable>
    </>
  );
};

const ReviewItem = ({ review }) => {
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
          {review.user.username}
        </Text>
        <Text color="textSecondary">
          {format(new Date(review.createdAt), 'M/d/y')}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const RepositoryDetails = () => {
  const { id } = useParams();
  const { repositories, loading } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const repository = repositoryNodes.find((repo) => repo.id === id);

  const { data: reviewData, fetchMore } = useReviews(repository.id);

  const reviews = reviewData
    ? reviewData.repository.reviews.edges.map((edge) => edge.node)
    : [];

  if (loading) return <Text>Loading...</Text>;

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryDetails;
