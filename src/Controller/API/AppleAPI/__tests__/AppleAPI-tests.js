// __tests__/Filtering-test.js
import { AppleAPI } from '../AppleAPI';

describe('apple api fetch correctly', () => {
    it(
        'fetching',
        async () => {
            const api = new AppleAPI();
            api.prepare(
                'get_top_10_grossing_app',
                {},
                {
                    success: (responseData) => {},
                    fail: (error) => {}
                }
            );
            api.startAPI(api.callback);
        }
    );
});