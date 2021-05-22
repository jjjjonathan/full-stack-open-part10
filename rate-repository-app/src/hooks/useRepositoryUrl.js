import { useQuery } from '@apollo/client';

import { GET_REPOSITORY_URL } from '../graphql/queries';

const useRepositoryUrl = (id) => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORY_URL, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    variables: {
      id,
    },
  });

  return { data, loading, refetch };
};

export default useRepositoryUrl;
