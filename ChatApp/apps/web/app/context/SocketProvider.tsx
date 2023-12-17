'use client'
import React, { useCallback, useContext, useEffect, useState } from "react"
import { io,Socket  } from "socket.io-client"

interface SocketProviderProps{
    children?:React.ReactNode
}

interface ISocketContext{
    sendMessage:(msg:string)=>any,
    socket:undefined|Socket;

}   

const SocketContext=React.createContext<ISocketContext|null>(null);

export const useSocket=()=>{
    const state=useContext(SocketContext);
    if(!state) throw new Error('State is not defined');
    return state;
}

export const SocketProvider: React.FC<SocketProviderProps>=({children})=>{
    const [socket,setSocket]=useState<Socket>();

    const sendMessage:ISocketContext['sendMessage']=useCallback((msg)=>{

        if(socket){
            socket.emit("event:message",{message:msg})
        }
    },[socket]);


    useEffect(()=>{
        const _socket=io('http://localhost:8080');
        setSocket(_socket);
        
        
        return ()=>{
            _socket.disconnect();
            _socket.off("message");
            setSocket(undefined ); }; 
    },[])
    return (
        <SocketContext.Provider value={{sendMessage,socket}}>
            {children}
        </SocketContext.Provider> 
    )
}