import { nanoid } from "nanoid";
import ErrorHandler from "../utils/errorHandler.js";
import URL from "../model/Url.js";

const generateNewShortURL = async (req, res, next) => {
  const { url } = req.body;
  if (!url) {
    return next(new ErrorHandler("Please provide url", 400));
  }
  const shortID = nanoid(8);
  try {
    const shortURL = await URL.create({
      shortId: shortID,
      redirectUrl: url,
      visitHistory: [],
    });

    res.status(200).json({
      success: true,
      shortURL,
    });
  } catch (error) {
    return next(new ErrorHandler(`${error.message}`, 500));
  }
};

const redirectUrl = async (req, res, next) => {
  const shortId = req.params.shortId;

  if (!shortId) {
    return next(new ErrorHandler("please provide shortId params", 400));
  }
  try {
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectUrl);
  } catch (error) {
    return next(new ErrorHandler(`${error.message}`, 500));
  }
};

const handleGetAnalytics = async (req, res, next) => {
  const shortId = req.params.shortId;

  try {
    const result = await URL.findOne({ shortId });

    res.status(200).json({
      totalClicks: result.visitHistory.length,
      Analytics: result.visitHistory,
    });
  } catch (error) {
    return next(new ErrorHandler(`${error.message}`, 500));
  }
};

export { generateNewShortURL, redirectUrl, handleGetAnalytics };
