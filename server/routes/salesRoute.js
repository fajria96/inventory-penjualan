import express from "express";
import {
    getSales,
    getSalesByDate,
    getSalesByCustomer,
    saveSale,
    deleteSale
} from "../controllers/salesController.js";

const router = express.Router();

router.get('/sales', getSales);
router.get('/sales/:date', getSalesByDate);
router.get('/sales/:customer_id', getSalesByCustomer);
router.post('/sales', saveSale);
router.delete('/sales/:id', deleteSale);

export default router;