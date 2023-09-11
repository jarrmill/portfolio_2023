import styles from "./overlay.module.css";

export default function Blurb() {
  return (
    <div className={styles.blurb_container}>
      <p className={styles.blurb_paragraph}>In 2011, students were just being able to afford personal computers. I started tinkering around with a language called Python in my spare time. I fell in love with coding, and since then I have had the pleasure of building <b>stunning features</b> for web applications, and a <b>clean, versatile component library.</b></p>
      <p className={styles.blurb_paragraph}>My current focus is to <b>join a great team</b> and build beautiful web applications.</p>
      <p className={styles.blurb_paragraph}>Outside of computer work, you can find me outside on a bike, swimming laps at a pool, or grabbing a beer with friends. I am also pursuing a <b>Post Bacc Certificate of Computer Programming</b> at NC State University</p>
    </div>
  )
}