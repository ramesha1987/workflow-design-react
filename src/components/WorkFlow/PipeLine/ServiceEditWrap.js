import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { FormGroup, FormControl, InputLabel, Input, Select, Box, AppBar, Toolbar, Typography } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import { Row, Col } from 'react-bootstrap';
import { Colors } from '../../../themes/constants/Colors';
import { ServiceStore } from '../../../themes/constants/ServiceStore';
import Button from '@material-ui/core/Button';
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import CollectorEdit from './CollectorEdit';
import CuratorEdit from './CuratorEdit';
import TransformerEdit from './TransformerEdit';




class ServiceEditWrap extends Component {
    constructor(props) {
        super(props)
        this.state = {           
            highlighted: props.highlighted
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
                {
                    (this.state.highlighted && this.state.highlighted  === "Collector") && <CollectorEdit highlighted={this.state.highlighted} />
                }
                {
                    (this.state.highlighted && this.state.highlighted  === "Curator") && <CuratorEdit highlighted={this.state.highlighted}/>
                }
                {
                    (this.state.highlighted && this.state.highlighted  === "Transformer") && <TransformerEdit highlighted={this.state.highlighted}/>
                }
                {
                    (this.state.highlighted && this.state.highlighted  === "Mapper") && <CollectorEdit highlighted={this.state.highlighted}/>
                }
                {
                    (this.state.highlighted && this.state.highlighted  === "Publisher") && <CollectorEdit highlighted={this.state.highlighted}/>
                }
            </React.Fragment>
               )
                }
        else{
            return ( <React.Fragment/>)
        }
    }
}

export default ServiceEditWrap