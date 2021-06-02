import React, { Component } from 'react';
import 'react-sortable-tree/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';


import { Box, AppBar, Typography } from '@material-ui/core';
import AppHeader from '../AppHeader';
import { Colors } from '../../themes/constants/Colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CreateFlow from './PipeLine/CreateFlow';

import CuratorEdit from './PipeLine/CuratorEdit';
import DashboardIcon from '../../assets/dashboard.png'
import WorkflowIcon from '../../assets/workflow.png'
import LogoutIcon from '../../assets/logout.png'
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

var avro = require('avro-js');

var joltSpectDefault = [{
  "operation": "default",
  "spec": {}
}];


var inputSchema = {
  name: 'Order',
  type: 'record',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'itemPrices', type: { "type": "array", "items": "double" } },
    { name: 'addressLine1', type: 'string' },
    { name: 'addressLine2', type: 'string' },
    { name: 'payment', type: 'string' }
  ]
};

var outputSchema = JSON.parse(JSON.stringify(inputSchema));
outputSchema.name = "Invoice"
var inputType = avro.parse(inputSchema);
var order = { id: '2323232', name: 'Order by Customer', itemPrices: [10, 20, 50, 2, 100], addressLine1: 'Door 1, street 90, Town xx', addressLine2: 'City y, Country z', payment: 'SUCCUSS' };
var buf = inputType.toBuffer(order); // Serialized object.
var obj = inputType.fromBuffer(buf); // {kind: 'CAT', name: 'Albert'}
console.log(inputType);


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
      fontSize: '1.0rem',
      fontWeight: 400 // or 'bold'
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
  "row": {   
      margin: '2px 5px 2px 5px',
      padding: '2px 5px 2px 5px'   
  },
  MuiBox: {
    root: {
      margin: '2px 5px 2px 5px',
      padding: '2px 5px 2px 5px'
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




function sameMembers(arrA, arrB) {
  //check if lengths are different
  if (arrA.length !== arrB.length) return false;
  //slice so we do not effect the orginal
  //sort makes sure they are in order
  var cA = arrA.slice().sort();
  var cB = arrB.slice().sort();

  for (var i = 0; i < cA.length; i++) {
    var isAvailable = false;
    for (var j = 0; j < cA.length; j++) {
      if (cA[j].name === cB[i].name && cA[j].spec === cB[i].spec) {
        isAvailable = true;
      }
    }
    if (!isAvailable) {
      return false;
    }
  }
  return true;
}

function containsAll(arrA, arrB) {
  //check if lengths are different
  if (arrA.length < arrB.length) return false;
  //slice so we do not effect the orginal
  //sort makes sure they are in order
  var cA = arrA.slice().sort();
  var cB = arrB.slice().sort();
  console.log(cA)
  console.log(cB)
  for (var i = 0; i < cB.length; i++) {
    var isAvailable = false;
    for (var j = 0; j < cA.length; j++) {
      if (cA[j].name === cB[i].name && cA[j].spec === cB[i].spec) {
        isAvailable = true;
      }
    }
    if (!isAvailable) {
      return false;
    }
  }
  return true;
}
function Contains(arrA, field) {
  for (var i = 0; i < arrA.length; i++) {
    if (arrA[i].name === field.name && arrA[i].spec === field.spec) {
      return true;
    }
  }
  return false;
}

function ContainsButModified(arrA, field) {
  for (var i = 0; i < arrA.length; i++) {
    if (arrA[i].name === field.name && (arrA[i].spec !== field.spec || arrA[i].type !== field.type)) {
      return true;
    }
  }
  return false;
}
const data= { label: 'Collector', highlight:true, colorService: Colors.colorCollector }

class PipeLineComponent extends Component {
  constructor(props) {
    console.log(props)

    super(props);
    this.state = {
      elements : props.elements,
      highlighted : "Collector",
      template : props.template
    };

    this.changeServiceArea = this.changeServiceArea.bind(this)

  }
 
  changeServiceArea(serviceName) {
    console.log(serviceName)   
    this.setState({
      highlighted: serviceName,
    });
  }



  render() {

    console.log(this.props)
    return (
      <Box display="flex" flexDirection="column">
        <AppBar position="fixed">
          <AppHeader />
        </AppBar>


        <Box display="flex" flexDirection="row" mt={11}>
          <Container mr={5} style={{ maxWidth: '100%'}}>

          <Row style={{ maxWidth: '100%'}}>
          <Col className="block-example border-right border-gray" md={{ span: 2, offset: 0 }}>
              <Box py={0} mt={0} borderRight="1px" borderColor="#000">
              <Row style={ {borderBottom: '1px solid #bdbdbd', marginTop: 3, padding: 0}}>
              <Col>
                  <Box flexShrink={0} display="flex" flexDirection="row" style={ {marginTop: 0, padding: 0}}>
                    <Box p={1} component="span" style={ {marginTop: 0, padding: 0}}>
                    <img src={DashboardIcon} width="30px" height="28px" />
                    </Box>
                    <Box py={1} pr={5} style={ {marginLeft:5, marginTop: 0, padding: 0}}>
                    <Typography varient="body2">Dashboard</Typography>
                    </Box>
                </Box>                  
              </Col>
              </Row> 
              <Row style={ {borderBottom: '1px solid #bdbdbd', marginTop: 3, padding: 0}}>
              <Col>
                  <Box flexShrink={0} display="flex" flexDirection="row" style={ {marginTop: 0, padding: 0}}>
                    <Box p={1} component="span" style={ {marginTop: 0, padding: 0}}>
                    <img src={WorkflowIcon} width="20px" height="30px" />
                    </Box>
                    <Box py={1} pr={5} style={ {marginLeft:15, marginTop: 0, padding: 0}}>
                    <Typography varient="body2">WorkFlow</Typography>
                    </Box>
                </Box> 
              </Col>
              </Row> 
              <Row style={ {borderBottom: '1px solid #bdbdbd', marginTop: 420}}>
              <Col >
              <Box flexShrink={0} display="flex" flexDirection="row">
                    <Box p={1} component="span" style={ {marginTop: 0, padding: 0}}>
                    <img src={LogoutIcon} width="30px" height="30px" />
                    </Box>
                    <Box py={1} pr={5} style={ {marginLeft:5, marginTop: 0, padding: 0}}>
                    <Typography varient="body2">Logout</Typography>
                    </Box>
                </Box> 
              </Col>
              </Row>  
             
             
              </Box>                 
          </Col>
          <Col md={{ span: 9, offset: 0 }} className="block-example border-bottom border-gray">              
              <Row className="block-example border-bottom border-gray">
              <Col md={{ span: 12, offset: 0 }} >
                <Box mr={7}>
                <Row> 
                   <CreateFlow changeServiceArea={this.state.changeServiceArea} template={this.state.template} elements={this.state.elements}/>                  
                </Row>
                </Box>
              </Col>
            
            </Row>
      
          </Col>
          </Row>


          </Container>
        </Box>
      </Box>




    );
  }
}
export default withStyles(useStyles)(PipeLineComponent)