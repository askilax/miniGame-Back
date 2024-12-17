# MiniGameApp - Backend

Bienvenue sur le projet **MiniGameApp - Backend** ! Ce dépôt contient le code backend de l'application **MiniGame**, qui gère les fonctionnalités principales côté serveur, y compris l'authentification, la gestion des utilisateurs, et le suivi des scores. Le backend est développé en **Node.js** avec **Express**.

## Table des Matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Technologies Utilisées](#technologies-utilisées)
- [Structure du Projet](#structure-du-projet)
- [Contact](#contact)

## Aperçu

Le backend de **MiniGame** est responsable de fournir les API pour l'authentification des utilisateurs, la gestion des mini-jeux, le stockage des scores, et l'ensemble des services nécessaires pour assurer une expérience utilisateur cohérente et sécurisée.
[Lien vers la vidéo YouTube](https://youtube.com/shorts/iBKZX-3hiOs?feature=share)

## Fonctionnalités

- **API REST** : Fournit des endpoints pour gérer les utilisateurs, les scores, et les statistiques des jeux.
- **Authentification JWT** : Authentification sécurisée avec JSON Web Tokens pour protéger les endpoints sensibles.
- **Gestion des Utilisateurs** : Inscription, connexion, et gestion des profils utilisateurs.
- **Suivi des Scores** : Stocke et met à jour les scores des joueurs pour suivre leur progression.

## Prérequis

Avant de commencer, assure-toi d'avoir installé les éléments suivants :

- **Node.js** (version 14 ou supérieure)
- **MongoDB** : Base de données pour stocker les données utilisateurs et scores
- **Yarn** ou **npm** pour la gestion des dépendances

## Installation

Clone le dépôt et installe les dépendances nécessaires :

```bash
git clone https://github.com/askilax/MiniGame-Back.git
cd MiniGame-Back
npm install
```

Lance le serveur :

```bash
npm start
# ou avec yarn
yarn start
```


## Technologies Utilisées

- **Node.js** et **Express** : Pour le développement du serveur backend.
- **MongoDB** avec **Mongoose** : Base de données NoSQL pour stocker les informations des utilisateurs et des scores.
- **JWT** : Pour l'authentification des utilisateurs et la sécurisation des sessions.
- **argon2** : Pour le hachage sécurisé des mots de passe des utilisateurs.

## Structure du Projet

Voici un aperçu des dossiers principaux :

```bash
MiniGame-Back/
├── bin/              # Configuration de l'application
├── models/           # Schémas de base de données
├── routes/           # Définition des routes API
├── middleware/       # Middlewares (authentification, validation, etc.)
├── .env              # Variables d'environnement
├── app.js            # Point d'entrée principal
└── package.json      # Configuration npm
```

## Contact

Pour toute question, suggestion ou collaboration, vous pouvez me contacter via :

- **Email** : [maximesbaizero@gmail.com](mailto\:maximesbaizero@gmail.com)
- **GitHub** : [Maxime Sbaizero](https://github.com/askilax)

Merci d'avoir pris le temps de découvrir le backend de **MiniGame** !

---

© 2024 MiniGame - Tous droits réservés.
