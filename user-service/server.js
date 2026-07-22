require("dotenv").config();
const app = require("./app");
const connectDb = require("./config/db");

const PORT = process.env.PORT || 5003;

connectDb();

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
