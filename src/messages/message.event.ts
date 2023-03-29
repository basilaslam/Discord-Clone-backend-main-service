export class Chat {
  receiverId: string;
  senderId: string;

  constructor(body) {
    this.receiverId = body.receiverId;
    this.senderId = body.senderId;
  }
}
