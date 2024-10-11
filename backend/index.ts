import { JsonWebKey } from "crypto";

const express = require("express");
const cors = require("cors");  // CORSのインポート
const app = express();



app.get("/", function (req: any, res: any) {
  res.send({test: "test"});
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
