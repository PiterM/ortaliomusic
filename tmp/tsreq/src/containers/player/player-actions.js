"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTracksData = void 0;
var player_action_types_1 = require("./player-action-types");
exports.setTracksData = function (tracks) { return ({
    type: player_action_types_1.default.SET_TRACKS_DATA,
    payload: tracks
}); };
