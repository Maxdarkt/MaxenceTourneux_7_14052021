module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Comment', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le message ne peut pas être vide." },
          notNull: { msg: "Le message est une propriété requise." }
        }
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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userIdDisliked: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }      
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false //Désactiver la date de modification
    })
  }