const bcrypt = require('bcrypt');

const User = require('../models/User');

exports.signup = (req, res, next) => { // fonction signup
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error}));
};

exports.login = (req, res, next) => { // fonction login
    User.findOne({ email: req.body.email }) // on recherche un utilisateur qui correspond à la base de donnée entrée
    .then(user => {
        if (!user) { // si le nom ne correspond pas à un présent dans la BDD : retourne une erreur et un message
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password) // on compare le MDP entré avec le hash entré dans la BDD
        .then(valid => {
            if (!valid) { // si comparaison pas bonne : retourne une erreur et un message
                return res.status(401).json({ error: 'Mot de passe incorrect !' });            
            }
            res.status(200).json({ // si tout est OK on renvoie à l'utilisateur son user id et un TOKEN 
                userId: user._id,
                token: 'TOKEN' // (= chaîne de caractères pour l'instant mais c'est le TOKEN D'authentification)
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};