import { User } from '@app/models';

export interface FilterUsersParams {
  search: string;
}

export type UserFilterPredicate = (
  user: User,
  params: FilterUsersParams,
) => boolean;
