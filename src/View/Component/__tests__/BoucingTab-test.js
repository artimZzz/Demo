// __tests__/BoucingTab-test.js
import React from 'react';
import BoucingTab from '../BoucingTab';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<BoucingTab />).toJSON();
    expect(tree).toMatchSnapshot();
});