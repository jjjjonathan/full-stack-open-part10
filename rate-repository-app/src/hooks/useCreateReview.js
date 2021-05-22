import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repoName, rating, review }) => {
    const { data } = await mutate({
      variables: {
        ownerName,
        repositoryName: repoName,
        rating: Number(rating),
        text: review,
      },
    });
    return { data };
  };

  return [createReview, result];
};

export default useCreateReview;
