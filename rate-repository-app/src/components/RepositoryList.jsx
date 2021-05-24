import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import TextInput from './TextInput';

import { useHistory } from 'react-router-native';
import { useDebouncedCallback } from 'use-debounce';

import { Picker } from '@react-native-picker/picker';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Search = ({ query, setQuery, setServerQuery }) => {
  return (
    <TextInput
      name="query"
      placeholder="Filter repositories..."
      onChangeText={(text) => {
        setQuery(text);
        setServerQuery(text);
      }}
      value={query}
    />
  );
};

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

const LinkedRepositoryItem = ({ item }) => {
  const history = useHistory();
  return (
    <Pressable
      onPress={() => {
        history.push(`/repositories/${item.id}`);
      }}
    >
      <RepositoryItem item={item} />
    </Pressable>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return (
      <>
        <Search
          query={props.query}
          setQuery={props.setQuery}
          setServerQuery={props.setServerQuery}
        />
        <SortPicker
          selectedSortMethod={props.selectedSortMethod}
          setSelectedSortMethod={props.setSelectedSortMethod}
        />
      </>
    );
  };

  render() {
    const props = this.props;

    const repositoryNodes = props.repositories
      ? props.repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => {
          if (props.loading) return null;
          return <LinkedRepositoryItem item={item} />;
        }}
      />
    );
  }
}

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
  const [query, setQuery] = useState('');
  const [serverQuery, setServerQuery] = useState('');

  const debouncedQuery = useDebouncedCallback((value) => {
    setServerQuery(value);
  }, 500);

  const { loading, data } = useRepositories({
    ...getVariablesFromSortMethod(selectedSortMethod),
    searchKeyword: serverQuery,
  });

  const repositories = data ? data.repositories : { edges: [] };

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedSortMethod={selectedSortMethod}
      setSelectedSortMethod={setSelectedSortMethod}
      query={query}
      setQuery={setQuery}
      setServerQuery={debouncedQuery}
      loading={loading}
    />
  );
};

export default RepositoryList;
