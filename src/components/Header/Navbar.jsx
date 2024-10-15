"use client"

// import styles from "./Header.module.css"
// import NavItem from "./NavItem"

// export default function index() {
//  return (
//   <header className={styles.header}>
//    <nav className={styles.nav}>
//     <NavItem href="/">Inicio</NavItem>
//     <NavItem href="/about">Acerca de</NavItem>
//     <NavItem href="/services">Servicios</NavItem>
//     <NavItem href="/contact">Contacto</NavItem>
//    </nav>
//    ITEM RECIBIDO
//   </header>
//  )
// }

import { useState, useEffect } from "react"
import styles from "./Header.module.css"
import NavItem from "./NavItem"

// const navItemsByRole = {
//  user: [
//   { id: "home", href: "/", label: "Inicio", section: "home" },
//   { id: "about", href: "/about", label: "Acerca de", section: "about" },
//   { id: "services", href: "/services", label: "Servicios", section: "services" },
//   { id: "contact", href: "/contact", label: "Contacto", section: "contact" },
//  ],
//  admin: [
//   { id: "home", href: "/", label: "Inicio", section: "home" },
//   { id: "about", href: "/about", label: "Acerca de", section: "about" },
//   { id: "services", href: "/services", label: "Servicios", section: "services" },
//   { id: "contact", href: "/contact", label: "Contacto", section: "contact" },
//   { id: "admin", href: "/admin", label: "Panel de Admin", section: "admin" },
//   { id: "reports", href: "/reports", label: "Reportes", section: "reports" },
//  ],

// }

const navItems = [
 { id: "home", href: "/", label: "Inicio", section: "home", roles: ["user", "admin"] },
 { id: "about", href: "/about", label: "Acerca de", section: "about", roles: ["user", "admin"] },
 { id: "services", href: "/services", label: "Servicios", section: "services", roles: ["user", "admin"] },
 { id: "contact", href: "/contact", label: "Contacto", section: "contact", roles: ["user", "admin"] },
 { id: "admin", href: "/admin", label: "Panel de Admin", section: "admin", roles: ["admin"] },
 { id: "reports", href: "/reports", label: "Reportes", section: "reports", roles: ["admin"] },
]

export default function Navbar() {
 const [userRole, setUserRole] = useState("user")

 useEffect(() => {
  // Simular cambio de rol (reemplazar con lógica real de autenticación)
  setUserRole("admin")
  const timer = setTimeout(() => {}, 0)

  return () => clearTimeout(timer)
 }, [])

 const filteredNavItems = navItems.filter((item) => item.roles.includes(userRole))

 return (
  <header className={styles.header}>
   <nav className={styles.nav}>
    {filteredNavItems.map((item) => (
     <div key={item.id} data-section={item.section}>
      <NavItem id={item.id} href={item.href}>
       {item.label}
      </NavItem>
     </div>
    ))}
   </nav>
  </header>
 )
}
