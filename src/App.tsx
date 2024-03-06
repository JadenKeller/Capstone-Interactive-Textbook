import { Canvas, } from "@react-three/fiber";
import RefDemo from "./RefDemo";
import InteractiveCanvas from "./components/InteractiveCanvas/InteractiveCanvas";
import { Color, Euler, Matrix4, Vector3 } from "three";

const App = () => {
	return (
		<>
			{/* <Canvas style={{ width: "100vw", height: "100vh" }}>
				<pointLight position={[-1, 1, 1]} intensity={10} />
				<pointLight position={[1, -1, 1]} intensity={5} />
				<RefDemo />
			</Canvas > */}
			<InteractiveCanvas 
				availableTransformations={[
					{ id: 0, type: 'empty', name: "E_r", matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)) },
					{ id: 1, type: 'raw', name: "E_t", matrix4: new Matrix4().makeTranslation(new Vector3(2, 2, 0)) },
					{ id: 3, type: 'rotation', name: "M_r", matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)) },
					{ id: 2, type: 'raw', name: "M_t", matrix4: new Matrix4().makeTranslation(new Vector3(2, 0, 0)) },
                ]} 
				scenes={[
                    { geometry: <boxGeometry args={[1, 1, 0.1]} />, acceptTransformations: true },
                    { geometry: <boxGeometry args={[1, 1, 0.1]} />, acceptTransformations: false, color: new Color(0x44cc44), staticTransformations: [
						{ id: 0, type: 'rotation', amount: [0, 0, 1], matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)), publishToId: 0 },
						{ id: 1, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(2, 2, 0)) }
					]}
                ]}
				/>
		</>
	)
}

export default App;
