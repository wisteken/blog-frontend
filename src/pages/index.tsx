import React from 'react'
import { GetServerSideProps } from 'next'
import Index, { IndexProps } from '../components/templates/Index'
import config from '../configs/config.json'
import {
  Post,
  TopPage,
  TopPageQuery,
  TopPageQueryVariables,
} from '../graphql/generated/graphql'
import createApolloClient from '../libs/apollo'

export type TopPageProps = {
  posts: Post[]
}

const IndexPage = ({ posts }: TopPageProps): JSX.Element => {
  const props: IndexProps = {
    posts: posts.map((post) => ({
      title: post.title,
      slug: post.slug,
      description: post.description,
      tags: post.tags,
      createdAt: post.createdAt,
      catchImageUrl: post.catchImage
        ? post.catchImage.url
        : '/assets/catch_image.png',
    })),
  }

  return <Index {...props} />
}

export const getServerSideProps: GetServerSideProps = async () => {
  const client = createApolloClient()

  const { data } = await client.query<TopPageQuery, TopPageQueryVariables>({
    query: TopPage,
    variables: {
      limit: config.postsPerPage,
      skip: 0,
    },
  })

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      posts: data.posts,
    },
  }
}

export default IndexPage
