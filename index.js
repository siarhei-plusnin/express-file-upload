const express = require("express");
const imageRouter = require("./imageRouter");
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(fileUpload({
  createParentPath: true
}));

app.use(imageRouter);

const port = process.env.PORT || 3001; //IF envVar PORT is set: use it, if not use 3000

app.listen(port, () => {
});
