module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Post', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le nom ne peut pas être vide." },
          notNull: { msg: "Le nom est une propriété requise." }
        }
      },
      imageUrl: {
        type: DataTypes.STRING(300),
        allowNull: false,
        validate: {
          // isUrl: { msg: "Utilisez uniquement une URL valide pour l'image." },
          notNull: { msg: "L'URL est une propriété requise" }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "La description ne peut pas être vide." },
          notNull: { msg: "La description est une propriété requise." }
        }
      },
      numberOfComments: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      usersLiked: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      usersDisliked: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userIdLiked: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userIdDisliked: {
        type: DataTypes.STRING,
        allowNull: false,
      }      
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false //Désactiver la date de modification
    })
  }