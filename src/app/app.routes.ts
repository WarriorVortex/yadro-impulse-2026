import { Routes } from '@angular/router';
import { UserDetailPageComponent, UserFormPageComponent, UserListPageComponent } from '@app/pages';
import {
  USER_DETAIL_ROUTE,
  USER_EDIT_ROUTE,
  USER_LIST_ROUTE,
  USER_NEW_ROUTE,
  USER_ROUTE,
} from "@app/routes";

export const routes: Routes = [
  { path: '', redirectTo: USER_ROUTE, pathMatch: 'full' },
  { path: USER_LIST_ROUTE, component: UserListPageComponent },
  { path: USER_NEW_ROUTE, component: UserFormPageComponent },
  {
    path: USER_DETAIL_ROUTE,
    component: UserDetailPageComponent,
  },
  {
    path: USER_EDIT_ROUTE,
    component: UserFormPageComponent,
  },
  { path: '**', redirectTo: USER_ROUTE },
];
