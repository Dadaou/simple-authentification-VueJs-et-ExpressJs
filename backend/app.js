const express = require("express")
const app = express()
const mysql = require("mysql")
const bcrypt = require("bcrypt")
const generateAccessToken = require("./token.js")
const generateRefreshToken = require("./token.js")

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, USE, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbUser'          
})
db.getConnection((err, connection)=> { 
    if (err) throw (err)
   console.log ("DB connected successful: " + connection.threadId)
})

app.post("/createUser", async (req,res) => { 
    const user = req.body.user;
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    db.getConnection( async (err, connection) => { 
        if (err) throw (err) 
        const sqlSearch = "SELECT * FROM userTable WHERE user = ?"
        const search_query = mysql.format(sqlSearch,[user]) 
        const sqlInsert = "INSERT INTO userTable VALUES (0,?,?)"
        const insert_query = mysql.format(sqlInsert,[user, hashedPassword])
  
        await connection.query (search_query, async (err, result) => {  
        if (err) throw (err)
        console.log("------> Search Results")
        console.log(result.length)  

            if (result.length != 0) {
            connection.release()
            console.log("------> User already exists")
            res.send("L'utilisateur existe déjà") 
        } 

        else {
        await connection.query (insert_query, (err, result)=> {   
        connection.release()   
        if (err) throw (err)
        console.log ("--------> Created new User")
        console.log(result.insertId)
        res.send("Compte créee")
      })
     }
    
    }) 
})
}) 


app.post("/login", (req, res)=> { 
    
    const user = req.body.user
    const password = req.body.password

     db.getConnection ( async (err, connection)=> { if (err) throw (err)
     const sqlSearch = "Select * from userTable where user = ?"
     const search_query = mysql.format(sqlSearch,[user]) 

     await connection.query (search_query, async (err, result) => {  
      connection.release()    
      if (err) throw (err)  
      if (result.length == 0) {
        console.log("--------> User does not exist")
        res.send("L'utilisateur n'existe pas!")
      } 
      else {
        const hashedPassword = result[0].password
         //get the hashedPassword from result    
        if (await bcrypt.compare(password, hashedPassword)) {
        console.log("---------> Login Successful")
        console.log("---------> Generating accessToken")
        const token = generateAccessToken({user: user})
        const refreshToken = generateRefreshToken({user: user})
        console.log(refreshToken)
        res.send(token)
       } 
        else {
        console.log("---------> Password Incorrect")
        res.send("Mot de passe incorrecte!")
        } 
  }
}) 
}) 
}) 

app.listen(process.env.PORT)