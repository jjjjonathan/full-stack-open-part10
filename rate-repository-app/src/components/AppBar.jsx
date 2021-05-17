import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

import theme from '../theme';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: theme.colors.appBarBg,
    display: 'flex',
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const { data } = useQuery(GET_AUTHORIZED_USER);
  console.log('Authorized?', data);

  const handleSignOut = async () => {
    console.log('signing out!');
    await authStorage.removeAccessToken();
    client.resetStore();
  };

  const signTab = () => {
    if (!data || !data.authorizedUser) {
      return <AppBarTab text="Sign In" link="/signin" />;
    } else {
      return <AppBarTab text="Sign Out" onPress={handleSignOut} />;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" link="/" />
        {signTab()}
      </ScrollView>
    </View>
  );
};

export default AppBar;
