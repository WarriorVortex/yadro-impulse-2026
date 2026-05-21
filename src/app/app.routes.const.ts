/* Root user route segment */
export const USER_ROUTE = 'users';

/* Route parameter name for user ID */
export const USER_ID_PARAM = 'id';

/* Static routes */
export const USER_LIST_ROUTE = USER_ROUTE;
export const USER_NEW_ROUTE = `${USER_ROUTE}/new`;

/* Helper functions for dynamic paths */
export const getUserDetailRoute = (id: number | string): string =>
  `${USER_ROUTE}/${id}`;
export const getUserEditRoute = (id: number | string): string =>
  `${USER_ROUTE}/${id}/edit`;

/* Route patterns for router configuration */
export const USER_DETAIL_ROUTE = getUserDetailRoute(`:${USER_ID_PARAM}`);
export const USER_EDIT_ROUTE = getUserEditRoute(`:${USER_ID_PARAM}`);
