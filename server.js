// require('dotenv').config()
// if(procees.env.NODE_ENV!=='production'){
//     require('dotenv').parse()
// }
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').parse()
//   }
const express= require('express')
const app=express();
const expressLayouts= require('express-ejs-layouts')
const mongoose=require('mongoose')
const bodyParser=require("body-parser")


const indexRouter=require("./routes/index")
const authorRouter=require("./routes/authors")

app.set('view engine','ejs')
app.set('views',__dirname+'/views');
app.set('layout','layouts/layout')


app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb',extended:true}))

const DATABASE_URL="mongodb+srv://ayushmittal:ayush123@cluster0.zka7z.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(DATABASE_URL,{useNewUrlParser: true})

const db=mongoose.connection

db.on('error',error => console.error(error))
db.once('open',()=>console.log('Connected to Mongoose'))


app.use("/",indexRouter)
app.use("/authors",authorRouter)


app.listen(process.env.PORT || 3000)