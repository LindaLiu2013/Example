

import bodyParser from "body-parser";
import express from "express";
import * as path from 'path';
import http from 'http';

const express_graphql = require('express-graphql');
const {graphql, buildSchema } = require('graphql');


/*const fs = require('fs')
let courseData = {}
fs.readFile('./db/courses.json', 'utf-8', (err, data) => {
  if (err) throw err

  courseData = JSON.parse(data)
});*/



const axios = require('axios');

const app = express()

const router = require('./routes/Routes');

const searchParam=require('./api/searchparam');

const port = process.env.PORT || 5000;

app.set('port', 5000)

app.use(express.static(path.join(__dirname, '..', 'build', 'static')))
app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.get('/api/hello', (req, res) => {
  res.send('ggdfgfdg');
});

app.get('/test', (req, res) => {
  res.send('ggdfgfdg');
});

app.get('/api/serviceProviders', (req, res)=>{

  const requestOptions = {
    method: 'get',
    url: 'http://ultvm-linda-v2:8080/api/searchparam',
    headers: { 'accept': 'application/json',
               'Authorization': 'Bearer '+  req.query.token
            }
  };

  /*axios(requestOptions)
  .then(function (response) {
     console.log(response.data);
     res.status(200).send(response.data);
  })
  .catch(function (error) {
     console.log(error);
     res.send(error)
   });*/

 searchParam.getServiceProvider().then(function(results) {
     res.send(results);
 })
 .catch(function(err) {
     res.status(400).send(err);
 });

});

app.get('/api/xerodata', (req, res)=>{

  searchParam.getXeroData().then(function(results) {
      res.send(results);
  })
  .catch(function(err) {
      res.status(400).send(err);
  });

});

app.post('/api/auth', (req, res)=>{

  console.log(JSON.stringify({ username: req.body.username }));

  const requestOptions = {
    method: 'post',
    url: 'http://ultvm-linda-v2:8080/api/Authentication',
    headers: { 'Content-Type': 'text/json' },
    data: {
      username: req.body.username
    }
  };

//res.status(200).send(req.body.username);

axios(
  requestOptions
)
.then(function (response) {
   console.log(response.data);
   res.status(200).send(response.data);
})
.catch(function (error) {
   console.log(error);
   res.send(error)
 });

});

/*app.get('/', (req, res, next) => {
    console.log('Reading the main route through http request, sending index.html');
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})*/

app.use(router);

/*var schema = buildSchema(`
  type Query {
    hello: String
  }
`);*/


// GraphQL schema
var schema = buildSchema(`
  type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);


const coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]

const getCourse = function(args) {
    var id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
}

const getCourses = function(args) {
    if (args.topic) {
        var topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    } else {
        return coursesData;
    }
}

const root = {
  course: getCourse,
  courses: getCourses
};

/*const root = { hello: () => 'Hello world!' };*/

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

/*graphql(schema, '{ hello }', root).then((response) => {
  console.log(response);
});*/

const server = http.createServer(app)
server.listen(app.get('port'), () => {
    console.log('express listening on port ' + app.get('port'))
})
