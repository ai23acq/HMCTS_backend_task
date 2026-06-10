# HMCTS_backend_task
This is a backend task - a requirement for the application of the role of a Software Developer at HMCTS

I have also done the frontend task which is also in my repo called the HMCTS_frontend_task. This backend
task serves as a local server to the HMCTS_frontend_task

An env file is needed and an example of what is required in the env can be found in the example.env file.
Please note that the databse used for this project is postgreSQL

The typeORM used is Prisma. To be able to access the prisma file, there is a need to run "npx prisma genearte", then run 
"npx prisma migrate dev --name "the name you wish to call it"

To start this project, there is need to run npm install, to install the node_modules and the package-lock.json. Once those file and folder are in place, then run "npm start"

Once this local server is running, the HMCTS_frontend_task will be able to access the endpoints in this local server
Note also, that API documentation was done with swagger, and to access it, run "https-you-own-localhost-port/docs"
That is if your port is 8000, then it will be http://localhost:8000/docs. As it is written in the example.env file, your env file must have your BACKEND_URL: "https://localhost:8000". The 8000 is not a fixed port, it is just an example. You can decide to write any four digit for your own PORT

This project is sectioned into repositories, services and controllers. This task is written with the intention of a Microservices.