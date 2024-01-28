import { CUSTOMER } from '../models/customer.js';

export const deleteCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: "Customer ID is required" });
        }

        const customer = await CUSTOMER.findByIdAndDelete(id);

        if (!customer) {
            return res.status(404).send({ message: "Customer not found" });
        }

        res.status(200).send({
            message: "Customer deleted successfully",
            customerData: customer
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};
