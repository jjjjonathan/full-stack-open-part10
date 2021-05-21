import React from 'react';
import { SignInContainer } from '../../components/SignIn';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('will call the onSubmit handler with correct arguments', async () => {
      const onSubmit = jest.fn();
      const { getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);

      fireEvent.changeText(getByTestId('username'), 'kalle');
      fireEvent.changeText(getByTestId('password'), 'password');
      fireEvent.press(getByTestId('submit'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);

        // onSubmit.mock.calls[0][0] contains the first argument of the first call
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});
