class Channel {
  private _id: string[];
  private _channel: string[];

  constructor() {
    this._id = [];
    this._channel = [];
  }

  get id(): string[] {
    return this._id;
  }

  get channel(): string[] {
    return this._channel;
  }

  set id(id: string[]) {
    this._id = id;
  }

  set channel(channel: string[]) {
    this._channel = channel;
  }

  add(id: string, channel: string): void {
    this._id.push(id);
    this._channel.push(channel);
  }

  remove(id: string): void {
    const index = this._id.indexOf(id);
    if (index !== -1) {
      this._id.splice(index, 1);
      this._channel.splice(index, 1);
    }
  }
}

export default Channel;
