import React from 'react';
import { RepositoryListContainer } from '../../components/RepositoryList';
import { render } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };
      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      // debug();

      expect(getAllByTestId('name')[0]).toHaveTextContent('jaredpalmer/formik');
      expect(getAllByTestId('description')[0]).toHaveTextContent(
        'Build forms in React, without the tears'
      );
      expect(getAllByTestId('language')[0]).toHaveTextContent('TypeScript');
      expect(getAllByTestId('forks')[0]).toHaveTextContent('1.6k');
      expect(getAllByTestId('stars')[0]).toHaveTextContent('21.9k');
      expect(getAllByTestId('rating')[0]).toHaveTextContent('88');
      expect(getAllByTestId('review')[0]).toHaveTextContent('3');

      expect(getAllByTestId('name')[1]).toHaveTextContent(
        'async-library/react-async'
      );
      expect(getAllByTestId('description')[1]).toHaveTextContent(
        'Flexible promise-based React data loader'
      );
      expect(getAllByTestId('language')[1]).toHaveTextContent('JavaScript');
      expect(getAllByTestId('forks')[1]).toHaveTextContent('69');
      expect(getAllByTestId('stars')[1]).toHaveTextContent('1.8k');
      expect(getAllByTestId('rating')[1]).toHaveTextContent('72');
      expect(getAllByTestId('review')[1]).toHaveTextContent('3');
    });
  });
});
