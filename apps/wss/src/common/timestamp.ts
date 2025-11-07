export class Timestamp {
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  update() {
    this.updatedAt = new Date();
  }
}
