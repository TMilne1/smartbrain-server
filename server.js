const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex =require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register')
const profile = require('./controllers/profile')
const signin = require('./controllers/signin')
const image = require('./controllers/image')

db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'TMilne1',
        password: '',
        database: 'smart-brain'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/users', (request, response) => {
    db('users').select('*')
        .then(table => response.json(table))
        .catch(err => console.log(err))
})

app.get('/', (request, response)=>{response.send('this is workng')})
app.post('/signin', (request, response)=>{signin.signingIn(request, response, db, bcrypt)}) 
app.post('/register', (request, response) => {register.handleRegister(request, response, db, bcrypt) }) //dependency injection
app.get('/profile/:id', (request,response) =>{profile.getProfile(request,response, db)} )
app.put('/image', (request, response)=>{ image.putImage(request, response, db) })
app.put('/imageURL', (request,response)=>{image.handleAPICall(request, response)})

console.log(process.env)
app.listen(3001,()=>{ console.log("------------------"); console.log("app is listening on port 3001");});

/*
bcrypt.hash("bacon", null, null, function (err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function (err, res) {
    // res == true
});
*/