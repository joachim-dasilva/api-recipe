const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const { RecetteList } = require('./class/RecetteList');
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

const secret = 'Z3kd4dPl21c';
const users = [{ login: 'cookclico', password: 'apidae' }];

app.post('/login', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  if (!login || !password) {
    res.status(401).json({ error: 'Email or password was not provided.' })
    return
  }
  const user = users.find(user => user.login === login)
  if (!user || user.password !== password) {
    res.status(401).json({ error: 'Email / password do not match.' })
    return
  }
  const userJwt = jwt.sign({ email: user.login }, secret)
  res.json({ jwt: userJwt })
})

app.get("/getRecettes", (req, res) => {
  const list = RecetteList.getInstance();
  res.json({recettes: list});
})

app.get("/getRecette/:id", (req, res) => {
  const list = RecetteList.getInstance();
  const id = req.params?.id;
  const recette = list.getRecette(id);
  res.json({recette: recette});
})

app.listen(PORT, function () {
  console.log('API Recipe listening on port ' + PORT)
})