import { VFC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const FetchMain: VFC = () => {
  const { data, loading, error } = useQuery<GetUsersQuery>(GET_USERS, {
    // 毎回最新のデータを取得。キャッシュに保持
    // fetchPolicy: 'network-only',
    // 毎回最新のデータを取得。キャッシュに保持。取得中はキャッシュを表示
    fetchPolicy: 'cache-and-network',
    // 初回は最新のデータを取得。次回からキャッシュのみ。
    // fetchPolicy: 'cache-first',
    // キャッシュを使わない。通常のAPIクライアントと同じ挙動
    // fetchPolicy: 'no-cache',
  })
  if (loading)
    return (
      <Layout title="Hasura fetchPolicy">
        <p>loading...</p>
      </Layout>
    )
  if (error)
    return (
      <Layout title="Hasura fetchPolicy">
        <p>Error: {error.message}</p>
      </Layout>
    )
  return (
    <Layout title="Hasura fetchPolicy">
      <p className="mb-6 font-bold">Hasura main page</p>
      {/* {console.log(data)} */}

      {data?.users.map((user) => {
        return (
          <p className="my-1" key={user.id}>
            {user.name}
          </p>
        )
      })}
      <Link href="/hasura-sub">
        <a className="mt-6">Next</a>
      </Link>
    </Layout>
  )
}
export default FetchMain
