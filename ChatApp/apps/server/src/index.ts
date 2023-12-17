require('dotenv').config()
    

import http from 'http'
import SocketService from './services/socket';


async function initServer(){
    const Socket=new SocketService();
    const httpServer:http.Server =http.createServer();
    const PORT:(String|number) = process.env.PORT ? process.env.PORT : 8080

    Socket.IO.attach(httpServer);
    httpServer.listen(PORT,()=>{
        console.log(`Server Started on Port:${PORT}`);
    })
    Socket.initListeners();
}
initServer();