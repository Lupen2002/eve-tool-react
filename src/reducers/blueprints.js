import * as _ from 'lodash';
import {REHYDRATE} from 'redux-persist/constants'
import {EVE_BLUEPRINT_DROP, EVE_BLUEPRINTS_UPDATE} from "../constants/ActionTypes";

const init = {};

const blueprintsReducer = (state = init, action) => {
    const newState = {...state};
    switch (action.type) {
        case REHYDRATE:
            return action.payload['blueprints'];

        case EVE_BLUEPRINTS_UPDATE:
            _.forEach(_.toPairs(action.payload), (pair) => {
                const blueprintId = pair[0];
                newState[blueprintId] = pair[1];
            });
            return newState;
        case EVE_BLUEPRINT_DROP:
            return (
                _.transform(
                    _.filter(
                        _.toPairs(newState),
                        pair => pair[0] !== action.id),
                    (result, pair) => {
                        let tmp = {...result};
                        tmp[pair[0]] = pair[1];
                        return tmp;
                    },
                    {}));

        default:
            return newState;
    }
};

export {blueprintsReducer as blueprints};