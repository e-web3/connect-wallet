import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [account, setAccount] = useState('')
  // Connect Wallet
  const connectWallet = async () => {
    try {
      const { ethereum } = window
      if (typeof ethereum != 'undefined') {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        })
        if (accounts.length > 0) {
          setAccount(accounts[0])
        } else {
          console.warn('You have to install Metamask!!!')
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window
      if (typeof ethereum != 'undefined') {
        const accounts = await ethereum.request({
          method: 'eth_accounts',
        })
        if (accounts.length > 0) {
          setAccount(accounts[0])
        } else {
          console.warn('You have to install Metamask!!!')
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  // check if metamask is connected
  useEffect(() => {
    isWalletConnected()
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        {account ? (
          <p>{account}</p>
        ) : (
          <button onClick={connectWallet}>Connect</button>
        )}
      </main>
    </div>
  )
}
