/**
 * This file was automatically generated by Nexus 0.11.7
 * Do not make changes to this file directly
 */




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  PostCreateManyWithoutAuthorInput: { // input type
    connect?: NexusGenInputs['PostWhereUniqueInput'][] | null; // [PostWhereUniqueInput!]
    create?: NexusGenInputs['PostCreateWithoutAuthorInput'][] | null; // [PostCreateWithoutAuthorInput!]
  }
  PostCreateWithoutAuthorInput: { // input type
    id?: string | null; // ID
    published?: boolean | null; // Boolean
    title: string; // String!
  }
  PostUpdateInput: { // input type
    author?: NexusGenInputs['UserUpdateOneWithoutPostsInput'] | null; // UserUpdateOneWithoutPostsInput
    published?: boolean | null; // Boolean
    title?: string | null; // String
  }
  PostWhereInput: { // input type
    AND?: NexusGenInputs['PostWhereInput'][] | null; // [PostWhereInput!]
    author?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    id?: string | null; // ID
    id_contains?: string | null; // ID
    id_ends_with?: string | null; // ID
    id_gt?: string | null; // ID
    id_gte?: string | null; // ID
    id_in?: string[] | null; // [ID!]
    id_lt?: string | null; // ID
    id_lte?: string | null; // ID
    id_not?: string | null; // ID
    id_not_contains?: string | null; // ID
    id_not_ends_with?: string | null; // ID
    id_not_in?: string[] | null; // [ID!]
    id_not_starts_with?: string | null; // ID
    id_starts_with?: string | null; // ID
    published?: boolean | null; // Boolean
    published_not?: boolean | null; // Boolean
    title?: string | null; // String
    title_contains?: string | null; // String
    title_ends_with?: string | null; // String
    title_gt?: string | null; // String
    title_gte?: string | null; // String
    title_in?: string[] | null; // [String!]
    title_lt?: string | null; // String
    title_lte?: string | null; // String
    title_not?: string | null; // String
    title_not_contains?: string | null; // String
    title_not_ends_with?: string | null; // String
    title_not_in?: string[] | null; // [String!]
    title_not_starts_with?: string | null; // String
    title_starts_with?: string | null; // String
  }
  PostWhereUniqueInput: { // input type
    id?: string | null; // ID
  }
  UserCreateInput: { // input type
    email?: string | null; // String
    id?: string | null; // ID
    name: string; // String!
    password: string; // String!
    posts?: NexusGenInputs['PostCreateManyWithoutAuthorInput'] | null; // PostCreateManyWithoutAuthorInput
    role: NexusGenEnums['Role']; // Role!
    verifiedEmail?: boolean | null; // Boolean
  }
  UserCreateWithoutPostsInput: { // input type
    email?: string | null; // String
    id?: string | null; // ID
    name: string; // String!
    password: string; // String!
    role: NexusGenEnums['Role']; // Role!
    verifiedEmail?: boolean | null; // Boolean
  }
  UserUpdateOneWithoutPostsInput: { // input type
    connect?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
    create?: NexusGenInputs['UserCreateWithoutPostsInput'] | null; // UserCreateWithoutPostsInput
    delete?: boolean | null; // Boolean
    disconnect?: boolean | null; // Boolean
    update?: NexusGenInputs['UserUpdateWithoutPostsDataInput'] | null; // UserUpdateWithoutPostsDataInput
    upsert?: NexusGenInputs['UserUpsertWithoutPostsInput'] | null; // UserUpsertWithoutPostsInput
  }
  UserUpdateWithoutPostsDataInput: { // input type
    email?: string | null; // String
    name?: string | null; // String
    password?: string | null; // String
    role?: NexusGenEnums['Role'] | null; // Role
    verifiedEmail?: boolean | null; // Boolean
  }
  UserUpsertWithoutPostsInput: { // input type
    create: NexusGenInputs['UserCreateWithoutPostsInput']; // UserCreateWithoutPostsInput!
    update: NexusGenInputs['UserUpdateWithoutPostsDataInput']; // UserUpdateWithoutPostsDataInput!
  }
  UserWhereInput: { // input type
    AND?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    email?: string | null; // String
    email_contains?: string | null; // String
    email_ends_with?: string | null; // String
    email_gt?: string | null; // String
    email_gte?: string | null; // String
    email_in?: string[] | null; // [String!]
    email_lt?: string | null; // String
    email_lte?: string | null; // String
    email_not?: string | null; // String
    email_not_contains?: string | null; // String
    email_not_ends_with?: string | null; // String
    email_not_in?: string[] | null; // [String!]
    email_not_starts_with?: string | null; // String
    email_starts_with?: string | null; // String
    id?: string | null; // ID
    id_contains?: string | null; // ID
    id_ends_with?: string | null; // ID
    id_gt?: string | null; // ID
    id_gte?: string | null; // ID
    id_in?: string[] | null; // [ID!]
    id_lt?: string | null; // ID
    id_lte?: string | null; // ID
    id_not?: string | null; // ID
    id_not_contains?: string | null; // ID
    id_not_ends_with?: string | null; // ID
    id_not_in?: string[] | null; // [ID!]
    id_not_starts_with?: string | null; // ID
    id_starts_with?: string | null; // ID
    name?: string | null; // String
    name_contains?: string | null; // String
    name_ends_with?: string | null; // String
    name_gt?: string | null; // String
    name_gte?: string | null; // String
    name_in?: string[] | null; // [String!]
    name_lt?: string | null; // String
    name_lte?: string | null; // String
    name_not?: string | null; // String
    name_not_contains?: string | null; // String
    name_not_ends_with?: string | null; // String
    name_not_in?: string[] | null; // [String!]
    name_not_starts_with?: string | null; // String
    name_starts_with?: string | null; // String
    password?: string | null; // String
    password_contains?: string | null; // String
    password_ends_with?: string | null; // String
    password_gt?: string | null; // String
    password_gte?: string | null; // String
    password_in?: string[] | null; // [String!]
    password_lt?: string | null; // String
    password_lte?: string | null; // String
    password_not?: string | null; // String
    password_not_contains?: string | null; // String
    password_not_ends_with?: string | null; // String
    password_not_in?: string[] | null; // [String!]
    password_not_starts_with?: string | null; // String
    password_starts_with?: string | null; // String
    posts_some?: NexusGenInputs['PostWhereInput'] | null; // PostWhereInput
    role?: NexusGenEnums['Role'] | null; // Role
    role_in?: NexusGenEnums['Role'][] | null; // [Role!]
    role_not?: NexusGenEnums['Role'] | null; // Role
    role_not_in?: NexusGenEnums['Role'][] | null; // [Role!]
    verifiedEmail?: boolean | null; // Boolean
    verifiedEmail_not?: boolean | null; // Boolean
  }
  UserWhereUniqueInput: { // input type
    email?: string | null; // String
    id?: string | null; // ID
  }
}

