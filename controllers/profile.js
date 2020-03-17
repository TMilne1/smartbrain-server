

const getProfile = (request, response, db) => {
    const { id } = request.params

    db('users').select('*').where({ id })
        .then(resp => {
            if (resp.length) {
                console.log(resp[0])
                response.json(resp[0])
            } else {
                response.status(404).json('error retrieving user')
            }
        })
        .catch(err => console.log(err))

}  

module.exports = {
    
    getProfile:getProfile
}
