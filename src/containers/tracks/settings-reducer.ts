import { SetSettingsData } from './settings-actions';
import ACTION_TYPES from './settings-action-types';
import { SettingsState } from './settings-state';

export const initState: SettingsState = {
    defaultPrice: null,
};

export const settingsReducer = (state: SettingsState = initState, action: SetSettingsData) => {
    switch (action.type) {
        case (ACTION_TYPES.SET_SETTINGS_DATA):
            return action.payload;
        default:
            return state;
    }
}