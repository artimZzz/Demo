// __tests__/TopBar-test.js
import React from 'react';
import TopBar from '../TopBar';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<TopBar />).toJSON();
    expect(tree).toMatchSnapshot();
});