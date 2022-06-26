const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        pic: {
            type: String,
            required: true,
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
    },
    {
        timestamps: true,
    }
);


userSchema.pre("save", async function(next){
    if(this.isModified("passwod")){
        next()
    }

    const slat = await bcrypt.genSalt(10);
    //this.password = await bcrypt.hash(this.password, slat);

})
/*
userSchema.method("matchPassword", async function (enteredPassword) {
  const res = await bcrypt.compare(enteredPassword, this.password);
  return res;
});*/

userSchema.method("matchPassword", async function (enteredPassword) {
  const res = (enteredPassword == this.password)
  console.log(enteredPassword)
  console.log(this.password);
  return res;
});

const User = mongoose.model("User", userSchema);

module.exports = User;