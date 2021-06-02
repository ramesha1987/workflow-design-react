import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { Box, AppBar, Typography, Toolbar } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';


const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Poppins', 'sans-serif'
    ].join(','),
    body1: {
      fontWeight: 200,
      fontSize: '.5rem',
      lineHeight: 1
    },
    body2: {
      fontWeight: 200,
      fontSize: '.6rem',
      lineHeight: 1
    },
  },
  MuiBox: {
    root: {
      padding: '0px',
      margin: '0px'
    },
    MuiAppBar: {
      root: {
        backgroundColor: '#fff'
      }
    }
  }, 
});

var useStyles = makeStyles(theme => ({
  offset: 10,
}))

export default memo(({ data }) => {
  return (
   

    <>
      
        <ThemeProvider theme={theme}>
        <Container style={ {padding: '0px 0px 0px 2px', background: data.colorService, border: '1px solid #9E9E9E', borderRadius: 3+'px'}}>

        <Box display="flex" flexDirection="row" p={1} m={1} style={{  background: '#fff', margin: '0px', padding: '5px 3px 5px 2px', borderRadius: 2+'px'}}>
            <Box p={1} bgcolor="grey.300" style={{ textAlign: 'center', padding: '0px 0px 0px 0px' }}>
              
            {
                (data.label && data.label  !== "Collector") && <Handle 
                type="target"
                position="left"
                style={{ background: '#111'}}
                onConnect={(params) => console.log('handle onConnect', params)}
              />
            }
              
              
            </Box>
            <Box onClick={() => data.onChange(data.label)} p={2} style={{ textAlign: 'center', background: '#fff', padding: '2px 0px 2px 0px', margin: '0px' }}>
            <Typography onClick={() => data.onChange(data.label)} varient="body2">{data.label}</Typography>
            </Box>
       
            <Box p={1} style={{ textAlign: 'center', background: '#fff', padding: '2px 0px 2px 0px', margin: '0px' }}>
            {
                (data.label && data.label !== "Publisher") &&
                <Handle
                    type="source"
                    position="right"
                    id="a"
                    style={{ background: '#aaa' }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                  /> 
            }
            </Box>
      </Box>
       
          </Container>
          </ThemeProvider>

    
    </>

  );
});