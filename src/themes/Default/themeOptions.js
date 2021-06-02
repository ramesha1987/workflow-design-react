import { createMuiTheme } from '@material-ui/core/styles'

import {
    colors,
    layout,
    overrides as overridesConstants,
    props as propsConstants,
    typography as typographyConstants
} from '../constants'

const {
    breakpoints: {
        xs, sm, md, lg, xl
    },
    spacing,
    borderRadius
} = layout

// Custom breakpoint values
const breakpoints = {
    values: {
        xs,
        sm,
        md,
        lg,
        xl
    }
}

// Custom color palette
/**
 * Helpful color/theme generator tools:
 * https://react-theming.github.io/create-mui-theme/
 * https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=007EB6&secondary.color=131F45&primary.text.color=ffffff.
 */
const {
    brandPrimary,
    primaryContrastText,
    brandSecondary,
    textPrimary,
    textSecondary,
    error,
    grey,
    red,
    blue,
    green,
    yellow,
    white,
    orange,
    warning,
    darkTheme
} = colors

const palette = {
    primary: {
        main: brandPrimary,
        contrastText: primaryContrastText
    },
    secondary: {
        main: brandSecondary
    },
    text: {
        primary: textPrimary,
        secondary: textSecondary
    },
    error: {
        main: error
    },
    warning: {
        main: warning
    },
    background: {
        'default': '#141B2E'
    },
    grey,
    red,
    blue,
    green,
    yellow,
    white,
    orange,
    darkTheme
}

// Custom shape
const shape = {
    borderRadius
}

// Custom typography
const {
    fontFamily,
    fontWeightLight,
    fontWeightRegular,
    fontWeightSemiBold,
    htmlFontSize,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    body1,
    body2,
    button,
    overline,
    caption
} = typographyConstants

const typography = {
    fontFamily,
    fontWeightLight,
    fontWeightRegular,
    fontWeightSemiBold,
    htmlFontSize,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    body1,
    body2,
    button,
    overline,
    caption
}

// Custom default props
const { muiSkeletonProps } = propsConstants
const props = {
    MuiSkeleton: { ...muiSkeletonProps }
}

const themeName = 'New WileyPLUS'

// Create theme object
const theme = createMuiTheme({
    breakpoints,
    palette,
    props,
    spacing,
    shape,
    typography,
    themeName
})

// Modify global overrides that depend on theme object
const {
    getMuiChip,
    getMuiExpansionPanel,
    getMuiExpansionPanelDetails,
    getMuiExpansionPanelSummary,
    getMuiInputBase,
    getMuiFilledInput,
    getMuiMenuItem,
    getMuiStepConnector,
    getMuiStepLabel,
    getMuiSelect
} = overridesConstants

theme.overrides = {
    ...theme.overrides,
    MuiChip: getMuiChip(theme),
    MuiExpansionPanel: getMuiExpansionPanel(theme),
    MuiExpansionPanelDetails: getMuiExpansionPanelDetails(theme),
    MuiExpansionPanelSummary: getMuiExpansionPanelSummary(theme),
    MuiInputBase: getMuiInputBase(theme),
    MuiFilledInput: getMuiFilledInput(theme),
    MuiMenuItem: getMuiMenuItem(theme),
    MuiStepConnector: getMuiStepConnector(theme),
    MuiStepLabel: getMuiStepLabel(theme),
    MuiSelect: getMuiSelect(theme)
}

/**
 * Default theme object.
 */
export default theme
