import React, { useState, useEffect, useCallback, useRef } from 'react';
import {Container,  Row, Col } from 'react-bootstrap';
import { Box, AppBar, Typography } from '@material-ui/core';

import { Colors } from './../../../themes/constants/Colors';
import Button from '@material-ui/core/Button';


import ReactFlow, {
  ReactFlowProvider,
  isEdge,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
} from 'react-flow-renderer';


import ServiceNode from './ServiceNode';
import ServiceToolBar from './ServiceToolBar';
import CollectorEdit from './CollectorEdit';
import CuratorEdit from './CuratorEdit';
import TransformerEdit from './TransformerEdit';
import PublisherEdit from './PublisherEdit';

import ServiceEditWrap from './ServiceEditWrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' 
import { ServiceStore } from '../../../themes/constants/ServiceStore';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Poppins', 'sans-serif'
    ].join(','),
    body1: {
      fontWeight: 200,
      fontSize: '.8rem',
      lineHeight: 1
    },
    body2: {
      fontWeight: 200,
      fontSize: '.8rem',
      lineHeight: 1
    },
    h5: {
      fontWeight: 600 
    },
    h6: {
      fontWeight: 400, 
      fontSize: '1.2rem'

    },
    body1: {
      fontWeight: 200 // or 'bold'
    },
    ".h7":{
      fontWeight: 600
    },
    MuiTreeItem: {
      fontWeight: 'regular'
    },
    MuiBox: {
      fontWeight: 'regular'
    },
    MuiInputBase: {
      fontWeight: 'regular'
    },
    MuiInputLabel: {
      fontWeight: 'regular'
    },
  },
  MuiBox: {
    root: {
      padding: '0px',
      margin: '0px'
    },
    MuiAppBar: {
      root: {
        backgroundColor: '#fff'
      }
    }
  }, 
});

const initBgColor = '#eee';

const connectionLineStyle = { stroke: '#000' };
const snapGrid = [20, 20];
const nodeTypes = {
  selectorNode: ServiceNode,
};





