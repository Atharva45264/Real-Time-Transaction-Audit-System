const sequelize = require("../config/database");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

exports.transfer = async (senderId, receiverId, amount) => {
  if (amount <= 0) {
    throw new Error("Transfer amount must be greater than zero");
  }

  return await sequelize.transaction(async (t) => {
    const sender = await User.findByPk(senderId, { transaction: t });
    const receiver = await User.findByPk(receiverId, { transaction: t });

    if (!sender || !receiver) {
      throw new Error("Sender or receiver not found");
    }

    if (sender.balance < amount) {
      throw new Error("Insufficient balance");
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save({ transaction: t });
    await receiver.save({ transaction: t });

    const auditLog = await Transaction.create(
      {
        senderId,
        receiverId,
        amount,
        status: "SUCCESS",
      },
      { transaction: t }
    );

    return auditLog;
  });
};
