const db = require('../models')

const User = db.users;

exports.create = (req, res) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.contactNo) {
    res.status(400).send({ message: "firstName, lastName, email and contactNo are mandatory!" })
    return;
  }
  else {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contactNo: req.body.contactNo
    })
    user.save(user).then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something went wrong while creating the user"
      })
    })
  }
}

exports.findAll = (req, res) => {
  User.find().then(data => {
    res.send(data)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Something went wrong while fetching the users"
    })
  })
}

exports.update = (req, res) => {
  if (!req.body){
    res.status(400).send({
      message: "User data cannot be empty"
    })
  }

  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: "user not found"
      })
    } else res.send({message: "user updated successfully" })
  }).catch(err => {
    res.status(500).send({
      message: "error while updating the user"
    })
  })
}

exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
  .then(data => {
    if (!data)  {
      res.status(404).send({
        message: "user not found cannot be deleted"
      })
    } else {
      res.send({
        message: "User deleted successfully"
      })
    }
  }).catch(err => {
    res.status(500).send({
      message: "cannot delete the user"
    })
  })
}