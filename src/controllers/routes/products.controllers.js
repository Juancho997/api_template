import Product from "../../models/Product.js";
import Category from "../../models/Category.js";

export async function getProducts(req, res) {
    try {
        const allProducts = await Product.findAll({ include: Category });

        if (allProducts.length === 0) return res.status(204).send({ 'msg': 'No products have been found' });

        return res.send(allProducts);
    } catch (error) {
        console.error(error);
    }
};


export async function getProductById(req, res) {
    const { id } = req.params;
    try {

        const foundProduct = await Product.findOne({
            include: Category,
            where: { id: id }
        });

        if (!foundProduct) return res.status(204).send({ error: `There are no Products with the id : ${id}` });

        return res.send(foundProduct);

    } catch (error) {
        console.error(error)
    }
};


export async function postProduct(req, res) {
    const { name, image, description, price, categoryId } = req.body;

    try {

        const productWithSameName = await Product.findOne({
            where: {
                name: name
            }
        });

        if (productWithSameName) return res.status(405).send({ error: `There's already a product with that name` });

        if (!name || !image || !description || !price || !categoryId) return res.status(400).send({ error: "Must provide all required fields" });


        const newProduct = await Product.create({ name, image, description, price, categoryId });
        return res.status(201).send(newProduct);

    } catch (error) {
        console.error(error)
    }
};

export async function modifyProduct(req, res) {
    const { id } = req.params;
    const { body } = req;
    try {
        const foundProduct = await Product.findByPk(id);

        if (!foundProduct) return res.status(204).send({ error: `There are no Products with the id : ${id}` });

        await Product.update(body, { where: { id: id } });
        const updatedProduct = await Product.findByPk(id);

        return res.send(updatedProduct);
    } catch (error) {
        console.error(error)
    }
};

export async function deleteProduct(req, res) {

    const { id } = req.params;
    try {
        const foundProduct = await Product.findByPk(id);

        if (!foundProduct) return res.status(204).send({ error: `There are no Products with the id : ${id}` });

        await Product.destroy({ where: { id: id } });

        return res.status(200).send({ msg: `Product ${foundProduct.name} - id : ${id} deleted` });

    } catch (err) {
        console.log(err)
    }

}