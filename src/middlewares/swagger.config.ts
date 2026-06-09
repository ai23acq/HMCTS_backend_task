import { BACKEND_URL } from "../secret";

const swaggerDefinition = {
    openapi: "3.0.3",
    info: {
        title: "HMCTS Backend Services",
        version: "1.0.0",
        description: "HMCTS Tssk Backend Service API",
        contatct: {
            name: "Adetola Iwaloye",
            email: "support@backend.com"
        }
    },
    server: [
        {
            url: `${BACKEND_URL}/api`,
            description: "Development Task server"
        },
    ],
}

const options = {
    swaggerDefinition,
    apis: ['./src/docs/*.yaml'],
}

export default options