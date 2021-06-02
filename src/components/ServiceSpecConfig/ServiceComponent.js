import React, { Component } from 'react';
import 'react-sortable-tree/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import EditableSpecTreeComponent from './Output/EditableSpecTreeComponent';
import SrcTreeComponent from './Source/SrcTreeComponent';

import Button from '@material-ui/core/Button';
import { Box, AppBar, Typography } from '@material-ui/core';
import AppHeader from '../../components/AppHeader';
import { Colors } from './../../themes/constants/Colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    action: {
      disabledBackground: Colors.logoBrown,
      disabled: Colors.black
    }
  }
});

var useStyles = makeStyles(theme => ({
  offset: 10,
}))



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

class ServiceComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        { title: 'Items', expandable: true, children: [{ title: 'Item 1' }, { title: 'Item2' }, { title: 'Item3' }] },
        { title: 'Orders', children: [{ title: 'Order1' }] },
      ],
      destData: [
        { title: 'Invoice', children: [{ title: 'Name' }, { title: 'Price' }, { title: 'DateOfOrder' }] },
      ],
      inputSchema: inputSchema,
      inputJson: obj,
      outputSchema: outputSchema,
      joltSpec: joltSpectDefault
    };

    this.handleDelete = this.handleDelete.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.reWriteSpec = this.generateSpec.bind(this)

  }
  handleDelete(name) {
    console.log(name)
    var { inputSchema, outputSchema, joltSpec } = this.state
    outputSchema.fields = this.state.outputSchema.fields.filter(el => el.name != name);
    joltSpec = this.generateSpec(inputSchema, outputSchema)
    console.log("====new spec =====")
    console.log(joltSpec)
    this.setState({
      outputSchema: outputSchema,
      joltSpec: joltSpec
    });
  }


  handleAdd(data) {
    console.log(data)
    if (data.name && data.function && data.srcField && data.type) {
      var fieldSpec = data.function + '(@(1,' + data.srcField + '))'
      var field = { name: data.name, type: data.type, spec: fieldSpec }
      var { inputSchema, outputSchema, joltSpec } = this.state
      outputSchema.fields.push(field)
      joltSpec = this.generateSpec(inputSchema, outputSchema)
      console.log("====new spec =====")
      console.log(joltSpec)

      this.setState({
        outputSchema: outputSchema,
        joltSpec: joltSpec
      });
    }
    else {
      return;
    }
  }


  generateSpec(inputSchema, outputSchema) {
    var joltSpec = []

    if (sameMembers(inputSchema.fields, outputSchema.fields)) {
      console.log("input = output")
      joltSpec = { ...joltSpectDefault }
    }
    else if (containsAll(inputSchema.fields, outputSchema.fields)) {
      console.log("input > output")
      joltSpec = []
      var jolt = {}
      jolt["operation"] = "shift"
      jolt["spec"] = {}
      outputSchema.fields.forEach(element => {
        if (element.spec) {
          jolt["spec"][element.name] = element.spec
        }
        else {
          jolt["spec"][element.name] = element.name
        }
      });
      joltSpec.push(jolt)
    }
    else if (containsAll(outputSchema.fields, inputSchema.fields)) {
      console.log("input < output")
      joltSpec = []
      var jolt = {}
      jolt["operation"] = "modify-overwrite-beta"
      jolt["spec"] = {}
      outputSchema.fields.forEach(element => {
        if (!Contains(inputSchema.fields, element)) {
          if (element.spec) {
            jolt["spec"][element.name] = element.spec
          }
          else {
            jolt["spec"][element.name] = element.name
          }
        }
      });
      joltSpec.push(jolt)
    }
    else {
      console.log("input !=! output")
      joltSpec = []
      var jolt = {}
      //This is the case where user added more custom fields and removed one or more fields from input
      //modify-default-beta will add all input fields with added new fields..
      //Removed input fields should be added in a spec array with "remove" spec
      jolt["operation"] = "modify-default-beta"
      jolt["spec"] = {}
      outputSchema.fields.forEach(element => {
        if (element.spec) {
          jolt["spec"][element.name] = element.spec
        }
        else {
          jolt["spec"][element.name] = element.name
        }
      });
      joltSpec.push(jolt)

      var joltRemove = {}
      joltRemove["operation"] = "remove"
      joltRemove["spec"] = {}
      inputSchema.fields.forEach(element => {
        if (!Contains(outputSchema.fields, element)) {
          joltRemove["spec"][element.name] = ""
        }
      });
      joltSpec.push(joltRemove)
      //there will be one more scenario where added new fields are named same as removed input fields.
      //After adding them in removal spec, we need to add one more "modify-default-beta" spec for those same but modified fields.
      //Not possible by jolt, we can ask them to write another transformer
      var joltModified = {}
      joltModified["operation"] = "modify-default-beta"
      joltModified["spec"] = {}
      var isAnyItemAdded = false;
      outputSchema.fields.forEach(element => {
        if (ContainsButModified(inputSchema.fields, element)) {
          if (element.spec) {
            joltModified["spec"][element.name] = element.spec
            isAnyItemAdded = true
          }
        }
      });
      if(isAnyItemAdded)
      {
        joltSpec.push(joltModified)
      }
    }
    return joltSpec;
  }



  render() {
    const { inputJson, inputSchema, outputSchema, joltSpec } = this.state
    let value = JSON.stringify(joltSpec, undefined, 3);

    return (
      <Box display="flex" flexDirection="column">
        <AppBar position="fixed">
          <AppHeader />
        </AppBar>
        <Box display="flex" flexDirection="row" mt={11}>
          <Container mr={5}>
          <Row>
          <Col className="block-example border-right border-gray" md={{ span: 1, offset: 0 }}>
              <Box py={0} mt={21} borderRight="1px" borderColor="#000">
              </Box>                 
          </Col>
          <Col md={{ span: 11, offset: 0 }} className="block-example border-bottom border-gray">
              <Box py={0} pr={5} className="block-example border-bottom border-gray">
                  <Typography variant="h6">Transformer</Typography>
              </Box>
              <Row className="block-example border-bottom border-gray">
              <Col md={{ span: 4, offset: 0 }} >
                <Box mr={7}>
                  <Box height="35px" color="white.200" className="block-example border-bottom border-gray">
                    <Typography className="h7">Source Format</Typography>
                  </Box>
                  <Box height="460px" borderRadius={2}>
                    <SrcTreeComponent inputJson={inputJson} inputSchema={inputSchema} />
                  </Box>
                </Box>
              </Col>
              <Col md={{ span: 4, offset: 0 }}>
                <Box mr={8}>
                  <Box height="35px" color="white.200" className="block-example border-bottom border-gray">
                    <Typography className="h7">Output Format</Typography>
                  </Box>
                  <Box height="460px" borderRadius={2}>
                    <EditableSpecTreeComponent handleDelete={this.handleDelete} handleAdd={this.handleAdd} inputSchema={inputSchema} outputSchema={outputSchema} />
                  </Box>
                </Box>
              </Col>
              <Col md={{ span: 4, offset: 0 }}>
                <Box mr={8}>
                  <Box height="35px" color="white.200" className="block-example border-bottom border-gray">
                    <Typography className="h7">Transformer Specification</Typography>
                  </Box>
                  <Box height="460px" borderRadius={2}>
                    <React.Fragment>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="18"
                          value={value}
                          readOnly
                        />
                      </div>
                    </React.Fragment>
                  </Box>
                </Box>
              </Col>
            </Row>
           
            <Row border={2}>
              <Col md={{ span: 1, offset: 0 }}>
                <a href="http://localhost:3000/pipeline?id=1">
                <Button
                  style={{
                    borderRadius: 2,
                    backgroundColor: Colors.logoBrown,
                    padding: "4px 15px 4px 15px",
                    fontSize: "13px",
                    marginLeft: '5px',
                    marginTop: '5px'

                  }}
                  variant="contained"
                >
                  CLOSE
                </Button>
                </a>
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
export default ServiceComponent;