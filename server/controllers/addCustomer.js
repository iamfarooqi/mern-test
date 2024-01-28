import { CUSTOMER } from '../models/customer.js';

export const addCustomer = async (req, res) => {
    try {
        const { customerName, userName, email } = req.body;
        const customer = new CUSTOMER({ customerName, userName, email });
        const addedCustomer = await customer.save();

        if (customer) {
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
