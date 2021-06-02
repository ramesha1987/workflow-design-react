import { breakpoints } from './layout'

// TYPOGRAPHY
// https://material-ui.com/customization/typography/#typography

// FONT ATTRIBUTES
export const fontFamily = "'Helvetica Neue'"
export const fontWeightLight = 300
export const fontWeightRegular = 400
export const fontWeightSemiBold = 600
// `htmlFontSize` affects the `rem` units used below
export const htmlFontSize = 16

// Breakpoints
const mediumWidthBreakpoint = `@media (min-width: ${breakpoints.md}px)`

// TYPOGRAPHY VARIANTS
export const h1 = {
    fontSize: '2.125rem',
    lineHeight: 1.42,
    fontWeight: fontWeightLight,
    [mediumWidthBreakpoint]: {
        fontSize: '3rem',
        lineHeight: 1.33
    }
}

export const h2 = {
    fontSize: '1.5rem',
    lineHeight: 1.5,
    fontWeight: fontWeightRegular,
    [mediumWidthBreakpoint]: {
        fontSize: '2.125rem',
        lineHeight: 1.41
    }
}

export const h3 = {
    fontSize: '1.25rem',
    lineHeight: 1.4,
    fontWeight: fontWeightRegular,
    [mediumWidthBreakpoint]: {
        fontSize: '1.5rem',
        lineHeight: 1.5
    }
}

export const h4 = {
    fontSize: '1.125rem',
    lineHeight: 1.44,
    fontWeight: fontWeightRegular,
    [mediumWidthBreakpoint]: {
        fontSize: '1.25rem',
        lineHeight: 1.4
    }
}

export const h5 = {
    fontSize: '1rem',
    lineHeight: 1.5,
    fontWeight: fontWeightRegular,
    [mediumWidthBreakpoint]: {
        fontSize: '1.125rem',
        lineHeight: 1.44
    }
}

export const h6 = {
    fontSize: '0.875rem',
    lineHeight: 1.43,
    fontWeight: fontWeightRegular,
    [mediumWidthBreakpoint]: {
        fontSize: '1rem',
        lineHeight: 1.5
    }
}

export const body1 = {
    fontSize: '1rem',
    lineHeight: 1.5,
    fontWeight: fontWeightRegular
}

export const body2 = {
    fontSize: '0.875rem',
    lineHeight: 1.43,
    fontWeight: fontWeightRegular
}

export const button = {
    fontSize: '0.875rem',
    lineHeight: 1.75,
    letterSpacing: 1,
    fontWeight: fontWeightSemiBold
}

export const overline = {
    fontSize: '0.75rem',
    lineHeight: 1.33,
    letterSpacing: 1,
    fontWeight: fontWeightSemiBold
}

export const caption = {
    fontSize: '0.75rem',
    lineHeight: 1.33,
    fontWeight: fontWeightRegular
}
