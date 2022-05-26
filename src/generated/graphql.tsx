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
  login: AuthenticatedUser;
  updateUser: AuthenticatedUser;
};


export type MutationLoginArgs = {
  payload: LoginAuthDto;
};


export type MutationUpdateUserArgs = {
  payload: UpdateAuthDto;
};

export type Query = {
  __typename?: 'Query';
  getSchool: SchoolEntity;
  me: AuthenticatedUser;
};


export type QueryGetSchoolArgs = {
  payload: SchoolPolicyDto;
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
  publicAddress: Scalars['String'];
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'AuthenticatedUser', user: { __typename?: 'UserEntity', uuid: string, username?: string | null, amount: number } } };

export type UpdateUserMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'AuthenticatedUser', user: { __typename?: 'UserEntity', uuid: string, username?: string | null, amount: number } } };

export type GetSchoolQueryVariables = Exact<{
  schoolId: Scalars['String'];
}>;


export type GetSchoolQuery = { __typename?: 'Query', getSchool: { __typename?: 'SchoolEntity', emailPolicy: string } };


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
export const MeDocument = gql`
    query Me {
  me {
    user {
      uuid
      username
      amount
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
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
    query GetSchool($schoolId: String!) {
  getSchool(payload: {schoolId: $schoolId}) {
    emailPolicy
  }
}
    `;

/**
 * __useGetSchoolQuery__
 *
 * To run a query within a React component, call `useGetSchoolQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSchoolQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSchoolQuery({
 *   variables: {
 *      schoolId: // value for 'schoolId'
 *   },
 * });
 */
export function useGetSchoolQuery(baseOptions: Apollo.QueryHookOptions<GetSchoolQuery, GetSchoolQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSchoolQuery, GetSchoolQueryVariables>(GetSchoolDocument, options);
      }
export function useGetSchoolLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSchoolQuery, GetSchoolQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSchoolQuery, GetSchoolQueryVariables>(GetSchoolDocument, options);
        }
export type GetSchoolQueryHookResult = ReturnType<typeof useGetSchoolQuery>;
export type GetSchoolLazyQueryHookResult = ReturnType<typeof useGetSchoolLazyQuery>;
export type GetSchoolQueryResult = Apollo.QueryResult<GetSchoolQuery, GetSchoolQueryVariables>;