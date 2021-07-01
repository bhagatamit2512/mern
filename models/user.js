const mongoose=require('mongoose');
const crypto=require('crypto');
const { v4: uuidv4 } = require("uuid");


 const { Schema } = mongoose; 

 const userSchema = new Schema(
   {
     name: {
       type: String,
       required: true, 
       maxlength: 32,
       trim: true,
     },
     lastName: {
       type: String,
       maxlength: 32,
       trim: true,
     },
     email: {
       type: String,
       trim: true,
       required: true,
       unique: true,
     },
     userinfo: {
       type: String,
       trim: true,
     },
     encry_password: {
       type: String,
       required: true,
     },
     salt: String,  //use for password
     // role is for admin or user ,higher the number more privilege is given
     role: {
       type: Number,
       default: 0,
     },
     purchases: {
       type: Array,
       default: [],
     },
   },
   { timestamps: true }
 );


 userSchema.virtual("password")       //we will refer as password but in db it will save as encry_password
  .set(function(password){
      this._password=password  //private variable
      this.salt=uuidv4();
      this.encry_password=this.securePassword(password)
  })
  .get(function(){
      return this._password
  })

  
userSchema.methods={

    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },
    //converting plain password to encrypted password
    securePassword: function(plainpassword){
        if(!plainpassword) return "";
        try {
            return crypto.createHmac('sha256',this.salt)
            .update(plainpassword)
            .digest('hex');
        } catch (error) {
            return " ";
            
        }
    }
}

 module.exports=mongoose.model("User", userSchema)