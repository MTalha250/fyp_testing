import { Client, Consultant } from "../models/user.model.js";

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find().populate("assignedConsultant");
    res.status(200).send(clients);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error fetching clients", details: error.message });
  }
};

export const assignConsultantToClient = async (req, res) => {
  try {
    const { clientId, consultantId } = req.params;

    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).send({ error: "Client not found" });
    }

    const consultant = await Consultant.findById(consultantId);
    if (!consultant) {
      return res.status(404).send({ error: "Consultant not found" });
    }

    client.assignedConsultant = consultant._id;
    await client.save();

    res.status(200).send(client);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error assigning consultant", details: error.message });
  }
};

export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const client = await Client.findByIdAndUpdate(id, updates, { new: true });

    if (!client) {
      return res.status(404).send({ error: "Client not found" });
    }

    res.status(200).send(client);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error updating client", details: error.message });
  }
};
