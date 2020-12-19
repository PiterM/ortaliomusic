import ACTION_TYPES from './settings-action-types';
import { SettingsPayload } from './settings-models';

export interface SetSettingsData {
    type: ACTION_TYPES.SET_SETTINGS_DATA;
    payload: SettingsPayload;
}

export const setSettingsData = (payload: SettingsPayload): SetSettingsData => ({
    type: ACTION_TYPES.SET_SETTINGS_DATA,
    payload
});