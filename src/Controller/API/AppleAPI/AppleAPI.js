import API from '../API';

export class AppleAPI extends API {

    /* public */
    
    /**
     * 
     * @param {Function e.g. { success: {}, fail: {} }} callback 
     */
    startAPI(callback = null) {
        switch (this.action) {
            case 'lookup_app':
                this.get('lookup', this.parameters, callback);
                break;

            case 'get_top_10_grossing_app':
                this.get('rss/topfreeapplications/limit=10/json', this.parameters, callback);
                break;

            case 'get_top_100_free_app':
                this.get('rss/topfreeapplications/limit=100/json', this.parameters, callback);
                break;
        }
    }
}

export default AppleAPI;