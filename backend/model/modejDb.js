const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
//   bcrypt + mongodb makes auth,reg .ect///////////////////////////
// for register controller
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});
// for authorization controller
userSchema.methods.machPassword = async function (enterdePasword) {
  return await bcrypt.compare(enterdePasword, this.password);
};
/////////////////////////////////////////////////////////////////////

const User = mongoose.model("User", userSchema);
module.exports = { User };
