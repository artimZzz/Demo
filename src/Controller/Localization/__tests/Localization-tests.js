// __tests__/Localization-test.js
import { strings } from '../Localization';

test('get localized string correctly', () => {
    const localizedStr = strings('key');
    expect(localizedStr).toBeDefined();
});