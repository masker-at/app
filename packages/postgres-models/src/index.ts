import { CreateUser1628796351766 } from './migrations/1628796351766-CreateUser';
import { CreateSession1628878788829 } from './migrations/1628878788829-CreateSession';
import { AddEmailVerificationDefaultValues1629040110842 } from './migrations/1629040110842-AddEmailVerificationDefaultValues';
import { AddUserIDToSession1629056597404 } from './migrations/1629056597404-AddUserIDToSession';
import { CreateAlias1629310809804 } from './migrations/1629310809804-CreateAlias';

export const migrations = [
  CreateUser1628796351766,
  CreateSession1628878788829,
  AddEmailVerificationDefaultValues1629040110842,
  AddUserIDToSession1629056597404,
  CreateAlias1629310809804,
];
export { default as User } from './entities/User';
export { default as Session } from './entities/Session';
export { default as Alias } from './entities/Alias';
