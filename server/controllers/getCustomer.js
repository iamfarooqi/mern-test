import { CUSTOMER } from '../models/customer.js';

export const getCustomer = async (req, res, next) => {
    try {

        // Use findOne to find a customer based on specified criteria
        const customer = await CUSTOMER.find({});

        // Check if the customer was found
        if (customer) {
            // Respond with the customer data
            res.status(200).json(customer);
        } else {
            // If customer not found, respond with a 404 status code
            res.status(404).send("Customer not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
