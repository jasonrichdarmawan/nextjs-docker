import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { ChakraProvider, Link, LinkBox, LinkOverlay, Text } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()

  const [searchValue, setSearchValue] = useState('')
  const [dictValue, setDictValue] = useState('')

  const handleChange = (event) => {
    setSearchValue(event.target.value)
    if (event.target.value != '') {
      fetchData(event.target.value)
    }
  }

  const fetchData = async (query) => {
    console.log('fetching', `https://somas.godata.id/search?query=${query}`)
    await fetch(`https://somas.godata.id/search?query=${query}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setDictValue(data)
    })
  }

  const listItems = Object.keys(dictValue).map((key) => 
  <LinkBox key={key} w='100%' p='2' borderWidth='1px' rounded='md'>
    <LinkOverlay href={`?symbol=${key}`}>
      <Text>{key} {dictValue[key]}</Text>
    </LinkOverlay>
  </LinkBox>)

  return (
    <ChakraProvider>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Input value={searchValue} onChange={handleChange}/>
          {searchValue != '' && dictValue != '' && 
            <>
              {listItems}
            </>}
          <h1>Symbol {router.query.symbol || "ICBP"}</h1>
        </main>
      </div>
    </ChakraProvider>
  )
}

export async function getServerSideProps(context) {
  console.log(context.query.symbol)
  return {
    props: {}
  }
}