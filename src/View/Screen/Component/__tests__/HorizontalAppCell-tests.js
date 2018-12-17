// __tests__/HorizontalAppCell-test.js
import React from 'react';
import HorizontalAppCell from '../HorizontalAppCell';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<HorizontalAppCell />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('shallow renders correctly', () => {
    shallow(<HorizontalAppCell index={1} item={{}} />);
});