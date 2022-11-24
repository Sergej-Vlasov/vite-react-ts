import { ApolloProvider } from '@apollo/client';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import App from './App';
import client from './graphql/client';

const setup = () => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

describe('App', () => {
  it('renders the header', () => {
    setup();

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Search Github Repositories'
    );
  });

  it('renders the text input', () => {
    setup();

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders input with correct initial value', () => {
    setup();

    expect(screen.getByRole('textbox')).toHaveValue('react');
  });

  it('changed input value', () => {
    setup();
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('react');
    fireEvent.change(input, { target: { value: 'angular' } });
    expect(input).toHaveValue('angular');
  });

  it('renders error in the input', () => {
    setup();
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('react');
    fireEvent.change(input, { target: { value: 're' } });
    expect(input).toHaveValue('re');
    expect(screen.getByText('Enter at least 3 characters')).toBeInTheDocument();
  });

  it('renders the table', () => {
    setup();

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders table body after initial request', async () => {
    setup();

    await waitFor(
      () => {
        const items = screen.getAllByRole('rowgroup');
        expect(items).toHaveLength(2);
        expect(items[1].children.length).toBe(25);
      },
      {
        timeout: 3000,
      }
    );
  });
});
