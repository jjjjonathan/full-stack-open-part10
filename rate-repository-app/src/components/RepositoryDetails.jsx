import React from 'react';
import { Text } from 'react-native';
import { useParams } from 'react-router-native';

const RepositoryDetails = () => {
  const { id } = useParams();
  return <Text>deets of {id}</Text>;
};

export default RepositoryDetails;
