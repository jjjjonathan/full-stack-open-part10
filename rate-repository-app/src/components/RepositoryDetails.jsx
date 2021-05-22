import React from 'react';
import { Pressable, Text } from 'react-native';
import { useParams } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import useRepositoryUrl from '../hooks/useRepositoryUrl';
import RepositoryItem from './RepositoryItem';
import { styles as buttonStyles } from './SignIn';
import * as Linking from 'expo-linking';

const RepositoryDetails = () => {
  const { id } = useParams();
  const { data, loading } = useRepositories();
  console.log('ID IS:', id);
  const { data: repositoryUrlData, loading: loading2 } = useRepositoryUrl(id);
  console.log('REPO URL DATA OBJ is', repositoryUrlData);

  const repositoryNodes = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  const repository = repositoryNodes.find((repo) => repo.id === id);
  console.log(repository);

  if (loading || loading2) return <Text>Loading...</Text>;

  return (
    <>
      <RepositoryItem item={repository} />
      <Pressable
        style={buttonStyles.button}
        onPress={() => {
          Linking.openURL(repositoryUrlData.repository.url);
        }}
      >
        <Text style={buttonStyles.buttonText}>Open in GitHub</Text>
      </Pressable>
    </>
  );
};

export default RepositoryDetails;
