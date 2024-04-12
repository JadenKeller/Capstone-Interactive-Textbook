import { BasisVectors } from "pages/lessons/vectors/BasisVectors/BasisVectors";
import { Dispatch, SetStateAction } from "react";
import { Vector3 } from "three";

interface BasisWidgetProps {
	editableBasis: BasisVectors
	setBasis: Dispatch<SetStateAction<{ i: Vector3; j: Vector3; k: Vector3 }>>;
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

export default function BasisWidget({ editableBasis, setBasis }: BasisWidgetProps) {
	const changeBasisAxis = (changedBasis: BasisVector) => {
		setBasis((prev) => ({ ...prev, ...changedBasis }));
	};

	return (
		<div>
			<div>
				i
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
			<div>
				j
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
			<div>
				k
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
		</div>
	);
}
