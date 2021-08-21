import { Alias } from '@masker-at/postgres-models';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const serializeAlias = ({ id, name, address, isActive, createdAt }: Alias) => ({
  id,
  name,
  address,
  isActive,
  createdAt: createdAt.toISOString(),
});
export default serializeAlias;
