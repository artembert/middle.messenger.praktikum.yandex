export interface IChatMessage {
  time: Date;
  type: string;
  userId: number;
  content: string;
}
