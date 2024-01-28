import { CUSTOMER } from '../models/customer.js';

export const editCustomer = async (req, res) => {
    try {
        const { id, userName, customerName, email } = req.body;
        const updateFields = {};
        if (userName) updateFields.userName = userName;
        if (customerName) updateFields.customerName = customerName;
        if (email) updateFields.email = email;

        const customer = await CUSTOMER.findByIdAndUpdate(id, updateFields, { new: true });

        if (customer) {
            res.status(201).send({
                message: "Customer edited successfully",
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
