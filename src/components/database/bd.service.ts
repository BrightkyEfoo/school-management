import { Sequelize } from 'sequelize';

class DbService {
  sequelize: Sequelize = new Sequelize('school-management', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false,
  });

}

const dbService = new DbService();
export { dbService };