export interface NexusGenEnums {
  Aliment: "Error" | "Frites" | "Poulet"
  PostOrderByInput: "id_ASC" | "id_DESC" | "published_ASC" | "published_DESC" | "title_ASC" | "title_DESC"
  Role: "ADMIN" | "USER"
}

export interface NexusGenRootTypes {
  AuthPayload: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: {};
  Post: { // root type
    id: string; // ID!
    published: boolean; // Boolean!
    title: string; // String!
  }
  Query: {};
  Test: { // root type
    id: string; // ID!
    lol: string; // String!
  }
  User: { // root type
    email?: string | null; // String
    id: string; // ID!
    name: string; // String!
    password: string; // String!
    role: NexusGenEnums['Role']; // Role!
    verifiedEmail: boolean; // Boolean!
  }
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  PostCreateManyWithoutAuthorInput: NexusGenInputs['PostCreateManyWithoutAuthorInput'];
  PostCreateWithoutAuthorInput: NexusGenInputs['PostCreateWithoutAuthorInput'];
  PostUpdateInput: NexusGenInputs['PostUpdateInput'];
  PostWhereInput: NexusGenInputs['PostWhereInput'];
  PostWhereUniqueInput: NexusGenInputs['PostWhereUniqueInput'];
  UserCreateInput: NexusGenInputs['UserCreateInput'];
  UserCreateWithoutPostsInput: NexusGenInputs['UserCreateWithoutPostsInput'];
  UserUpdateOneWithoutPostsInput: NexusGenInputs['UserUpdateOneWithoutPostsInput'];
  UserUpdateWithoutPostsDataInput: NexusGenInputs['UserUpdateWithoutPostsDataInput'];
  UserUpsertWithoutPostsInput: NexusGenInputs['UserUpsertWithoutPostsInput'];
  UserWhereInput: NexusGenInputs['UserWhereInput'];
  UserWhereUniqueInput: NexusGenInputs['UserWhereUniqueInput'];
  Aliment: NexusGenEnums['Aliment'];
  PostOrderByInput: NexusGenEnums['PostOrderByInput'];
  Role: NexusGenEnums['Role'];
}

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: { // field return type
    createDraft: NexusGenRootTypes['Post']; // Post!
    createUser: NexusGenRootTypes['User']; // User!
    deletePost: NexusGenRootTypes['Post'] | null; // Post
    login: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    publish: NexusGenRootTypes['Post'] | null; // Post
    signup: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    testoss: NexusGenRootTypes['Test']; // Test!
    updatePost: NexusGenRootTypes['Post'] | null; // Post
  }
  Post: { // field return type
    author: NexusGenRootTypes['User'] | null; // User
    id: string; // ID!
    published: boolean; // Boolean!
    title: string; // String!
  }
  Query: { // field return type
    drafts: NexusGenRootTypes['Post'][]; // [Post!]!
    feed: NexusGenRootTypes['Post'][]; // [Post!]!
    me: NexusGenRootTypes['User'][]; // [User!]!
    post: NexusGenRootTypes['Post'] | null; // Post
    postsByUser: NexusGenRootTypes['Post'][]; // [Post!]!
  }
  Test: { // field return type
    id: string; // ID!
    lol: string; // String!
  }
  User: { // field return type
    email: string | null; // String
    id: string; // ID!
    name: string; // String!
    password: string; // String!
    posts: NexusGenRootTypes['Post'][] | null; // [Post!]
    role: NexusGenEnums['Role']; // Role!
    verifiedEmail: boolean; // Boolean!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createDraft: { // args
      authorId?: string | null; // ID
      title?: string | null; // String
    }
    createUser: { // args
      data: NexusGenInputs['UserCreateInput']; // UserCreateInput!
    }
    deletePost: { // args
      where: NexusGenInputs['PostWhereUniqueInput']; // PostWhereUniqueInput!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    publish: { // args
      id?: string | null; // ID
    }
    signup: { // args
      email: string; // String!
      name: string; // String!
      password: string; // String!
    }
    testoss: { // args
      aliment?: NexusGenEnums['Aliment'] | null; // Aliment
    }
    updatePost: { // args
      data: NexusGenInputs['PostUpdateInput']; // PostUpdateInput!
      where: NexusGenInputs['PostWhereUniqueInput']; // PostWhereUniqueInput!
    }
  }
  Query: {
    post: { // args
      where: NexusGenInputs['PostWhereUniqueInput']; // PostWhereUniqueInput!
    }
    postsByUser: { // args
      email?: string | null; // String
    }
  }
  User: {
    posts: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenEnums['PostOrderByInput'] | null; // PostOrderByInput
      skip?: number | null; // Int
      where?: NexusGenInputs['PostWhereInput'] | null; // PostWhereInput
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "AuthPayload" | "Mutation" | "Post" | "Query" | "Test" | "User";

export type NexusGenInputNames = "PostCreateManyWithoutAuthorInput" | "PostCreateWithoutAuthorInput" | "PostUpdateInput" | "PostWhereInput" | "PostWhereUniqueInput" | "UserCreateInput" | "UserCreateWithoutPostsInput" | "UserUpdateOneWithoutPostsInput" | "UserUpdateWithoutPostsDataInput" | "UserUpsertWithoutPostsInput" | "UserWhereInput" | "UserWhereUniqueInput";

export type NexusGenEnumNames = "Aliment" | "PostOrderByInput" | "Role";

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}