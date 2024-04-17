import { ArrowHelper, Color, ColorRepresentation, Vector2, Vector3 } from "three";
import { Line } from "@react-three/drei";

/**
 * Arguments for constructing an arrowHelper component. Elements are required to ensure each are provided.
 */
export type arrowArgs = [
	dir: Vector3 | undefined,
	origin: Vector3 | undefined,
	length: number | undefined,
	color: ColorRepresentation | undefined,
	headLength: number | undefined,
	headWidth: number | undefined
];

/**
 * Wrapping component for visualizations of vectors using sized line widths
 * @param {number} lineWidth
 * @param {arrrowArgs} arrowHelperArgs
 * @returns 
 */
export default function ArrowWrapper({ lineWidth, arrowHelperArgs }: { lineWidth: number, arrowHelperArgs: arrowArgs }) {

	// todo: have this run from the origin to length*direction+origin
	const len = (arrowHelperArgs[2] || 0.25) - (arrowHelperArgs[4] || 0);
	const vOrigin = arrowHelperArgs[1] || new Vector3(0, 0, 0);
	const direction = arrowHelperArgs[0] || new Vector3(1, 0, 0);

	const points = [vOrigin, new Vector3().copy(direction).multiplyScalar(len).add(vOrigin)];

	return (
		<>
			<arrowHelper args={arrowHelperArgs} />
			<Line lineWidth={lineWidth} points={points} color={arrowHelperArgs[3]}></Line>
		</>
	);
}