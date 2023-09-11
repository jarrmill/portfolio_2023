import styles from './overlay.module.css';

export default function JobOverlay({job}) {
  return (
    <div className={styles.job_container}>
      <div className={styles.job_dates}>
        <p>
          {job.start} - {job.end}
        </p>
      </div>
      <div className={styles.job_details}>
        <p className={styles.job_title}>{job.title} - {job.company}</p>
        <br />
        <ul className={styles.job_points}>
        { job.points.map((point, i) => (
          <li className={styles.job_point} key={`point-${i}`}>{point}</li>
        ))}
        </ul>
        <div className={styles.job_skills}>
          { job.skills.map((skill, i) => (
            <span className={styles.job_skill} key={`skill-${i}`}>{skill}</span>
          ))}
        </div>
      </div>
    </div>)
}