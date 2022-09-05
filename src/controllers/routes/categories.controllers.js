import Category from "../../models/Category.js";

export async function getCategories(req, res) {
    try {
        const allCategories = await Category.findAll();

        if (allCategories.length === 0) return res.status(204).json({ 'msg': 'No categories have been found' });

        return res.json(allCategories);
    } catch (error) {
        console.error(error);
    }
};


export async function getCategoryById(req, res) {
    const { id } = req.params;
    try {
        const foundCategory = await Category.findByPk(id, { include: ["products"] });

        !foundCategory && res.status(204).json({ error: `There are no Categories with the id : ${id}` });

        return res.json(foundCategory);

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

        if (!name) return res.status(400).json({ error: "Must provide all the required fields" });

        categoryWithSameName && res.status(405).json({ error: `There's already a category with that name` });

        const newCategory = await Category.create({ name });
        return res.status(201).json(newCategory);
    } catch (error) {
        console.error(error)
    }
};

export async function modifyCategory(req, res) {
    const { id } = req.params;
    const { body } = req;
    try {
        const foundCategory = await Category.findByPk(id);

        !foundCategory && res.status(204).json({ error: `There are no Categories with the id : ${id}` });

        await Category.update(body, { where: { id: id } });
        const updatedCategory = await Category.findByPk(id);

        return res.json(updatedCategory);
    } catch (error) {
        console.error(error)
    }
};

export async function deleteCategory(req, res) {

    const { id } = req.params;
    try {
        const foundCategory = await Category.findByPk(id);

        !foundCategory && res.status(204).json({ error: `There are no categories with the id : ${id}` });

        await Category.destroy({ where: { id: id } });

        return res.json({ msg: `Category ${foundCategory.name} - id : ${id} deleted` });

    } catch (err) {
        console.log(err)
    }

}