export interface IChatMessageDto {
  time: string;
  userId: number;
  content: string;
  id: number;
  type: 'message';
}
