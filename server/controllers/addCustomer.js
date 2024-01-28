import { CUSTOMER } from '../models/customer.js';

export const addCustomer = async (req, res, next) => {
    try {
        console.log(req.body, 'req.body>>');
        const { customerName, userName, email } = req.body;
        // const profilePicture = req.file.path;
        const customer = new CUSTOMER({ customerName, userName, email });

        // Save the customer to the database
        await customer.save();

        // Add the customer to the request object so it can be used in the next middleware
        req.customer = customer;

        // Respond with a 201 status code for successful resource creation
        res.status(201).send("Customer created successfully");
    } catch (error) {
        console.error(error);

        // Respond with a 500 status code for internal server errors
        res.status(500).send("Internal Server Error");
    }
};
