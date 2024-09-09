import { Admin } from "../models/user.model.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).send(admins);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error fetching admins", details: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const admin = await Admin.findByIdAndUpdate(id, updates, { new: true });

    if (!admin) {
      return res.status(404).send({ error: "Admin not found" });
    }

    res.status(200).send(admin);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error updating admin", details: error.message });
  }
};
