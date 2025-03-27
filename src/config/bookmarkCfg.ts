export interface TagInterface {
  id: string;
  name: string;
  isRename?: boolean;
  associatedTagIds?: any;
  iconUrl?: string;
  bookmarkList?: [];
  associatedTagList?: { id: string; name: string }[];
  [key: string]: any;
}

export type BaseOptions = {
  label: string;
  value: any;
};

export enum RoleEnum {
  VISITOR = 'visitor',

  Root = 'root',

  ADMIN = 'admin',
}
