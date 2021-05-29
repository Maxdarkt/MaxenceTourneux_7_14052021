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
      usersLiked: {
        type: DataTypes.INTEGER,
        allowNull: false,
        get() {
          return this.getDataValue('usersLiked').split(',')
        },
        set(usersLiked){
          return this.setDataValue('usersLiked', usersLiked.join())
        }
      },
      usersDisliked: {
        type: DataTypes.INTEGER,
        allowNull: false,
        get() {
          return this.getDataValue('usersDisliked').split(',')
        },
        set(usersDisliked){
          return this.setDataValue('usersDisliked', usersDisliked.join())
        }
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