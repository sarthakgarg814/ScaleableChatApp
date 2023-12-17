import { Server, Socket } from "socket.io";
import RedisService from "./redis";

class SocketService{
    private _io:Server;
    private _redis:RedisService;
    private _clientConnection:Socket[]=[];


    constructor(){
        this._io=new Server({
            cors:{
                allowedHeaders:"*",
                origin:"*"
            }
        });
        this._redis=new RedisService();
        this._redis.setChannelForSubscribe("MESSAGES");
    }
    public initListeners(){
        const io=this._io;
        io.on('connect',(socket)=>{

            this._clientConnection.push(socket);

            socket.on('event:message',async({message})=>{
    
                let newMessage={"socketId":socket.id,"message":message};
                let stringMessage=JSON.stringify(newMessage);
                await this._redis.publishMessage(stringMessage,"MESSAGES");
            })
            socket.on('disconnect',async ()=>{
                this._clientConnection=this._clientConnection.filter((user)=>{
                    return socket.id!==user.id;
                })
            })
        } )
        this._redis.subscribeConnection.on('message',(channel,message)=>{
            if(channel=== "MESSAGES"){
                const parsedMessage=JSON.parse(message);
                this._clientConnection.map((user)=>{
                    if(user.id!=parsedMessage.socketId)
                        user.emit('message',parsedMessage.message);
                })
            }
        })
    }
    get IO(){
        return this._io;
    }
}

export default SocketService;