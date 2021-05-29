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
        validate: {
          notEmpty: { msg: "L'userId ne peut pas être vide." },
          notNull: { msg: "L'userId est une propriété requise." }
        }
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le postId ne peut pas être vide." },
          notNull: { msg: "Le postId est une propriété requise." }
        }
      },
      message: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le message ne peut pas être vide." },
          notNull: { msg: "Le message est une propriété requise." }
        }
      },
      usersLikedComment: {
        type: DataTypes.INTEGER,
        allowNull: false,
        get() {
          return this.getDataValue('usersLikedComment').split(',')
        },
        set(usersLikedComment){
          return this.setDataValue('usersLikedComment', usersLikedComment.join())
        }
      },
      usersDislikedComment: {
        type: DataTypes.INTEGER,
        allowNull: false,
        get() {
          return this.getDataValue('usersDislikedComment').split(',')
        },
        set(usersDislikedComment){
          return this.setDataValue('usersDislikedComment', usersDislikedComment.join())
        }
      },
      userIdLikedComment: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userIdDislikedComment: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }      
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false //Désactiver la date de modification
    })
  }