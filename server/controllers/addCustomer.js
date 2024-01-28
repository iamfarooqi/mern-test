import { CUSTOMER } from '../models/customer.js';

export const addCustomer = async (req, res) => {
    try {
        const { customerName, userName, email } = req.body;
        let imageData;
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

        if (addedCustomer) {
            res.status(201).send({
                message: "Customer created successfully",
                customerData: addedCustomer
            });
        } else {
            res.status(404).send("Customer not added");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

