import { useQuery } from '@apollo/client';

import { GET_REVIEWS } from '../graphql/queries';

const useReviews = (id) => {
  const { data, loading, refetch } = useQuery(GET_REVIEWS, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    variables: {
      id,
    },
  });

  return { data, loading, refetch };
};

export default useReviews;
