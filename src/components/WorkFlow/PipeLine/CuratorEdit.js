import React, { Component } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Select, Box, AppBar, Toolbar, Typography } from '@material-ui/core';

import { Row, Col } from 'react-bootstrap';
import { Colors } from '../../../themes/constants/Colors';
import { ServiceStore } from '../../../themes/constants/ServiceStore';
import Button from '@material-ui/core/Button';
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";


var order = { id: '2323232', name: 'Order by Customer', itemPrices: [10, 20, 50, 2, 100], addressLine1: 'Door 1, street 90, Town xx', addressLine2: 'City y, Country z', payment: 'SUCCUSS' };

class CuratorEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputSchema: ServiceStore[props.highlighted]["inputs"][0]["schema"],
            outputSchema:  ServiceStore[props.highlighted]["outputs"][0]["schema"],
            spec: ServiceStore[props.highlighted]["spec"],
            label: props.highlighted
        }
        this.classes = {
            root: {
                height: 216,
                flexGrow: 1,
                maxWidth: 400
            },
            inputInput: {
                padding: "4px 8px"
            }
        };
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(event) {
        var { fileds } = this.state;
        if (event.target.name && event.target.value) {
            fileds[event.target.name] = event.target.value;
            this.setState({
                fileds: fileds
            });
        }
    }


    render() {
        if((this.state.label))
        {
            console.log(this.state.inputSchema);
            console.log(this.state.outputSchema);

            let value = JSON.stringify(this.state.spec
              , undefined, 3);

              let output = JSON.stringify(order
                , undefined, 3);

        return (
            <React.Fragment>
                <FormGroup>                    
                    <Typography className="h7">{this.state.label}</Typography>                  
                    <Typography className="h6">Input</Typography>
                    <div className="form-group">
                        <textarea
                            className="form-control json-text-view"
                            id="exampleFormControlTextarea1"
                            rows="7"
                            value={output}
                            readOnly
                            style={{ width: '240px', height: "190px"}}
                        />
                    </div>
                    <Typography className="h6">Output</Typography>
                    <div className="form-group">
                        <textarea
                            className="form-control json-text-view"
                            id="exampleFormControlTextarea1"
                            rows="7"
                            value={output}
                            readOnly
                            style={{ width: '240px', height: "177px"}}
                        />
                    </div>
                    <a>
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
                  EDIT SPEC
                </Button>
                </a>
         
                
                </FormGroup>

            </React.Fragment>
               )
                }
        else{
            return ( <React.Fragment/>)
        }
    }
}

export default CuratorEdit