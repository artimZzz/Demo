// __tests__/VerticalAppCell-test.js
import React from 'react';
import VerticalAppCell from '../VerticalAppCell';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<VerticalAppCell />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('shallow renders correctly', () => {
    shallow(<VerticalAppCell index={1} item={{}} />);
});