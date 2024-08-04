import express from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// ROUTE IMPORTS
import dashboardRoutes from "./routes/dashboardRoutes"
import productRoutes from "./routes/productRoutes"
import usersRoute from "./routes/userRoutes"
import ExpensesRoute from "./routes/expenseRoutes"

// CONFIGURATION
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())


// ROUTES
app.use(dashboardRoutes) // $/dashboard
app.use(productRoutes) // $/products
app.use(usersRoute) // $/users
app.use(ExpensesRoute) // $/expenses

// SERVER

const PORT = Number(process.env.PORT) || 8000
app.listen(PORT, "0.0.0.0", () => console.log(`app listening on port ${PORT}`))