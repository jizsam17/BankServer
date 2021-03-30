const dataService = require('./services/data.service');
const express=require('express');
const session=require('express-session');
const { Session } = require('express-session');
//const {json} = require('express');


const app=express();

app.use(session({
    secret:'randomSecretString',
    resave:false,
    saveUninitialized:false
}))

const logMiddleware=(req,res,next)=>{
    console.log(req.body);
    next()
}

app.use(logMiddleware)

const authMiddleware=(req,res,next)=>{
    if(!req.session.currentUser){
        return res.json({
          status:false,
          statusCode:425,
          message:"Error!! Please Login"
      })
    }
    else{
        next()
    }
}

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("GET Method");
})

app.post("/register",(req,res)=>{
    console.log("Post");
    //console.log(req.body);
    const result= dataService.register(req.body.acno,req.body.username,req.body.password)
    console.log(res.status(result.statusCode).json(result));
    console.log()
})

app.post("/login",(req,res)=>{
    console.log("Post");
    //console.log(req.body);
    const result= dataService.login(req,req.body.acno,req.body.password);
    console.log(res.status(result.statusCode).json(result));
})

app.post("/deposit",authMiddleware,(req,res)=>{
    console.log("Post");
    console.log(req.session.currentUser);
    const result= dataService.deposit(req,req.body.acno,req.body.password,req.body.amt);
    console.log(res.status(result.statusCode).json(result));
})

app.post("/withdraw",authMiddleware,(req,res)=>{
    console.log("Post");
    //console.log(req.body);
    const result= dataService.withdraw(req,req.body.acno,req.body.password,req.body.amt);
    console.log(res.status(result.statusCode).json(result));
})

app.put("/",(req,res)=>{
    res.send("PUT Method");
})

app.patch("/",(req,res)=>{
    res.send("PATCH Method");
})

app.delete("/",(req,res)=>{
    res.send("DELETE Method");
})

app.listen(3000,()=>{
    console.log("Server Started at 3000");
});

