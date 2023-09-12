import mongoose from "mongoose";

const UrlSchema = mongoose.Schema(
  {
    shortId: {
      type: String,
      required: [true, "please provide shortId"],
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: [true, "please provide redirectUrl"],
    },
    visitHistory: [
      {
        timestamp: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const URL = mongoose.model("URL", UrlSchema);
export default URL;
