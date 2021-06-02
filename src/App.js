import ServiceComponent from './components/ServiceSpecConfig/ServiceComponent';
import React, { Component } from 'react';
import { Box, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import { createMuiTheme, ThemeProvider, MuiThemeProvider } from '@material-ui/core/styles';
import PipeLineComponent from './components/WorkFlow/PipeLineComponent';
import { Colors } from './themes/constants/Colors';

import { StylesProvider } from '@material-ui/styles';

const initBgColor = '#eee';

const connectionLineStyle = { stroke: '#000' };
const snapGrid = [20, 20];


const initialElements = [
  {
    id: '1',
    type: 'selectorNode',
    data: { label: 'Collector', highlight:true, color: initBgColor, colorService: Colors.colorCollector },
    position: { x: 0, y: 50 },
    sourcePosition: 'right',
  },
  {
    id: '2',
    type: 'selectorNode',
    data: { label: 'Collector', color: initBgColor, colorService: Colors.colorCollector },
    position: { x: 0, y: 120 },
    sourcePosition: 'right',
  },
  {
    id: '3',
    type: 'selectorNode',
    data: { label: 'Curator', color: initBgColor, colorService: Colors.colorCurator },
    position: { x: 70, y: 50 },
  },
  {
    id: '4',
    type: 'selectorNode',
    data: { label: 'Curator',  color: initBgColor, colorService: Colors.colorCurator },
    position: { x: 70, y: 120 },
  },
  {
    id: '5',
    type: 'selectorNode',
    data: { label: 'Transformer', color: initBgColor, colorService: Colors.colorTransformer },
    position: { x: 140, y: 50 },
    targetPosition: 'left',
  },
  {
    id: '6',
    type: 'selectorNode',
    data: { label: 'Transformer', color: initBgColor, colorService: Colors.colorTransformer },
    position: { x: 140, y: 120 },
    targetPosition: 'left',
  },
  {
    id: '7',
    type: 'selectorNode',
    data: { label: 'Mapper', color: initBgColor, colorService: Colors.colorMapper },
    position: { x: 210, y:85 },
    targetPosition: 'left',
  },
  {
    id: '8',
    type: 'selectorNode',
    data: { label: 'Publisher', color: initBgColor, colorService: Colors.colorPublisher },
    position: { x: 280, y: 85 },
    targetPosition: 'left',
  },
  {
    id: 'e1-2',
    source: '1',
    target: '3',
    animated: true,
    style: { stroke: Colors.colorConnection },
  },
  {
    id: 'e2a-2',
    source: '2',
    target: '4',
    animated: true,
    style: { stroke: Colors.colorConnection },
  },
  {
    id: 'e2b-3',
    source: '3',
    target: '5',
    animated: true,
    style: { stroke: Colors.colorConnection },
  },
  {
    id: 'e2b-4',
    source: '4',
    target: '6',
    animated: true,
    style: { stroke: Colors.colorConnection },
  },
  {
    id: 'e2b-5',
    source: '5',
    target: '7',
    animated: true,
    style: { stroke: Colors.colorConnection },
  },
  {
    id: 'e2b-6',
    source: '6',
    target: '7',
    animated: true,
    style: { stroke: Colors.colorConnection },
  },
  {
    id: 'e2b-7',
    source: '7',
    target: '8',
    animated: true,
    style: { stroke: Colors.colorConnection },
  },
];


const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Poppins', 'sans-serif'
    ].join(','),
    body1: {
      fontWeight: 200,
      fontSize: '.8rem',
      lineHeight: 1
    },
    body2: {
      fontWeight: 200,
      fontSize: '.8rem',
      lineHeight: 1
    },
    h5: {
      fontWeight: 600 // or 'bold'
    },
    h6: {
      fontWeight: 600 // or 'bold'
    },
    body1: {
      fontWeight: 200 // or 'bold'
    },
    body1: {
      fontWeight: 200 // or 'bold'
    },
    ".h7":{
      fontWeight: 600
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
  },
 
});

var useStyles = makeStyles(theme => ({
  offset: 10,
}))

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pipelineElements: initialElements
    }; 
    this.updatePipeline = this.updatePipeline.bind(this)
  }
  updatePipeline(elements) {   
    this.setState({
      pipelineElements: elements
    });
  }
  render() {
    const { classes } = this.props;
    return (
       <StylesProvider injectFirst>
       <MuiThemeProvider theme={theme}>
           <Router>
           <Switch>
             <Route path="/service" render={(props ) => <ServiceComponent {...props}/>} />
             <Route path="/pipeline" render={(props ) => <PipeLineComponent {...props} elements={this.state.pipelineElements} updatePipeline={this.updatePipeline}></PipeLineComponent>}></Route>
             

           </Switch>
         </Router>
       </MuiThemeProvider>
       </StylesProvider>
    );
  }
}
export default withStyles(useStyles)(App)