import { CUSTOMER } from '../models/customer.js';

export const getCustomer = async (req, res,) => {
    try {
        const customers = await CUSTOMER.find({});

        if (customers.length === 0) {
            return res.status(404).send({ message: "No customers found" });
        }

        res.status(200).send({
            message: "Customer data fetched successfully",
            customerData: customers
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};
