export const trackTitleHelper = (shortTitle: string, title: string, withStems: boolean = false, free: boolean = false) => {
    const freeBeatLabel = free ? ' [FREE BEAT]' : '';
    const withStemsLabel = withStems ? ' (WITH STEMS)' : '';
    return `${shortTitle} | ${title}${withStemsLabel}${freeBeatLabel}`;
};
