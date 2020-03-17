

const signingIn = (request, response,db, bcrypt) => {
    const { email, password } = request.body
    db('login').select('email', 'hash').where('email', '=', email)
        .then(resp => {
            if (bcrypt.compareSync(password, resp[0].hash)) {
                db('users').select('*').where('email', '=', email)
                    .then(user => {
                        response.json(user[0])
                    })
                    .catch(err => response.status(400).json('error getting user'))
            } else {
                response.status(400).json('wrong credentials');
            }

        })
        .catch(err => response.status(400).json('wrong credentials'))


}

module.exports ={
    signingIn:signingIn
}