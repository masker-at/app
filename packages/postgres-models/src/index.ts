import { CreateUser1628796351766 } from './migrations/1628796351766-CreateUser';
import { CreateSession1628878788829 } from './migrations/1628878788829-CreateSession';
import { AddEmailVerificationFields1629006727222 } from './migrations/1629006727222-AddEmailVerificationFields';

export const migrations = [
  CreateUser1628796351766,
  CreateSession1628878788829,
  AddEmailVerificationFields1629006727222,
];
export { default as User } from './entities/User';
export { default as Session } from './entities/Session';
