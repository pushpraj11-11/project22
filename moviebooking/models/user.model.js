const mongoose =require('mongoose');

const obj1 = new mongoose.Schema({
id:{
    type:Number,
    required:true
},
discountValue:{
    type:Number,
    required:true
}

})

const obj2 = new mongoose.Schema({
    reference_number :{
        type:Number,
        required:true
    },
    coupon_code:{
        type:Number,
        required:true
    },
    show_id:{
        type:Number,
        required:true
    },
    tickets:[Number]
})


const UserSchema =  mongoose.Schema({
userid:{
    type:Number,
    required:true
},
email:{
    type:String,
    required:true
},
first_name:{
    type:String,
    required:true
},
last_name:{
    type:String,
    required:true
},
username:{
    type:String,
    required:true
},
contact:{
    type:Number,
    required:true
},
password:{
    type:String,
    required:true
},
role:{
    type:String,
    required:true
},
isLoggedIn :{
    type:Boolean,
    required:true
},
uuid:{
    type:String,
    required:true
},
accesstoken:{
    type:String,
    required:true
},
coupens:[obj1],
bookingRequests:[obj2]
})

module.exports = UserSchema;