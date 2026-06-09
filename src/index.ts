import express, {Express, Request, Response} from "express"
import bodyParser from "body-parser"
import cors from "cors"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import options from "./middlewares/swagger.config"
import { PORT } from "./secret"
import tasksRoutes from "./routes/task_routes"
import { errorMiddleware } from "./middlewares/errors"

const app:Express = express()

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(cors())
app.use(bodyParser.json())

app.get("/", (req: Request, res: Response) => {
  res.send("User connection is Working...");
});

app.use("/api/tasks", tasksRoutes)

app.use(errorMiddleware)
  
app
  .listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
  })
  .on("error", (err) => {
    console.log(err);
    process.exit();
  });