module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: "L'identifiant est déjà pris."
        },
        validate: {
          notEmpty: { msg: "L'identifiant ne peut pas être vide." },
          notNull: { msg: "Le nom est une propriété requise." }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: "L'email est déjà pris."
        },
        validate: {
          notEmpty: { msg: "L'email ne peut pas être vide."},
          notNull: { msg: "L'email est une propriété requise."},
          isEmail: { msg: "Le format de l'email n'est pas correct"},
          len: {
            args: [8,20],
            msg: "L'email doit être compris entre 8 et 20 caractères."
          }
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    })
  }