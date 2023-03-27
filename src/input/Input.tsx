import { Item, Tax } from "@/models/invoice";

export const Invoice = {
    from: "",
    billto: "",
    logo:'',
    invoicenum: "",
    po: "",
    date: "",
    itemlist: [] as Item[],
    subtotal: 0,
    tax: {
        tax_description: "",
        taxrate: 0
    } as Tax,
    vat: 0,
    total: 0,
    Terms: "",
    signature:""
}