const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
mongoose
  .connect("mongodb://127.0.0.1/jwt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/medicines", requireAuth, (req, res) => res.render("medicines"));
app.use(authRoutes);

//cookies
/*app.get("/set-cookies", (req, res) => {
  // res.setHeader("set-Cookie", "newUser = true");
  res.cookie("newUser", false);
  res.cookie("isEmployee", true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });

  res.send("you got your cookies");
});

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);

  res.json(cookies);
})*/
