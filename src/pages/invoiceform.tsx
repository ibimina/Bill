import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { FormEvent, useState } from 'react'
import { Invoice } from '@/input/Input'
import { useRouter } from 'next/router'
import { Item } from '@/models/invoice'
import Nav from '@/components/nav'
import Footer from '@/components/footer'


export default function Home() {
  const [invoice, setInvoice] = useState(Invoice)
  const router = useRouter()
  const removeItem = (e: React.MouseEvent, item: Item) => {
    e.preventDefault()
    let subtotal = invoice.subtotal - item.Amount
    let vat = subtotal * invoice?.tax?.taxrate
    let total = subtotal + vat
    setInvoice({ ...invoice, subtotal, vat, total, itemlist: invoice.itemlist.filter((item) => item.description !== item.description) })
  }
  function handleForm(e: FormEvent) {
    e.preventDefault()
    if(invoice.itemlist.length === 0){
      alert('please add an item')
      return
    }
    localStorage.setItem("invoice", JSON.stringify(invoice))
    router.push("/invoice")
  }

  const saveItem = (e: React.MouseEvent) => {
    e.preventDefault()
    let val = document.querySelectorAll('.item_input')! as NodeListOf<HTMLInputElement>
if(val[0].value === "" || val[1].value === "" || val[2].value === ""){
  alert('please fill all fields')
  return
}
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
    val.forEach(val => val.value = "")
  }
  const addTax = (e: React.MouseEvent) => {
    e.preventDefault()
    let div = document.querySelector('.tax')! as HTMLDivElement
    let val = div.querySelectorAll('input')!
    let tax = Object.fromEntries(Array.from(val).map((item) => {
      return item.type === 'number' ? [item.name, +item.value] : [item.name, item.value]
    }))
    let vat = invoice.subtotal * tax.taxrate
    let total = invoice.subtotal + vat
    setInvoice({ ...invoice, tax, total, vat })
    val.forEach(val => val.value = "")
    div.style.transform = `translateX(100000%)`
  }
  const handleTaxModal = (e: React.MouseEvent) => {
    e.preventDefault()
    let tax = document.querySelector('.tax')! as HTMLDivElement
    if (tax.style.transform === `translateX(0%)`) {
      tax.style.transform = `translateX(1000%)`
    } else {
      tax.style.transform = `translateX(0%)`
    }
  }
  return (
    <>
      <Head>
        <title>Invoice</title>
        <meta name="description" content="Generate Invoice" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <form className={styles.form}
        onSubmit={handleForm}
      >
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
              <div className={styles.sign_wrap}>
                <label className={styles.logo_wrap}>
                  <div>
                    <Image className={styles.bri} src='/assets/upload.png' width={50} height={50} alt='upload' />
                    <span className={styles.capitalize}> upload logo</span>
                  </div>
                  <input type="file" name="logo"
                    accept='image/*'
                    required
                    className={styles.logo_input}
                    onChange={(e) => {
                      let img = e.target.files as FileList
                      let con = URL.createObjectURL(img[0])
                      setInvoice({ ...invoice, logo: con })
                    }} />
                </label>
                {invoice.logo && <Image src={invoice.logo} width={50} height={100} alt='upload' />
                }
              </div>
              
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
                <td className={styles.td}>Description</td>
                <td className={styles.td}>Quantity</td>
                <td className={styles.td}>Unit price</td>
                <td className={styles.td}>Amount</td>
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
            <input type='text' name="description" className={`${styles.input} item_input`} placeholder="Description" />
            <input type='number' name='quantity' placeholder="Quantity" className={`${styles.input} item_input`}  />
            <input type='number' name='unit' placeholder="0.0"  className={`${styles.input} item_input`} />
            <div>
              <button onClick={saveItem} className={`${styles.btn} ${styles.add}`}>save item</button>
            </div>
          </section>
          <div className={`${styles.fixed} tax`}>
            <div className={styles.taxwrap}>
              <input type='text' name="tax_description" placeholder="Tax Description" />
              <input type='number' name='taxrate' placeholder="0.0" />
              <div className={styles.btnwrap}>
                <button onClick={addTax} className={`${styles.vatbtn} ${styles.savebtn}`}>save tax</button>
                <button onClick={handleTaxModal} className={`${styles.vatbtn} ${styles.closebtn}`}>close</button>
              </div>
             </div>
          </div>
          <div className={styles.calwrap}>
            <p className={styles.col_one}>
              <span className={styles.amount}> Subtotal : </span>
              <span className={styles.num}>{invoice.subtotal.toLocaleString()}</span>
            </p>
            {invoice.tax.tax_description &&
              <p className={styles.col_two}> <span className={styles.amount}>{invoice.tax.tax_description}:</span>
                <span className={styles.num} > {invoice.vat.toLocaleString()}</span>
              </p>}
            <p className={styles.col_three}>
              <span className={styles.amount}>Total : </span>
              <span className={styles.num} >{invoice.total.toLocaleString()}</span>
            </p>

          </div>
          <button
            className={styles.addtax}
            onClick={handleTaxModal}>Add tax</button>
          <section className={styles.invoice}>
            <label>
              <div className={styles.flex}> <Image src='/assets/write.png' width={30} height={10} alt='upload' />
                <span>Terms & Conditions</span></div>
              <textarea name="Terms" cols={20} rows={10} placeholder="optional" value={invoice.Terms}
                onChange={(e) => {
                  setInvoice({ ...invoice, Terms: e.target.value })
                }}></textarea>
            </label>
            <div className={styles.sign_wrap}>
              <label className={styles.sign} >
                <div >  <span>Add your signature</span>
                  <Image src='/assets/signature.png' width={30} height={20} alt='signature' />
                </div>
                <input type="file" name="signature"
                  accept='image/*'
                  required
                  className={styles.logo_input}
                  onChange={(e) => {
                    let img = e.target.files as FileList
                    let con = URL.createObjectURL(img[0])
                    setInvoice({ ...invoice, signature: con })
                  }} />
              </label>
              {invoice.signature && <Image src={invoice.signature} width={50} height={100} alt='upload' />
              }
            </div>
            
          </section>
        </div>
        <input type="submit" className={`${styles.btn} ${styles.save}`} value='Generate Invoice' />
      </form>
      <Footer/>
    </>
  )
}


