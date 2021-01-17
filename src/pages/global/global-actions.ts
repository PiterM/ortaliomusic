import ACTION_TYPES from './global-action-types';
import { PageMode } from '../../common/models';

export interface SetPageMode {
    type: ACTION_TYPES.SET_GLOBAL_PAGE_MODE;
    payload: PageMode;
}

export const setPageMode = (payload: PageMode): SetPageMode => ({
    type: ACTION_TYPES.SET_GLOBAL_PAGE_MODE,
    payload,
});

export type GlobalActions = 
    | SetPageMode;