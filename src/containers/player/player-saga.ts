import { put, ForkEffect, takeLatest, select } from "redux-saga/effects";
import ACTION_TYPES from './player-action-types';
import { playPauseTrack, stopPlayback } from "./player-actions";
import { LoopMode } from "./player-constants";
import { getLoopMode, getCurrentTrack, getTracks } from './player-selectors';

export function* decideWhatPlayNext() {
    const loopMode = yield select(getLoopMode);
    const { details: { id }} = yield select(getCurrentTrack);
    const tracks = yield select(getTracks);
    switch (loopMode) {
        case (LoopMode.LoopAll):
            if (id) {
                const tracksArray: any = Object.values(tracks);
                const currentArrayKey = tracksArray.findIndex((item: any) => item.id === id);
                let nextArrayKey = currentArrayKey + 1;
                nextArrayKey = nextArrayKey < tracksArray.length ? nextArrayKey : tracksArray.length % nextArrayKey;

                const nextTrackId = tracksArray[nextArrayKey].id;
                if (nextTrackId) {
                    yield put(playPauseTrack(id));
                    yield put(playPauseTrack(nextTrackId));   
                } else {
                    //not reached rather
                    yield put(stopPlayback());
                }
            }
            break;            
        case (LoopMode.LoopOne):
            if (id) {
                yield put(playPauseTrack(id));
                yield put(playPauseTrack(id));
            } else {
                //not reached rather
                yield put(stopPlayback());
            }
            break;
        case (LoopMode.Off):
        default:
            yield put(stopPlayback());
    }
}

export function* watchPlayerActions(): IterableIterator<ForkEffect> {
    yield takeLatest(ACTION_TYPES.DECIDE_WHAT_PLAY_NEXT, decideWhatPlayNext);
}