const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Specializations extends Model{}
class Regions extends Model{}
class Cities extends Model{}
class Jobs extends Model{}
class Users extends Model{}

function internalORM(sequelize) {
    Specializations.init(
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.CHAR(100),
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: 'SPECIALIZATIONS',
            tableName: 'SPECIALIZATIONS',
            timestamps: false
        }
    );
    Regions.init(
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            code: {
                type: Sequelize.CHAR(3),
                allowNull: false
            },
            name: {
                type: Sequelize.CHAR(30),
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Regions',
            tableName: 'Regions',
            timestamps: false
        }
    );
    Cities.init(
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.CHAR(30),
                allowNull: false
            },
            region: {
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: Regions.id
            }
        },
        {
            sequelize,
            modelName: 'Cities',
            tableName: 'Cities',
            timestamps: false
        }
    );
    Users.init(
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            login: {
                type: Sequelize.CHAR(20),
                allowNull: false
            },
            pa$$word: {
                type: Sequelize.CHAR(20),
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Users',
            tableName: 'Users',
            timestamps: false
        }
    );
    Jobs.init(
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: Sequelize.INTEGER,
                foreignKey: Users.id
            },
            name: {
                type: Sequelize.CHAR(100),
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            date_published: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            city: {
                type: Sequelize.INTEGER,
                foreignKey: Cities.id
            },
            specialization: {
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: Specializations.id
            },
            salary: {
                type: Sequelize.CHAR(30)
            }
        },
        {
            sequelize,
            modelName: 'JOBS',
            tableName: 'JOBS',
            timestamps: false
        }
    );
}



exports.ORM = (sequelize) => {
    internalORM(sequelize);
    return {Regions, Specializations, Jobs, Cities, Users}
};
