import { CUSTOMER } from '../models/customer.js';

export const editCustomer = async (req, res) => {
    try {
        console.log(req.body, 'req.body>>');
        const { id, userName, customerName, email } = req.body;
        let imageData;
        if (req.file) {
            // If a new image is provided, update the imageData
            imageData = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        const updateFields = {};

        if (userName) updateFields.userName = userName;
        if (customerName) updateFields.customerName = customerName;
        if (email) updateFields.email = email;

        if (imageData) {
            // If imageData exists, update the profilePicture field
            updateFields.profilePicture = imageData;
        }

        const customer = await CUSTOMER.findByIdAndUpdate(id, updateFields, { new: true });

        if (customer) {
            res.status(200).send({
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
