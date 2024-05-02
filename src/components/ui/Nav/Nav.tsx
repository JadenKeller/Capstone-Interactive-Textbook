import styles from "./Nav.module.css";
import { useNavigate } from "react-router-dom";
import { TransformationStateManager } from "@components/InteractiveCanvas/InteractiveCanvas";


/**
 * 
 * @todo fix me: this should really be a nav component, not a header
 */
export default function Nav() {
	return (
		<section className={styles.nav_bar}>
			<div className={`${styles.lessons_button} ${styles.nav_button}`}>Lessons</div>
			<div className={`${styles.home_button} ${styles.nav_button}`}>Home</div>
			<div className={`${styles.logo}`}><img src="/logo-icon.svg" height={"65px"} width={"70px"}></img></div>
		</section>
	)
}