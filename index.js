/**
 * Importations
 * Express : res (get/post)
 * JWT: sécurité
 * sha256: chiffrage des mot de passes
 * 
 * Manager: relation avec la base de données (Utilisateur, Recette, RecetteLine)
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const passport = require('passport')
const passportJWT = require('passport-jwt')
const jwt = require('jsonwebtoken');
const { Manager } = require('./class/Manager');
const { Recette } = require('./class/Recette');
const { Utilisateur } = require('./class/Utilisateur');
const sha256 = require('js-sha256');
const secret = 'Z3kd4dPl21c';
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

/**
 * Initialisation de la base de données
 */
Manager.url = 'https://cookclico-3218.restdb.io/';
Manager.key = "8bbec6941b2a172f72e32765bcdfb5798d8cd";
const RecetteManager = new Recette();
const UtilisateurManager = new Utilisateur();

passport.use(
  new JwtStrategy(jwtOptions, async function (payload, next) {
    const users = await UtilisateurManager.findAll();
    const result = users.find(user => {
      return user.login == payload.login;
    });

    if (result) {
      next(null, result)
    } else {
      next(null, false)
    }
  })
);

app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true}));
app.use(passport.initialize());
app.use(cors());
app.use(express.json());

/**
 * @route /login
 * @method post
 * @body login, password
 */
app.post('/login', async (req, res) => {
  const data = req.body;
  if (!data.login || !data.password) {
    res.status(401).json({ error: 'Login or password was not provided.' })
    return
  }
  data.password = sha256(data.password);
  const users = await UtilisateurManager.findAll();
  const result = users.find(user => {
    return user.login == data.login && user.password == data.password;
  });
  if (!result) {
    res.status(401).json({ error: 'Login / password do not match.' })
    return
  }
  const userJwt = jwt.sign({ login: result.login }, secret)
  res.json({ jwt: userJwt, user: result })
})

/**
 * @route /register
 * @method post
 * @body login, password
 */
app.post('/register', async (req, res) => {
  const data = req.body;
  if (!data.login || !data.password) {
    res.status(401).json({ error: 'Login or password was not provided.' })
    return
  }
  data.password = sha256(data.password);
  const user = await UtilisateurManager.save(data);
  res.json({})
})

/**
 * Récupère toutes les recettes de la base de données
 * 
 * @route /getRecettes
 * @method get
 */
app.get("/getRecettes", passport.authenticate('jwt', { session: false }), async (req, res) => {
  const list = await RecetteManager.findAll();
  res.json(list);
})

/**
 * Récupère une recette de la base de données
 * 
 * @route /getRecette/:id
 * @method get
 * 
 * @param :id -> recette _id
 */
app.get("/getRecette/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
  const id = req.params?.id;
  const recette = await RecetteManager.find(id);
  res.json({ recette: recette });
})

/**
 * Récupère toutes les recettes en fonction de leur popularité / nombre de likes
 * (plus populaire à la moins populaire)
 * 
 * @route /getRecettesByPopularity
 * @method get
 */
app.get("/getRecettesByPopularity", passport.authenticate('jwt', { session: false }), async (req, res) => {
  const list = await RecetteManager.findAll().then(r => r.sort((a, b) => b.likes - (a.likes)));
  res.json(list);
})

/**
 * Récupère une recette de la base de données de façon aléatoire
 * 
 * @route /getRecetteRandom
 * @method get
 */
app.get("/getRecetteRandom", passport.authenticate('jwt', { session: false }), async (req, res) => {
  const list = await RecetteManager.findAll().then(r => r[Math.floor(Math.random() * r.length)]);
  res.json(list);
})

/**
 * Ajoute une recette à la base de données
 * 
 * @route /postRecette
 * @method post
 * @body nom, description, nbPersonne, lines[](text, qte, typeQte)
 */
app.post("/postRecette", passport.authenticate('jwt', { session: false }), async (req, res) => {
  const data = req.body;
  const recette = await RecetteManager.save(data);
  res.json({ recette: recette });
})

/**
 * Supprime une recette de la base de données
 * 
 * @route /deleteRecette/:id
 * @method get
 * 
 * @param :id -> recette _id
 */
app.get("/deleteRecette/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
  const id = req.params?.id;
  const recette = await RecetteManager.delete(id);
  res.json({ recette: recette });
})

/**
 * Modifie une recette de la base de données
 * 
 * @route /updateRecette/:id
 * @method post
 * @body nom?, description?, nbPersonne?, lines[](text, qte, typeQte)?
 * 
 * @param :id: recette _id
 */
app.post("/updateRecette/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
  const id = req.params?.id;
  const data = req.body;
  const recette = await RecetteManager.update(id, data);
  res.json({ recette: recette });
})

/**
 * Ajoute une recette à la liste des "likes" de l'utilisateur
 * 
 * @route /likeRecette/:id/:user
 * @method get
 * 
 * @param id (recette _id)
 * @param user (utilisateur _id)
 */
app.get("/likeRecette/:id/:user", passport.authenticate('jwt', { session: false }), async (req, res) => {
  const id = req.params?.id;
  const user = req.params?.user;
  const utilisateur = await UtilisateurManager.like(user, id);
  const recette = await RecetteManager.like(id);
  res.json({ user: utilisateur, recette: recette });
})

/**
 * Supprime une recette de la liste des "likes" de l'utilisateur
 * 
 * @route /unlikeRecette/:id/:user
 * @method get
 * 
 * @param id (recette _id)
 * @param user (utilisateur _id)
 */
app.get("/unlikeRecette/:id/:user", passport.authenticate('jwt', { session: false }), async (req, res) => {
  const id = req.params?.id;
  const user = req.params?.user;
  const recette = await RecetteManager.unlike(id);
  res.json({ user: user, recette: recette });
})

app.listen(PORT, function () {
  console.log('API Recipe listening on port ' + PORT)
})