const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = 4000;

// Set EJS as view engine
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressLayouts);

// Set default layout
app.set("layout", "layout");

// Routes
app.get("/", (req, res) => {
  res.render("homepage", { title: "Home" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact" });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
