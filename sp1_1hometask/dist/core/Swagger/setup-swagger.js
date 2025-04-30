"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Video API',
            version: '1.0.0',
            description: 'API for managing videos',
        },
        servers: [
            {
                url: 'http://sp1-1hometask-y2o3.vercel.app',
                description: 'Local server',
            },
        ],
        components: {
            schemas: {
                Video: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        title: { type: 'string' },
                        author: { type: 'string' },
                        availableResolutions: {
                            type: 'array',
                            items: {
                                type: 'string',
                                enum: ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']
                            }
                        },
                        canBeDownloaded: { type: 'boolean', default: false },
                        minAgeRestriction: { type: 'number', nullable: true, minimum: 1, maximum: 18 },
                        createdAt: { type: 'string', format: 'date-time' },
                        publicationDate: { type: 'string', format: 'date-time' }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        errorsMessages: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string' },
                                    field: { type: 'string' }
                                }
                            }
                        }
                    },
                    example: {
                        errorsMessages: [
                            { message: 'Video not found', field: 'id' }
                        ]
                    }
                }
            }
        }
    },
    apis: ['./src/videos/routers/*.ts', './src/testing/*.ts'], // Укажите пути к вашим роутам
};
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
const setupSwagger = (app) => {
    app.use('/api', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, { customCssUrl: CSS_URL }));
};
exports.setupSwagger = setupSwagger;
