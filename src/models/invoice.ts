export interface Invoicee {
    from: string
    billto: string
    logo: {}
    Invoice: string
    po: string
    date: string
    itemlist: Item[]
    subtotal: number
    vat: number
    grandtotal: number
    Terms: string
    signature: {}
}
export interface Item {
    description: string
    unit: number
    quantity: number
    Amount: number
    tax?: number
}