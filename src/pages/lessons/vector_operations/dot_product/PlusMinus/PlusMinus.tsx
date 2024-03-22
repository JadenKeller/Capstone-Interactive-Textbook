import { Color, Group, Object3DEventMap, Vector3 } from "three";
import DemoLayout from "@components/DemoLayout/DemoLayout";
import InteractiveCanvas from "@components/InteractiveCanvas/InteractiveCanvas";
import { useEffect, useState } from "react";
import { Line } from "@react-three/drei";
import ArrowWrapper from "@components/ArrowWrapper/ArrowWrapper";
import DotProductWidget from "@components/lessons/vector_operations/dot_product/DotProductWidget/DotProductWidget";
import styles from "./PlusMinus.module.css";
import DotProductInteractiveWidget from "@components/lessons/vector_operations/dot_product/DotProductInteractiveWidget/DotProductInteractiveWidget";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export default function PlusMinus() {
	const [x, setX] = useState<number>(-5);
	const [vDirectionCar, setVDirectionCar] = useState(new Vector3(1, 0, 0));
	const [vPositionCar, setVPositionCar] = useState(new Vector3(x, 1, 0));
	const [hasPassed, setHasPassed] = useState(false);
	const vPositionFinish = new Vector3(3, 1, 0);
	const vFinishNormal = new Vector3(1, 0, 0);
	const [dotResult, setDotResult] = useState(vDirectionCar.dot(vFinishNormal));
	const finishLineWidth = 5;
	const carVectorLength = 3;

	const [model, setModel] = useState<Group<Object3DEventMap>>();

	const points = []
	points.push(new Vector3(vPositionFinish.x, 10, 0));
	points.push(new Vector3(vPositionFinish.x, -10, 0));

	useEffect(() => {
		// TODO: export function out & import into this useEffect
		const loadModel = async () => {
			const gltf = await new GLTFLoader().loadAsync('/src/assets/models/yellow_car/scene.gltf');
			setModel(gltf.scene);
		};

		loadModel();
	}, [])

	useEffect(() => {
		// Get new position and direction of car interactable
		const newPos = new Vector3(x, 1, 0);
		const newDir = vPositionFinish.sub(newPos).normalize();
		setVPositionCar(newPos);
		setVDirectionCar(newDir);

		// Resolve new dot product result
		const result = newDir.dot(vFinishNormal);
		const isFinished = result < 0;
		if (!isFinished == hasPassed)
			setHasPassed(result < 0);
		setDotResult(result);
	}, [x]);

	return (
		<DemoLayout>
			<>
				{/* TODO: add widgets showing the dot product calculation + result && 'not/finished' and a range input */}
				<div className={styles.wrapper}>
					<DotProductWidget dotResult={dotResult} />
					<DotProductInteractiveWidget passed={hasPassed} x={x} setX={setX} />
					<InteractiveCanvas
						availableTransformations={[]}
						scenes={[
							{
								geometry:
									<ArrowWrapper
										lineWidth={carVectorLength}
										arrowHelperArgs={[
											vDirectionCar,
											!hasPassed ? // If the car has passed the finish line, move the dir vector to behind the model
												vPositionCar :
												new Vector3(vPositionCar.x - 4, vPositionCar.y, vPositionCar.z),
											2,
											"#57FFEB",
											0.4,
											0.8]}
									/>,
								acceptTransformations: false,
							},
							{
								geometry: <arrowHelper args={[vFinishNormal, new Vector3(vPositionFinish.x, vPositionFinish.y + 2, vPositionFinish.z), 1, Color.NAMES.red, 0.25, 0.4]} />, acceptTransformations: false
							},
							{
								geometry: <Line lineWidth={finishLineWidth} points={points} color={Color.NAMES.black}></Line>, acceptTransformations: false
							},
							{
								geometry: <Line lineWidth={finishLineWidth} points={points} dashed={true} color={Color.NAMES.white}></Line>, acceptTransformations: false
							},
							model ? {
								geometry:
									<>
										<group
											scale={[0.02, 0.02, 0.02]}
											position={[vPositionCar.x - carVectorLength + 0.25, 0, 2.5]}
											rotation={[0, -Math.PI / 2, 0]}
										>
											<primitive object={model} />
										</group>
										<ambientLight intensity={0.9} />
										<pointLight intensity={3} position={[vPositionCar.x - 2, 2, 1]} />
									</>,
								acceptTransformations: false
							} :
								{
									geometry: <Line lineWidth={finishLineWidth} points={points} dashed={true} color={Color.NAMES.white}></Line>, acceptTransformations: false
								}
						]}
					/>
				</div>
			</>
		</DemoLayout >
	)
}