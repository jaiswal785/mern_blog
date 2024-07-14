const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://anandjaiswaliitg:kne%40855107@project1.54e6fo5.mongodb.net/?retryWrites=true&w=majority&appName=Project1"
  )
  .then(() => {
    console.log("connected to Mongo DB");
  })
  .catch((e) => console.log(e));
