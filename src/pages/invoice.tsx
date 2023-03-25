import { Invoicee } from "@/models/invoice"
import { useEffect, useState } from "react"



const Invoice = () => {
    const [invoiceInfo, setInvoiceInfo] = useState<Invoicee>()
    const [sender, setSender] = useState<string[]>()
    const [address, setAddress] = useState<string[]>()
    useEffect(() => {

        const storage = localStorage?.getItem("invoice")!
        setInvoiceInfo(JSON.parse(storage))
        console.log(invoiceInfo, storage)
        setSender(invoiceInfo?.from.split("\n"))
        setAddress(invoiceInfo?.billto.split("\n"))
    }, [])
    console.log(invoiceInfo)


    return (
        <>
            <div className="sender">
                <h1>invoice</h1>
                {sender?.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
            <div className="address">
                <div className="billto">
                    {address?.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
                <div className="invoice_info">
                    <p className="invoice_no"><span>invoice#</span>{invoiceInfo?.invoicenum}</p>
                    <p className="date"><span>invoice date</span>{invoiceInfo?.date}</p>
                    <p className="po"><span>po#</span> {invoiceInfo?.po}</p>
                    <p className="due_datae"><span>due date</span></p>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>sno</th>
                        <th>description</th>
                        <th>quantity</th>
                        <th>unit price</th>
                        <th>amount</th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceInfo?.itemlist?.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.description}</td>
                            <td>{item.quantity}</td>
                            <td>{item.unit}</td>
                            <td>{item.Amount}</td>
                        </tr>
                    ))}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Subtotal</td>
                        <td>{invoiceInfo?.subtotal}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>vat</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>total</td>
                        <td>{invoiceInfo?.total}</td>
                    </tr>
                </tbody>
            </table>

        </>
    )
}
export default Invoice