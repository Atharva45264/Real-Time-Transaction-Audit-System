const historyService = require("../services/historyService");

exports.getUserTransactions = async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await historyService.getTransactionsForUser(userId);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
