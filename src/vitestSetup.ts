/* eslint-disable import/no-extraneous-dependencies */

/* USEFUL RESOURCE: https://markus.oberlehner.net/blog/using-testing-library-jest-dom-with-vitest/ */

import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);
