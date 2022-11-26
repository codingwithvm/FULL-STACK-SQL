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

app.get('/', (req, res) => {
    const sqlInsert = "INSERT INTO contact_db(name, email, contact) VALUES ('neymar', 'neymar@neymar.junio', '45865455')"
    db.query(sqlInsert, (err, result) => {
        console.log('error : ' + err)
        console.log('result : ' + result)
        res.send('Hello World, Express')
    })
})

app.listen(5000, () => {
    console.log('server listen on http://localhost:5000')
})