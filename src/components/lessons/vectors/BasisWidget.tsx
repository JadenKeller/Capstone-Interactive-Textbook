import { BasisVectors, IHat, JHat, KHat } from "pages/lessons/vectors/BasisVectors/BasisVectors";
import { Dispatch, SetStateAction } from "react";
import { Vector3 } from "three";
import styles from "./BasisWidget.module.css";
import { InlineMath } from "react-katex";

interface BasisWidgetProps {
	editableBasis: BasisVectors,
	setBasis: Dispatch<SetStateAction<{ i: Vector3; j: Vector3; k: Vector3 }>>,
	editableVector: Vector3,
	setVector: Dispatch<SetStateAction<Vector3>>,
}

interface BasisVectorI {
	i: Vector3;
}
interface BasisVectorJ {
	j: Vector3;
}
interface BasisVectorK {
	k: Vector3;
}
type BasisVector = BasisVectorI | BasisVectorJ | BasisVectorK;

export default function BasisWidget({ editableBasis, setBasis, editableVector, setVector }: BasisWidgetProps) {
	const changeBasisAxis = (changedBasis: BasisVector) => {
		setBasis((prev) => ({ ...prev, ...changedBasis }));
	};

	return (
		<div>
			<div className={styles.basis_wrapper}>
				<div className={styles.basis_vector}>
					<IHat />
					<input
						placeholder={editableBasis.i.x.toString()}
						type="number"
						value={editableBasis.i.x}
						onChange={(e) => {
							changeBasisAxis({
								i: new Vector3(
									Number(e.target.value),
									editableBasis.i.y,
									editableBasis.i.z
								),
							});
						}}
					></input>
					<input
						placeholder={editableBasis.i.y.toString()}
						type="number"
						value={editableBasis.i.y}
						onChange={(e) => {
							changeBasisAxis({
								i: new Vector3(
									editableBasis.i.x,
									Number(e.target.value),
									editableBasis.i.z
								),
							});
						}}
					></input>
					<input
						placeholder={editableBasis.i.z.toString()}
						type="number"
						value={editableBasis.i.z}
						onChange={(e) => {
							changeBasisAxis({
								i: new Vector3(
									editableBasis.i.x,
									editableBasis.i.y,
									Number(e.target.value),
								),
							});
						}}
					></input>
				</div>
				<div className={styles.basis_vector}>
					<JHat />
					<input
						placeholder={editableBasis.j.x.toString()}
						type="number"
						value={editableBasis.j.x}
						onChange={(e) => {
							changeBasisAxis({
								j: new Vector3(
									Number(e.target.value),
									editableBasis.j.y,
									editableBasis.j.z
								),
							});
						}}
					></input>
					<input
						placeholder={editableBasis.j.y.toString()}
						type="number"
						value={editableBasis.j.y}
						onChange={(e) => {
							changeBasisAxis({
								j: new Vector3(
									editableBasis.j.x,
									Number(e.target.value),
									editableBasis.j.z
								),
							});
						}}
					></input>
					<input
						placeholder={editableBasis.j.z.toString()}
						type="number"
						value={editableBasis.j.z}
						onChange={(e) => {
							changeBasisAxis({
								j: new Vector3(
									editableBasis.j.x,
									editableBasis.j.y,
									Number(e.target.value),
								),
							});
						}}
					></input>
				</div>
				<div className={styles.basis_vector}>
					<KHat />
					<input
						placeholder={editableBasis.k.x.toString()}
						type="number"
						value={editableBasis.k.x}
						onChange={(e) => {
							changeBasisAxis({
								k: new Vector3(
									Number(e.target.value),
									editableBasis.k.y,
									editableBasis.k.z
								),
							});
						}}
					></input>
					<input
						placeholder={editableBasis.k.y.toString()}
						type="number"
						value={editableBasis.k.y}
						onChange={(e) => {
							changeBasisAxis({
								k: new Vector3(
									editableBasis.k.x,
									Number(e.target.value),
									editableBasis.k.z
								),
							});
						}}
					></input>
					<input
						placeholder={editableBasis.k.z.toString()}
						type="number"
						value={editableBasis.k.z}
						onChange={(e) => {
							changeBasisAxis({
								k: new Vector3(
									editableBasis.k.x,
									editableBasis.k.y,
									Number(e.target.value),
								),
							});
						}}
					></input>
				</div>
				<div className={styles.basis_vector}>
					<InlineMath math={`{\\vec{v}}`} />
					<input
						placeholder={editableVector.x.toString()}
						type="number"
						value={editableVector.x}
						onChange={(e) => setVector((prev) => {
							const vec3 = prev.clone();
							vec3.x = Number(e.target.value);
							return vec3;
						})}
					></input>
					<input
						placeholder={editableVector.y.toString()}
						type="number"
						value={editableVector.y}
						onChange={(e) => setVector((prev) => {
							const vec3 = prev.clone();
							vec3.y = Number(e.target.value);
							return vec3;
						})}
					></input>
					<input
						placeholder={editableVector.z.toString()}
						type="number"
						value={editableVector.z}
						onChange={(e) => setVector((prev) => {
							const vec3 = prev.clone();
							vec3.z = Number(e.target.value);
							return vec3;
						})}
					></input>
				</div>
			</div >

		</div>
	);
}
