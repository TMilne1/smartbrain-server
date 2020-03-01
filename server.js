const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());

const database = {
    users: [
        {
            id:123,
            name:"jonh",
            email:"john@gmail.com",
            password:"cookies",
            entries:"0",
            joined: new Date()
        },
        {
            id: 124 ,
            name: "sally",
            email: "sally@gmail.com",
            password: "bananas",
            entries: "0",
            joined: new Date()
        }
    ],

}


app.get('/', (request, response)=>{
    response.send('this is workng')
})

app.post('/signin',(request,response)=>{
    if (request.body.email === database.users[0].email 
        &&
        request.body.password===database.users[0].password ){
        response.json("success")
    }else{
        response.status(400).json("Error Logging in")
    }

})

app.post('/register', (request,response)=>{
    let users = database.users
    users.forEach(element => {
        if(element.email === request.body.email){
            response.json("That user is already registered")
        }
    });
    users.push(
        {
            id:users[users.length-1].id + 1,
            name: request.body.name || '',
            email: request.body.email,
            password: request.body.password,
            entries: "0",
            joined: new Date()
        }
    )
    response.json(database)
})

app.get('/profile/:id',(request,response)=>{
    database.users.forEach(element=>{
        if(element.id.toString() === request.params.id){
            response.json(element)
        }
    })
    response.json('user does not exist')
}   )

app.put('/image', (request,response)=>{
    let numOfEntries;
    database.users.forEach(element => {
        if (element.id.toString() === request.body.id) {
            element.entries ++;
            numOfEntries = element.entries
        }
    })
    response.json(numOfEntries)

})

app.listen(4000,()=>{
    console.log("------------------")
    console.log("app is listening on port 4000")
});