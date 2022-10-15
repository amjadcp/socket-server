const SocketId = require('../models/SocketId')

module.exports.addSocketId=async(userId, sockid)=>{
    try{
        let socketId = await SocketId.findOne({userId: userId})
        if(!socketId) socketId = await SocketId.create({
            userId: userId,
            sockid: sockid
        })
        else socketId = await SocketId.findOneAndUpdate({userId: userId}, {$push:{sockid}})
    }catch(err){console.log(err);}
    
}