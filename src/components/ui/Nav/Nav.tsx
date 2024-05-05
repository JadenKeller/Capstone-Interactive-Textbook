import styles from "./Nav.module.css";
import { useNavigate } from "react-router-dom";
import { TransformationStateManager } from "@components/InteractiveCanvas/InteractiveCanvas";

export default function Nav() {
	const nav = useNavigate();
	const navigate = (fullPath: string) => {
		TransformationStateManager.clear();
		nav(fullPath);
	}

	return (
		<nav className={styles.nav_bar} role="navigation">
			<ul className={styles.nav_bar}>
				<li className={`${styles.lessons_button} ${styles.nav_button}`}>
					Lessons
					<ul className={styles.nav_dropdown_content}>
						<li className={`${styles.nav_button} ${styles.nav_dropdown_item}`} onClick={() => navigate("/lesson/vectors")}>Vectors</li>
						<li className={`${styles.nav_button} ${styles.nav_dropdown_item}`} onClick={() => navigate("/lesson/vector-operations")}>Vector Operations</li>
						<li className={`${styles.nav_button} ${styles.nav_dropdown_item}`} onClick={() => navigate("/lesson/matrices")}>Matrix Transformations</li>
					</ul>
				</li>
				<li className={`${styles.home_button} ${styles.nav_button}`} onClick={() => navigate("/")}>Home</li>
				<li className={`${styles.logo}`}><img src="/logo-icon.svg" height={"65px"} width={"70px"}></img></li>
			</ul>
		</nav>
	);
}