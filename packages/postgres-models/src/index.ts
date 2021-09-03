import { CreateUser1628796351766 } from './migrations/1628796351766-CreateUser';
import { CreateSession1628878788829 } from './migrations/1628878788829-CreateSession';
import { AddEmailVerificationDefaultValues1629040110842 } from './migrations/1629040110842-AddEmailVerificationDefaultValues';
import { AddUserIDToSession1629056597404 } from './migrations/1629056597404-AddUserIDToSession';
import { CreateAlias1629310809804 } from './migrations/1629310809804-CreateAlias';
import { UseCITextForEmail1629316148965 } from './migrations/1629316148965-UseCITextForEmail';
import { AddAliasName1629357438808 } from './migrations/1629357438808-AddAliasName';
import { AddAliasCreatedAt1629549418192 } from './migrations/1629549418192-AddAliasCreatedAt';
import { AddUserHasChangedEmail1629565220241 } from './migrations/1629565220241-AddUserHasChangedEmail';
import { AddLastPasswordResetSentDateDefault1629565835800 } from './migrations/1629565835800-AddLastPasswordResetSentDateDefault';
import { Add2FAProperties1629740761448 } from './migrations/1629740761448-Add2FAProperties';
import { CreateEmail1630698064545 } from './migrations/1630698064545-CreateEmail';

export const migrations = [
  CreateUser1628796351766,
  CreateSession1628878788829,
  AddEmailVerificationDefaultValues1629040110842,
  AddUserIDToSession1629056597404,
  CreateAlias1629310809804,
  UseCITextForEmail1629316148965,
  AddAliasName1629357438808,
  AddAliasCreatedAt1629549418192,
  AddUserHasChangedEmail1629565220241,
  AddLastPasswordResetSentDateDefault1629565835800,
  Add2FAProperties1629740761448,
  CreateEmail1630698064545,
];
export { default as User } from './entities/User';
export { default as Session } from './entities/Session';
export { default as Alias } from './entities/Alias';
export { default as Email } from './entities/Email';
