import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { FormGroup, FormControl, InputLabel, Input, Select, Box, AppBar, Toolbar, Typography } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import { Row, Col } from 'react-bootstrap';
import { Colors } from '../../../themes/constants/Colors';
import { ServiceStore } from '../../../themes/constants/ServiceStore';
import Button from '@material-ui/core/Button';




class CollectorEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fileds: {},
            serviceData: props.highlighted,
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
        if((this.state.serviceData))
        {
            let value = JSON.stringify([{
                "operation": "default",
                "spec": {}
              }]
              , undefined, 3);

        return (
            <React.Fragment>
                <FormGroup>                    
                    <Typography variant="h6">Collector</Typography>
 
                    <FormControl>
                        <InputLabel id="selectFieldType">ConnectionType</InputLabel>
                        <Select labelId="selectFieldType" value= "REST" id="selectFieldType" name="type" onChange={this.handleChange}>
                            <MenuItem value={'REST'}>REST</MenuItem>
                            <MenuItem value={'HTTP'}>HTTP</MenuItem>
                            <MenuItem value={'FTP'}>FTP</MenuItem>                           
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="selectFunction">Auth Type</InputLabel>
                        <Select labelId="selectFunction" value= "Oauth" id="selectFunction" name="function" onChange={this.handleChange}>
                            <MenuItem value="Oauth">Oauth</MenuItem>
                            <MenuItem value="Basic">Basic</MenuItem>                           
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="nameField">User name</InputLabel>
                        <Input name="name" id="my-input" value="Syncron123" aria-describedby="your field name here"
                            onChange={this.handleChange} />
                    </FormControl>
                    <FormControl>
                        <InputLabel id="nameField">Password</InputLabel>
                        <Input name="name" id="my-input" value="dsa$dsads" aria-describedby="your field name here"
                            onChange={this.handleChange} />
                    </FormControl>
                    <FormControl>
                        <InputLabel id="nameField">Basic url</InputLabel>
                        <Input name="name" id="my-input" value="http://oracle.com/rest/api" aria-describedby="your field name here"
                            onChange={this.handleChange} />
                    </FormControl>
                   
                </FormGroup>

            </React.Fragment>
               )
                }
        else{
            return ( <React.Fragment/>)
        }
    }
}

export default CollectorEdit