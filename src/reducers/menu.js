import * as types from '../constants/ActionTypes';


const initMenu = {
    activeItem: 1,
    items: {
        1: {
            url: "/",
            label: "Главная"
        },
        2: {
            url: "/settings",
            label: "Настройки"
        },
        3: {
            url: "/analytics",
            label: "Анализ рынков"
        },
        4: {
            url: "/blueprints",
            label: "Обзор чертежей"
        }
    }
};

const itemMenuReducer = function (state = initMenu, action) {
    switch (action.type) {
        case types.MENU_ACTIVATE:
            return {...state, activeItem: action.itemId};
        default:
            return state;
    }
};


export {itemMenuReducer as menu}