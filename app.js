
const dotenv = require("dotenv");
dotenv.config({ path: `.env` });
require("./configs/db.connection");
const http         = require("http");
const express      = require("express");
const path         = require("path");
const logger       = require("morgan");
const cors             = require("cors");
const helmet       = require("helmet");
const moment       = require("moment");
const flash        = require("connect-flash");

const app          = express();
const port         = process.env.PORT || 3000;
const secret       = process.env.SECRET;
const url          = process.env.URL || "http://localhost";
const swgbaseURL   = process.env.SWIGGERBASEURL || "localhost";
const apiRoutes    = require("./routers/api.router");
// const adminRoutes  = require("./routers/admin.router");
// const socket       = require("./helpers/socket");

// app.use(
//   session({
//     secret: secret,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

app.set("port", port);

app.use(cors());
app.use(flash());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.locals.moment = moment;
app.locals.baseurl = `${url}:${port}`;

app.use(logger("dev"));
app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ extended: true, limit: "150mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use('/api', apiRoutes)

const server = http.createServer(app);
// socket(server);


server.listen(port, () => {
  console.log(`Server is running on ${app.locals.baseurl}`);
});

/*httpsServer.listen(port, function() {
  console.log('Express server listening on ' + app.locals.baseurl);
});*/