const mongoose = require("mongoose");

module.exports = mongoose => {
  var schema = mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    contactNo: {
      type: Number,
      required: true,
      max: 10,
      min: 10
    },
  },
  { timestamps: true })

  schema.method("toJSON", function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object
  })

  const User = mongoose.model('user', schema)
  return User;
}