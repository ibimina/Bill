export interface Invoicee {
    from: string
    billto: string
    logo:string
    invoicenum: string
    po: string
    date: string
    itemlist: Item[]
    subtotal: number
    total: number
    Terms: string
    signature: string
    tax?:Tax
    vat: number
}
export interface Item {
    description: string
    unit: number
    quantity: number
    Amount: number
}
export interface Tax {
    tax_description: string
    taxrate: number
}