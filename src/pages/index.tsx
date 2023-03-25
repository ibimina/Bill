import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import { Invoice } from '@/input/Input'
import { useRouter } from 'next/router'
import { Item } from '@/models/invoice'


export default function Home() {
  const [invoice, setInvoice] = useState(Invoice)
  const router = useRouter()

  const removeItem = (e: React.MouseEvent, item:Item) => {
    e.preventDefault()
    let subtotal = invoice.subtotal - item.Amount
    let vat = subtotal * invoice?.tax?.taxrate
    let total = subtotal + vat
   
    setInvoice({ ...invoice,subtotal,vat,total, itemlist: invoice.itemlist.filter((item) => item.description !== item.description) })
  }
  function handleForm(e: React.FormEvent) {
    e.preventDefault()
    localStorage.setItem("invoice", JSON.stringify(invoice))
    router.push("/invoice")
  }

  const saveItem = (e: React.MouseEvent) => {
    e.preventDefault()
    let val = document.querySelectorAll('.item_input')! as NodeListOf<HTMLInputElement>
    let data = Object.fromEntries(Array.from(val).map((item) =>
      item.type === 'number' ? [item.name, +item.value] : [item.name, item.value]))
    let Amount = data.quantity * data.unit
    let newItem = {
      ...data, Amount
    }
    let subtotal = invoice.itemlist.reduce((acc, curr) => acc + curr.Amount, 0) + newItem.Amount
    let vat = subtotal * invoice.tax.taxrate
    let total = subtotal + vat
    setInvoice((prevInvoice) => {
      if (invoice.tax.taxrate) {
        return { ...prevInvoice, subtotal, vat, total, itemlist: [...invoice.itemlist, newItem] }

      } else {
        return { ...prevInvoice, subtotal, total, itemlist: [...invoice.itemlist, newItem] }

      }
    })
    console.log(invoice, newItem, data, vat, total, data.quantity, subtotal, invoice.tax.taxrate)
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
        <div className={styles.formwrapper}>
          <section className={styles.invoice}>
            <div className={styles.address}>
              <label className={styles.label}><div className={styles.flex}>  <Image src='/assets/person.png' width={30} height={35} alt='person' />
                <span className={styles.capitalize}>From</span></div>
                <textarea name="from" cols={30} rows={10} placeholder={'Your Company or Name\nAddress'} value={invoice.from}
                  onChange={(e) => {
                    setInvoice({ ...invoice, from: e.target.value })
                  }} required></textarea>
              </label>
              <label className={styles.label}>
                <div className={styles.flex}>  <Image src='/assets/people.png' width={35} height={35} alt='a group ofpeople' />
                  <span className={styles.capitalize}>Bill to</span></div>
                <textarea name="billto" cols={30} rows={10} placeholder="Your customer's billing address" value={invoice.billto} onChange={(e) => {
                  setInvoice({ ...invoice, billto: e.target.value })
                }} required></textarea>
              </label>

            </div>
            <div className={styles.invoice_info}>
              <label className={styles.logo_wrap}>
                <div>
                  <Image className={styles.bri} src='/assets/upload.png' width={50} height={100} alt='upload' />
                  <span className={styles.capitalize}> upload logo</span>
                </div>
                <input type="file" name="logo"
                  className={styles.logo_input}
                  onChange={(e) => {
                    setInvoice({ ...invoice, logo: e.target.files![0] })
                  }} />
              </label>

              <label className={styles.label}>
                <span className={styles.capitalize}>invoice #</span>
                <input type="text" name='Invoice' placeholder='Invoice number'
                  className={styles.input}
                  value={invoice.invoicenum} onChange={(e) => {
                    setInvoice({ ...invoice, invoicenum: e.target.value })
                  }} required />
              </label>
              <label className={styles.label}>
                <span className={styles.capitalize}>po</span>
                <input type='text'
                  className={styles.input}
                  name='po' placeholder="Purchase Order" value={invoice.po} onChange={(e) => {
                    setInvoice({ ...invoice, po: e.target.value })
                  }
                  } />
              </label>
              <label className={styles.label}>
                <span className={styles.capitalize}>invoice date</span>
                <input type="date"
                  className={styles.input}
                  name="date" value={invoice.date} onChange={(e) => {
                    setInvoice({ ...invoice, date: e.target.value })
                  }} required />
              </label>
            </div>
          </section>

          {invoice?.itemlist.length > 0 && <table className={styles.table}>
            <thead>
              <tr>
                <td className={styles.td}>SNO</td>
                <td>Description</td>
                <td>Quantity</td>
                <td>Unit price</td>
                <td>Amount</td>
              </tr>
            </thead>
            <tbody>
              {invoice?.itemlist?.map((item, index) => (
                <tr key={index}>
                  <td className={styles.td}>{index + 1}</td>
                  <td className={styles.td}>{item.description}</td>
                  <td className={styles.td} >{item.quantity}</td>
                  <td className={styles.td}>{item.unit}</td>
                  <td className={styles.td}>{item.Amount}
                    <button onClick={(e) => removeItem(e, item)}
                      className={styles.remove}
                      aria-label="remove item" ></button>
                  </td>
                </tr>
              )
              )}
            </tbody>
          </table>}

          <section className={`${styles.invoice_itemlist}`}>
            <input type='text' name="description" className={`${styles.input} item_input`} placeholder="Description" required />
            <input type='number' name='quantity' placeholder="Quantity" className={`${styles.input} item_input`} required />
            <input type='number' name='unit' placeholder="0.0" required className={`${styles.input} item_input`} />
            <div>
              <button onClick={saveItem} className={`${styles.btn} ${styles.add}`}>save item</button>

            </div>
          </section>
          <div className={`${styles.tax} tax`}>
            <input type='text' name="tax_description" placeholder="Tax Description" />
            <input type='number' name='taxrate' placeholder="0.0" className={styles.num} />
            <button onClick={(e) => {
              e.preventDefault()
              let div = document.querySelector('.tax')! as HTMLDivElement
              let val = div.querySelectorAll('input')!
              let tax = Object.fromEntries(Array.from(val).map((item) => {
                return item.type === 'number' ? [item.name, +item.value] : [item.name, item.value]
              }))
              let vat = invoice.subtotal * tax.taxrate
              let total = invoice.subtotal + vat
              setInvoice({ ...invoice, tax, total, vat })
              console.log(invoice, tax, vat)
              div.style.display = 'none'
            }}
            >save tax</button>
            <button onClick={() => {
              let tax = document.querySelector('.tax')! as HTMLDivElement
              tax.style.display = 'none'
            }}>close</button>

          </div>
          <div className={styles.calwrap}>
            <p className={styles.col_one}>
              <span className={styles.amount}> Subtotal :</span>
              <span className={styles.num}>{invoice.subtotal}</span>
            </p>
            {invoice.tax.tax_description &&
              <p className={styles.col_two}> <span className={styles.amount}>{invoice.tax.tax_description}:</span>
                <span className={styles.num} >{invoice.vat}</span>
              </p>}
            <p className={styles.col_three}>
              <span className={styles.amount}>Total :</span>
              <span className={styles.num} >{invoice.total}</span>
            </p>

          </div>
          <button
            className={styles.addtax}
            onClick={(e) => {
              e.preventDefault()
              let tax = document.querySelector('.tax')! as HTMLDivElement
              tax.style.display = 'block'
            }}>Add tax</button>
          <section className={styles.invoice}>
            <label>
              <div className={styles.flex}> <Image src='/assets/write.png' width={30} height={10} alt='upload' />
                <span>Terms & Conditions</span></div>
              <textarea name="Terms" cols={20} rows={10} placeholder="optional" value={invoice.Terms} onChange={(e) => {
                setInvoice({ ...invoice, Terms: e.target.value })
              }
              }></textarea>
            </label>
            <label className={styles.sign} >
              <div >              <span>Add your signature</span> <Image src='/assets/signature.png' width={50} height={20} alt='signature' />
              </div>
              <input type="file" name="signature"
                className={styles.logo_input}
                onChange={(e) => {
                  setInvoice({ ...invoice, signature: e.target.files![0] })
                }} />
            </label>
          </section>

        </div>
        <button className={`${styles.btn} ${styles.save}`}>Generate Invoice</button>
      </form>
    </>
  )
}


