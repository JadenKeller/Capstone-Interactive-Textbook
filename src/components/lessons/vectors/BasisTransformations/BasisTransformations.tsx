import { Dispatch, SetStateAction, useState } from "react";
import styles from "./BasisTransformations.module.css";
import { BasisVectors } from "pages/lessons/vectors/BasisVectors/BasisVectors";
import { Matrix4, Vector3 } from "three";
import { Maximize2, RefreshCw } from "react-feather";

interface WidgetProps {
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

type Transformation = RotationTransformation | ScaleTransformation;

const basisFromMatrix4 = (matrix: Matrix4): BasisVectors => {
	return {
		i: new Vector3(matrix.elements[0], matrix.elements[4], matrix.elements[8]),
		j: new Vector3(matrix.elements[1], matrix.elements[5], matrix.elements[9]),
		k: new Vector3(matrix.elements[2], matrix.elements[6], matrix.elements[10])
	}
}

export default function BasisTransformations({ setBasis }: WidgetProps) {
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
		setBasis(() => {
			const matrix = new Matrix4();
			if (selectedTransformation?.tranformationType == TransformationType.Rotation) {
				const radians = selectedTransformation.degrees * (Math.PI / 180);
				switch (selectedTransformation.axis) {
					case "x":
						matrix.makeRotationX(radians);
						break;
					case "y":
						matrix.makeRotationY(radians);
						break;
					case "z":
						matrix.makeRotationZ(radians);
						break;
				}
			}
			else if (selectedTransformation?.tranformationType == TransformationType.Scale) {
				switch (selectedTransformation.axis) {
					case "x":
						matrix.makeScale(selectedTransformation.scalar, 1, 1);
						break;
					case "y":
						matrix.makeScale(1, 1, selectedTransformation.scalar);
						break;
					case "z":
						matrix.makeScale(1, 1, selectedTransformation.scalar);
						break;
				}
			}
			return basisFromMatrix4(matrix);
		});
	}

	const setAxis = (axis: ("x" | "y" | "z")) => {
		setSelectedTransformation((prevTransformation) => {
			return {
				...prevTransformation,
				axis,
			}
		})
	}

	const setDegrees = (degrees: number) => {
		setSelectedTransformation((prevTransformation) => {
			return {
				...prevTransformation,
				degrees,
			}
		})
	}

	const setScalar = (scalar: number) => {
		setSelectedTransformation((prevTransformation) => {
			return {
				...prevTransformation,
				scalar,
			}
		})
	}

	return (
		<div className={styles.widget}>
			{selectedTransformation?.tranformationType == TransformationType.Rotation ?
				<>
					<h3>
						Rotation
					</h3>
					<p className={styles.p_margin_none}>
						<label><input className={styles.num_input} type="number" onChange={(e) => setDegrees(Number(e.target.value))} value={selectedTransformation.degrees} /> degrees</label>
						<br />
						About
						<label><input defaultChecked type="radio" name="axis" onChange={() => setAxis("x")} />x</label>
						<label><input type="radio" name="axis" onChange={() => setAxis("y")} />y</label>
						<label><input type="radio" name="axis" onChange={() => setAxis("z")} />z</label>
					</p>
					<button className={styles.button} type="button" onClick={handleApply}>Apply</button>
				</>
				:
				<>
					<h3>
						Scale
					</h3>
					<p className={styles.p_margin_none}>
						<label>Scalar: <input className={styles.num_input} type="number" onChange={(e) => setScalar(Number(e.target.value))} value={selectedTransformation.scalar} /></label>
						<br />
						Scaling on
						<label><input defaultChecked type="radio" name="axis" onChange={() => setAxis("x")} />x</label>
						<label><input type="radio" name="axis" onChange={() => setAxis("y")} />y</label>
						<label><input type="radio" name="axis" onChange={() => setAxis("z")} />z</label>
					</p>
					<button className={styles.button} type="button" onClick={handleApply}>Apply</button>
				</>
			}
			<span className={styles.toggle_button} onClick={handleToggle}>{selectedTransformation.tranformationType == TransformationType.Rotation ?
				<Maximize2 size={"1em"} /> :
				<RefreshCw size={"1em"} />
			}</span>
		</div>
	);
}