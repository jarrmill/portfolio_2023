import styles from './overlay.module.css'
import resumeData from "./resumeData";
import JobOverlay from "./JobOverlay";
import ComputerSketch from './ComputerSketch.js';
import Blurb from "./Blurb";
import Link from 'next/link';
import { FiTwitter, FiInstagram, FiLinkedin, FiMap } from "react-icons/fi";


export default function Overlay() {
  const { jobs } = resumeData;
  return (
    <main className={styles.main}>
        <div className={styles.left_module}>
          <ComputerSketch className={styles.logo_picture} />
          <h1 className={styles.logo}>Jarrod Miller</h1>
          <h2 className={styles.logo_subtitle}>Front End Developer</h2>
          <p className={styles.logo_text}> I build beautiful, performant products and digital experiences for the web.</p>
          <nav>
            <ul className={styles.navbar}>
              <li>
                <Link href="/travel" className={styles.nav_button}>Travel Blog<FiMap className={styles.nav_buttonicon} /></Link>
              </li>
              <li>
                <Link href="https://www.linkedin.com/in/jarrmillatx" className={styles.nav_link}><FiLinkedin /></Link>  
              </li>
              <li>
                <Link href="https://www.threads.net/@jawwwod" className={styles.nav_link}><FiTwitter /></Link>  
              </li>
              <li>
                <Link href="https://www.instagram.com/jawwwod/" className={styles.nav_link}><FiInstagram /></Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.right_module}>
          <Blurb />
          <div className={styles.jobs_container}>
            { jobs.map((job, i) =>
              <JobOverlay job={job} key={`job-${i}`} />
            )}
          </div>
        </div>
    </main>
  )
}
