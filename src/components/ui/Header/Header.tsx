import styles from "./Header.module.css"

export default function Header() {
	return (
		<section className={styles.nav_bar}>
			<div className={`${styles.lessons_button} ${styles.nav_button}`}>Lessons</div>
			<div className={`${styles.links_button} ${styles.nav_button}`}>Links</div>
			<div className={`${styles.home_button} ${styles.nav_button}`}>Home</div>
			<div className={`${styles.logo}`}><img src="/logo.svg" height={"70px"} width={"70px"}></img></div>
		</section>
	)
}