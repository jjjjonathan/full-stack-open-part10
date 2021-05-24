import { useQuery } from '@apollo/client';

import { GET_REVIEWS } from '../graphql/queries';

const useReviews = (id) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REVIEWS, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    variables: {
      first: 3,
      id,
    },
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id,
        first: 3,
      },
    });
  };

  return {
    data,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useReviews;
