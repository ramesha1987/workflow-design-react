import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const nodes = [{
    value: 'Order',
    label: 'Order',
    children: [
        { value: 'Customer', label: 'Customer' },
        { value: 'ddate', label: 'date' },
        { value: 'prices', label: 'prices', children: [{ value: 10, label: 10 }, { value: 20, label: 20 }, { value: 30, label: 30 }] }
    ],
}];

class TreeSelectView extends React.Component {
    state = {
        checked: [],
        expanded: [],
    };

    render() {
        return (
            <CheckboxTree
                nodes={nodes}
                checked={this.state.checked}
                expanded={this.state.expanded}
                onCheck={checked => this.setState({ checked })}
                onExpand={expanded => this.setState({ expanded })}
                iconsClass="fa5"
            />
        );
    }
}
export default TreeSelectView;