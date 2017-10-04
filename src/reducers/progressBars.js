
import {PROGRESS_BAR_RESET, PROGRESS_BAR_UPDATE} from "../constants/ActionTypes";
import {PROGRESS_BAR_MARKET_GROUPS, PROGRESS_BAR_REGIONS} from "../constants/ProgressBarNames";
import {REHYDRATE} from "redux-persist/constants";

const init = {};

init[PROGRESS_BAR_REGIONS] = {percent: 0};
init[PROGRESS_BAR_MARKET_GROUPS] = {percent: 0};

const progressBarReducer = (state = init, action) => {
    let newState = {...state};
    switch (action.type) {
        case REHYDRATE:
            return action.payload['progressBars'];
        case PROGRESS_BAR_RESET:
            newState[action.barName] = action.payload;
            return newState;

        case PROGRESS_BAR_UPDATE:
            newState[action.barName] = {...state[action.barName], percent:action.percent};
            return newState;

        default:
            return newState;
    }
};

export {progressBarReducer as progressBars}