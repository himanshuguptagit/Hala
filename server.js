var express = require('express');
var logger = require('morgan');
const mongoose = require('mongoose');

var userRouter = require('./Routes/users.routes');

var app = express();

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// const dbURI = process.env.dbURI;
const dbURI = `mongodb+srv://root:root@cluster0.hjhlx.mongodb.net/Hala?retryWrites=true&w=majority`;
mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Database Connected"))
	.catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use('/users', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(err.status || 404).json({
    message: "No such route exists"
  })
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: "Error Message"
  })
});

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Hala app listening at http://%s:%s", host, port)
})