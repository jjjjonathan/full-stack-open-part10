import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';

import { useHistory } from 'react-router-native';

import { Picker } from '@react-native-picker/picker';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortPicker = ({ selectedSortMethod, setSelectedSortMethod }) => {
  return (
    <Picker
      selectedValue={selectedSortMethod}
      onValueChange={(itemValue) => {
        setSelectedSortMethod(itemValue);
      }}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
};

export const RepositoryListContainer = ({
  repositories,
  selectedSortMethod,
  setSelectedSortMethod,
}) => {
  const history = useHistory();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <SortPicker
          selectedSortMethod={selectedSortMethod}
          setSelectedSortMethod={setSelectedSortMethod}
        />
      )}
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

const getVariablesFromSortMethod = (sortMethod) => {
  if (sortMethod === 'highest') {
    return {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'DESC',
    };
  } else if (sortMethod === 'lowest') {
    return {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'ASC',
    };
  } else {
    return {
      orderBy: 'CREATED_AT',
    };
  }
};

const RepositoryList = () => {
  const [selectedSortMethod, setSelectedSortMethod] = useState('latest');

  const { loading, data } = useRepositories(
    getVariablesFromSortMethod(selectedSortMethod)
  );

  if (loading) return <Text>Loading...</Text>;

  return (
    <RepositoryListContainer
      repositories={data.repositories}
      selectedSortMethod={selectedSortMethod}
      setSelectedSortMethod={setSelectedSortMethod}
    />
  );
};

export default RepositoryList;
