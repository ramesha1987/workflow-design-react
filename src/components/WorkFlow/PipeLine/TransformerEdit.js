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



class TransformerEdit extends Component {
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
            console.log("input")
            console.log(this.state.inputSchema);
            console.log("output")

            console.log(this.state.outputSchema);
            console.log("spec")

            console.log(this.state.spec);

            let value = JSON.stringify(this.state.spec
              , undefined, 3);

        return (
            <React.Fragment>
                <FormGroup>                    
                    <Typography className="h7">{this.state.label}</Typography>                  
                    <Typography className="h6">Spec</Typography>
                    <div className="form-group">
                        <textarea
                            className="form-control json-text-view"
                            id="exampleFormControlTextarea1"
                            rows="15"
                            value={value}
                            readOnly
                            style={{ width: '240px', height:"410px"}}
                        />
                    </div>
                    {
                        (this.state.label === "Transformer") && <a href="/service">
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
                    }
                    {
                        (this.state.label === "Mapper") && <a>
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
                    }
                    
                   
         
                
                </FormGroup>

            </React.Fragment>
               )
                }
        else{
            return ( <React.Fragment/>)
        }
    }
}

export default TransformerEdit