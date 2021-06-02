import React, { PureComponent } from 'react'
import { Typography, Box } from '@material-ui/core'
import headerIcon from '../assets/logo_v2.svg'
import profile from '../assets/profile.svg'
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Colors } from './../themes/constants/Colors';


const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Titillium Web', 'sans-serif'
        ].join(','),
        h5: {
            fontWeight: 600 // or 'bold'
        },
        h6: {
            fontWeight: 600 // or 'bold'
        },
        MuiTreeItem: {
            fontWeight: 'regular'
        },
        MuiBox: {
            fontWeight: 'regular'
        },
        MuiInputBase: {
            fontWeight: 'regular'
        },
        MuiInputLabel: {
            fontWeight: 'regular'
        },
    },
    MuiPaper: {
        root: {
            backgroundColor: '#fff'
        },
        MuiAppBar: {
            root: {
                backgroundColor: '#fff'
            }
        }
    },
    "& .MuiAppBar-colorPrimary": {
        backgroundColor: '#fff'
    },
    root: {
        "& .MuiAppBar-colorPrimary": {
            backgroundColor: '#fff'
        }
    }
});

var useStyles = makeStyles(theme => ({
    offset: 10,
}))

class AppHeader extends PureComponent {
    render() {
        return (
            <Box bgcolor={Colors.white} color={Colors.black} borderBottom={0} borderColor={Colors.logoBrown} height="70px" display="flex" flexDirection="row">
                <Box width="100%" display="flex" flexDirection="row">
                    <Box p={0} component="span">
                        <img src={headerIcon} width="150px" height="90px" />
                    </Box>                    
                </Box>
                <Box flexShrink={0} display="flex" flexDirection="row">
                    <Box p={3} component="span">
                        <Typography variant="label">James Smith</Typography>
                    </Box>
                    <Box py={3} pr={5}>
                        <img src={profile} width="40px" height="40px" />
                    </Box>
                </Box>
            </Box>
        )
    }
}

export default withStyles(useStyles)(AppHeader)
