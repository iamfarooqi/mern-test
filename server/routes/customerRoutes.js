import express from 'express';

import { addCustomer } from '../controllers/addCustomer.js';
import { getCustomer } from '../controllers/getCustomer.js';
import { editCustomer } from '../controllers/editCustomer.js';
import { deleteCustomer } from '../controllers/deleteCustomer.js';

const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

router.post('/add', addCustomer)
router.get('/get', getCustomer)
router.post('/edit', editCustomer)
router.post('/delete', deleteCustomer)

export default router;
