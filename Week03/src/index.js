import dotenv from "dotenv";
import cors from "cors";
import express from "express";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World! GIFIFIFIFI");
});

app.post("/api/v1/users/signup", handleUserSignup);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
