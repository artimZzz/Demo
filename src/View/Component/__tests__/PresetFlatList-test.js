// __tests__/PresetFlatList-test.js
import React from 'react';
import { AnimatedFlatList, CustomizedFlatList } from '../PresetFlatList';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<AnimatedFlatList />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('renders correctly', () => {
    const tree = renderer.create(<CustomizedFlatList />).toJSON();
    expect(tree).toMatchSnapshot();
});