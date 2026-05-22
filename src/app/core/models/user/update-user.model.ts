import { User } from './user.model';

export type UpdateUser = Omit<User, 'id'>;
