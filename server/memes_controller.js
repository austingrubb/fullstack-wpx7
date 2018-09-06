module.exports = {
    // create: (req, res, next) => {
    //     const db = req.app.get('db')

    // }
    getAll: (req, res, next) => {
        const db = req.app.get('db')
        db.get_memes_by_user_id(1).then(memes => {
            res.status(200).send(memes)
        }).catch(error => {
            console.log('error in getAll memes', error)
            res.status(500).send('unknown error')
        })
    },
    getUser: (req, res , next) => {
        const db = req.app.get('db')
        db.get_user_by_auth0_id().then(users => {
            res.status(200).send(users)
        })
    }
}