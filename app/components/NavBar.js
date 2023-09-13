import Link from 'next/link';
import styles from './navbar.module.css'
import { FiArrowLeftCircle, FiInstagram, FiLinkedin, FiGithub, FiHome } from "react-icons/fi";
import { FaThreads } from "react-icons/fa6";

export default function NavBar({ showBack = false, fixed = false }) {
    const containerStyle = {
      position: fixed ? 'fixed' : 'relative'
    };

    return (
      <div>
        <nav className={styles.navbar_container} style={ containerStyle }>
          <div className={styles.navbar_logo}>
            <div className={styles.logo_circle}>
              <h1>JM</h1>
            </div>
          </div>
          <div className={styles.navbar_links}>
            <div className={styles.links_container}>
              <div className={styles.navbar_section}>
                <Link href="/" className={styles.navbar_link}><FiHome /></Link>
              </div>
              { showBack ? (
                <div className={styles.navbar_section}>
                  <Link href="/travel" className={styles.navbar_link}><FiArrowLeftCircle /></Link>
                </div>
              ) : (null)}
            </div>
            <div>
              <div className={styles.navbar_section}>
                <Link href="https://www.instagram.com/jawwwod/" className={styles.navbar_link}><FiInstagram /></Link>
              </div>
              <div className={styles.navbar_section}>
                <Link href="https://www.github.com/jarrmill/" className={styles.navbar_link}><FiGithub /></Link>
              </div>
              <div className={styles.navbar_section}>
                <Link href="https://www.threads.net/@jawwwod" className={styles.navbar_link}><FaThreads /></Link>
              </div>
              <div className={styles.navbar_section}>
                <Link href="https://www.linkedin.com/in/jarrmillatx/" className={styles.navbar_link}><FiLinkedin /></Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }