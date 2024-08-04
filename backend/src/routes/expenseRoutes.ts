import { Router } from "express";
import { getExpensesByCategory } from "../controllers/expenseController";

const router = Router()

router.route("/expenses")
        .get(getExpensesByCategory)

export default router