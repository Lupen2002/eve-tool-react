import {} from '../constants/ActionTypes';
import {EVE_MARKET_GROUP_UPDATE} from "../constants/ActionTypes";
import {EVE_MARKET_GROUP_ALL_UPDATE} from "../constants/ActionTypes";
import * as _ from 'lodash';

const init = {};

const marketGroupReducer = (state = init, action) => {
    let newState = {...state};
    switch (action.type) {
        case EVE_MARKET_GROUP_UPDATE:
            const marketGroupId = action.payload.market_group_id;
            newState[marketGroupId] = action.payload;
            return newState;
        case EVE_MARKET_GROUP_ALL_UPDATE:
            _.forEach(action.payload, (group) => newState[group.id] = group);
            return newState;
        default:
            return newState;
    }
};

export {marketGroupReducer as marketGroup};