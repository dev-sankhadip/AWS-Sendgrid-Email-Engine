const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const env = require('./env/envVariable');
const routes = require('./routes/routes');


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors(env.corsOptions));
app.use('', routes);


app.use("/files", express.static(path.join(__dirname, "view")));

app.listen(env.port, () => {
  console.log(`app listening at ${env.port}`)
})