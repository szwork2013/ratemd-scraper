/* eslint object-shorthand: 0 func-names: 0 */

import Sequelize from 'sequelize';

import { safelyParseJSON, ensureHttpProtocol } from '../../utils';

export const Doctor = {
  name: 'doctors',
  schema: {
    name: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
      set: function (value) {
        this.setDataValue('name', value.trim());
      }
    },
    reviewCount: Sequelize.INTEGER,
    rating: Sequelize.DECIMAL,
    bestRating: Sequelize.DECIMAL,
    worstRating: Sequelize.DECIMAL,
    url: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isUrl: true,
        contains: 'ratemds.com/doctor-ratings'
      },
      set: function (value) {
        this.setDataValue('url', ensureHttpProtocol(value));
      }
    },
    emailList: {
      type: Sequelize.TEXT,
      get: function () {
        return safelyParseJSON(this.getDataValue('emailList')) || [];
      },
      set: function (value) {
        this.setDataValue('emailList', JSON.stringify(value));
      }
    }
  }
};

export default Doctor;
