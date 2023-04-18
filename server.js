const mongoose = require("mongoose");
const DB_HOST =
  "mongodb+srv://goldclub1977:Ro300979koa@kliapko-restapi.ob2szcn.mongodb.net/db-contacts?retryWrites=true&w=majority";

const app = require("./app");
const { error } = require("./schemas/contacts");

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(3000, () => {
      console.log("Server running on port: 3000");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
