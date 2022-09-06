const express=require("express");
const app=express();
const port=process.env.PORT || 3000;

//Routing
app.get("/",(req,res)=>{
    res.send("hello") //html
})

//create Server
app.listen(port,(err)=>{
    if(err)
    throw err
    else 
    console.log(`server is running at port ${port}`)
})