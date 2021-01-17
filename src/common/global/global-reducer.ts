import { GlobalActions } from './global-actions';
import ACTION_TYPES from './global-action-types';
import { GlobalState, PageMode } from '../models';

export const initGlobalState: GlobalState = {
    pageMode: PageMode.HomePage,
};

export const globalReducer = (state: GlobalState = initGlobalState, action: GlobalActions) => {
    switch (action.type) {
        case (ACTION_TYPES.SET_GLOBAL_PAGE_MODE):
            return { 
                ...state,
                pageMode: action.payload
            };
        default:
            return state;
    }
}
