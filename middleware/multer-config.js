// installation du package multer : npm install --save multer
// création d'un dossier images qui va recueillir les images
// et ici la création du middleware

const multer = require('multer'); // importation de multer

const MIME_TYPES = { // création des extensions possibles pour les fichiers via un dictionnaire
    'images/jpg': 'jpg',
    'images/jpeg': 'jpg',
    'images/png': 'png'
};

// création d'un objet de configuration pour multer appelé storage
const storage = multer.diskStorage({ // diskStorage = fonction de multer qui permet d'enregistrer sur le disque
    //besoin de 2 éléments à l'objet de configuration : destination et nom du fichier
    destination: (req, file, callback) => { // = fonction qui explique à multer dans quel dossier enregistrer les fichiers 
        callback(null, 'images') // 3 arguments : requête (req), file (fichier), et callback appelé directement
    }, // callback : null = pas d'erreur à ce niveau là, et 'images' = deuxième argument est le nom du dossier
    filename: (req, file, callback) => { // = fonction qui explique à multer quel nom de fichier utiliser
        const name = file.originalname.split(' ').join('_'); // création du nom = partie avant l'extension
        // utilisation du nom original du fichier, puis on supprime les expaces pour les remplacer par des '_' (split et join)
        const extension = MIME_TYPES[file.mimetype]; // extension du fichier grâce à mime_type (voir const plus haut)
        callback(null, name + Date.now() + '.' + extension); // appel du callback
        // callback : null = pas d'erreur à ce niveau là, on ajoute le nom créé au dessus, un timestamp, et l'extension du fichier
    }
});

module.exports = multer({storage: storage}).single('image'); // exportation du middleware multer complètement configuré
// méthode multer avec l'objet storage, et single pour signifier qu'il s'agit d'un fichier unique