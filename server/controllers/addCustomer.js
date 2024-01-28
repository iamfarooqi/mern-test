import { CUSTOMER } from '../models/customer.js';

export const addCustomer = async (req, res) => {
    try {
        const { customerName, userName, email } = req.body;

        if (!customerName) {
            return res.status(400).send({ message: "Customer name is required" });
        }
        if (!userName) {
            return res.status(400).send({ message: "User name is required" });
        }
        if (!email) {
            return res.status(400).send({ message: "Email is required" });
        }

        let imageData = null;
        if (req.file) {
            imageData = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        const customer = new CUSTOMER({
            customerName,
            userName,
            email,
            profilePicture: imageData
        });

        const addedCustomer = await customer.save();

        res.status(201).send({
            message: "Customer created successfully",
            customerData: addedCustomer
        });

    } catch (error) {
        console.error(error);
        const errorMessage = error.code === 11000 ? "Customer already exists" : "Internal Server Error";
        res.status(500).send({ message: errorMessage, error: error.message });
    }
};
