import express from 'express';
import multer from 'multer';

import { addCustomer } from '../controllers/addCustomer.js';
import { getCustomer } from '../controllers/getCustomer.js';
import { editCustomer } from '../controllers/editCustomer.js';
import { deleteCustomer } from '../controllers/deleteCustomer.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/add', upload.single('image'), addCustomer)
router.get('/get', getCustomer)
router.put('/edit/:id', upload.single('image'), editCustomer)
router.delete('/delete/:id', deleteCustomer)

export default router;
