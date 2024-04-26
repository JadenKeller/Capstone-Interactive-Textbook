import ArrowWrapper from "@components/ArrowWrapper/ArrowWrapper";
import InteractiveCanvas from "@components/InteractiveCanvas/InteractiveCanvas";
import BasisWidget from "@components/lessons/vectors/BasisWidget/BasisWidget";
import { Text } from "@react-three/drei";
import { useEffect, useState } from "react";
import { InlineMath } from "react-katex";
import { Color, Matrix3, Matrix4, Vector3 } from "three";
import styles from "./BasisVectors.module.css"
import BasisTransformations from "@components/lessons/vectors/BasisTransformations/BasisTransformations";

export enum BasisToward {
	Standard = "Identity",
	Altered = "Modified",
}

export type BasisVectors = {
	i: Vector3;
	j: Vector3;
	k: Vector3;
}

export function IHat({ className }: { className?: string | undefined }) {
	return (
		<div className={className}>
			<InlineMath math={`{\\hat{\\textbf{\\i}}}`} />
		</div>
	);
}

export function JHat({ className }: { className?: string | undefined }) {
	return (
		<div className={className}>
			<InlineMath math={`{\\hat{\\textbf{\\j}}}`} />
		</div>
	);
}

export function KHat({ className }: { className?: string | undefined }) {
	return (
		<div className={className}>
			<InlineMath math={`{\\hat{k}}`} />
		</div>
	);
}

/**
 *
 * @todo TODO: investigate whether the grid can be easily altered alongside the base
 */
