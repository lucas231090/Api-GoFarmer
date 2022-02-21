const FarmsRepository = require('../repositories/FarmsRepository');

class FarmController {
  async index(request, response) {
    // listar os registros
    const { orderBy } = request.query;
    const farms = await FarmsRepository.findAll(orderBy);

    response.json(farms);
  }

  async show(request, response) {
    // obter um registro

    const { id } = request.params;

    const farm = await FarmsRepository.findById(id);

    if (!farm) {
      // 404 not found
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(farm);
  }

  async store(request, response) {
    // criar um novo registro
    const {
      name, description, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const farmExists = await FarmsRepository.findByName(name);

    if (farmExists) {
      return response
        .status(400)
        .json({ error: 'This name is already in use' });
    }

    const farm = await FarmsRepository.create({
      name,
      description,
      category_id,
    });

    response.json(farm);
  }

  async update(request, response) {
    // editar um registro

    const { id } = request.params;
    const {
      name, description, category_id,
    } = request.body;

    const farmExists = await FarmsRepository.findById(id);

    if (!farmExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return response.status(404).json({ error: 'Name is required' });
    }

    const farmByName = await FarmsRepository.findByName(name);
    if (farmByName && farmByName.id !== id) {
      return response
        .status(400)
        .json({ error: 'This name is already in use' });
    }

    const farm = await FarmsRepository.update(id, {
      name,
      description,
      category_id,
    });

    response.json(farm);
  }

  async delete(request, response) {
    // deletar um registro
    const { id } = request.params;

    await FarmsRepository.delete(id);

    // 204: No contect (sucesso sem corpo de assunto)

    response.status(204).json({ message: 'User successfully deleted' });
  }
}

// singleton
module.exports = new FarmController();
