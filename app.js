const express = require("express");
const { evaluate } = require("mathjs");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("calculator");
}); 
app.post("/calculate", (req, res) => {
  try {
    const { expression } = req.body;
    const result = evaluate(expression);

    
    res.json({ result });
  } catch (error) {
    res.json({ result: "Error" });
  }
});


app.listen(3000, () =>
  console.log("i am running in the port 3000")
);