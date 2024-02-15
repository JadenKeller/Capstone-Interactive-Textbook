import { Canvas, } from "@react-three/fiber";
import RefDemo from "./RefDemo";
import InteractiveCanvas from "./components/InteractiveCanvas/InteractiveCanvas";
import { Euler, Matrix4, Vector3 } from "three";

const App = () => {
	return (
		<>
			{/* <Canvas style={{ width: "100vw", height: "100vh" }}>
				<pointLight position={[-1, 1, 1]} intensity={10} />
				<pointLight position={[1, -1, 1]} intensity={5} />
				<RefDemo />
			</Canvas > */}
			<InteractiveCanvas availableTransformations={[
                { type: 'rotation', amount: [0, 0, 1], matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)) },
                { type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(4, 0, 0)) }
                ]}/>
		</>
	)
}

export default App;
