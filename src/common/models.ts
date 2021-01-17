export enum PageMode {
    TrackPage = 'TrackPage',
    HomePage = 'HomePage'
}

export interface GlobalState {
    pageMode: PageMode;
}