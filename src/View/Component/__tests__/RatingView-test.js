// __tests__/RatingView-test.js
import React from 'react';
import {shallow} from 'enzyme';
import RatingView from '../RatingView';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<RatingView />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('shallow renders correctly', () => {
    shallow(<RatingView rating={5} count={1000} />);
});