export const ServiceStore = {   
    Collector: {
        "ConnectionType":'REST',
        "ConnectionTypes":['REST', 'HTTP', 'FTP'],
        "AuthType":'Oauth',
        "AuthTypes":['Oauth', 'Basic'],
        "UserName":"Syscron",
        "Password":"Syscron@123",
        "BaseUrl":"http://oracle.com/rest/api",
        "inputSchema":{},
        "outputSchema":{
            name: 'Order',
            type: 'record',
            fields: [
              { name: 'id', type: 'string' },
              { name: 'name', type: 'string' },
              { name: 'itemPrices', type: { "type": "array", "items": "double" } },
              { name: 'addressLine1', type: 'string' },
              { name: 'addressLine2', type: 'string' },
              { name: 'payment', type: 'string' }
            ]
          },
          "spec":[]
    },
    Curator: {        
        "inputs":[{
            SourceType:"Collector",
            schema: {
            name: 'Order',
            type: 'record',
            fields: [
              { name: 'id', type: 'string' },
              { name: 'name', type: 'string' },
              { name: 'itemPrices', type: { "type": "array", "items": "double" } },
              { name: 'addressLine1', type: 'string' },
              { name: 'addressLine2', type: 'string' },
              { name: 'payment', type: 'string' }
            ]
          }}],
          "outputs":[{
            SourceType:"Collector",
            schema: {
            name: 'Order',
            type: 'record',
            fields: [
              { name: 'id', type: 'string' },
              { name: 'name', type: 'string' },
              { name: 'itemPrices', type: { "type": "array", "items": "double" } },
              { name: 'addressLine1', type: 'string' },
              { name: 'addressLine2', type: 'string' },
              { name: 'payment', type: 'string' }
            ]
          }}],
          "spec":[{"and" : [
            { ">" : [3,1] },
            { "<" : [1,3] }
          ] }]
    },
    Transformer: {        
        "inputs":[{
            SourceType:"Collector",
            schema: {
            name: 'Order',
            type: 'record',
            fields: [
              { name: 'id', type: 'string' },
              { name: 'name', type: 'string' },
              { name: 'itemPrices', type: { "type": "array", "items": "double" } },
              { name: 'addressLine1', type: 'string' },
              { name: 'addressLine2', type: 'string' },
              { name: 'payment', type: 'string' }
            ]
          }}],
          "outputs":[{
            SourceType:"Collector",
            schema: {
            name: 'Order',
            type: 'record',
            fields: [
              { name: 'id', type: 'string' },
              { name: 'name', type: 'string' },
              { name: 'itemPrices', type: { "type": "array", "items": "double" } },
              { name: 'addressLine1', type: 'string' },
              { name: 'addressLine2', type: 'string' },
              { name: 'payment', type: 'string' }
            ]
          }}],
          "spec": [
            {
              "operation": "modify-default-beta",
              "spec": {
                "average": "=avg(@(1,itemPrices))",
                "sortedPrices": "=sort(@(1,itemPrices))",
                "nameUpperCase": "=toUpper(@(1,name))"
              }
             },
            {
              "operation": "remove",
              "spec": {
                "id": "",
                "name": "",
                "itemPrices": "",
                "payment": ""
              }
             }
          ]
          
    },
    Mapper: {        
        "inputs":[{
            SourceType:"Collector",
            schema: {
            name: 'Order',
            type: 'record',
            fields: [
              { name: 'id', type: 'string' },
              { name: 'name', type: 'string' },
              { name: 'itemPrices', type: { "type": "array", "items": "double" } },
              { name: 'addressLine1', type: 'string' },
              { name: 'addressLine2', type: 'string' },
              { name: 'payment', type: 'string' }
            ]
          }}],
          "outputs":[{
            SourceType:"Collector",
            schema: {
            name: 'Order',
            type: 'record',
            fields: [
              { name: 'id', type: 'string' },
              { name: 'name', type: 'string' },
              { name: 'itemPrices', type: { "type": "array", "items": "double" } },
              { name: 'addressLine1', type: 'string' },
              { name: 'addressLine2', type: 'string' },
              { name: 'payment', type: 'string' }
            ]
          }}],
          "spec":[{
            "config": {
              "primary": {
                "resource": "BOM",
                "prerequisites": [
                  {
                    "resource": "Item"
                  },
                  {
                    "resource": "BOM"
                  }
                ]
              },
              "Item": {
                "resource": "Item",
                "prerequisites": [
                  
                ],
                "config": {
                  "to": "BOM",
                  "from": "Item",
                  "let": {
                    "stockComponentLines:warehouse": "warehouseDetails:warehouse"
                  },
                  "indexExpr": null,
                  "dataExpr": null,
                  "filters": null,
                  "join": {
                    "type": "inner",
                    "conditions": [
                      [
                        {
                          "depth": "inventoryId",
                          "key": "inventoryId",
                          "resource": "Item"
                        },
                        {
                          "depth": "stockComponentLines:componentID",
                          "key": "componentID",
                          "resource": "BOM"
                        }
                      ]
                    ]
                  },
                  "unWind": null,
                  "schema": {
                    "stockComponentLines:warehouse": {
                      "dataType": "string",
                      "elementType": 1,
                      "key": "warehouse"
                    }
                  }
                }
              },
              "BOM": {
                "resource": "BOM",
                "prerequisites": [
                  
                ],
                "config": {
                  "to": "BOM",
                  "from": "BOM",
                  "let": {
                    "maxRevision": "revision"
                  },
                  "inputExpr": [
                    {
                      "operation": [
                        {
                          "revision": [
                            "max"
                          ]
                        }
                      ]
                    }
                  ],
                  "outputExpr": [
                    {
                      "filters": [
                        {
                          "and": [
                            {
                              "revision": [
                                "eq",
                                {
                                  "var": "maxRevision"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "join": {
                    "type": "left",
                    "conditions": [
                      [
                        {
                          "depth": "kitInventoryID",
                          "key": "kitInventoryID",
                          "resource": "BOM"
                        }
                      ]
                    ]
                  },
                  "filters": [
                    
                  ],
                  "unWind": [
                    
                  ],
                  "schema": {
                    "maxRevision": {
                      "dataType": "string",
                      "elementType": null,
                      "key": "maxRevision"
                    }
                  }
                }
              }
            }
          }]
    },
    Publisher: {        
        "ConnectionType":'REST',
        "ConnectionTypes":['REST', 'HTTP', 'FTP'],
        "AuthType":'Oauth',
        "AuthTypes":['Oauth', 'Basic'],
        "UserName":"Syscron",
        "Password":"Oracle@123",
        "BaseUrl":"http://syncron.com/rest/api",
        "inputSchema":{},
        "outputSchema":{
            name: 'Order',
            type: 'record',
            fields: [
              { name: 'id', type: 'string' },
              { name: 'name', type: 'string' },
              { name: 'itemPrices', type: { "type": "array", "items": "double" } },
              { name: 'addressLine1', type: 'string' },
              { name: 'addressLine2', type: 'string' },
              { name: 'payment', type: 'string' }
            ]
          },
          "spec":[]
    }
};