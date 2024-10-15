// import React from 'react'
import styles from "./Footer.module.css"
// import SocialIcon from "./SocialIcon"
import SocialIcon from "./SocialIcon"

export default function index() {
 return (
  <footer className={styles.footer}>
   <div className={styles.content}>
    <div className={styles.socialLinks}>
     <SocialIcon href="https://www.facebook.com/JuanjoseTaylorR/" icon="facebook"></SocialIcon>
     <SocialIcon href="https://twitter.com" icon="twitterx"></SocialIcon>
     <SocialIcon href="https://www.instagram.com/juant_0618/" icon="instagram"></SocialIcon>
     <SocialIcon href="https://www.linkedin.com/in/juan-taylor-8a2b25271/" icon="linkedin"></SocialIcon>
    </div>
   </div>
   <div className={styles.contactInfo}>
    <p>
     Email: <a href="juan13taylor@gmail.com"> juan13taylor@gmail.com</a>
    </p>
    <p>Teléfono : +507 6443-3836</p>
    <p className={styles.copyright}>&copy; 2024 Tu Empresa. Todos los derechos reservados.</p>
   </div>
   <div></div>
  </footer>
 )
}
