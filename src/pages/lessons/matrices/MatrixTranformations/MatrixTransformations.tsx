import DemoLayout from "@components/ui/layout/MatrixLayout/MatrixLayout";
import InteractiveCanvas from "@components/InteractiveCanvas/InteractiveCanvas";
import { Color, Euler, Matrix4, Vector3 } from "three";

export default function MatrixTransformations() {
	return (
		<DemoLayout>
			<InteractiveCanvas
				availableTransformations={[
					{ id: 4, type: 'empty', name: "S_r", matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)) },
					{ id: 0, type: 'empty', name: "E_r", matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)) },
					{ id: 1, type: 'raw', name: "E_t", matrix4: new Matrix4().makeTranslation(new Vector3(2, 2, 0)) },
					{ id: 3, type: 'rotation', name: "M_r", amount: [0, 0, 1], matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)) },
					{ id: 2, type: 'raw', name: "M_t", matrix4: new Matrix4().makeTranslation(new Vector3(2, 0, 0)) },
				]}
				scenes={[
					{
						geometry: <planeGeometry />, acceptTransformations: true, color: new Color(0xaaaaaa), staticTransformations: [
							{ id: 1, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(0, 0, 0.1)) }
						]
					},
					{
						geometry: <planeGeometry />, acceptTransformations: false, color: new Color(0x44cc44), staticTransformations: [
							{ id: 0, type: 'rotation', amount: [0, 0, 1], matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)), publishToId: 0 },
							{ id: 1, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(2, 2, 0.1)) }
						]
					},
					{
						geometry: <planeGeometry />, acceptTransformations: false, staticTransformations: [
							{ id: 0, type: 'rotation', amount: [0, 0, 0.1], matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)), publishToId: 4 },
							{ id: 1, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(0, 0, 0.1)) }
						]
					},
				]}
			/>
		</DemoLayout>
	)
}			