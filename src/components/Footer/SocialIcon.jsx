import styles from "./Footer.module.css"

// import React from 'react'

export default function SocialIcon({ href, icon }) {
 return (
  <a href={href} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
   <img className={styles.iconImg} src={`/icons/${icon}.svg`} alt={icon} width="40" height="40" />
  </a>
 )
}
