

const handleRegister=(request, response, db, bcrypt) => {
    const { name, email, password } = request.body
    //let Dup = false;
   

    if (email && name && password) {
        const hash = bcrypt.hashSync(password);

        db.transaction(trx => {
            trx.insert({
                email: email,
                hash: hash
            })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            name: name,
                            email: loginEmail[0],
                            joined: new Date()

                        })
                        .then(resp => response.json(resp))

                })
                .then(trx.commit)
                .catch(trx.rollback)

        })
            .catch(err => response.status(400).json('unable to register'))

    } else {
        console.log('unable to register')
        response.status(400).json(false)
    }

}
module.exports = {
    handleRegister:handleRegister
}