export default function BasisVectors() {
	const [openVector, setOpenVector] = useState(new Vector3(2, 3, 1));
	const identityBasis = {
		i: new Vector3(1, 0, 0),
		j: new Vector3(0, 1, 0),
		k: new Vector3(0, 0, 1),
	};

	/** Trigger state object */
	const [toggle, setToggle] = useState(BasisToward.Standard);

	/** Vector shown as being relative to the basis adjustments */
	const [interpolatingVector, setInterpolatingVector] = useState(openVector);

	/** Basis vectors that are to be shown and the result of interpolations between open and default, reflected only by visualization of the vectors on the canvas */
	const [interpolatingBasis, setInterpolatingBasis] = useState(identityBasis);

	/** Used alongside input elements to be the changed-to basis */
	const [openBasis, setOpenBasis] = useState(identityBasis);

	/** Transformation sent to the canvas wrapper for transforming the gridHelper */
	const [gridTransformation, setGridTransformation] = useState(new Matrix4());

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
		return new Vector3().copy(openVector).applyMatrix3(newTransform);
	}

	const shiftedVectorLabelPosition = (position: Vector3, ignoreBasisShift?: boolean) => {
		const shift = 0.25;
		const vShift = position.clone().normalize().multiplyScalar(shift);
		return !ignoreBasisShift ? vShift.add(position.multiplyScalar(basisLengthScalar)) : vShift.add(position);
	}

	/** useEffect for interpolating between basis changes, triggered via toggles 
	*/
	useEffect(() => {
		const goalBasis = toggle == BasisToward.Standard ? identityBasis : openBasis
		const goalVector = toggle == BasisToward.Standard ? openVector : calcGoalVector(goalBasis)
		const fromVector = interpolatingVector;
		const fromBasis = interpolatingBasis;

		const startTime = Date.now();

		const interval = setInterval(() => {
			const currentTime = Date.now();
			const elapsedTime = currentTime - startTime;
			const duration = 1000;
			const interpolationFactor = elapsedTime / duration;

			if (elapsedTime >= duration) {
				clearInterval(interval);
				setInterpolatingVector(goalVector);
				setInterpolatingBasis(goalBasis);
				setGridTransformation(new Matrix4(
					goalBasis.i.x, goalBasis.j.x, goalBasis.k.x, 0,
					goalBasis.i.y, goalBasis.j.y, goalBasis.k.y, 0,
					goalBasis.i.z, goalBasis.j.z, goalBasis.k.z, 0,
					0, 0, 0, 1
				))
				return;
			}

			setInterpolatingVector( // lerp relative vector
				new Vector3().copy(fromVector).lerp(goalVector, interpolationFactor)
			);
			const i = new Vector3().copy(fromBasis.i).lerp(goalBasis.i, interpolationFactor);
			const j = new Vector3().copy(fromBasis.j).lerp(goalBasis.j, interpolationFactor)
			const k = new Vector3().copy(fromBasis.k).lerp(goalBasis.k, interpolationFactor)
			setInterpolatingBasis({ // lerp basis vectors
				i,
				j,
				k,
			});
			// TODO: lerp the grid tranformation
			setGridTransformation(new Matrix4(
				i.x, j.x, k.x, 0,
				i.y, j.y, k.y, 0,
				i.z, j.z, k.z, 0,
				0, 0, 0, 1
			));
		}, 16);

		return () => clearInterval(interval);
	}, [toggle, openVector, openBasis]);

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
		setOpenBasis(identityBasis);
	};

	return (
		<div className={styles.relative}>
			<BasisWidget
				editableBasis={openBasis}
				setBasis={setOpenBasis}
				editableVector={openVector}
				setVector={setOpenVector}
				toggle={toggle}
				handleToggle={handleToggle}
				handleIdentity={handleIdentity}
			/>
			<BasisTransformations setBasis={setOpenBasis} />
			<InteractiveCanvas
				gridTransformation={gridTransformation}
				useUndoControls={false}
				useDND={false}
				tooltipContent={[
					<h4>How To Use The Interactive Canvas</h4>,
					<p>
						Modify the basis for which the coordinate system and vector <InlineMath math={`{\\vec{v}}`} /> are relative to by either
						changing the matrix elements representing the basis vectors in the top widget or applying a Rotating or Scaling
						transformation using the widget below.
					</p>,
					<p>
						Use the button to toggle between the "{BasisToward.Standard}" and "{BasisToward.Altered}" basis. Use the
						"Reset" button to return the modifed matrix to identity values.
					</p>,
					<p>
						Use the icon button to toggle between Rotation and Scaling transformations options.
					</p>,
					<p>
						The magnitude of the basis vectors in the scene are scaled up by {basisLengthScalar} to assist visualization. This scaling does not affect other calculations.
					</p>]}
				availableTransformations={[]}
				scenes={[
					{
						geometry: (
							<ArrowWrapper
								lineWidth={3}
								arrowHelperArgs={[
									// i
									new Vector3().copy(interpolatingBasis.i).normalize(),
									vOrigin,
									interpolatingBasis.i.length() * basisLengthScalar,
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
									new Vector3().copy(interpolatingBasis.j).normalize(),
									vOrigin,
									interpolatingBasis.j.length() * basisLengthScalar,
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
									new Vector3().copy(interpolatingBasis.k).normalize(),
									vOrigin,
									interpolatingBasis.k.length() * basisLengthScalar,
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
									new Vector3().copy(interpolatingVector).normalize(),
									vOrigin,
									interpolatingVector.length(),
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
							<Text
								position={shiftedVectorLabelPosition(interpolatingBasis.i.clone())}
								fontSize={0.35}
								anchorX="center"
								anchorY="middle"
								outlineWidth={0.015}
								color={Color.NAMES.indianred}
								outlineColor={0x000000}
							>
								i
							</Text>
						),
					},
					{
						geometry: (
							<Text
								position={shiftedVectorLabelPosition(interpolatingBasis.j.clone())}
								fontSize={0.35}
								anchorX="center"
								anchorY="middle"
								outlineWidth={0.015}
								color={Color.NAMES.green}
								outlineColor={0x000000}
							>
								j
							</Text>
						),
					},
					{
						geometry: (
							<Text
								position={shiftedVectorLabelPosition(interpolatingBasis.k.clone())}
								fontSize={0.35}
								anchorX="center"
								anchorY="middle"
								outlineWidth={0.015}
								color={Color.NAMES.skyblue}
								outlineColor={0x000000}
							>
								k
							</Text>
						),
					},
					{
						geometry: (
							<Text
								position={shiftedVectorLabelPosition(interpolatingVector.clone(), true)}
								fontSize={0.35}
								anchorX="center"
								anchorY="middle"
								outlineWidth={0.015}
								color={Color.NAMES.yellow}
								outlineColor={0x000000}
							>
								v
							</Text>
						),
					},
				]}
			/>
		</div>
	);
}
