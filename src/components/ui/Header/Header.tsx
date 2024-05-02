import styles from "./Header.module.css"


/**
 * 
 * @todo fix me: this should really be a nav component, not a header
 */
export default function Header() {
	return (
		<section className={styles.nav_bar}>
			<div className={`${styles.lessons_button} ${styles.nav_button}`}>Lessons</div>
			<div className={`${styles.home_button} ${styles.nav_button}`}>Home</div>
			<div className={`${styles.logo}`}><img src="/logo-icon.svg" height={"65px"} width={"70px"}></img></div>
		</section>
	)
}