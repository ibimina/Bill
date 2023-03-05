import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import { Invoice } from '@/input/Input'
import { Invoicee } from '@/models/invoice'


const inter = Inter({ subsets: ['latin'] })
export default function Home() {

  const [invoice, setInvoice] = useState<Invoicee>(Invoice)
  const removeItem = (e: React.MouseEvent, desc: string) => {
    e.preventDefault()
    setInvoice({ ...invoice, itemlist: invoice.itemlist.filter((item) => item.description !== desc) })
  }
  function handleForm(e: React.FormEvent) {
    e.preventDefault()
    let form = e.target as HTMLFormElement
    let formData = new FormData(form)
    let data = Object.fromEntries(formData.entries())
console.log(data,invoice)

  }
  const saveItem = (e: React.MouseEvent) => {
    e.preventDefault()
    let item = e.target as HTMLButtonElement
    let val = item.parentElement?.parentElement?.querySelectorAll('input')!
    let data = Object.fromEntries(Array.from(val).map((item) =>
      item.type === 'number' ? [item.name, +item.value] : [item.name, item.value]))

    setInvoice({ ...invoice, itemlist: [...invoice.itemlist, data] })
    val.forEach((item) => item.value = "")
  }
  return (
    <>
      <Head>
        <title>Invoice</title>
        <meta name="description" content="Generate Invoice" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form className={styles.form} onSubmit={handleForm}>
        <section className={styles.invoice}>
          <div className={styles.address}>
            <textarea name="from" cols={30} rows={10} placeholder={'Your Company or Name\nAddress'} value={invoice.from} onChange={(e) => {
              setInvoice({ ...invoice, from: e.target.value })
            }
            }></textarea>
            <textarea name="billto" cols={30} rows={10} placeholder="Your customer's billing address" value={invoice.billto} onChange={(e) => {
              setInvoice({ ...invoice, billto: e.target.value })
            }
            }></textarea>
          </div>
          <div className={styles.invoice_info}>
            <input type="file" name="logo"  onChange={(e)=>{
              setInvoice({ ...invoice, logo: e.target.files![0] })
            }
              }/>
              
            <input type="text" name='Invoice' placeholder='Invoice number' value={invoice.Invoice} onChange={(e) => {
              setInvoice({ ...invoice, Invoice: e.target.value })
            }
            } />
            <input type='text' name='po' placeholder="Purchase Order" value={invoice.po} onChange={(e) => {
              setInvoice({ ...invoice, po: e.target.value })
            }
            } />
            <input type="date" name="date" value={invoice.date} onChange={(e) => {
              setInvoice({ ...invoice, date: e.target.value })
            }
            } />
          </div>
        </section>
        {invoice.itemlist.map((item, index) => (
          <div key={item.description}>
            <p>{item.description}</p>
            <button onClick={(e) => removeItem(e, item.description)}>remove</button>
          </div>
        )
        )}
        <section className={`${styles.invoice_itemlist} inv`}>
          <section className={styles.invoice_item}>
            <input type='text' name="description" placeholder="Description" />
            <input type='number' name='unit' placeholder="0.0" className={styles.num} />
            <input type='number' name='quantity' placeholder="Qunatity" className={styles.num} />
            <input type='number' name='Amount' placeholder="0.0" className={styles.num} />
            <div>
              <button onClick={saveItem}>save item</button>
              <button onClick={saveItem}>Add tax</button>
            </div>
          </section>
        </section>
        <div className={styles.calwrap}>
          <div className={styles.cal}>
            <p>Subtotal</p>
            <p>vat</p>
            <p>GrandTotal</p>
          </div>
        </div>
        <button>Generate</button>
        <section className={styles.seal}>
          <textarea name="Terms" cols={30} rows={10} placeholder="optional" value={invoice.Terms} onChange={(e) => {
            setInvoice({ ...invoice, Terms: e.target.value })
          }
          }></textarea>
          <input type="file" name="signature"   onChange={(e) => {
            setInvoice({ ...invoice, signature : e.target.files![0]  })
          }} />
        </section>
      </form>
      <div>


      </div>
    </>
  )
}


