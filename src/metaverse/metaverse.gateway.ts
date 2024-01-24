import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors: true, namespace: 'metaverse'})
export class MetaverseGateway implements OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer()
  server: Server;
  
  users: { [user_name: string]: {}} = {};
  clientUserName: {[socketId: string]: string} = {};

  handleConnection(client: Socket): void {
    this.server.to(client.id).emit('getUsers',this.users);
  }

  handleDisconnect(client: Socket):void {
    console.log('disconnect',client.id)
    client.leave('metaverse');
    const user_name = this.clientUserName[client.id];
    delete this.clientUserName[client.id];
    delete this.users[user_name];
    this.server.to('metaverse').emit('exitRoom',user_name);
  }

  @SubscribeMessage('join')
  join(client: Socket,user_name: string,position: {}): void {
      this.users[user_name] = position;
      this.clientUserName[client.id] = user_name;
      console.log(client.id);
      client.join('metaverse');
      this.server.to('metaverse').emit('joinRoom',{ user_name, position });
  }

  @SubscribeMessage('exit')
  exit(client: Socket,user_name: string): void {
      client.leave('metaverse');
      delete this.clientUserName[client.id];
      delete this.users[user_name];
      this.server.to('metaverse').emit('exitRoom',user_name);
      console.log(client.id);
  }

  @SubscribeMessage('move')
  move(client: Socket,user_name: string,position: {}): void {
    this.server.to('metaverse').emit('move',{ user_name, position });
  }
}
