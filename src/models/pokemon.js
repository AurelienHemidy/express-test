const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée'];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Pokemon',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Name already exists.',
        },
        validate: {
          len: {
            args: [1, 25],
            msg: 'Name should not exceed 25 letters.',
          },
          notEmpty: { msg: 'Should not be empty' },
          notNull: { msg: 'Should not be null' },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Should be of type Number' },
          notNull: { msg: 'Should not be null' },
          min: {
            args: [0],
            msg: 'Should be above 0',
          },
          max: {
            args: [999],
            msg: 'Should be under 999',
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Should be of type Number' },
          notNull: { msg: 'Should not be null' },
          min: {
            args: [0],
            msg: 'Should be above 0',
          },
          max: {
            args: [99],
            msg: 'Should be under 99',
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: 'Should be a URL' },
          notNull: { msg: 'Should not be null' },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isValidTypes(value) {
            if (!value) {
              throw new Error('A pokemon shoud have a type');
            }

            if (value.split(',').length > 3) {
              throw new Error('A pokemon shoud not have more than 3 types');
            }

            value.split(',').forEach((type) => {
              if (!validTypes.includes(type)) throw new Error(`Must be a valid type from the list: ${validTypes}`);
            });
          },
        },
        get() {
          const types = this.getDataValue('types');
          return types ? types.split(',') : null;
        },
        set(types) {
          if (types) this.setDataValue('types', types.join());
        },
      },
    },
    {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false,
    }
  );
};
