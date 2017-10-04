import {} from '../constants/ActionTypes';
import {NAVBAR_UPDATE_TASKS} from "../constants/ActionTypes";

const init = [];

const tasksReducer = (state = init, action) => {
    switch (action.type) {
        case NAVBAR_UPDATE_TASKS:
            return action.payload;

        default: return state;
    }
};

export {tasksReducer as tasks};