import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { FormGroup, FormControl, InputLabel, Input, Select, Box, AppBar, Toolbar, Typography } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import { Row, Col } from 'react-bootstrap';



class FieldSelectionComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fileds: {}
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
        return (
            <React.Fragment>
                <FormGroup>
                    <FormControl>
                        <InputLabel id="nameField">Field Name</InputLabel>
                        <Input name="name" id="my-input" aria-describedby="your field name here"
                            onChange={this.handleChange} />
                    </FormControl>
                    <FormControl>
                        <InputLabel id="selectFieldType">Select Output Field Type</InputLabel>
                        <Select labelId="selectFieldType" id="selectFieldType" name="type" onChange={this.handleChange}>
                            <MenuItem value={'boolean'}>boolean</MenuItem>
                            <MenuItem value={'int'}>int</MenuItem>
                            <MenuItem value={'long'}>long</MenuItem>
                            <MenuItem value={'float'}>float</MenuItem>
                            <MenuItem value={'double'}>double</MenuItem>
                            <MenuItem value={'bytes'}>bytes</MenuItem>
                            <MenuItem value={'string'}>string</MenuItem>
                            <MenuItem value={'array'}>array</MenuItem>
                            <MenuItem value={'map'}>map</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="selectFunction">Select Transform function</InputLabel>
                        <Select labelId="selectFunction" id="selectFunction" name="function" onChange={this.handleChange}>
                            <MenuItem value="same">same</MenuItem>
                            <MenuItem value="=size">size</MenuItem>
                            <MenuItem value="=firstElement">firstElement</MenuItem>
                            <MenuItem value="=lastElement">lastElement</MenuItem>
                            <MenuItem value="=sort">sort</MenuItem>
                            <MenuItem value="=intSum">intSum</MenuItem>
                            <MenuItem value="=avg">avg</MenuItem>
                            <MenuItem value="=toUpper">toUpper</MenuItem>
                            <MenuItem value="=toLower">toLower</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="selectSrcField">Select Src Field</InputLabel>
                        <Select labelId="selectSrcField" id="selectSrcField" name="srcField" onChange={this.handleChange}>
                            {
                                this.props.input.fields.map((field, index) => (
                                    <MenuItem key={field.name} value={field.name}>{field.name}
                    &nbsp;&nbsp;
                                        {
                                            (field.type !== Object(field.type)) && '(' + field.type + ')'
                                        }
                                        {
                                            (field.type === Object(field.type)) && '(' + field.type.type + ')'
                                        }
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <Row border={2}>
                        <Col md={{ span: 1, offset: 0 }}>
                            <AddIcon onClick={() => this.props.handleAdd(this.state.fileds)} />
                        </Col>
                        <Col md={{ span: 10, offset: 0 }}>
                            <Typography> (*Click '+' to add)</Typography>
                        </Col>
                    </Row>
                </FormGroup>

            </React.Fragment>

        )
    }
}

export default FieldSelectionComponent