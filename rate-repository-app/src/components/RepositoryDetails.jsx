import React from 'react';
import { Pressable, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import useRepositoryUrl from '../hooks/useRepositoryUrl';
import useReviews from '../hooks/useReviews';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import { styles as buttonStyles } from './SignIn';
import * as Linking from 'expo-linking';
import Text from './Text';

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
