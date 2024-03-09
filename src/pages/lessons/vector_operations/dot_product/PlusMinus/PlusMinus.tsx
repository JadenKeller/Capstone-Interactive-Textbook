import { Color, Vector3 } from "three";
import DemoLayout from "@components/DemoLayout/DemoLayout";
import InteractiveCanvas from "@components/InteractiveCanvas/InteractiveCanvas";
import { useEffect, useState } from "react";
import { Line } from "@react-three/drei";

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
		const newDir = vPositionFinish.sub(newPos);
		setVPositionCar(newPos);
		if (!vDirectionCar.equals(newDir))
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
				<input type={"range"} min={-5} max={7} step={0.05} value={x} onChange={(e) => setX(Number(e.target.value))} />
				{dotResult}
				{passed ? " finished" : " not finished"}
				<InteractiveCanvas
					availableTransformations={[]}
					scenes={[
						{
							geometry: <arrowHelper args={[vDirectionCar, vPositionCar, 1, Color.NAMES.yellow, 0.25, 0.4]} />, acceptTransformations: false
						},
						{
							geometry: <arrowHelper args={[vFinishNormal, new Vector3(vPositionFinish.x, vPositionFinish.y + 2, vPositionFinish.z), 1, Color.NAMES.red, 0.25, 0.4]} />, acceptTransformations: false
						},
						{
							geometry: <Line lineWidth={1} points={points} color={Color.NAMES.green}></Line>, acceptTransformations: false
						}
					]}
				/>
			</>
		</DemoLayout>
	)
}