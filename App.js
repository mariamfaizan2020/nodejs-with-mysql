const express=require("express");
const app=express();
const port=process.env.PORT || 3000;
const mysql=require("./connection").con

//configurtaion
//app.set("variable name","value")--dont chnage the value of vareiable value
app.set("view engine","hbs");
app.set("views","./view")
app.use(express.static(__dirname + "/public"))

//Routing
app.get("/",(req,res)=>{
    // res.send("hello") //html
    //render function  will convert our hbs file comlptely inn html
    res.render("index") //we use res.render when usisng hbs file but we cannot render the file only we have to configure it too as express doesnt konw anything about hbs
});
app.get("/add",(req,res)=>{
    res.render("add")
});
app.get("/search",(req,res)=>{
    res.render("search")
});
app.get("/update",(req,res)=>{
    res.render("update")
});
app.get("/delete",(req,res)=>{
    res.render("delete")
});
app.get("/view",(req,res)=>{
    res.render("view")
});
app.get("/addstudent",(req,res)=>{
   //fetching data from form
  const {name,phone,email,gender}=req.query
  //sanitization ASS..
  let qry="select * from students where emailid=? or phoneno=?"
  mysql.query(qry,[email, phone],(err,results)=>{
      if (err) throw err
      else{
      if(results.length>0){
        res.render("add",{checkmesg:true})
      }else{
          //insert query
          let qry2="insert into students values(?,?,?,?)";
          mysql.query(qry2,[name,phone,email,gender],(err,results)=>{
              if(results.affectedRows>0){
                  res.render("add",{mesg:true})
              }
          })
      }
      }
  })
});

app.get("/searchstudent",(req,res)=>{
    //fetch data form form 
    const {phone}=req.query
    let qry="select * from students where phoneno=?"
    mysql.query(qry,[phone],(err,results)=>{
        if(err) throw err
        else{
            if(results.length>0){
                res.render( "search",{mesg1:true,mesg2:false})
            }else{
                res.render( "search",{mesg1:false,mesg2:true})
            }
        }
    })
})

app.get("/updatesearch",(req,res)=>{
    //fetch data form form 
    const {phone}=req.query
   
    let qry="select * from students where phoneno=?";
    mysql.query(qry,[phone],(err,results)=>{
        if(err) throw err
        else{
            if(results.length>0){
                res.render( "update",{mesg1:true,mesg2:false,data:results})
              
            }else{
                res.render( "update",{mesg1:false,mesg2:true})
            }
        }
    })
})

app.get("/updatestudent",(req,res)=>{
    //fetch data
    const {name,gender,phone}=req.query

    let qry="update students set username=?,gender=? where phoneno=?";
    mysql.query(qry,[name,phone,gender],(err,results)=>{
        if(err) throw err
        else{
            if(results.affectedRows>0){
                res.render("update",{umesg:true})
            }
        }
    })
})
//create Server
app.listen(port,(err)=>{
    if(err)
    throw err
    else 
    console.log(`server is running at port ${port}`)
})