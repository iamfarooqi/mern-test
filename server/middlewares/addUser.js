import Customer from '../models/customer';

const addUser = async (req, res, next) => {
    try {
        const { name, username, email } = req.body;
        const profilePicture = req.file.path;
        const customer = new Customer({ name, username, email, profilePicture });

        // Save the customer to the database
        await customer.save();

        // Add the customer to the request object so it can be used in the next middleware
        req.customer = customer;
        next();
    } catch (error) {
        res.status(400).send(error);
    }
};

export default addUser;