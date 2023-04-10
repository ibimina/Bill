import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Index.module.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";


const Index = () => {
    return (

        <>
            <Nav />
            <main className={styles.container}>
                <section className={styles.main}>
                    <div className={styles.hero}>
                        <h1 className={styles.title}>
                            Invoice Generator simple and easy to use
                        </h1>
                        <p className={styles.subtitle}>
                            <span className={styles.highlight}>Free</span> Invoice download
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
                </section>

                <div className={styles.reviews_col}>
                    <h2 className={styles.review_heading}>
                       What are people <span className={styles.highlight}> saying?</span>
                    </h2>
                    <div className={styles.reviews_grid}>
                        <div className={styles.review_card}>
                            <p className={styles.review}>I’ve been using this invoice generator for months now and it has made my life so much easier. The interface is user-friendly and the invoices look professional. Highly recommend!</p>
                            <div className="review_card_header_image">
                                <Image src="/assets/face3.jpg" alt="portrait smiling african american young woman" width={60} height={60} />
                            </div>
                            <p className={styles.name}>Neol Oun</p>
                            <p className={styles.position}>Caterer</p>
                        </div>
                        <div className={styles.review_card}>
                            <p className={styles.review}>This invoice generator has saved me so much time and hassle. It’s quick and easy to use, and the invoices always come out looking great. I would definitely recommend it to anyone in need of a reliable invoicing solution</p>
                            <div className="review_card_header_image">
                                <Image src="/assets/face1.jpg" alt="close up pleasant curly dark hair female customer support manager smiling broadly ready help express interest happiness grinning white teeth delighted have positive conversation studio background" width={60} height={60} />
                            </div>
                            <p className={styles.name}>Kate Nebo</p>
                            <p className={styles.position}>Personal shopper</p>
                        </div>
                        <div className={styles.review_card}>
                            <p className={styles.review}> I was hesitant to try an online invoice generator, but I’m so glad I did. This site has exceeded my expectations with its ease of use and professional-looking invoices. I would highly recommend it to anyone in need of a simple and effective invoicing solution</p>
                            <div className="review_card_header_image">
                                <Image src="/assets/face2.jpg" alt="confident business woman portrait smiling face" width={60} height={60} />
                            </div>
                            <p className={styles.name}>Lilian Bach</p>
                            <p className={styles.position}>Business woman</p>
                        </div>
                    </div>

                </div>

            </main>
            <Footer />
        </>
    );
};
export default Index;