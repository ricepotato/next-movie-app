import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Seo from "../components/Seo"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Seo title="Next Movie App"></Seo>
      <h1>Hello movie app</h1>
    </div>
  )
}

export default Home
