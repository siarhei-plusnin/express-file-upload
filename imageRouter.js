const express = require("express");
const router = express.Router();
const _ = require("lodash");
const path = require("path");

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

router.get("/getimage/:customerId/:companyId/:keyword", async (req, res) => {
  try {
    const myPath =
      [req.params.customerId, req.params.companyId, req.params.keyword].join(
        path.sep,
      ) + ".png";
    return res.sendFile(path.resolve(myPath));
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
