import { Dispatch, SetStateAction, useState } from "react";
import styles from "./BasisTransformations.module.css";
import { BasisVectors } from "pages/lessons/vectors/BasisVectors/BasisVectors";

interface WidgetProps {
	editableBasis: BasisVectors,
	setBasis: Dispatch<SetStateAction<BasisVectors>>,
}

enum TransformationType {
	Rotation,
	Scale
}

interface TransformationBase {
	axis: "x" | "y" | "z",
}

type RotationTransformation = TransformationBase & {
	tranformationType: TransformationType.Rotation,
	degrees: number,
}

type ScaleTransformation = TransformationBase & {
	tranformationType: TransformationType.Scale,
	scalar: number,
}

type Transformation = RotationTransformation | ScaleTransformation | null;

export default function BasisTransformations({ }: WidgetProps) {
	const [selectedTransformation, setSelectedTransformation] = useState<Transformation>({
		axis: "x",
		tranformationType: TransformationType.Rotation,
		degrees: 30,
	});

	// Temporary toggling function for swapping between widget displayed
	const handleToggle = () => {
		if (selectedTransformation?.tranformationType == TransformationType.Rotation) {
			setSelectedTransformation({
				axis: "x",
				tranformationType: TransformationType.Scale,
				scalar: 2,
			});
		}
		else {
			setSelectedTransformation({
				axis: "x",
				tranformationType: TransformationType.Rotation,
				degrees: 30,
			});
		}
	}

	const handleApply = () => {

	}

	return (
		<div className={styles.widget}>
			{selectedTransformation?.tranformationType == TransformationType.Rotation ?
				<>
					<h3>
						Rotation
					</h3>
					<div>
						<label><input className={styles.num_input} type="number" /> degrees</label>
					</div>
					<div>
						About
						<label><input type="radio" name="axis" />x</label>
						<label><input type="radio" name="axis" />y</label>
						<label><input type="radio" name="axis" />z</label>
					</div>
					<button className={styles.button} type="button" onClick={handleApply}>Apply</button>
				</>
				:
				<>
					<h3>
						Scale
					</h3>
					<div>
						<label>Scalar <input className={styles.num_input} type="number" /></label>
					</div>
					<div>
						Scaling on
						<label><input type="radio" name="axis" />x</label>
						<label><input type="radio" name="axis" />y</label>
						<label><input type="radio" name="axis" />z</label>
					</div>
					<button className={styles.button} type="button" onClick={handleApply}>Apply</button>
				</>
			}
			<button type="button" onClick={handleToggle}>temp toggle</button>
		</div>
	);
}