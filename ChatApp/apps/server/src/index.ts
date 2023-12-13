import http from 'http'

async function initServer(){
    const httpServer:http.Server =http.createServer();
    const PORT:(String|number) = process.env.PORT ? process.env.PORT : 8080

    httpServer.listen(PORT,()=>{
        console.log(`Server Started on Port:${PORT}`);
    })

}
initServer();