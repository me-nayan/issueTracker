import mongoose from "mongoose";

export const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    labels: [
      {
        type: String,
        trim: true,
        required: true,
      },
    ],
  },

  {
    timestamps: true,
  }
);

