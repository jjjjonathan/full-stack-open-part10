import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';

import theme from '../theme';
import RepositoryItemNumber from './RepositoryItemNumber';

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexNoGrow: {
    flexGrow: 0,
  },
  mainText: {
    flexGrow: 1,
    paddingLeft: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  languageBadge: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 5,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  numberContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
});

const formatNumber = (number) => {
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}k`;
  } else {
    return number;
  }
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <View style={styles.flexNoGrow}>
          <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        </View>
        <View style={styles.mainText}>
          <Text fontSize="subheading" fontWeight="bold">
            {item.fullName}
          </Text>
          <Text color="textSecondary">{item.description}</Text>
          <Text style={styles.languageBadge}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.numberContainer}>
        <RepositoryItemNumber
          number={formatNumber(item.stargazersCount)}
          label="Stars"
        />
        <RepositoryItemNumber
          number={formatNumber(item.forksCount)}
          label="Forks"
        />
        <RepositoryItemNumber number={item.reviewCount} label="Reviews" />
        <RepositoryItemNumber number={item.ratingAverage} label="Rating" />
      </View>
    </View>
  );
};

export default RepositoryItem;
