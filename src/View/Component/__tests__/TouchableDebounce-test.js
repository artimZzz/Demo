// __tests__/TouchableDeounce-test.js
import React from 'react';
import TouchableDeounce from '../TouchableDebounce';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<TouchableDeounce />).toJSON();
    expect(tree).toMatchSnapshot();
});