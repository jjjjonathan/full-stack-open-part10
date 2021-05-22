import { useQuery } from '@apollo/client';

import { GET_REPOSITORY_URL } from '../graphql/queries';

const useRepositoryUrl = (id) => {
  console.log('ID IN HOOK IS:', id);
  const { data, loading, refetch } = useQuery(GET_REPOSITORY_URL, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    variables: {
      id,
    },
  });

  console.log('DATA IN HOOK IS:', data);

  return { data, loading, refetch };
};

export default useRepositoryUrl;
