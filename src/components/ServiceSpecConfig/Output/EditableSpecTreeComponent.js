import React, { Component } from 'react';
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import DeleteIcon from '@material-ui/icons/Delete';

import FieldSelectionComponent from './FieldSelectionComponent';



var newFieldDefault = { name: undefined, tyep: undefined, function: undefined, sourceFields: [], isSet: false }


class EditableSpecTreeComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputSchema: props.inputSchema,
      outputSchema: props.outputSchema,
      newField: newFieldDefault,
      extraFields: [],
      spec: {}
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

  }


  render() {
    const { inputSchema, outputSchema, spec } = this.state;
    return (
      <React.Fragment>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          expanded={["1"]}
        >
          <TreeItem nodeId="1" label="Order">
            {
              outputSchema.fields.map((field) => (
                <TreeItem key={field.name} nodeId={field.name} label={
                  <React.Fragment>
                    <DeleteIcon value={field.name} onClick={() => this.props.handleDelete(field.name)} />
                    {field.name}&nbsp;&nbsp;
            {
                      (field.type !== Object(field.type)) && '(' + field.type + ')'
                    }
                    {
                      (field.type === Object(field.type)) && '(' + field.type.type + ')'
                    }
            &nbsp;&nbsp;
            {
                      (spec[field.name]) && '"' + spec[field.name] + '"'
                    }
                  </React.Fragment>
                } />
              ))
            }


            <TreeItem nodeId='-1' label={
              <FieldSelectionComponent input={inputSchema} handleAdd={this.props.handleAdd} />
            } />

          </TreeItem>
        </TreeView>
      </React.Fragment>
    )
  }
}

export default EditableSpecTreeComponent