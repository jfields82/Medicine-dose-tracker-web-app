const Medicine = require("../model/medicine");

const createMedicine = async (req, res) => {
  req.body.MedUser = req.user.userId;
  const medicine = await Medicine.create({ ...req.body });
  res.json({ medicine });
};

const getMedicine = async (req, res) => {
  console.log(" get all medicine");
  const userId = req.user.userId;
  const allMedicines = await Medicine.find({ MedUser: userId });
  res.json({ allMedicines });
};

const deleteMedicine = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const deletedMedicine = await Medicine.findOneAndRemove({
    _id: id,
    MedUSer: userId,
  });

  if (!deletedMedicine) {
    throw new Error("Medicine does not exist");
  }

  res.send("medicine deleted");
};

module.exports = { createMedicine, getMedicine, deleteMedicine };
