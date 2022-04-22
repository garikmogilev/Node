let openapi = {
    openapi: '3.0.1',
    info: {
        description: 'Phone guide',
        version: '1.0.0',
        title: 'Phone guide',
        contact: {
            email: 'garikmogilev@gmail.com'
        },
        license: {
            name: 'Apache 2.0',
            url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },
    servers: [
        {
            url: "http://localhost:3000",
            variables: { port: { default: 3000}}
        }
    ],
    paths: {
        '/ts': {
            get: {
                tags: ['CRUD'],
                description: 'Get guide phones',
                operationId: 'method: GET, URI: /TS',
                responses: {
                    '200': {
                        description: 'Guide list',
                        content: {
                            'application/json': {
                                schema: { type: 'object'},
                                example:
                                    {
                                        "id": "1"
                                    }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['CRUD'],
                description: 'Add new field to guide',
                operationId: 'method: POST, URI: /TS',
                requestBody: {
                    content: {
                        'application/json': {
                            name: 'Dictionary line',
                            schema: { type: 'object'},
                            required: true,
                            description: 'Post data for dictionary',
                            example:
                                {
                                    "name": "user",
                                    "phone": "+375291234567"
                                }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: { type: 'object'},
                                example: {
                                    message: 'Add new field'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Error parameters',
                        content: {
                            'application/json': {
                                schema: { type: 'object'},
                                example: {
                                    message: 'One or more of parameters are missing'
                                }
                            }
                        }
                    }
                }
            },
            put: {
                tags: ['CRUD'],
                description: 'method: PUT, URI: /TS',
                operationId: 'put',
                requestBody: {
                    content: {
                        'application/json': {
                            name: 'Dictionary line',
                            schema: { type: 'object'},
                            required: true,
                            description: 'Update field of guide',
                            example:
                                {
                                    "id": "1",
                                    "name": "user1",
                                    "phone": "+375291234567",
                                }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: { type: 'object'},
                                example: {
                                    message: 'Updated field'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Error parameters',
                        content: {
                            'application/json': {
                                schema: { type: 'object'},
                                example: {
                                    message: 'One or more of parameters are missing'
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ['CRUD'],
                description: 'method: DELETE, URI: /TS',
                operationId: 'del',
                parameters: [
                    {
                        name: 'number',
                        in: 'query',
                        required: true,
                        example:
                            {
                                "id": "1"
                            },
                        description: 'Number in dictionary for delete'
                    }
                ],
                responses: {
                    '200': {
                        description: 'OK message for delete',
                        content: {
                            'application/json': {
                                schema: { type: 'object'},
                                example: {
                                    message: 'Line is deleted'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Error parameters',
                        content: {
                            'application/json': {
                                schema: { type: 'object'},
                                example: {
                                    message: 'One or more of parameters are missing'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};


module.exports = openapi;
