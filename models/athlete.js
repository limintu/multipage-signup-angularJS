let mongoose = require('mongoose');

let athleteSchema = mongoose.Schema({
  name: String,
  dob: Date,
  nationality: String,
  location: String,
  association: String,
  team: String,
  gender: String,
  about: String
});


let Athlete = mongoose.model("Athlete", athleteSchema);
module.exports = Athlete;
