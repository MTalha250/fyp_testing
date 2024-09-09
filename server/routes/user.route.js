import express from "express";
import {
  deleteUser,
  getUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";
import {
  getConsultants,
  updateConsultant,
} from "../controllers/consultant.controller.js";

import {
  assignConsultantToClient,
  getClients,
  updateClient,
} from "../controllers/client.controller.js";

import { getAdmins, updateAdmin } from "../controllers/admin.controller.js";

import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/", getUsers);
router.get("/:id", getUserById);

router.get("/consultants", getConsultants);
router.put("/consultants/:id", verifyToken, updateConsultant);

router.get("/clients", getClients);
router.put("/clients/:id", verifyToken, updateClient);
router.put(
  "/clients/:clientId/assign/:consultantId",
  verifyToken,
  assignConsultantToClient
);

router.get("/admins", getAdmins);
router.put("/admins/:id", verifyToken, updateAdmin);

export default router;
