// __tests__/Filtering-test.js
import { filterMatch } from '../Filtering';

test('filter correctly', () => {
    const objList = [
        {
            name: 'fail',
            summary: 'fail',
            tags: [
                { name: 'match'},
                { name: 'fail'}
            ],
            meta: {
                name: 'fail'
            }
        },
        {
            name: 'match',
            summary: 'fail',
            tags: [
                { name: 'fail'},
                { name: 'fail'}
            ],
            meta: {
                name: 'fail'
            }
        },
        {
            name: 'fail',
            summary: 'fail',
            tags: [
                { name: 'fail'},
                { name: 'fail'}
            ],
            meta: {
                name: 'match'
            }
        },
        {
            name: 'fail',
            summary: 'fail',
            tags: [
                { name: 'fail'},
                { name: 'fail'}
            ],
            meta: {
                name: 'fail'
            }
        }
    ];
    const filterKeys = ['name','summary','tags>name','meta>name'];
    const filteredObjList = filterMatch('match', objList, filterKeys);
    expect(filteredObjList.length).toBe(3);
});