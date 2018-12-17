// __tests__/Screen-test.js
import React from 'react';
import Screen from '../Screen';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<Screen />).toJSON();
    expect(tree).toMatchSnapshot();
});