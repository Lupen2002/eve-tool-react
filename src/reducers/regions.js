import {} from '../constants/ActionTypes';
import {EVE_REGION_UPDATE} from "../constants/ActionTypes";
import * as _ from 'lodash';

const init = {};

const regionReducer = (state = init, action) => {
    switch (action.type) {
        case EVE_REGION_UPDATE:
            let newState = {...state};
            _.forEach(action.payload, r => {
                newState[r.id] = r
            });
            return newState;

        default: return state;
    }
};

export {regionReducer as regions};