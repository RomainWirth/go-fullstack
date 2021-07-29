const Thing = require('../models/Thing');

exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    const thing = new Thing({
        ...thingObject, // ... = raccourci JS de l'opérateur spread
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // ici on génère le protocole avec l'adresse de l'image de l'image
    });
    thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error })); // error = raccourci JS
};

exports.modifyThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error}));
};

exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ mesage: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error })); 
 };

exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing)) // nouvelle Promise
    .catch(error => res.status(404).json({ error }));
};

exports.getAllThings = (req, res, next) => { // URL Visée par l'application (uniquement l'extension et pas l'URL totale)
    Thing.find()
    .then(things => res.status(200).json(things)) // find retourne une Promise
    .catch(error => res.status(400).json({ error }));
};