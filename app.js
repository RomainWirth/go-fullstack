const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

let db_name = "Project_0";
let db_user = "RomWIR";
let db_pwd = "M0ng0_DB-OCR21";

mongoose.connect('mongodb+srv://' + db_user + ':' + db_pwd + '@cluster0.kjtph.mongodb.net/' + db_name + '?retryWrites=true&w=majority',
    { useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie (' + db_name + ') - ' + Date.now() ))
    .catch((mongo_error) => console.log('Connexion à MongoDB échouée !\n' + mongo_error));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;