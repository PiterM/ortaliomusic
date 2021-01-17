import { StoreState } from '../../store/StoreState';

export const getPageMode = ({ global: { pageMode }}: StoreState) => pageMode;