import { Canvas, } from "@react-three/fiber";
import RefDemo from "./RefDemo";
import InteractiveCanvas from "./components/InteractiveCanvas";

const App = () => {
	return (
		<>
			{/* <Canvas style={{ width: "100vw", height: "100vh" }}>
				<pointLight position={[-1, 1, 1]} intensity={10} />
				<pointLight position={[1, -1, 1]} intensity={5} />
				<RefDemo />
			</Canvas > */}
			<InteractiveCanvas />
		</>
	)
}

export default App;
