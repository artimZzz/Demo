// __tests__/SearchBar-test.js
import React from 'react';
import SearchBar from '../SearchBar';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<SearchBar />).toJSON();
    expect(tree).toMatchSnapshot();
});