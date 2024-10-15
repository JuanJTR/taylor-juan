import Link from "next/link"
import styles from "./Header.module.css"

export default function NavItem({ id, href, children }) {
 return (
  <Link href={href} className={styles.navItem} id={id}>
   {children}
  </Link>
 )
}
