// __tests__/TypeChecking-test.js
import { isString, isNonEmptyString, isArray } from '../TypeChecking';

test('is string checked', () => {
    const string = 'this is a string';
    expect(isString(string)).toBe(true);
});

test('not a string checked', () => {
    const object = {};
    expect(isString(object)).toBe(false);
});

test('is an empty string checked', () => {
    const emptyStr = '';
    expect(isNonEmptyString(emptyStr)).toBe(false);
});

test('is an array checked', () => {
    const array = [];
    expect(isArray(array)).toBe(true);
});

test('not an array checked', () => {
    const string = 'this is a string, not array';
    expect(isArray(string)).toBe(false);
});