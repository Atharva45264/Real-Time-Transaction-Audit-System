const { Op } = require("sequelize");
const Transaction = require("../models/Transaction");

exports.getTransactionsForUser = async (userId) => {
  return await Transaction.findAll({
    where: {
      [Op.or]: [{ senderId: userId }, { receiverId: userId }],
    },
    order: [["createdAt", "DESC"]],
  });
};
