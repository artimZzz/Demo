// __tests__/BoucingView-test.js
import React from 'react';
import BoucingView from '../BoucingView';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<BoucingView />).toJSON();
    expect(tree).toMatchSnapshot();
});