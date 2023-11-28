import { Invoicee } from "@/type/invoice"
import { useRouter } from "next/router"
import { FormEvent } from "react"


const Helper = () => {
    const router = useRouter()

    
    const handleForm = (e: FormEvent,invoice:Invoicee) => {  
        e.preventDefault()
        if (invoice.itemlist.length === 0) {
            alert('please add an item')
            return
        }
        localStorage.setItem("invoice", JSON.stringify(invoice))
        router.push("/invoice")
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
    return {handleForm,handleTaxModal};
}


export default Helper;