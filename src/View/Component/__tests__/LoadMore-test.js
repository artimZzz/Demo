// __tests__/LoadMore-test.js
import React from 'react';
import LoadMore from '../LoadMore';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<LoadMore />).toJSON();
    expect(tree).toMatchSnapshot();
});