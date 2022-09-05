import Product from "../../models/Product.js";

export async function getProducts(req, res) {
    try {
        const allProducts = await Product.findAll({ include: ["category"] });

        if (allProducts.length === 0) return res.status(204).json({ 'msg': 'No products have been found' });

        return res.json(allProducts);
    } catch (error) {
        console.error(error);
    }
};


export async function getProductById(req, res) {
    const { id } = req.params;
    try {

        const foundProduct = await Product.findOne({
            include: 'category',
            where: { id: id }
        });

        !foundProduct && res.status(204).json({ error: `There are no Products with the id : ${id}` });

        return res.json(foundProduct);

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

        productWithSameName && res.status(405).json({ error: `There's already a product with that name` });

        if (!name || !image || !description || !price || !categoryId) return res.status(400).json({ error: "Must provide all required fields" });


        const newProduct = await Product.create({ name, image, description, price, categoryId });
        return res.status(201).json(newProduct);

    } catch (error) {
        console.error(error)
    }
};

export async function modifyProduct(req, res) {
    const { id } = req.params;
    const { body } = req;
    try {
        const foundProduct = await Product.findByPk(id);

        !foundProduct && res.status(204).json({ error: `There are no Products with the id : ${id}` });

        await Product.update(body, { where: { id: id } });
        const updatedProduct = await Product.findByPk(id);

        return res.json(updatedProduct);
    } catch (error) {
        console.error(error)
    }
};

export async function deleteProduct(req, res) {

    const { id } = req.params;
    try {
        const foundProduct = await Product.findByPk(id);

        !foundProduct && res.status(204).json({ error: `There are no Products with the id : ${id}` });

        await Product.destroy({ where: { id: id } });

        return res.status(200).json({ msg: `Product id : ${id} deleted` });

    } catch (err) {
        console.log(err)
    }

}