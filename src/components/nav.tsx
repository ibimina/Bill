import Link from "next/link";
import styles from "./nav.module.css"
function Nav() {
    return ( 
        <header className={styles.header}>
            <h1>Bill</h1>
            <nav>
                <ul className={styles.flex}> 
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>  <Link href="/invoiceform"> Invoice</Link></li>
                </ul>      
            </nav>
        </header>
     )
}

export default Nav;