const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, `/.env`) });
const cors = require("cors")
const { addSocketId } = require("./functions/addSockId");
const SocketId = require("./models/SocketId")
const connectDB = require("./utils/connectDB");
connectDB('mongodb+srv://calicut:dEF1MLUDhj8mCYQA@boringbots-2v.auedc.mongodb.net/shn');
const io = require('socket.io')(5000, {
    cors: {
        origin: '*'
    }
})

io.on("connection", async socket=>{
    const handshakeData = socket.request;
    console.log("middleware:", handshakeData._query['userId']);
    await addSocketId(handshakeData._query['userId'], socket.id)
})

app.use(cors());
app.use(express.json({
	type: ["application/json", "text/plain"],
}));

app.post('/notify', async(req, res)=>{
    try{
        const {userId, grp, message, userType} = req.body
        const socketIds = await SocketId.find({$or: [{userId: {"$in": userId}}, {grp: {"$in": grp}}, {userType: {"$in": userType}}]})

        if(socketIds.length!==0){
            socketIds.forEach(socketId=>{
                socketId.sockid.forEach(id=>{
                    io.to(id).emit('notify', message)
                })
            })
        }

        return res.status(200).json({
            success: true,
            message: "notify sent",
            data: null
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: `${err.message}`,
            data: null
        })
    }
})

app.listen(5001, () => console.log("Server Running on " + `5001`));