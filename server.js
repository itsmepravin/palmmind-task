const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Setting EJS as the HTML template engine
app.set("view engine", "ejs");

const MONGODB_URI =
  "mongodb+srv://itsmepravin:W6e34nwscoVrvcFz@cluster0.03gmv.mongodb.net/palmMind?retryWrites=true&w=majority";

// Connecting to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Successfully connected to the MongoDB database.`))
  .catch((error) =>
    console.log(`Failed to connect to the database!`, error.message)
  );

// Defining the User Schema
const usersSchema = mongoose.Schema({
  name: String,
  address: String,
  age: Number,
});

// Creating a model from that user schema
const Users = mongoose.model("Users", usersSchema);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --------------------ROUTES---------------------------
app.get("/", async (req, res) => {
  const allUsers = await Users.find({});
  const allUsernames = allUsers.map((element) => element.name);

  res.render("index.ejs", { allUsers, allUsernames });
});

app.post("/addNewUser", async (req, res) => {
  const { name, address, age } = req.body;
  const newUser = new Users({
    name,
    address,
    age: Number(age),
  });
  await newUser.save();
});

app.post("/getUserDetails", async (req, res) => {
  const { toUpdateUser } = req.body;
  const result = await Users.findOne({ name: toUpdateUser });
  res.json(result);
});

app.put("/updateSingleUser", async (req, res) => {
  const { updateName, updateAddress, updateAge } = req.body;
  await Users.findOneAndUpdate(
    { name: updateName },
    { name: updateName, address: updateAddress, age: updateAge },
    { new: true }
  );
});

app.delete("/deleteSingleUser", async (req, res) => {
  const { userToDelete } = req.body;

  await Users.findOneAndDelete({ name: userToDelete });
});

// --------------------ROUTES---------------------------

const PORT = 5000;
app.listen(PORT, () => console.log(`Server up and running at PORT : ${PORT}`));
