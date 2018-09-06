module.exports = {
  // create: (req, res) => {
  //   const db = req.app.get('db');
  //   db.create_user
  // }
  getAll: (req, res) => {
    const db = req.app.get('db');
    db.get_memes_by_user_id(1).then(memes => {
      res.status(200).send(memes);
    }).catch(error => {
      console.log('error in getAll memes', error);
      res.status(500).send('Unexpected error occurred');
    });
  }
}