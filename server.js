//import express
const exp = require("express");
const app = exp();

const axios = require('axios');
//import express async handler
const asyncHandler=require("express-async-handler")
//import express handlebars
const exphbs=require("express-handlebars")
//configure
app.engine('handlebars',exphbs());
app.set('view engine','handlebars')








//get emps
app.get("/getemps/page/:pageno/size/:size",asyncHandler(async(req,res,next)=>{
  //get pageno and size
  let pageno=req.params.pageno;
  let size=req.params.size;

  let limit=(+size)
  let skip=(pageno-1)*size;
  //make http get to end point
  let emps=await axios.get("http://dummy.restapiexample.com/api/v1/employees")

  let selectedEmps=emps.data.data.splice(skip,limit)


  res.render("emp",{"emp":selectedEmps})
}))
app.get("/users",asyncHandler(async(req,res,next)=>{
  let users=await axios.get("https://jsonplaceholder.typicode.com/users")
  //console.log(users.data)
  res.render("users",{"users":users.data})
}))
app.get("/posts",asyncHandler(async(req,res,next)=>{
  let posts=await axios.get("https://jsonplaceholder.typicode.com/posts")
  //console.log(posts.data)
  res.render("posts",{"posts":posts.data})
}))
app.get("/comments",asyncHandler(async(req,res,next)=>{
  let comments=await axios.get("https://jsonplaceholder.typicode.com/comments")
  //console.log(comments.data)
  res.render("comments",{"comments":comments.data})
}))






//assign port number
port=process.env.port
app.listen(port, ()=>{console.log(`Web server started at ${port}..`)})