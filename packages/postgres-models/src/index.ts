import { CreateUser1628796351766 } from './migrations/1628796351766-CreateUser';
import { CreateSession1628878788829 } from './migrations/1628878788829-CreateSession';

export const migrations = [CreateUser1628796351766, CreateSession1628878788829];
export { default as User } from './entities/User';
export { default as Session } from './entities/Session';
