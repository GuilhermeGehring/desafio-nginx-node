const { response } = require('express')
const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

app.get('/', (req, res) => {  
  const connection = mysql.createConnection(config)
  let sql = `INSERT INTO people(name) values('Teste')`
  connection.query(sql)

  let content = '<h1>Full Cycle Rocks!</h1>'  
  sql = `SELECT name FROM people`
  connection.query(sql, (err, results) => {    
    if (!err) {              
      Object.keys(results).forEach((key) => {
        content += '<p>- ' + results[key].name +'</p>'        
      });            
    } else {
      res.send(err)
    }
  })
  connection.end(err => {
    res.send(content)
  })
})

app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})