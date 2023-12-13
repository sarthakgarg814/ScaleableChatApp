import { Server } from "socket.io";

class SocketService{
    private _io:Server;

    constructor(){
        this._io=new Server();
    }
    get IO(){
        return this._io;
    }
}