# Vite with React and Typescript

This project is set up with [Vite](https://vitejs.dev/)

Framework - React with TypeScript  
Linting - eslint with Airbnb React + Typescript preset  
Testing - Vitest runner with React Testing Library that utilises jsdom

## Prerequisites

- Node version 14.18+, 16+ (for best experience use `Node v16.15.1` and `npm 8.11.0`)
- `.env` file that contains `VITE_GRAPHQL_API_KEY=[YOUR GITHUB API KEY HERE]` with correct github api key

## Starting locally

```
npm install && npm run dev
```

## Testing

run tests:

```
npm run test
```

this will run the tests and generate a coverage report in `./coverage` folder  
open coverage report:

```
open coverage/index.html
```

## Next steps and thoughts

- compartmentalise parts of `App.tsx` in particular table, input, loading and error components
- add pagination of query results with cursor
- add polyfills from `core-js` for good measure
- add CI/CD for automated deployment and testing
- add husky or github action to run linting on commit or push
- first time using MaterialUI v5 and not sure if using `sx` prop is the best approach (lots of repeated code)

## Useful Resources

- [Vite guide](https://vitejs.dev/guide/)
- [Airbnb React/JSX style guide](https://airbnb.io/javascript/react/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [jsdom](https://github.com/jsdom/jsdom#readme)
