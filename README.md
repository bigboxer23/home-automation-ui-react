[![CodeQL](https://github.com/bigboxer23/home-automation-ui-react/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/bigboxer23/home-automation-ui-react/actions/workflows/github-code-scanning/codeql)

## About

This project is a web front end written in react for [VeraAutomationHub](https://github.com/bigboxer23/VeraAutomationHub).

It provides UI to control services exposed via VeraAutomationHub, including:

1. House climate controls
2. Room's lights
3. Garage door integration ([PiGarage2](https://github.com/bigboxer23/PiGarage2))
4. Scenes defined via OpenHAB
5. Meural artwork control

## Sample UI

<img src='https://user-images.githubusercontent.com/716472/215645227-20a72669-555b-4c65-8f4d-f5e2e3c651dd.PNG' width='250px' alt='main display'/> <img src='https://user-images.githubusercontent.com/716472/215645255-45a73834-51e0-4fc6-bc5d-27b298370cbf.PNG' width='250px' alt='sub page'/>

## Installation

To build this project, run `yarn build`

To debug/develop run `yarn start`

deploy.sh can be used to push content to the public directory created with a deployed VeraAutomationHub so the content can be served.

## Testing

This project uses Jest and React Testing Library for testing.

### Quick Start

```bash
# Run tests in watch mode
npm test

# Run tests once with coverage
npm run test:ci

# Run tests with coverage report
npm run test:coverage
```

### Test Structure

#### Test Files
- Component tests: `src/__tests__/components/**/*.test.js`
- Action tests: `src/__tests__/actions/**/*.test.js`
- Test utilities: `src/test-utils.js`
- Setup: `src/setupTests.js`

#### Test Utilities

Import from `src/test-utils.js` for enhanced testing:

```js
import { renderWithProviders, mockFetch, mockRoomData } from '../test-utils';

// Render component with Redux store and router
renderWithProviders(<MyComponent />);

// Mock API calls
mockFetch({ rooms: [] });

// Use mock data
const { rooms } = mockRoomData;
```

### Writing Tests

#### Component Tests
```js
import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test-utils';
import MyComponent from '../../../components/MyComponent';

test('renders component', () => {
  renderWithProviders(<MyComponent />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

#### Action Tests
```js
import * as actions from '../../actions/index';
import { mockFetch } from '../../test-utils';

test('action dispatches correctly', () => {
  const dispatch = jest.fn();
  const getState = jest.fn(() => ({ house: { rooms: [] } }));

  mockFetch();
  const action = actions.myAction();
  action(dispatch, getState);

  expect(dispatch).toHaveBeenCalled();
});
```

### Coverage

Current coverage thresholds:
- Statements: 12%
- Branches: 3%
- Functions: 5%
- Lines: 12%

Coverage excludes:
- `src/index.js`
- `src/setupTests.js`
- `src/test-utils.js`
- `src/__tests__/**`

### Best Practices

1. **Test behavior, not implementation**
2. **Use descriptive test names**
3. **Keep tests focused and simple**
4. **Mock external dependencies**
5. **Test error cases**
6. **Use data-testid for complex selectors**
