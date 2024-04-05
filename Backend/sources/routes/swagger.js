import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "Documentation for plantNet, Mistral and GBIF APIs",
        },
    },
    apis: ["./PlantNetRouter.js", "./gbifRouter.js", "./MistralRouter.js"],
};

const specs = swaggerJsdoc(options);

export default specs;