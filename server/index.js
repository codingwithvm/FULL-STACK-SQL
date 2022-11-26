const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const cors = require('cors')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'crud_contact'
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// API to query all contacts
app.get('/api/get', (req, res) => {
    const sqlGet = "SELECT * FROM crud_contact.contact_db"
    db.query(sqlGet, (err, result) => {
        if(err) console.log('error : ' + err)
        else res.send(result)
    })
})

// API to insert contact
app.post('/api/post', (req, res) => {
    const { name, email, contact } = req.body
    const sqlInsert = "INSERT INTO contact_db(name, email, contact) VALUES(?, ?, ?)"
    
    db.query(sqlInsert, [name, email, contact], (err, result) => {
        if(err) console.log('error : ' + err)
        else res.send(result)
    })
})

// API to remove contact
app.delete('/api/remove/:id', (req, res) => {
    const { id } = req.params
    const sqlRemove = "DELETE FROM contact_db WHERE id = ?"
    
    db.query(sqlRemove, id, (err, result) => {
        if(err) console.log('error : ' + err)
        else res.send(result)
    })
})

// API to get contact by ID
app.get('/api/get/:id', (req, res) => {
    const { id } = req.params
    const sqlGet = "SELECT * FROM crud_contact.contact_db WHERE id = ?"
    db.query(sqlGet, id, (err, result) => {
        if(err) console.log('error : ' + err)
        else res.send(result)
    })
})

// API to update contact
app.put('/api/update/:id', (req, res) => {
    const { id } = req.params
    const { name, email, contact } = req.body
    const sqlUpdate = "UPDATE crud_contact.contact_db SET name = ?, email = ? ,contact = ? WHERE id = ?"
    db.query(sqlUpdate, [name, email, contact, id], (err, result) => {
        if(err) console.log('error : ' + err)
        else res.send(result)
    })
})

app.get('/', (req, res) => {
    // const sqlInsert = "INSERT INTO contact_db(name, email, contact) VALUES ('neymar', 'neymar@neymar.junio', '45865455')"
    // db.query(sqlInsert, (err, result) => {
    //     console.log('error : ' + err)
    //     console.log('result : ' + result)
    //     res.send('Hello World, Express')
    // })
})

app.listen(5000, () => {
    console.log('server listen on http://localhost:5000')
})