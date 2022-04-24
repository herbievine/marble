import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AuthenticatedUser = {
  __typename?: 'AuthenticatedUser';
  jwt: Scalars['String'];
  user: UserEntity;
};

export type LoginAuthDto = {
  schoolId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  getSchool: SchoolEntity;
  login: AuthenticatedUser;
  updateUser: AuthenticatedUser;
};


export type MutationGetSchoolArgs = {
  payload: SchoolPolicyDto;
};


export type MutationLoginArgs = {
  payload: LoginAuthDto;
};


export type MutationUpdateUserArgs = {
  payload: UpdateAuthDto;
};

export type Query = {
  __typename?: 'Query';
  sayHello: Scalars['String'];
};

export type SchoolEntity = {
  __typename?: 'SchoolEntity';
  createdAt: Scalars['DateTime'];
  emailPolicy: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  users?: Maybe<Array<UserEntity>>;
};

export type SchoolPolicyDto = {
  schoolId: Scalars['String'];
};

export type UpdateAuthDto = {
  username: Scalars['String'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  amount: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  didToken: Scalars['String'];
  school: SchoolEntity;
  schoolId: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  username?: Maybe<Scalars['String']>;
  uuid: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  schoolId: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthenticatedUser', user: { __typename?: 'UserEntity', uuid: string, username?: string | null, amount: number } } };

export type UpdateUserMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'AuthenticatedUser', user: { __typename?: 'UserEntity', uuid: string, username?: string | null, amount: number } } };

export type GetSchoolMutationVariables = Exact<{
  schoolId: Scalars['String'];
}>;


export type GetSchoolMutation = { __typename?: 'Mutation', getSchool: { __typename?: 'SchoolEntity', emailPolicy: string } };


export const LoginDocument = gql`
    mutation Login($schoolId: String!) {
  login(payload: {schoolId: $schoolId}) {
    user {
      uuid
      username
      amount
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      schoolId: // value for 'schoolId'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($username: String!) {
  updateUser(payload: {username: $username}) {
    user {
      uuid
      username
      amount
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetSchoolDocument = gql`
    mutation GetSchool($schoolId: String!) {
  getSchool(payload: {schoolId: $schoolId}) {
    emailPolicy
  }
}
    `;
export type GetSchoolMutationFn = Apollo.MutationFunction<GetSchoolMutation, GetSchoolMutationVariables>;

/**
 * __useGetSchoolMutation__
 *
 * To run a mutation, you first call `useGetSchoolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetSchoolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getSchoolMutation, { data, loading, error }] = useGetSchoolMutation({
 *   variables: {
 *      schoolId: // value for 'schoolId'
 *   },
 * });
 */
export function useGetSchoolMutation(baseOptions?: Apollo.MutationHookOptions<GetSchoolMutation, GetSchoolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetSchoolMutation, GetSchoolMutationVariables>(GetSchoolDocument, options);
      }
export type GetSchoolMutationHookResult = ReturnType<typeof useGetSchoolMutation>;
export type GetSchoolMutationResult = Apollo.MutationResult<GetSchoolMutation>;
export type GetSchoolMutationOptions = Apollo.BaseMutationOptions<GetSchoolMutation, GetSchoolMutationVariables>;