import { CUSTOMER } from '../models/customer.js';

export const editCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { userName, customerName, email } = req.body;

        const updateFields = {};

        if (userName) updateFields.userName = userName;
        if (customerName) updateFields.customerName = customerName;
        if (email) updateFields.email = email;

        if (req.file) {
            updateFields.profilePicture = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).send({ message: "No fields to update" });
        }

        const customer = await CUSTOMER.findByIdAndUpdate(id, updateFields, { new: true });

        if (!customer) {
            return res.status(404).send({ message: "Customer not found" });
        }

        res.status(200).send({
            message: "Customer edited successfully",
            customerData: customer
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};
