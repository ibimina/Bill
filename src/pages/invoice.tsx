import { Invoicee } from "@/models/invoice"
import { jsPDF } from "jspdf";
import Image from "next/image"
import { useEffect, useState } from "react"
import styles from '@/styles/Invoice.module.css'


const Invoice = () => {
    const [invoiceInfo, setInvoiceInfo] = useState<Invoicee>()
    const [sender, setSender] = useState<string[]>()
    const [address, setAddress] = useState<string[]>()
    const pdf = new jsPDF();
    const generatePdf = () => {
        let docs = document.querySelector("main")! as HTMLDivElement
        pdf.html(docs, {
            callback: function (doc) {
                // Save the PDF
                doc.save(invoiceInfo?.invoicenum);
            },
            x: 15,
            y: 15,
            width: 170, //target width in the PDF document
            windowWidth: 650 //window width in CSS pixels
        });
    }
    useEffect(() => {
        const storage = localStorage?.getItem("invoice")!
        setInvoiceInfo(JSON.parse(storage))
        setSender(invoiceInfo?.from.split("\n"))
        setAddress(invoiceInfo?.billto.split("\n"))
    }, [invoiceInfo?.billto, invoiceInfo?.from])

    return (
        <>
            <main className={styles.container}>
                <div className={styles.sender}>
                    <section>
                        <h1 className={styles.uppercase}>invoice</h1>
                        {sender?.map((item, index) => (
                            <p key={index} className={styles.semi}>{item}</p>
                        ))}
                    </section>

                    {invoiceInfo?.logo && <div><Image src={invoiceInfo.logo} width={30} height={30} alt="logo" /></div>}
                </div>
                <div className={styles.address}>
                    <div className="billto">
                        <h2 className={styles.uppercase}>bill to</h2>
                        {address?.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </div>
                    <div className="invoice_info">
                        <p className={styles.flex}><span className={`${styles.uppercase} ${styles.semi}  ${styles.font_mid}`}>invoice# </span>{invoiceInfo?.invoicenum}</p>
                        <p className={styles.flex}><span className={`${styles.uppercase} ${styles.semi}  ${styles.font_mid}`}>invoice date </span>{invoiceInfo?.date}</p>
                        <p className={styles.flex}><span className={`${styles.uppercase} ${styles.semi}  ${styles.font_mid}`}>po# </span> {invoiceInfo?.po}</p>
                    </div>
                </div>
                <table className={styles.table}>
                    <thead >
                        <tr className={styles.head}>
                            <th className={`${styles.padding} ${styles.head} ${styles.center}`}>sno</th>
                            <th className={`${styles.padding} ${styles.head}`}>description</th>
                            <th className={`${styles.padding} ${styles.head}`}>quantity</th>
                            <th className={`${styles.padding} ${styles.head}  ${styles.end}`}>unit price</th>
                            <th className={`${styles.padding} ${styles.head}  ${styles.end}`}>amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceInfo?.itemlist?.map((item, index) => (
                            <tr key={index} className={styles.padding}>
                                <td className={`${styles.padding} ${styles.center}`}>{index + 1}</td>
                                <td className={`${styles.padding} ${styles.left}`}>{item.description}</td>
                                <td className={`${styles.padding}  ${styles.center}`}>{item.quantity}</td>
                                <td className={`${styles.padding}  ${styles.end}`}>{item.unit.toLocaleString()}</td>
                                <td className={`${styles.padding}  ${styles.end}`}>{item.Amount}</td>
                            </tr>
                        ))}
                        <tr >
                            <td className={styles.padding}></td>
                            <td className={styles.padding}></td>
                            <td className={styles.padding}></td>
                            <td className={`${styles.padding} ${styles.bold}`}>Subtotal</td>
                            <td className={`${styles.padding} ${styles.bold}`}>{invoiceInfo?.subtotal.toLocaleString()}</td>
                        </tr>
                        {invoiceInfo?.tax?.tax_description && <tr>
                            <td className={styles.padding}></td>
                            <td className={styles.padding}></td>
                            <td className={styles.padding}></td>
                            <td className={`${styles.padding} ${styles.bold}`}>{invoiceInfo?.tax?.tax_description} <span>{invoiceInfo?.tax?.taxrate}%</span></td>
                            <td className={`${styles.padding} ${styles.bold}`}>{invoiceInfo?.vat.toLocaleString()}</td>
                        </tr>}
                        <tr>
                            <td className={styles.padding}></td>
                            <td className={styles.padding}></td>
                            <td className={styles.padding}></td>
                            <td className={`${styles.padding} ${styles.bold}`} >TOTAL</td>
                            <td className={`${styles.padding} ${styles.bold}`}>{invoiceInfo?.total.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
                {invoiceInfo?.signature ? <Image src={invoiceInfo?.signature} width={30} height={30} alt="signature" className={styles.sign} />
                    : <></>}
                <article>
                    <h3>Terms & conditions</h3>
                    <p>{invoiceInfo?.Terms}</p>
                </article>
            </main>
            <button onClick={generatePdf}>download</button>
        </>
    )
}
export default Invoice