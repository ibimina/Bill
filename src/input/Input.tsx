import { Item, Tax } from "@/models/invoice";

export const Invoice = {
    from: "",
    billto: "",
    logo: {
        lastModified: 0,
        name: "",
        size: 0,
        type: "",
        webkitRelativePath: ""
    },
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
    signature: {
        lastModified: 0,
        name: "",
        size: 0,
        type: "",
        webkitRelativePath: ""
    }
}