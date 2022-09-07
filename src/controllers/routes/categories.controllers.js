import Category from "../../models/Category.js";

export async function getCategories(req, res) {
    try {
        const allCategories = await Category.findAll();

        if (allCategories.length === 0) return res.status(204).send({ 'msg': 'No categories have been found' });

        return res.send(allCategories);
    } catch (error) {
        console.error(error);
    }
};


export async function getCategoryById(req, res) {
    const { id } = req.params;
    try {
        const foundCategory = await Category.findByPk(id, { include: ["products"] });

        if (!foundCategory) return res.status(204).send({ error: `There are no Categories with the id : ${id}` });

        return res.send(foundCategory);

    } catch (error) {
        console.error(error)
    }
};

export async function postCategory(req, res) {
    const { name } = req.body;

    try {

        const categoryWithSameName = await Category.findOne({
            where: {
                name: name
            }
        });

        if (!name) return res.status(400).send({ error: "Must provide all the required fields" });

        if (categoryWithSameName) return res.status(405).send({ error: `There's already a category with that name` });

        const newCategory = await Category.create({ name });
        return res.status(201).send(newCategory);
    } catch (error) {
        console.error(error)
    }
};

export async function modifyCategory(req, res) {
    const { id } = req.params;
    const { body } = req;
    try {
        const foundCategory = await Category.findByPk(id);

        if (!foundCategory) return res.status(204).send({ error: `There are no Categories with the id : ${id}` });

        await Category.update(body, { where: { id: id } });
        const updatedCategory = await Category.findByPk(id);

        return res.send(updatedCategory);
    } catch (error) {
        console.error(error)
    }
};

export async function deleteCategory(req, res) {

    const { id } = req.params;
    try {
        const foundCategory = await Category.findByPk(id);

        if (!foundCategory) return res.status(204).send({ error: `There are no categories with the id : ${id}` });

        await Category.destroy({ where: { id: id } });

        return res.status(200).send({ msg: `Category ${foundCategory.name} - id : ${id} deleted` });

    } catch (err) {
        console.log(err)
    }

}