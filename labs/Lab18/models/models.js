const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Pulpit extends Model{}
class Faculty extends Model{}
class Teacher extends Model{}
class Subject extends Model{}
class Auditorium_type extends Model{}
class Auditorium extends Model{}

function internalORM(sequelize) {
    Pulpit.init(
        {
            pulpit: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true
            },
            pulpit_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            faculty: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {model: Pulpit, key: "Faculty"}
            }
        },
        {
            sequelize,
            modelName: 'Pulpit',
            tableName: 'Pulpit',
            timestamps: false
        }
    );
    Faculty.init(
        {
            faculty: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true
            },
            faculty_name: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            hooks: {
                beforeCreate(attributes, options) {
                    console.log('faculty => beforeCreate')
                },
                afterCreate(attributes, options) {
                    console.log('faculty => afterCreate')
                }
            },
            sequelize,
            modelName: 'Faculty',
            tableName: 'Faculty',
            timestamps: false
        }
    );
    Teacher.init(
        {
            teacher: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true
            },
            teacher_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            pulpit: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {model: Pulpit, key: "pulpit"}
            }
        },
        {
            sequelize,
            modelName: 'Teacher',
            tableName: 'Teacher',
            timestamps: false
        }
    );
    Subject.init(
        {
            subject: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true
            },
            subject_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            pulpit: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {model: Pulpit, key: "pulpit"}
            }
        },
        {
            sequelize,
            modelName: 'Subject',
            tableName: 'Subject',
            timestamps: false
        }
    );
    Auditorium_type.init(
        {
            auditorium_type: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true
            },
            auditorium_typename: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Auditorium_type',
            tableName: 'Auditorium_type',
            timestamps: false
        }
    );
    Auditorium.init(
        {
            auditorium: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true
            },
            auditorium_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            auditorium_capacity: {
                type: Sequelize.NUMBER(),
                allowNull: false
            },
            auditorium_type: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {model: Auditorium, key: "auditorium"}

            }
        },
        {
            scopes:{
                auditoriumsgt60(){
                    return{
                        where:{auditorium_capacity: {[Sequelize.Op.gte]:60}}
                    }
                }
            },

            sequelize,
            modelName: 'Auditorium',
            tableName: 'Auditorium',
            timestamps: false
        }

    );
}

exports.ORM = (sequelize) => {
    internalORM(sequelize);
    return {Faculty, Pulpit, Teacher, Subject, Auditorium, Auditorium_type}
};
