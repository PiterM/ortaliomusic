export const trackTitleHelper = (shortTitle: string, title: string, free: boolean = false) => `${shortTitle} | ${title}${free ? ' [FREE BEAT]' : ''}`;
