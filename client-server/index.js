const express = require("express")

const app = express()

let PATH = "/build"
let PATH_2 = "/build/index.html"
if (process.env.NODE_ENV !== "production") {
  PATH = "D:/Projects/fn-mondays/user/client/build"
  PATH_2 = "D:/Projects/fn-mondays/user/client/build/index.html"
}

// Serve the static files from the React app
app.use(express.static(PATH))

// Handles any requests that don't match the ones above
app.get("/daddyscummies*", (req, res) => {
  res.sendFile(PATH_2)
})

const port = process.env.PORT || 80
app.listen(port)

console.log("App is listening on port " + port)
