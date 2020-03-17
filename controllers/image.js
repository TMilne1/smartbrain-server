
const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: 'cf236557d3864e529f2636a040175a08'});

const handleAPICall = (request, response)=>{
    //first input is the model ID - that ID is for Face Detection
    app.models.predict('a403429f2ddf4b49b307e318f00e528b', request.body.input)
    .then(data => {
        console.log(data)
        response.json(data)
    })
    .catch(err=>response.status(500).json('error retrieving image'))
}


const putImage = (request, response, db) => {
    const { id } = request.body
    db('users').where({ id }).increment('entries', 1)
        .returning('entries')
        .then(resp => {
            console.log(resp)
            response.json(resp)
        })
        .catch(err => response.status(404).json('error updating entries'))


}

module.exports ={
    putImage:putImage,
    handleAPICall:handleAPICall
}