const axios = require("axios");
const { log } = require("console");
const express = require("express");
const PORT=process.env.PORT|3000;
const { URLSearchParams } = require("url");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'))
// bootstrap

app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

app.get("/", (req, res) => {
  res.render("index", { translation: null, error: null });
});
app.post("/translate", async (req, res) => {
  const { text } = req.body;
  const encodedParams = new URLSearchParams();
  encodedParams.set("source_language", 'en');
  encodedParams.set("target_language", 'ml');
  encodedParams.set("text", text);

  const options = {
    method: "POST",
    url: "https://text-translator2.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "00c9e8dd15mshb2cbd0173515e69p1b6190jsn3f5033683f9b",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    data: encodedParams,
  };
  try {
    const response = await axios.request(options);
    res.render("index", {
      translation: response.data.data.translatedText,
      error: null,
    });
  } catch (error) {
    res.render("index", { translation: null, error: "Error fetching text" });
  }
});

app.listen(PORT, () => {
  console.log("Express server started at 3000");
});