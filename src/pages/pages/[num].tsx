import React from 'react'
import { GetServerSideProps } from 'next'
import Index, { IndexProps } from '../../components/templates/Index'
import config from '../../configs/config.json'
import {
  Post,
  TopPage,
  TopPageQuery,
  TopPageQueryVariables,
} from '../../graphql/generated/graphql'
import createApolloClient from '../../libs/apollo'

export type PageProps = {
  posts: Post[]
  currentPage: number
  countPages: number
}

const Page = ({ posts }: PageProps): JSX.Element => {
  const props: IndexProps = {
    posts: posts.map((post) => {
      return {
        title: post.title,
        slug: post.slug,
        description: post.description,
        tags: post.tags,
        createdAt: post.sys.firstPublishedAt,
        catchImageUrl: post.catchImage.url,
      }
    }),
  }
  return <Index {...props} />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const client = createApolloClient()
  const num = Array.isArray(query.num) ? query.num[0] : query.num

  const { data } = await client.query<TopPageQuery, TopPageQueryVariables>({
    query: TopPage,
    variables: {
      skip: (parseInt(num) - 1) * config.postsPerPage,
      limit: config.postsPerPage,
    },
  })
  const countPages = (data.allSlugs.items.length - 1) / config.postsPerPage + 1

  return {
    props: {
      posts: data.posts.items,
      countPages: countPages,
      currentPage: parseInt(num),
    },
  }
}

export default Page
