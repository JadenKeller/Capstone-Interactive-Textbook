import { Canvas, } from "@react-three/fiber";
import RefDemo from "./RefDemo";
import InteractiveCanvas from "./components/InteractiveCanvas/InteractiveCanvas";
import { Color, Euler, Matrix4, Vector3 } from "three";
import DemoLayout from "./components/DemoLayout/DemoLayout";

const App = () => {
	return (
		<>
			{/* <Canvas style={{ width: "100vw", height: "100vh" }}>
				<pointLight position={[-1, 1, 1]} intensity={10} />
				<pointLight position={[1, -1, 1]} intensity={5} />
				<RefDemo />
			</Canvas > */}
			<DemoLayout />
			{/* <InteractiveCanvas 
				availableTransformations={[
					{ type: 'rotation', amount: [0, 0, 1], matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)) },
					{ type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(2, 0, 0)) },
					{ type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(0, 2, 0)) },
                ]} 
				scenes={[
                    { geometry: <boxGeometry args={[1, 1, 0.1]} />, acceptTransformations: true },
                    { geometry: <boxGeometry args={[1, 1, 0.1]} />, acceptTransformations: false, color: new Color(0x44cc44), staticTransformations: [
						{ type: 'rotation', amount: [0, 0, 1], matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)) },
						{ type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(2, 2, 0)) }
					]}
                ]}
				/> */}
		</>
	)
}

export default App;
