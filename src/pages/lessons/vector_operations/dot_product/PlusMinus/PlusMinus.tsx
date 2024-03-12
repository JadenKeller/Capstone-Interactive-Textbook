import { Color, Vector3 } from "three";
import DemoLayout from "@components/DemoLayout/DemoLayout";
import InteractiveCanvas from "@components/InteractiveCanvas/InteractiveCanvas";
import { useEffect, useState } from "react";
import { Line } from "@react-three/drei";
import ArrowWrapper from "@components/ArrowWrapper/ArrowWrapper";
import DotProductWidget from "@components/lessons/vector_operations/dot_product/DotProductWidget/DotProductWidget";
import styles from "./PlusMinus.module.css";

export default function PlusMinus() {
	const [x, setX] = useState<number>(-5);
	const [vDirectionCar, setVDirectionCar] = useState(new Vector3(1, 0, 0));
	const [vPositionCar, setVPositionCar] = useState(new Vector3(x, 1, 0));
	const [passed, setPassed] = useState(false);
	const vPositionFinish = new Vector3(3, 1, 0);
	const vFinishNormal = new Vector3(1, 0, 0);
	const [dotResult, setDotResult] = useState(vDirectionCar.dot(vFinishNormal));

	const points = []
	points.push(new Vector3(vPositionFinish.x, 10, 0));
	points.push(new Vector3(vPositionFinish.x, -10, 0));

	useEffect(() => {
		// Get new position and direction of car interactable
		const newPos = new Vector3(x, 1, 0);
		const newDir = vPositionFinish.sub(newPos).normalize();
		setVPositionCar(newPos);
		setVDirectionCar(newDir);

		// Resolve new dot product result
		const result = newDir.dot(vFinishNormal);
		const isFinished = result < 0;
		if (!isFinished == passed)
			setPassed(result < 0);
		setDotResult(result);
	}, [x]);

	return (
		<DemoLayout>
			<>
				{/* TODO: add widgets showing the dot product calculation + result && 'not/finished' and a range input */}
				<div className={styles.wrapper}>
					<DotProductWidget dotResult={dotResult} passed={passed} x={x} setX={setX} />
					<InteractiveCanvas
						availableTransformations={[]}
						scenes={[
							{
								geometry: <ArrowWrapper lineWidth={3} arrowHelperArgs={[vDirectionCar, vPositionCar, 2, Color.NAMES.yellow, 0.4, 0.8]} />, acceptTransformations: false,
							},
							{
								geometry: <arrowHelper args={[vFinishNormal, new Vector3(vPositionFinish.x, vPositionFinish.y + 2, vPositionFinish.z), 1, Color.NAMES.red, 0.25, 0.4]} />, acceptTransformations: false
							},
							{
								geometry: <Line lineWidth={3} points={points} color={Color.NAMES.green}></Line>, acceptTransformations: false
							},

						]}
					/>
				</div>
			</>
		</DemoLayout>
	)
}