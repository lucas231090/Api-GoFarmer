const CategoriesRepository = require('../repositories/CategoriesRepository');

// Error Handler (Middleware) -> Manipulador de erros

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();
    return response.json(categories);
  }

  async show(request, response) {
    // obter um registro

    const { id } = request.params;

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      // 404 not found
      return response.status(404).json({ error: 'Category not found' });
    }

    response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const categoryExists = await CategoriesRepository.findByName(name);

    if (categoryExists) {
      return response
        .status(400)
        .json({ error: 'This category already exists' });
    }

    const category = await CategoriesRepository.create({ name });

    response.json(category);
  }

  async update(request, response) {
    // editar um registro

    const { id } = request.params;
    const { name } = request.body;

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return response
        .status(404)
        .json({ error: 'This category does not exist' });
    }

    if (!name) {
      return response.status(404).json({ error: 'Category name is required' });
    }

    const categoryByName = await CategoriesRepository.findByName(name);
    if (categoryByName && categoryByName.id !== id) {
      return response
        .status(400)
        .json({ error: 'This category is already in use' });
    }

    const category = await CategoriesRepository.update(id, {
      name,
    });

    response.status(200).json(category);
  }

  async delete(request, response) {
    // deletar um registro
    const { id } = request.params;

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return response
        .status(200)
        .json({ message: 'This category does not exist' });
    }

    if (categoryExists) {
      CategoriesRepository.delete(id);

      return response
        .status(200)
        .json({ message: 'Category successfully deleted' });
    }
    // 204: No contect (sucesso sem corpo de assunto)
  }
}

module.exports = new CategoryController();
