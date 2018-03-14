let mongoose = require('mongoose');

let athleteSchema = mongoose.Schema({
  name: String,
  dob: Date,
  gender: String,
  nationality: String,
  location: String,
  association: String,
  team: String,
  sports: [],
  about: String
});


let Athlete = mongoose.model("Athlete", athleteSchema);
module.exports = Athlete;
