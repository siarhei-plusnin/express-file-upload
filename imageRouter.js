const express = require("express");
const router = express.Router();
const _ = require("lodash");
const path = require("path");
const fs = require("fs");
var Jimp = require("jimp");

router.post("/saveimage", async (req, res) => {
  let result = [];
  try {
    if (!req.files) {
      res.status(404).send({
        status: false,
        message: "No files recieved",
      });
    } else {
      let file = req.files.images;
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/svg" ||
        file.mimetype === "image/svg+xml" ||
        file.mimetype === "image/png"
      ) {
        const movePath =
          __dirname +
          path.sep +
          "images" +
          path.sep +
          file.name.split(".")[0].split("_").join(path.sep) +
          "." +
          file.name.split(".")[1];
        file.mv(movePath);
        result.push(movePath);
      }
    }
  } catch (err) {
    console.log(err);
  }

  res.send(result).status(200);
});

router.get("/getimage/:name", async (req, res) => {
  let { customerId, companyId, width, height } = req.query;

  const myPath =
    customerId && companyId
      ? [customerId, companyId, req.params.name].join(path.sep)
      : req.params.name;

  const filePath = path.resolve("images" + path.sep + myPath + ".png");

  if (fs.existsSync(filePath)) {
    if (width && height) {
      let image = await Jimp.read(filePath);
      image = image.resize(Number.parseFloat(width), Number.parseFloat(height));
      const result = await image.getBufferAsync("image/png");
      return res.type("png").send(result);
    }

    return res.sendFile(filePath);
  }

  return res.status(404).send({
    status: false,
    message: `Chart "${req.params.name}_${req.query.companyId}" not found.`,
  });
});

module.exports = router;
