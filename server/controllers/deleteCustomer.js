import { CUSTOMER } from '../models/customer.js';

export const deleteCustomer = async (req, res, next) => {
    try {
        const { customerId } = req.body
        const customer = await CUSTOMER.findByIdAndDelete(customerId);
        if (customer) {
            res.status(201).send({
                message: "Customer deleted successfully",
                customerData: customer
            });
        } else {
            res.status(404).send("Customer not found");
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
