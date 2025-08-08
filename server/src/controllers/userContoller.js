const User = require('../models/userModel')
const handleResponse = require('../utils/handleResponse')


exports.getUsers = async (req , res) => {
    try {
        const data = await User.find()
        handleResponse(res , 200 , 'User Fetched Successfully' , data )
    } catch (err) {
        handleResponse(res , 500 ,  'Internal server error')
    }
}


