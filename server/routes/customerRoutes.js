import express from 'express';
import { addCustomer } from '../controllers/addCustomer.js';
import { getCustomer } from '../controllers/getCustomer.js';

const router = express.Router();
// const upload = multer({ dest: 'uploads/' });
router.post('/add-customer', addCustomer)
router.get('/get-customer', getCustomer)
// Routes go here

export default router;
