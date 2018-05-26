import LIST_ITEMS from './list_items';

export const LISTS = {
  items: LIST_ITEMS,
  itemPreview: null,
  itemView: null,
};

export const AUTH = {
  isAuthenticated: false,
  accessToken: null,
  authorizeUri: '',
};

export const ROSTER = {
  role: null,
  pseudonym: null,
  students: [],
  teachers: [],
};
