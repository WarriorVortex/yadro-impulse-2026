import {UpdateUser} from '@app/models';

export type PersonalUserInfo = Omit<UpdateUser, 'address' | 'company'>
