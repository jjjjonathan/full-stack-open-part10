import React from 'react';
import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            history.push(`/repositories/${item.id}`);
          }}
        >
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const { data, loading } = useRepositories();

  if (loading) return <Text>Loading...</Text>;

  return <RepositoryListContainer repositories={data.repositories} />;
};

export default RepositoryList;
