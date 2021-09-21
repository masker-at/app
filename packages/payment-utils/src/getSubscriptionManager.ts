import { User } from '@masker-at/postgres-models';
import PaddleSubscriptionManager from './PaddleSubscriptionManager';
import SubscriptionManager from './SubscriptionManager';

export default function getSubscriptionManager(user: User): SubscriptionManager<unknown> | null {
  if (user.paddleID) {
    return new PaddleSubscriptionManager(user as User & { paddleID: number });
  }
  return null;
}
