import React, { Component } from 'react';
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { Typography, Box } from '@material-ui/core';
import { Colors } from './../../../themes/constants/Colors';



var newFieldDefault = { name: undefined, function: undefined, sourceFields: [], isSet: false }

class SrcTreeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            schema: props.inputSchema,
            inputJson: props.inputJson,
            newField: newFieldDefault,
            extraFields: []
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
        this.handleDelete = this.handleDelete.bind(this)
        this.handleAdd = this.handleAdd.bind(this)

    }

    handleDelete(name) {
        console.log(this.state.schema)
        var { schema } = this.state;
        schema.fields = this.state.schema.fields.filter(el => el.name != name);
        this.setState({
            schema: schema
        });
    }

    handleAdd() {
        console.log(this.state.newField.name)
    }


    render() {
        const { schema, inputJson } = this.state;
        let value = JSON.stringify(inputJson, undefined, 3);

        return (
            <React.Fragment>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    expanded={["1"]}
                >
                    <TreeItem nodeId="1" label="Order">
                        {
                            schema.fields.map((field) => {
                                console.log(field.type);
                                return <TreeItem key={field.name} nodeId={field.name} label={
                                    <React.Fragment>
                                        {field.name}&nbsp;&nbsp;
            {
                                            (field.type !== Object(field.type)) && '(' + field.type + ')'
                                        }
                                        {
                                            (field.type === Object(field.type)) && '(' + field.type.type + ')'
                                        }
                                    </React.Fragment>
                                } />
                            }
                            )

                        }


                    </TreeItem>
                </TreeView>
                <React.Fragment>
                <Box style={{                   
                    marginTop: '15px'
                  }}>
                  <Box  className="block-example border-bottom border-gray" >
                  <Typography className="h7">Input Sample JSON</Typography>
                  </Box>
                    <div className="form-group json-text-view" >
                        <textarea
                            className="form-control json-text-view"
                            id="exampleFormControlTextarea1"
                            rows="8"
                            value={value}
                            readOnly
                            style={{                   
                                marginTop: '15px'
                            }}
                        />
                    </div>
                    </Box>
                </React.Fragment>
                
            </React.Fragment>
        )
    }
}

export default SrcTreeComponent