import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MetaverseDTO } from './metaverse.dto';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

@WebSocketGateway({cors: true, namespace: 'metaverse'})
export class MetaverseGateway implements OnGatewayConnection, OnGatewayDisconnect{

  constructor(@InjectRedis() private redis: Redis){}
  @WebSocketServer()
  server: Server;
  
  users: MetaverseDTO[];

  clientUserName: {[socketId: string]: string} = {};

  async handleConnection(client: Socket): Promise<void> {
    console.log(this.users)
    const room = 'metaverse';
    this.server.to(client.id).emit('getUsers',this.users);
    const messages = await this.redis.lrange(`chatRoom:${room}`,0,-1);
    this.server.to(client.id).emit('getChat',messages);
  }

  handleDisconnect(client: Socket):void {
    console.log('disconnect',client.id)
    client.leave('metaverse');
    const user_name = this.clientUserName[client.id];
    delete this.clientUserName[client.id];
    if(this.users){
      const index = this.users.findIndex(user => user.user_name === user_name);
      this.users.splice(index,1);
    }
    this.server.to('metaverse').emit('exitRoom',user_name);
  }

  @SubscribeMessage('join')
  join(client: Socket,metaverseDTO: MetaverseDTO): void {
    if(this.users){
      const index = this.users.findIndex(user => user.user_name === metaverseDTO.user_name);
      if(index !== -1){
        this.users[index] = metaverseDTO;
      }else{
        this.users.push(metaverseDTO);
      }
      this.clientUserName[client.id] = metaverseDTO.user_name;
      console.log(client.id);
      client.join('metaverse');
    }else{
      this.users = [];
      this.users.push(metaverseDTO);
      this.clientUserName[client.id] = metaverseDTO.user_name;
      console.log(client.id);
      client.join('metaverse');
    }
      this.server.to('metaverse').emit('joinRoom',metaverseDTO);
  }

  @SubscribeMessage('exit')
  exit(client: Socket,user_name: string): void {
      client.leave('metaverse');
      delete this.clientUserName[client.id];
      const index = this.users.findIndex(user => user.user_name === user_name);
      this.users.splice(index,1);
      delete this.users[user_name];
      this.server.to('metaverse').emit('exitRoom',user_name);
      console.log(client.id);
  }

  @SubscribeMessage('move')
  move(client: Socket,metaverseDTO: MetaverseDTO): void {
    const index = this.users.findIndex(user => user.user_name === metaverseDTO.user_name);
    this.users[index] = metaverseDTO;
    this.server.to('metaverse').emit('move',metaverseDTO);
  }

  @SubscribeMessage('chat')
  async chat(client: Socket,message: string){
    const room = 'metaverse';
    const user_name = this.clientUserName[client.id];
    const final_message = user_name + ": " + message;
    console.log(final_message)
    await this.redis.rpush(`chatRoom:${room}`,final_message);
    const currentLength = await this.redis.llen(`chatRoom:${room}`);
    if(currentLength > 5){
      await this.redis.ltrim(`chatRoom:${room}`, -50, -1);
    }
    this.server.to('metaverse').emit('chat',final_message);
  }
}
