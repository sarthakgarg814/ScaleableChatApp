import { Redis } from "ioredis";
class RedisService{
     private publishCon:Redis;
     private subscribeCon:Redis;
     private _channel:string;

     constructor(){
         console.log(process.env._redis_host)
        this.publishCon=new Redis({
            host:process.env._redis_host,
            port:Number(process.env._redis_port),
            username:process.env._redis_username,
            password:process.env._redis_password,
            tls:{
               rejectUnauthorized:false
            }
        });
        this.subscribeCon=new Redis({         
         host:process.env._redis_host,
         port:Number(process.env._redis_port),
         username:process.env._redis_username,
         password:process.env._redis_password,
        tls:{
         rejectUnauthorized:false
      }});
        this._channel='';
     }



     get publishConnection(){
        return this.publishCon;
     }
     get subscribeConnection(){
        return this.subscribeCon;
     }

     public async publishMessage(message:string,channel?:string){
       await this.publishCon.publish(channel?channel:this._channel,message);
     }

     public setChannelForSubscribe(channel:string){
        this.subscribeCon.subscribe(channel);
        this._channel=channel;
     }

}

export default RedisService;