require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const port = process.env.PORT;

const app = express();

//Create Connections

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "student",
});

//connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connection done");
});

//create DB

app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE student";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("result");
    res.json("Database Created");
  });
});

//create table

app.get("/createposttable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int PRIMARY KEY AUTO_INCREMENT,fname VARCHAR(255),lname VARCHAR,email VARCHAR(255),title VARCHAR(255),body VARCHAR(255))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("result");
    res.json("Posts table crated");
  });
});

/*add post by id*/
app.get("/addpost/:id", (req, res) => {
  let post = {fname: "Doe", lname: "John", email: "johndoe@gmail.com", title: "student", body: "This is our student" };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log("result");
    res.json("Post 1 added");
  });
});

//Insert post 2
app.get("/addpost2", (req, res) => {
  let post = {fname: "Robert", lname: "Willis", email: "RobertGWillis@phantomkiss.com", title: "student", body: "This is our student" };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log("result");
    res.json("Post 2 added");
  });
});

//Select posts
app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json("posts fetched");
  });
});

//Select single post
app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id= ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json("single post fetched");
  });
});

//Update post
app.get("/updatepost/:id", (req, res) => {
  let newTitle = "updated title";
  let sql = `UPDATE posts SET title= '${newTitle}' WHERE id=${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json("post updated");
  });
});

//Delete post
app.get("/deletepost/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id=${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("result");
    res.json("Post deleted");
  });
});

app.listen(port, () => {
    console.log(`Server is listening ${port}`);
});
