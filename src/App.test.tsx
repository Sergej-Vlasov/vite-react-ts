import { ApolloProvider } from '@apollo/client';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import App from './App';
import client from './graphql/client';

describe('App', () => {
  it('renders div with app id', () => {
    render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Search Github Repositories'
    );
  });
});
