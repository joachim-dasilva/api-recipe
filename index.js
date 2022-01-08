const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', function (req, res) {
  res.send('Hello World!')
})

const jwt = require('jsonwebtoken')
const secret = 'thisismysecret'
const users = [{ email: 'joachim.da-silva@etu.umontpellier.fr', password: 'apidae' }]

app.post('/login', (req, res) => {
  console.log(req.body.email)
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    res.status(401).json({ error: 'Email or password was not provided.' })
    return
  }

  // usually this would be a database call:
  const user = users.find(user => user.email === email)

  if (!user || user.password !== password) {
    res.status(401).json({ error: 'Email / password do not match.' })
    return
  }

  const userJwt = jwt.sign({ email: user.email }, secret)

  res.json({ jwt: userJwt })
})

app.listen(PORT, function () {
  console.log('API Recipe listening on port ' + PORT)
})