/*
Basic NodeJs and ExpressJs Assignment
----------------------------------------------------------------------------------------------------------------------------
Problem statement -
Create a REST api for a blog application. This blog backend should have following APIs
-
1) API to create a blog
2) API to view all blogs
3) API to view a particular blog
4) API to edit a blog
5) API to delete a blog

----------------------------------------------------------------------------------------------------------------------------
- Create middlewares and libraries wherever you feel is required. 
- Extra marks will be given for careful structuring of the project and quality of code. You have to follow all the
guidelines taught in the sessions.
- Host this code in a github repository as well and send the link of that repository in the
submission.
- Handle all error cases carefully to make sure that your nodejs application doesn’t crash.
- 
Technologies to be used ​- NodeJs, ExpressJs and MongoDB
------------------------------------------------------------------------------------------------------------------------------
Evaluation Basis
This project will be evaluated on following basis -
1) Quality of JavaScript code - Your application's Javascript code should be optimized to
be readable with proper indentation and comments. It should be broken down into
functions for better maintainability and it should not contain any logical bugs.
2) Intuitive Thinking - ​You have thinking intuitively and make the website as easy to
understand as possible. You have think about all the possible error cases and you have
to handle them by giving proper response to user.
3) Originality of code - ​Your code will be checked for plagiarism and if it's not original, it
will be discarded with a negative skill score.
-------------------------------------------------------------------------------------------------------------------------------
Deliverables from Candidate
1) Compressed Folder containing all your code.
2) A text file containing the link of your github repository.
Create a folder containing all these deliverables. Compressed all these into a ZIP/RAR format
and then upload it in the assignment page.
------------------------------------------------------------------------------------------------------------------------------
render in html
*/

//Basic modules requires to create a REST API.
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Gulpfile task for assigment of port value.
var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

//Configure MongoDB server settings and error handling.

var url = 'mongodb://127.0.0.1:27017/myAPI';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', function (err) {
	console.log('Check your MongoDB url in app.js. MongoDB server is default connected on ' + url + '. ' + 'Connection Error: ' + err)
});

db.once('open', function () {
	console.log('MongoDB server is connected on ' + url);
});

// Importing a blog model from a different source path.
var Blog = require('./model/blogModel');

// Creating a bunch of routes in blogRoutes.js. Sending blogModel as a paramter.
var blogRouter = require('./src/routes/blogRoutes')(Blog);

// To divert all routes beginning with /api.
app.use('/api', blogRouter);

//Home page of my API
app.get('/', function (req, res) {
	res.send('Welcome to my REST API project. Gulp task is running on this Project: Execute gulp command for auto-restart of node server.');
});

//Server should be listening to any requests coming in.
app.listen(port, function (err) {
	console.log('Gulp task is configured in this Project. Execute <gulp> command for auto-restart of node server. Node Server is now connected on your localhost on port: ' + port);
});
