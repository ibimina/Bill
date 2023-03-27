import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Index.module.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";


const Index = () => {
    return (

        <>

            <Nav />

            <main className={styles.main}>
                <div className={styles.hero}>
                    <p className={styles.subtitle}>
                        <span className={styles.highlight}>Free</span> Invoice Generator
                    </p>
                    <p className={styles.subtitle}>
                        <span className={styles.highlight}>No</span> registration required
                    </p>
                    <p className={styles.subtitle}>
                        <span className={styles.highlight}>No</span> ads
                    </p>
                    <p className={styles.text}>
                        Generate invoices in a few clicks

                    </p>
                    <Link href="/invoiceform" className={styles.formlink}>
                        Get Started
                    </Link>

                </div>
                <Image src="/assets/invoice.svg" alt="Invoice" width={500} height={500} />

            </main>
            <Footer />
        </>
    );
};
export default Index;