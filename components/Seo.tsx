import type { NextPage } from 'next'
import Head from "next/head";

interface Props {
    title: string;
}

const Seo: NextPage<Props> = ({ title }) => {
  return (
    <Head>
      <title>{title} | Next Movies</title>
    </Head>
  )
}

export default Seo
