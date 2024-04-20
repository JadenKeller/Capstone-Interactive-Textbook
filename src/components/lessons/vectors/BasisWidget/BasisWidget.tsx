import { BasisToward, BasisVectors, IHat, JHat, KHat } from "pages/lessons/vectors/BasisVectors/BasisVectors";
import { Dispatch, SetStateAction } from "react";
import { Vector3 } from "three";
import styles from "./BasisWidget.module.css";
import { InlineMath } from "react-katex";

interface BasisWidgetProps {
	editableBasis: BasisVectors,
	setBasis: Dispatch<SetStateAction<BasisVectors>>,
	editableVector: Vector3,
	setVector: Dispatch<SetStateAction<Vector3>>,
	toggle: BasisToward,
	handleToggle: () => void,
	handleIdentity: () => void,
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

export default function BasisWidget({ editableBasis, setBasis, editableVector, setVector, toggle, handleToggle, handleIdentity }: BasisWidgetProps) {
	const changeBasisAxis = (changedBasis: BasisVector) => {
		setBasis((prev) => ({ ...prev, ...changedBasis }));
	};

	return (
		<div className={styles.widget}>
			<button className={styles.button} style={{ width: 95 }} type="button" onClick={handleToggle}>
				{toggle == BasisToward.Altered ?
					BasisToward.Standard :
					BasisToward.Altered}
			</button>
			<button className={styles.button} type="button" onClick={handleIdentity}>
				Reset
			</button>
			<div className={styles.basis_wrapper}>
				<div className={styles.basis_vector}>
					<IHat className={styles.i} />
					<input
						placeholder={"0"}
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
						placeholder={"0"}
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
						placeholder={"0"}
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
					<JHat className={styles.j} />
					<input
						placeholder={"0"}
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
						placeholder={"0"}
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
						placeholder={"0"}
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
					<KHat className={styles.k} />
					<input
						placeholder={"0"}
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
						placeholder={"0"}
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
						placeholder={"0"}
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
					<div className={styles.v}>
						<InlineMath math={`{\\vec{v}}`} />
					</div>
					<input
						placeholder={"0"}
						type="number"
						value={editableVector.x}
						onChange={(e) => setVector((prev) => {
							const vec3 = prev.clone();
							vec3.x = Number(e.target.value);
							return vec3;
						})}
					></input>
					<input
						placeholder={"0"}
						type="number"
						value={editableVector.y}
						onChange={(e) => setVector((prev) => {
							const vec3 = prev.clone();
							vec3.y = Number(e.target.value);
							return vec3;
						})}
					></input>
					<input
						placeholder={"0"}
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
