import { pathOr } from 'ramda';

class AppModel {

    /* constructor */
    constructor() {
        this.id = 0;
        this.name = '';
        this.author = '';
        this.category = '';
        this.summary = '';
        this.imageURL = '';
        this.rating = 0;
        this.ratingCount = 0;
        this.inited = false;

        this.referenceView = null;
        this.onReferenceView = (ref) => {
            this.referenceView = ref;
        }
    }

    /* public */
    refreshRating() {
        if (this.referenceView) {
            this.referenceView.forceUpdate();
        }
    }
}

export const parseByTopGlossingJSON = (json) => {
    let list = [];
    let entry = pathOr([], ['feed', 'entry'], json);
    entry.map(
        (item) => {
            let model = new AppModel();
            model.name = pathOr('', ['im:name', 'label'], item);
            model.author = pathOr('', ['im:artist', 'label'], item);
            model.category = pathOr('', ['category', 'attributes', 'label'], item);
            model.summary = pathOr('', ['summary', 'label'], item);
            model.imageURL = pathOr('', ['im:image', 2, 'label'], item);
            list.push(model);
        }
    );
    return list;
}

export const parseByTopFreeJSON = (json) => {
    let list = [];
    let entry = pathOr(null, ['feed', 'entry'], json);
    entry.map(
        (item) => {
            let model = new AppModel();
            model.id = pathOr(0, ['id', 'attributes', 'im:id'], item);
            model.name = pathOr('', ['im:name', 'label'], item);
            model.author = pathOr('', ['im:artist', 'label'], item);
            model.category = pathOr('', ['category', 'attributes', 'label'], item);
            model.summary = pathOr('', ['summary', 'label'], item);
            model.imageURL = pathOr('', ['im:image', 2, 'label'], item);
            list.push(model);
        }
    );
    return list;
}

export const parseByAppDetailJSON = (model, json) => {
    if (model) {
        model.rating = pathOr(0, ['results', 0, 'averageUserRating'], json);
        model.ratingCount = pathOr(0, ['results', 0, 'userRatingCount'], json);
        model.inited = true;
    }
}