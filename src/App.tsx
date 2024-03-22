import InteractiveCanvas from "./components/InteractiveCanvas/InteractiveCanvas";
import { Color, Euler, Matrix4, Vector3 } from "three";
import DemoLayout from "./components/DemoLayout/DemoLayout";
import PlusMinus from "./pages/lessons/vector_operations/dot_product/PlusMinus/PlusMinus";

const App = () => {
	return (
		<>
			{/* <Canvas style={{ width: "100vw", height: "100vh" }}>
				<pointLight position={[-1, 1, 1]} intensity={10} />
				<pointLight position={[1, -1, 1]} intensity={5} />
				<RefDemo />
			</Canvas > */}
			{/* <DemoLayout>
				<InteractiveCanvas
					availableTransformations={[
						{ type: 'rotation', amount: [0, 0, 1], matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)) },
						{ type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(2, 0, 0)) },
						{ type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(0, 2, 0)) },
					]}
					scenes={[
						{ geometry: <boxGeometry args={[1, 1, 0.1]} />, acceptTransformations: true },
						{
							geometry: <boxGeometry args={[1, 1, 0.1]} />, acceptTransformations: false, color: new Color(0x44cc44), staticTransformations: [
								{ type: 'rotation', amount: [0, 0, 1], matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)) },
								{ type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(2, 2, 0)) }
							]
						}
					]}
				/>
			</DemoLayout> */}
			<PlusMinus />
			{/* <InteractiveCanvas 
				availableTransformations={[
					{ id: 4, type: 'empty', name: "S_r", matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)) },
					{ id: 0, type: 'empty', name: "E_r", matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)) },
					{ id: 1, type: 'raw', name: "E_t", matrix4: new Matrix4().makeTranslation(new Vector3(4, 4, 0)) },
					{ id: 3, type: 'rotation', name: "M_r", amount: [0, 0, 1], matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)) },
					{ id: 2, type: 'raw', name: "M_t", matrix4: new Matrix4().makeTranslation(new Vector3(2, 0, 0)) },
                ]} 
				scenes={[
					{
						geometry: <planeGeometry />, color: {color: new Color(0xff4444), opacity: 0.5}, staticTransformations:[
							{ id: 0, type: 'rotation', amount: [0, 0, 1], matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)), publishToId: 0 },
							{ id: 1, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(4, 4, 0.1)) },
							{ id: 3, type: 'rotation', name: "M_r", amount: [0, 0, 1], matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)) },
							{ id: 2, type: 'raw', name: "M_t", matrix4: new Matrix4().makeTranslation(new Vector3(2, 0, 0)) },
						]
					},
					{ geometry: <circleGeometry args={[0.5]} />, color: new Color(0x44cc44), staticTransformations: [
						{ id: 0, type: 'rotation', amount: [0, 0, 1], matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)), publishToId: 0 },
						{ id: 1, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(4, 4, 0.1)) }
					]},
					{ geometry: <circleGeometry args={[1]} />, color: new Color(0xddaa44), staticTransformations: [
						{ id: 0, type: 'rotation', amount: [0, 0, 0.1], matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)), publishToId: 4 },
						{ id: 1, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(0, 0, 0.1)) }
					] },
					{ geometry: <circleGeometry args={[0.3]} />, acceptTransformations: true, color: new Color(0xaaaaaa), staticTransformations: [
						{ id: 1, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(0, 0, 0.1)) }
					]},
                ]}
				/> */}
		</>
	)
}

export default App;
