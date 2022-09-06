const express=require("express");
const app=express();
const port=process.env.PORT || 3000;

//Routing
app.get("/",(req,res)=>{
    // res.send("hello") //html
    res.render("index") //we cannot render the file only we have to configure it too as express doesnt konw anything about hbs
    

})

//create Server
app.listen(port,(err)=>{
    if(err)
    throw err
    else 
    console.log(`server is running at port ${port}`)
})