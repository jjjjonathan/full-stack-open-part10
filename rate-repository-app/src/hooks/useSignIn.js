import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        username,
        password,
      },
    });
    const token = data.authorize.accessToken;
    await authStorage.setAccessToken(token);
    client.resetStore();
    return { data };
  };

  return [signIn, result];
};

export default useSignIn;
