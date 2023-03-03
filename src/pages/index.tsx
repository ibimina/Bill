import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Invoice</title>
        <meta name="description" content="Generate Invoice" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form className={styles.form}>
        <section className={styles.invoice}>
          <div className={styles.address}>
            <textarea name="from" cols={30} rows={10} placeholder={'Your Company or Name\nAddress'}></textarea>
            <textarea name="billto" cols={30} rows={10} placeholder="Your customer's billing address"></textarea>
          </div>
          <div className={styles.invoice_info}>
            <input type="file" name="logo" />
            <input type="text" name='Invoice' placeholder='Invoice number' />
            <input type='text' name='po' placeholder="Purchase Order" />
            <input type="date" name="date" />
          </div>

        </section>
        <section className={styles.invoice_itemlist}>
          <section className={styles.invoice_item}>
            <textarea name="Description" cols={30} rows={2} placeholder="Description"></textarea>
            <input type='number' name='unit' placeholder="0.0" />
            <input type='number' name='quantity' placeholder="Qunatity" />
            <input type='number' name='Amount' placeholder="0.0" />
            <button>Add tax</button>
            <button>remove item</button>
          </section>
        </section>
        <button>Add item</button>
        <div className={styles.calwrap}>
          <div className={styles.cal}>
            <p>Subtotal</p>
            <p>vat</p>
            <p>GrandTotal</p>
          </div>
         
        </div>

        <button>Generate</button>
        <section className={styles.seal}>
          <textarea name="Terms" cols={30} rows={10} placeholder="optional"></textarea>
          <input type="file" name="signature" />
        </section>
      </form>
    </>
  )
}
