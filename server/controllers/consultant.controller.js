import { Consultant } from "../models/user.model.js";

export const getConsultants = async (req, res) => {
  try {
    const consultants = await Consultant.find();
    res.status(200).send(consultants);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error fetching consultants", details: error.message });
  }
};

export const updateConsultant = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const consultant = await Consultant.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!consultant) {
      return res.status(404).send({ error: "Consultant not found" });
    }

    res.status(200).send(consultant);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error updating consultant", details: error.message });
  }
};
