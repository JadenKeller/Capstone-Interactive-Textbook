import ArrowWrapper from "@components/ArrowWrapper/ArrowWrapper";
import InteractiveCanvas from "@components/InteractiveCanvas/InteractiveCanvas";
import BasisWidget from "@components/lessons/vectors/BasisWidget";
import { Text } from "@react-three/drei";
import { useEffect, useState } from "react";
import { InlineMath } from "react-katex";
import { Color, Matrix3, Vector3 } from "three";

enum BasisToward {
	Standard = "standard",
	Altered = "altered",
}

export type BasisVectors = {
	i: Vector3;
	j: Vector3;
	k: Vector3;
}

export function IHat() {
	return (
		<InlineMath math={`{\\hat{\\textbf{\\i}}}`} />
	);
}

export function JHat() {
	return (
		<InlineMath math={`{\\hat{\\textbf{\\j}}}`} />
	);
}

export function KHat() {
	return (
		<InlineMath math={`{\\hat{k}}`} />
	);
}

/**
 *
 * @todo TODO: calculate the goal vectors (free and basis) after toggle
 * @todo TODO: investigate whether the grid can be easily altered alongside the base
 * @todo TODO: options for transformation matrix to apply - rotation, shear, scale, reflect
 */
export default function BasisVectors() {
	const vDefault = new Vector3(2, 3, 1);
	const identityBasis = {
		i: new Vector3(1, 0, 0),
		j: new Vector3(0, 1, 0),
		k: new Vector3(0, 0, 1),
	};

	/** Trigger state object */
	const [toggle, setToggle] = useState(BasisToward.Standard);

	/** Vector shown as being relative to the basis adjustments */
	const [dynamicVector, setDynamicVector] = useState(vDefault);

	/** Basis vectors that are to be shown and the result of interpolations between open and default, reflected only by visualization of the vectors on the canvas */
	const [basisVectors, setBasisVectors] = useState(identityBasis);

	/** Used alongside input elements to be the changed-to basis */
	const [openVectors, setOpenVectors] = useState(identityBasis);

	const [transformationMatrix, setTransformationMatrix] = useState(new Matrix3());

	/** Configuration for vectors in the scene via ArrowWrappers */
	const vOrigin = new Vector3(0, 0, 0);
	const basisLengthScalar = 3;
	const basisHeadLength = 0.25;
	const basisHeadWidth = 0.3;

	const calcGoalVector = (toBasis: BasisVectors) => {
		const newTransform = new Matrix3(
			toBasis.i.x, toBasis.j.x, toBasis.k.x,
			toBasis.i.y, toBasis.j.y, toBasis.k.y,
			toBasis.i.z, toBasis.j.z, toBasis.k.z
		);
		setTransformationMatrix(newTransform)
		return new Vector3().copy(vDefault).applyMatrix3(newTransform);
	}

	const shiftedVectorLabelPosition = (position: Vector3, ignoreBasisShift?: boolean) => {
		const shift = 0.25;
		const vShift = position.clone().normalize().multiplyScalar(shift);
		return !ignoreBasisShift ? vShift.add(position.multiplyScalar(basisLengthScalar)) : vShift.add(position);
	}

	/** useEffect for interpolating between basis changes, triggered via toggles 
	*/
	useEffect(() => {
		const goalBasis = toggle == BasisToward.Standard ? identityBasis : openVectors
		const goalVector = toggle == BasisToward.Standard ? vDefault : calcGoalVector(goalBasis)
		const fromVector = dynamicVector;
		const fromBasis = basisVectors;

		const startTime = Date.now();

		const interval = setInterval(() => {
			const currentTime = Date.now();
			const elapsedTime = currentTime - startTime;
			const duration = 1000;
			const interpolationFactor = elapsedTime / duration;

			if (elapsedTime >= duration) {
				clearInterval(interval);
				setDynamicVector(goalVector);
				setBasisVectors(goalBasis);
				return;
			}

			setDynamicVector( // lerp relative vector
				new Vector3().copy(fromVector).lerp(goalVector, interpolationFactor)
			);
			setBasisVectors({ // lerp basis vectors
				i: new Vector3().copy(fromBasis.i).lerp(goalBasis.i, interpolationFactor),
				j: new Vector3().copy(fromBasis.j).lerp(goalBasis.j, interpolationFactor),
				k: new Vector3().copy(fromBasis.k).lerp(goalBasis.k, interpolationFactor),
			});
		}, 16);

		return () => clearInterval(interval);
	}, [toggle]);

	const handleToggle = () => {
		setToggle((prevToward) =>
			prevToward == BasisToward.Standard
				? BasisToward.Altered
				: BasisToward.Standard
		);
	};

	/**
	 * Resets the open vectors (reflected by the input matrix) to an identity matrix
	 */
	const handleIdentity = () => {
		setOpenVectors(identityBasis);
	};

	return (
		<>
			<button type="button" onClick={handleToggle}>
				{toggle}
			</button>
			<button type="button" onClick={handleIdentity}>
				set identity
			</button>
			<BasisWidget editableBasis={openVectors} setBasis={setOpenVectors} />
			<InteractiveCanvas
				availableTransformations={[]}
				scenes={[
					{
						geometry: (
							<ArrowWrapper
								lineWidth={3}
								arrowHelperArgs={[
									// i
									new Vector3().copy(basisVectors.i).normalize(),
									vOrigin,
									basisVectors.i.length() * basisLengthScalar,
									Color.NAMES.indianred,
									basisHeadLength,
									basisHeadWidth,
								]}
							/>
						),
					},
					{
						geometry: (
							<ArrowWrapper
								lineWidth={3}
								arrowHelperArgs={[
									// j
									new Vector3().copy(basisVectors.j).normalize(),
									vOrigin,
									basisVectors.j.length() * basisLengthScalar,
									Color.NAMES.green,
									basisHeadLength,
									basisHeadWidth,
								]}
							/>
						),
					},
					{
						geometry: (
							<ArrowWrapper
								lineWidth={3}
								arrowHelperArgs={[
									// k
									new Vector3().copy(basisVectors.k).normalize(),
									vOrigin,
									basisVectors.k.length() * basisLengthScalar,
									Color.NAMES.skyblue,
									basisHeadLength,
									basisHeadWidth,
								]}
							/>
						),
					},
					{
						geometry: (
							<ArrowWrapper
								lineWidth={3}
								arrowHelperArgs={[
									// free-moving, change-able vector shown relative to basis
									new Vector3().copy(dynamicVector).normalize(),
									vOrigin,
									dynamicVector.length(),
									Color.NAMES.yellow,
									basisHeadLength,
									basisHeadWidth,
								]}
							/>
						),
					},
					// Labels for each basis vector and the relative vector
					{
						geometry: (
							<Text position={shiftedVectorLabelPosition(basisVectors.i.clone())} fontSize={0.35} anchorX="center" anchorY="middle" outlineWidth={0.015} color={Color.NAMES.indianred} outlineColor={0x000000}>i</Text>
						),
					},
					{
						geometry: (
							<Text position={shiftedVectorLabelPosition(basisVectors.j.clone())} fontSize={0.35} anchorX="center" anchorY="middle" outlineWidth={0.015} color={Color.NAMES.green} outlineColor={0x000000}>j</Text>
						),
					},
					{
						geometry: (
							<Text position={shiftedVectorLabelPosition(basisVectors.k.clone())} fontSize={0.35} anchorX="center" anchorY="middle" outlineWidth={0.015} color={Color.NAMES.skyblue} outlineColor={0x000000}>k</Text>
						),
					},
					{
						geometry: (
							<Text position={shiftedVectorLabelPosition(dynamicVector.clone(), true)} fontSize={0.35} anchorX="center" anchorY="middle" outlineWidth={0.015} color={Color.NAMES.yellow} outlineColor={0x000000}>v</Text>
						),
					},
				]}
			/>
		</>
	);
}
