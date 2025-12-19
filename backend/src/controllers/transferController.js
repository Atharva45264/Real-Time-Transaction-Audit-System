const transferService = require("../services/transferService");

exports.transferFunds = async (req, res) => {
  const { senderId, receiverId, amount } = req.body;

  try {
    const result = await transferService.transfer(senderId, receiverId, amount);
    res.status(200).json({
      message: "Transfer successful",
      transaction: result,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
