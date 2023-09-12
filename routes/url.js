import express from "express";
const router = express.Router();

import {
  generateNewShortURL,
  handleGetAnalytics,
  redirectUrl,
} from "../controller/url.js";

router.route("/").post(generateNewShortURL);
router.route("/:shortId").get(redirectUrl);
router.route("/analytics/:shortId").get(handleGetAnalytics);

export default router;
