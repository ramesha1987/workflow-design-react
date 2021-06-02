// DEFAULT STYLING OVERRIDES
// https://material-ui.com/customization/globals/#css

export const getMuiStepConnector = ({ palette }) => ({
    line: {
        borderColor: palette.grey['100']
    }
})

export const getMuiStepLabel = ({ palette }) => ({
    label: {
        color: palette.text.main,
        '&$active': {
            fontWeight: 600,
            color: palette.text.main
        },
        '&$completed': {
            color: palette.text.main
        }
    }
})

export const getMuiInputBase = ({ palette }) => ({
    root: {
        color: palette.text.main
    }
})

export const getMuiFilledInput = ({ palette, spacing }) => ({
    input: {
        backgroundColor: palette.grey['50'],
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
        '&:hover': {
            backgroundColor: palette.grey['50']
        },
        '&$focused': {
            backgroundColor: palette.grey['50']
        }
    },
    multiline: {
        backgroundColor: palette.grey['50'],
        '&:hover': {
            backgroundColor: palette.grey['50']
        },
        '&$focused': {
            backgroundColor: palette.grey['50']
        }
    },
    adornedEnd: {
        backgroundColor: palette.grey['50'],
        '&:hover': {
            backgroundColor: palette.grey['50']
        },
        '&$focused': {
            backgroundColor: palette.grey['50']
        }
    },
    adornedStart: {
        backgroundColor: palette.grey['50'],
        '&:hover': {
            backgroundColor: palette.grey['50']
        },
        '&$focused': {
            backgroundColor: palette.grey['50']
        }
    }
})

export const getMuiSelect = ({ palette }) => ({
    root: {
        backgroundColor: palette.grey['50']
    },
    select: {
        '&$filled': {
            backgroundColor: palette.grey['50']
        }
    }
})

export const getMuiExpansionPanel = theme => ({
    root: {
        padding: theme.spacing(0),
        margin: theme.spacing(0),
        '&$expanded': {
            // eslint-disable-next-line no-magic-numbers
            // margin: `${theme.spacing(3.5)}px 0`
        }
    },
    expanded: {
        padding: theme.spacing(0),
        margin: theme.spacing(0),
        borderRadius: theme.shape.borderRadius
    }
})

export const getMuiExpansionPanelDetails = theme => ({
    root: {
        padding: theme.spacing(0),
        margin: theme.spacing(0)
    }
})

export const getMuiExpansionPanelSummary = theme => ({
    root: {
        padding: `${theme.spacing(4)}px`,
        margin: theme.spacing(0),
        minHeight: 'auto',
        '&$expanded': {
            minHeight: 'auto'
        }
    },
    content: {
        padding: theme.spacing(0),
        margin: theme.spacing(0),
        '&$expanded': {
            padding: theme.spacing(0),
            margin: theme.spacing(0)
        }
    },
    expandIcon: {
        padding: theme.spacing(0),
        margin: theme.spacing(0),
        '&$expanded': {
            padding: theme.spacing(0),
            margin: theme.spacing(0)
        }
    }
})

export const getMuiMenuItem = theme => ({
    root: {
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
})

export const getMuiChip = theme => ({
    sizeSmall: {
        fontSize: '0.75rem'
    }
})
