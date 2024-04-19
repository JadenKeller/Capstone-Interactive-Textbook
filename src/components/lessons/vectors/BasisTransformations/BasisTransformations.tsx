import styles from "./BasisTransformations.module.css";

export default function BasisTransformations() {
	return (
		<div className={styles.widget}>
			<h3>
				Rotation
			</h3>
			<div>
				<label><input className={styles.num_input} type="number" /> degrees</label>
			</div>
			<div>
				About
				<input type="radio" name="axis" />x
				<input type="radio" name="axis" />y
				<input type="radio" name="axis" />z
			</div>
			<button className={styles.button} type="button">Apply</button>
			<h3>
				Scale
			</h3>
			<div>
				<label>Scalar <input className={styles.num_input} type="number" /></label>
			</div>
			<div>
				Scaling on
				<input type="radio" name="axis" />x
				<input type="radio" name="axis" />y
				<input type="radio" name="axis" />z
			</div>
			<button className={styles.button} type="button">Apply</button>
		</div>
	);
}