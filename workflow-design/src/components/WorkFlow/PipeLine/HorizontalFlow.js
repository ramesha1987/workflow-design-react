import React, { useState } from 'react';

import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import Container from 'react-bootstrap/Container';
import ServiceToolBar from './ServiceToolBar';



const onLoad = (reactFlowInstance) => reactFlowInstance.fitView();

const onNodeMouseEnter = (event, node) => console.log('mouse enter:', node);
const onNodeMouseMove = (event, node) => console.log('mouse move:', node);
const onNodeMouseLeave = (event, node) => console.log('mouse leave:', node);
const onNodeContextMenu = (event, node) => {
  event.preventDefault();
  console.log('context menu:', node);
};

const initialElements = [
  {
    id: 'Collector',
    sourcePosition: 'right',
    type: 'input',
    className: 'dark-node',
    data: { label: 'Collector' },
    position: { x: 0, y: 80 },
  },
  {
    id: 'Curator-1',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: { label: 'Curator 1' },
    position: { x: 200, y: 0 },
  },
  {
    id: 'Curator-2',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: { label: 'Curator 2' },
    position: { x: 200, y: 160 },
  },
  {
    id: 'Transformer-1',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: { label: 'Transformer 1' },
    position: { x: 400, y: 0 },
  },
  {
    id: 'Transformer-2',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: { label: 'Transformer 2' },
    position: { x: 400, y: 160 },
  },
  {
    id: 'Mapper',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: { label: 'Mapper' },
    position: { x: 600, y: 80 },
  },
  {
    id: 'Output',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: { label: 'Output' },
    position: { x: 800, y: 80 },
  },
];

const HorizontalFlow = () => {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const changeClassName = () => {
    setElements((elms) =>
      elms.map((el) => {
        if (el.type === 'input') {
          el.className = el.className ? '' : 'dark-node';
        }

        return { ...el };
      })
    );
  };

  return (
    <Container style={{ width: '800px', height: '455px' }}>
    <ReactFlow
      elements={elements}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onLoad={onLoad}
      selectNodesOnDrag={false}
      onNodeMouseEnter={onNodeMouseEnter}
      onNodeMouseMove={onNodeMouseMove}
      onNodeMouseLeave={onNodeMouseLeave}
      onNodeContextMenu={onNodeContextMenu}
    >

    </ReactFlow>
    </Container>
  );
};

export default HorizontalFlow;