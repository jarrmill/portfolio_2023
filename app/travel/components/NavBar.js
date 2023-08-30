import Link from 'next/link';
import styles from '../travel.module.css'
import { FiArrowLeftCircle, FiInstagram, FiHome } from "react-icons/fi";

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
                <Link href="#" className={styles.navbar_link}><FiInstagram /></Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }