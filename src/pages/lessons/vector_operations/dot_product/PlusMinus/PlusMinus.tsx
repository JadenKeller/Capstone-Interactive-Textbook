import { Color, Group, Matrix4, Object3DEventMap, Vector3 } from "three";
import InteractiveCanvas from "@components/InteractiveCanvas/InteractiveCanvas";
import { useEffect, useState } from "react";
import { Line, Text } from "@react-three/drei";
import ArrowWrapper from "@components/ArrowWrapper/ArrowWrapper";
import DotProductWidget from "@components/lessons/vector_operations/dot_product/DotProductWidget/DotProductWidget";
import styles from "./PlusMinus.module.css";
import DotProductInteractiveWidget from "@components/lessons/vector_operations/dot_product/DotProductInteractiveWidget/DotProductInteractiveWidget";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import DotProductInfoWidget from "@components/lessons/vector_operations/dot_product/DotProductInfoWidget/DotProductInfoWidget";

export default function PlusMinus() {
	const defaultX = -5;
	const [x, setX] = useState<number>(defaultX);
	const [vDirectionCar, setVDirectionCar] = useState(new Vector3(1, 0, 0));
	const [vPositionCar, setVPositionCar] = useState(new Vector3(defaultX, .75, .2));
	const [hasPassed, setHasPassed] = useState(false);
	const vPositionFinish = new Vector3(3, .75, .2);
	const vFinishNormal = new Vector3(1, 0, 0);
	const [dotResult, setDotResult] = useState(vDirectionCar.dot(vFinishNormal));
	const finishLineWidth = 5;
	const carVectorLength = 3.1;

	const [model, setModel] = useState<Group<Object3DEventMap>>();

	const points = [
		new Vector3(vPositionFinish.x, 10, 0),
		new Vector3(vPositionFinish.x, -10, 0)
	];

	useEffect(() => {
		const loadModel = async () => {
			const gltf = await new GLTFLoader().loadAsync('/models/yellow_car/scene.gltf');
			setModel(gltf.scene);
		};

		loadModel();
	}, [])

	useEffect(() => {
		// Get new position and direction of car interactable
		const newPos = new Vector3(x, vPositionCar.y, vPositionCar.z);
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
		<>
			<div className={styles.wrapper}>
				<DotProductWidget dotResult={dotResult} />
				<DotProductInteractiveWidget passed={hasPassed} x={x} setX={setX} />
				<DotProductInfoWidget />
				<InteractiveCanvas
					availableTransformations={[]}
					scenes={[
						{
							geometry:
								<ArrowWrapper
									lineWidth={carVectorLength}
									arrowHelperArgs={[
										vDirectionCar,
										// !hasPassed ? // If the car has passed the finish line, move the dir vector to behind the model
										vPositionCar,
										// new Vector3(vPositionCar.x - 4, vPositionCar.y, vPositionCar.z),
										2,
										"#57FFEB",
										0.4,
										0.8]}
								/>,
							acceptTransformations: false,
						},
						{
							geometry:
								<arrowHelper args={[vFinishNormal, new Vector3(vPositionFinish.x, vPositionFinish.y + 3, vPositionFinish.z), 1, Color.NAMES.red, 0.25, 0.4]} />,
							acceptTransformations: false
						},
						{
							geometry: // Black of finish line
								<Line lineWidth={finishLineWidth} points={points} color={Color.NAMES.black}></Line>,
							acceptTransformations: false
						},
						{
							geometry: // White of finish line
								<Line lineWidth={finishLineWidth} points={points} dashed={true} color={Color.NAMES.white}></Line>,
							acceptTransformations: false
						},
						model ? {
							geometry:
								<>
									<group
										scale={[0.02, 0.02, 0.02]}
										position={[vPositionCar.x - carVectorLength + 0.25, -.25, 2]}
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
								geometry:
									<Line lineWidth={finishLineWidth} points={points} dashed={true} color={Color.NAMES.white}></Line>,
								acceptTransformations: false
							},
						{
							geometry: // Point for math reference for position of finish line (vec f)
								<mesh
									position={new Vector3(vPositionFinish.x, vPositionFinish.y, vPositionFinish.z - 0.1)}
									scale={new Vector3(0.1, 0.1, 0)}
								>
									<circleGeometry />
									<meshBasicMaterial color={Color.NAMES.red} />
								</mesh>,
							acceptTransformations: false
						},
						{
							geometry: // Point for math reference for position of front of car (vec p)
								<mesh
									position={vPositionCar}
									scale={new Vector3(0.1, 0.1, 0)}
								>
									<circleGeometry />
									<meshBasicMaterial color={"#57FFEB"} />
								</mesh>,
							acceptTransformations: false
						},
						// Labels for each basis vector and the relative vector
						{
							geometry: (
								<Text
									position={new Vector3(
										vPositionCar.x - 0.2,
										vPositionCar.y - 0.3,
										vPositionCar.z
									)}
									fontSize={0.35}
									anchorX="center"
									anchorY="middle"
									outlineWidth={0.015}
									color={"#57FFEB"}
									outlineColor={0x000000}
								>
									p
								</Text>
							),
						},
						{
							geometry: (
								<Text
									position={new Vector3(
										vPositionFinish.x + 0.2,
										vPositionFinish.y + 0.3,
										vPositionFinish.z
									)}
									fontSize={0.35}
									anchorX="center"
									anchorY="middle"
									outlineWidth={0.015}
									color={Color.NAMES.red}
									outlineColor={0x000000}
								>
									f
								</Text>
							),
						},
					]}
					tooltipContent={[
						<h4>How To Use The Interactive Canvas</h4>,
						<p>Drag the slider to move the model across the finish line.</p>
					]}
				/>
			</div>
		</>
	)
}