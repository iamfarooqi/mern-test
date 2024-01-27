import express from 'express';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/api/customers', upload.single('profilePicture'), (req, res) => {
    // At this point, the customer has been created and saved to the database
    // req.customer contains the saved customer
    res.status(201).send(req.customer);
})
// Routes go here

export default router;
