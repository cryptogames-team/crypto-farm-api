import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors: true, namespace: 'metaverse'})
export class MetaverseGateway implements OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer()
  server: Server;

  constructor(private room: string){this.room = 'metaverse'}
  users: { [user_name: string]: {}} = {}

  handleConnection(client: Socket): void {
    console.log('connect')
  }

  handleDisconnect(client: Socket):void {
    console.log('disconnect')
  }

  @SubscribeMessage('join')
  join(client: Socket,user_name: string,position: {}): void {
      this.users[user_name] = position;
      client.join(this.room);
  }

  @SubscribeMessage('exit')
  exit(client: Socket,user_name: string): void {
      client.leave(this.room);
      delete this.users[user_name];
  }
}
