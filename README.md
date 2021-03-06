# Cookclico API

Cette API a été conçue pour le site **Cookclico**.
Elle permet de gérer les différentes données de ce dernier notamment les **recettes** et les **utilisateurs**.

> https://dsv-api-recipe.herokuapp.com Url d'utilisation
> Sécurisation JWT: Token nécessaire dans le header pour utiliser l'API

## TOKEN JWT

 1. Créer un compte
>/register | Method POST (body: login & password)
2. Récupérer le token JWT
> /login | Method POST (body: login & password)
> return Token

## GET

 1. Récupérer la liste des recettes
 >/getRecettes
 2. Récupérer une recette
 >/getRecette/:id
 3. Récupérer les recettes avec le plus de likes
 >/getRecettesByPopularity
 4. Récupérer une recette aléatoire
 >/getRecetteRandom
 5. Supprimer une recette
 >/deleteRecette/:id
 6. Aimer une recette
 >/likeRecette/:id/:user
 7. Ne plus aimer une recette
 >/unlikeRecette/:id/:user

## POST

 1. Ajouter une recette
> /postRecette | nom, description, nbPersonne, lines
 2. Modifier une recette
 >/getRecette/:id | nom?, description?, nbPersonne?, lines?

<br>
Par Judicaël Terrisse & Joachim Da Silva, Licence APIDAE 2022
