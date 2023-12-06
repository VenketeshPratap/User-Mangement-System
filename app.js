require('dotenv').config();

const express=require('express');
const expressLayout=require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session =require('express-session');

const connectDB=require('./server/config/db');

const app=express();

//If i am going to use local system then it will be port 800 or 
//if i am hosting it it will be using port num given by server
const port=8000 || process.env.PORT;

//connect to database
connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));

//static files
app.use(express.static('public'));

//express session
app.use(
    session({
        secret:'secret', 
        resave:false,
        saveUninitialized:true,
        cookie:{
            maxAge:1000*60*60*24*7, //1 week
        }
    })
);

//connect flash messages
// Set up connect-flash middleware
app.use(flash());

//Template Engine
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

//Routes
app.use('/',require('./server/routes/customer'));


//Route Home

// app.get('/',(req,res)=>{
//     const locals={
//         title:"NodeJs Application",
//         description:"User Management System"
//     }
//     res.render('index', locals);
// });

//Handle 404
app.get('*',(req,res)=>{
    res.status(404).render('404');
});


app.listen(port,()=>{
    console.log(`App Listening on port ${port}`);
});