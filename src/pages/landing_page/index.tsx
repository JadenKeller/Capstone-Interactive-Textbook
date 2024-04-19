import styles from "./index.module.css";


export default function LandingPage() {
    return (
		<div className={styles.body_root}>

			<div className={styles.banner_section}>
				<h1>Interactive Textbook for Geometric Linear Algebra</h1>
			</div>

			<div className={styles.call_to_action}>
				<h3>Explore math concepts behind computer graphics through play & activities</h3>
			</div>


		</div>
    );
}