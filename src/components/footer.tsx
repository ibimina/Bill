import styles from "@/styles/Footer.module.css";
function Footer() {
    return (<footer className={styles.footer}>copyright ibimina {new Date().getFullYear()}</footer>);
}

export default Footer;