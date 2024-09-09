import { User, Admin, Consultant, Client } from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { role, ...userData } = req.body;

    let user;
    switch (role) {
      case "admin":
        user = new Admin(userData);
        break;
      case "consultant":
        user = new Consultant(userData);
        break;
      case "client":
        user = new Client(userData);
        break;
      default:
        return res.status(400).send({ error: "Invalid role specified" });
    }

    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error creating user", details: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error fetching users", details: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error fetching user", details: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error updating user", details: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error deleting user", details: error.message });
  }
};
