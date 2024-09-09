import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    profilePicture: { type: String, required: false },
    bio: { type: String, required: false },
    password: { type: String, required: true },
    country: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "consultant", "client"],
      required: true,
    },
  },
  { timestamps: true, discriminatorKey: "role" }
);

const User = mongoose.model("User", userSchema);

// Admin Schema
const adminSchema = new Schema({
  permissions: { type: [String], default: ["manage-users", "view-reports"] },
  statistics: {
    totalConsultants: { type: Number, default: 0 },
    totalClients: { type: Number, default: 0 },
  },
});
const Admin = User.discriminator("Admin", adminSchema);

// Consultant Schema
const consultantSchema = new Schema({
  certifications: { type: [String], default: [] },
  expertiseAreas: { type: [String], default: [] },
  linkedProfiles: {
    linkedin: { type: String, required: false },
    otherProfiles: { type: [String], required: false },
  },
  availabilityStatus: { type: Boolean, default: true },
  pastProjects: { type: [String], default: [] },
});
const Consultant = User.discriminator("Consultant", consultantSchema);

// Client Schema
const clientSchema = new Schema({
  assignedConsultant: {
    type: Schema.Types.ObjectId,
    ref: "Consultant",
    required: false,
  },
  projectHistory: { type: [String], default: [] },
});
const Client = User.discriminator("Client", clientSchema);

export { User, Admin, Consultant, Client };
