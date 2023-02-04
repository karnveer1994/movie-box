const express = require('express');
const cors = require('cors')
const PORT = process.env.PORT || 5000;
const movies =  require('./movies.json')
const db = require('./models')

db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to db")
}).catch((err) => {
  console.log("cannot connect to the db", err);
  process.exit()
})

const server = express();

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(cors({
  origin: "http://localhost:3000"
}))

require("./routes/user.routes")(server);

server.get("/api/movies", (req, res) => {
  res.status(200).send(movies)
})


server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
cors