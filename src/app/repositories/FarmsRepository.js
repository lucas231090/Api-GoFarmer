const db = require('../../database/index');

class FarmsRepository {
  //
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(
      `SELECT farms.*, categories.name AS category_name
       FROM farms
       LEFT JOIN categories ON categories.id = farms.category_id
       ORDER BY farms.name ${direction}`,
    );

    // INNER/RIGHT/FULL JOIN categories ON categories.id = farms.category_id

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(
      `SELECT farms.*, categories.name AS category_name
       FROM farms
       LEFT JOIN categories ON categories.id = farms.category_id
       WHERE farms.id = $1`,
      [id],
    );

    return row;
  }

  async findByName(name) {
    const [row] = await db.query('SELECT * FROM farms WHERE name = $1', [
      name,
    ]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM farms WHERE id = $1', [id]);

    return deleteOp;
  }

  async create({
    name, description, category_id,
  }) {
    const [row] = await db.query(
      `
      INSERT INTO farms(name, description, category_id)
      VALUES($1, $2, $3)
      RETURNING *
    `,
      [name, description, category_id],
    );

    return row;
  }

  async update(id, {
    name, description, category_id,
  }) {
    const [row] = await db.query(
      `
    UPDATE farms
    SET name = $1, description = $2, category_id = $3
    WHERE id = $4
    RETURNING *`,
      [name, description, category_id, id],
    );

    return row;
  }
}

module.exports = new FarmsRepository();