const CreateFlow = (props) => {
  const reactFlowWrapper = useRef(null);
  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [bgColor, setBgColor] = useState(initBgColor);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [highlighted, setHighlighted] = useState(null);
  const template = props.template;

  const initialElements = props.elements;

  const onChange = (label) => {
    console.log("Drag Over")
    setHighlighted(label);
  };

  useEffect(() => {
    const onChange = (label) => {
      console.log("highlighted"+label)
      setHighlighted(label);
      //setBgColor('#000')
    };
    var elements = [];
    if(template)
    {
      elements = initialElements.map((item) => {
        const updatedData = {
          ...item.data,
          onChange : onChange
        };
        const updatedItem = {
          ...item,
          data: updatedData,
        }; 
        return updatedItem;
      });
    }
    
    setElements(elements);
  }, []);

  const [elements, setElements] = useState(initialElements);


 
  useEffect(() => {
    if (reactflowInstance && elements.length > 0) {
      reactflowInstance.fitView();
    }
  }, [reactflowInstance, elements.length]);

  const onElementsRemove = useCallback(
    (elementsToRemove) =>
      setElements((els) => removeElements(elementsToRemove, els)),
    []
  );
 
  const onConnect = (params) => {
    console.log(params)
    console.log(params)
    console.log("OnConnect")
    setElements((els) => addEdge({ ...params, id: 'e2b-'+params.source+'-'+params.target, animated: true, style: { stroke: Colors.colorConnection } }, els));
  }
  /*
  const onConnect = useCallback(

    (params) =>
    setElements((els) =>
    {
      console.log(params)
      console.log(els)
      addEdge({ ...params, id: 'e2b-'+params.source+'-'+params.target, animated: true, style: { stroke: Colors.colorConnection } }, els)
    }
    ),
  []  
  );
 */

  const onLoad = useCallback(
    (rfi) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
        console.log('flow loaded:', rfi);
      }
    },
    [reactflowInstance]
  );


  const submit = () => {
    var specs = []
    console.log(elements)
    elements.map(el => {
        if(el && el.data && el.data.label){
          var spec = ServiceStore[el.data.label]
          if(spec)
          {
            spec.serviceType = el.data.label
            specs.push(spec)
          }
        }       
    })
    let value = JSON.stringify(specs
      , undefined, 3);
      
      const options = {
      title: 'Title',
      message: 'Message',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ],
      childrenElement: () => <div />,
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <Typography varient="h6">Do you want to save?</Typography>
            <textarea
                            className="form-control json-text-view"
                            id="exampleFormControlTextarea1"
                            value={value}
                            readOnly
                            style={{ width: '640px', height: '450px', overflowY: 'scroll'}}
            />
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
                  onClick={onClose}
                >
                  Yes
                </Button>
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
                  onClick={onClose}
                >
                  No
                </Button>
            
          </div>
        )
      },
      willUnmount: () => {}
    }
  
    confirmAlert(options)
  }


  const onDragOver = (event) => {
    console.log("Drag Over")

    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    console.log("Drag Dropped")


    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const item = event.dataTransfer.getData('application/reactflow');
    console.log(item)
    console.log(elements.length)
    
    const position = reactflowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });   
    
    const el = {
      id: "-"+elements.length +1,
      type: 'selectorNode', 
      data: { label: item, onChange : onChange, color: initBgColor, colorService: Colors.colorService[item] },
      position: position,
      targetPosition: 'left',
    }


    setElements((es) => es.concat(el));
  };




  return (
    <Container >
        <ThemeProvider theme={theme}>

         <Col md={{ span: 12, offset: 0 }}>
            <ReactFlowProvider>     

            <Row>

            <Col className="block-example border-right border-gray" style={{ padding: '0px 0px 0px -5px', marginLeft:-7}} md={{ span: 1, offset: 0 }}>
            <Typography variant="body1" style={{ padding: '0px 0px 0px -5px', marginLeft:-12}}>ToolBox </Typography>
            <ServiceToolBar/>
           

            </Col>
            <Col className="block-example border-right border-gray" md={{ span: 9, offset: 0 }}>
            <Box py={0} pr={5} className="block-example border-bottom border-gray">
                  <Box flexShrink={0} display="flex" flexDirection="row" style={ {marginTop: 0, padding: 0}}>
                    <Box p={1} component="span" style={ {marginTop: 0, padding: 0}}>
                    <Typography className="h7">Create Workflow</Typography>
                    </Box>
                    <Box py={1} pr={5} style={ {marginLeft:5, marginTop: 0, padding: 0}}>
                    <Typography varient="body2">: Oracle Pvt Ltd</Typography>
                    </Box>
                    </Box>                  

              </Box>
            <Box  borderRight="1px" borderColor="#000" style={{ width: '630px', height: '455px' }} className="reactflow-wrapper" ref={reactFlowWrapper}>
              <ReactFlow
      elements={elements}
      onConnect={onConnect}
      style={{ background: bgColor }}
      onLoad={onLoad}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      snapGrid={snapGrid}
      defaultZoom={1.0}
      onElementsRemove={onElementsRemove}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
             
             <MiniMap
        style={{ background: '#aaa' }}
        nodeStrokeColor={(n) => {
          if (n.type === 'input') return '#0041d0';
          if (n.type === 'selectorNode') return bgColor;
          if (n.type === 'output') return '#ff0072';
        }}
        nodeColor={(n) => {
          if (n.type === 'selectorNode') return bgColor;
          return '#fff';
        }}
      />
      <Controls />
    </ReactFlow>
              </Box>      
            </Col>
            <Col md={{ span: 2, offset: 0 }} style={{ padding: '0px' }}>
            <Box  style={{ width: '250px', height: '455px', padding: '2px' }} >
            {
                (highlighted && highlighted  === "Collector") && <CollectorEdit highlighted={highlighted} />
            }
            {
                (highlighted && highlighted  === "Curator") && <CuratorEdit highlighted={highlighted}/>
            }
            {
                (highlighted && highlighted  === "Transformer") && <TransformerEdit highlighted={highlighted}/>
            }
            {
                (highlighted && highlighted  === "Publisher") && <PublisherEdit highlighted={highlighted}/>
            }
            {
                (highlighted && highlighted  === "Mapper") && <TransformerEdit highlighted={highlighted}/>
            }

            </Box>
            </Col> 
            </Row> 
            <Col md={{ span: 1, offset: 1 }}>
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
                  onClick={submit}
                >
                  SAVE
                </Button>
              </Col>         
            </ReactFlowProvider>   
            </Col> 
</ThemeProvider>
    </Container>




  );
};

export default CreateFlow;