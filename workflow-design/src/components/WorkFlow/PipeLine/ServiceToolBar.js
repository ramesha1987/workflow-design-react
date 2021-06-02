import React, { Component } from 'react';
import { Handle } from 'react-flow-renderer';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { Box, AppBar, Typography, Toolbar } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { Colors } from './../../../themes/constants/Colors';
const initBgColor = '#eee';
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Poppins', 'sans-serif'
    ].join(','),
    body1: {
      fontWeight: 200,
      fontSize: '.7rem',
      lineHeight: 1
    },
    body2: {
      fontWeight: 200,
      fontSize: '.6rem',
      lineHeight: 1
    },
  }, 
});

const onDragStart = (event, item) => {
  event.dataTransfer.setData('application/reactflow', item);
  event.dataTransfer.effectAllowed = 'move';
  console.log("Drag started")
};

const elements = [
  {
    id: '1',
    type: 'selectorNode',
    data: { label: 'Collector', color: initBgColor, colorService: Colors.colorCollector },
    position: { x: 0, y: 50 },
    sourcePosition: 'right',
  },
  {
    id: '3',
    type: 'selectorNode',
    data: { label: 'Curator', color: initBgColor, colorService: Colors.colorCurator },
    position: { x: 100, y: 50 },
  },
  {
    id: '5',
    type: 'selectorNode',
    data: { label: 'Transformer', color: initBgColor, colorService: Colors.colorTransformer },
    position: { x: 200, y: 50 },
    targetPosition: 'left',
  },
  {
    id: '7',
    type: 'selectorNode',
    data: { label: 'Mapper', color: initBgColor, colorService: Colors.colorMapper },
    position: { x: 300, y: 100 },
    targetPosition: 'left',
  },
  {
    id: '8',
    type: 'selectorNode',
    data: { label: 'Publisher', color: initBgColor, colorService: Colors.colorPublisher },
    position: { x: 400, y: 100 },
    targetPosition: 'left',
  }];
 


  const ServiceToolBar = () => {

    return (
      <React.Fragment>
       
        {
          elements.map((item) => (
            <Row>
              <Col key={item.id} className="block-example" md={{ span: 12, offset: 0 }} style={ {marginLeft:-4}}>
                      <ThemeProvider theme={theme}>
                <Box onDragStart={(event) => onDragStart(event, item.data.label)}>
                <Row style={ {border: '1px solid #9E9E9E',  padding: 0, borderRadius: 5+'px', marginTop: 3}} draggable>
                <Col md={{ span: 1, offset: 0 }} style={{ background: item.data.colorService , padding: '0px' }}>
                    <Box py={0} mt={1}>
                    
                    </Box>                 
                </Col>                
                <Col md={{ span: 10, offset: 0 }}>
                  <Row >
                  <Col style={ {padding: 5}} style={{padding: '2px 3px 10px 2px'}}>
                      <Box py={0} mt={1} >
                      <Typography varient="body2">{item.data.label}</Typography>
                      </Box>                   
                  </Col>
                  </Row>                                  
                </Col>               
                </Row>
                </Box>
                        </ThemeProvider>

              </Col>
              </Row>  
              ))
        }
              <hr/>
              <Row>
              <ThemeProvider theme={theme}>
                
                <Col md={{ span: 12, offset: 0 }} style={{
                   borderRadius: 0,
                   backgroundColor: Colors.logoBrown,
                   marginLeft:-4,
                   marginTop:4,
                   paddingTop:6,
                   paddingBottom:6
                 }}>
               
               
                      <a href="http://localhost:3000/pipeline?id=1"
                      style={{
                        fontSize:"11px",
                        color: '#000'
                      }}
                      >
                      <Typography varient="body2">Template</Typography>
                      </a>
 

              </Col>
              </ThemeProvider>

              </Row>
      
        
        </React.Fragment>
       );
};


export default ServiceToolBar