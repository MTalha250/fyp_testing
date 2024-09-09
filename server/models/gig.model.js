import mongoose from "mongoose";
const { Schema } = mongoose;

const GigSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Consultant",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    totalStars: {
      type: Number,
      default: 1,
    },
    starNumber: {
      type: Number,
      default: 1,
    },
    cat: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    cover: {
      type: String,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
    shortTitle: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number, // Time in days
      required: true,
    },
    revisionNumber: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      required: false,
    },
    sales: {
      type: Number,
      default: 0,
    },
    clients: [{ type: Schema.Types.ObjectId, ref: "Client" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gig", GigSchema);
