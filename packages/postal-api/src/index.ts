import { AxiosInstance } from 'axios';
import sendMessage, { SendMessage } from './endpoints/sendMessage';
import createPostalClient from './postal-client';

export default class PostalAPI {
  private client: AxiosInstance;

  constructor(baseURL: string, apiKey: string) {
    this.client = createPostalClient(baseURL, apiKey);
  }

  sendMessage(message: SendMessage): Promise<void> {
    return sendMessage(this.client, message);
  }
}
