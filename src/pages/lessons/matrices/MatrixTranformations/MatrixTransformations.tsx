import DemoLayout from "@components/ui/layout/MatrixLayout/MatrixLayout";
import InteractiveCanvas, { TransformationStateManager } from "@components/InteractiveCanvas/InteractiveCanvas";
import { Color, Euler, Matrix4, TextureLoader, Vector3 } from "three";
import { useEffect, useRef, useState } from "react";

export default function MatrixTransformations() {
	const [correct, setCorrect] = useState(false)
	const loader = new TextureLoader()

	const moonTexture = loader.load('textures/moon.png')
	const sunTexture = loader.load('textures/sun.png')
	const earthTexture = loader.load('textures/earth.png')

	useEffect(() => {
		TransformationStateManager.addChangedCallback(() => {
			if (TransformationStateManager.activeTransformations.length === 4) {
				let c = true;
				if (TransformationStateManager.activeTransformations[0].id !== 2) c = false;
				if (TransformationStateManager.activeTransformations[1].id !== 3) c = false;
				if (TransformationStateManager.activeTransformations[2].id !== 1) c = false;
				if (TransformationStateManager.activeTransformations[3].id !== 0) c = false;
				console.log(c)
				setCorrect(c)
			}
		})
	}, [])

	return (
		<DemoLayout>
			<InteractiveCanvas 
				availableTransformations={[
					{ id: 0, type: 'empty', name: "E_r", matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 0.1)) },
					{ id: 1, type: 'raw', name: "E_t", matrix4: new Matrix4().makeTranslation(new Vector3(4, 4, 0)) },
					{ id: 3, type: 'rotation', name: "M_r", amount: [0, 0, 1], matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)) },
					{ id: 2, type: 'raw', name: "M_t", matrix4: new Matrix4().makeTranslation(new Vector3(2, 0, 0)) },
                ]} 
				scenes={[
					// Moon Cube
					(!correct) ? {
						geometry: <planeGeometry />, color: {color: new Color(0xff4444), opacity: 0.5}, staticTransformations:[
							{ id: 0, type: 'rotation', amount: [0, 0, 0.5], matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 0.1)), publishToId: 0 },
							{ id: 1, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(4, 4, 0.1)) },
							{ id: 3, type: 'rotation', name: "M_r", amount: [0, 0, 1], matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)) },
							{ id: 2, type: 'raw', name: "M_t", matrix4: new Matrix4().makeTranslation(new Vector3(2, 0, 0)) },
						]
					} : { geometry: <planeGeometry />, color: {color: new Color(0xff4444), opacity: 0}},
					// Earth
					{ geometry: <circleGeometry args={[0.5]} />, color: new Color(0xffffff), staticTransformations: [
						{ id: 0, type: 'rotation', amount: [0, 0, 0.5], matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 0.1)), publishToId: 0 },
						{ id: 1, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(4, 4, 0.1)) }
					], texture: earthTexture},
					// Sun
					{ geometry: <circleGeometry args={[1]} />, color: new Color(0xffffff), staticTransformations: [
						{ id: 0, type: 'rotation', amount: [0, 0, 0.1], matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)), publishToId: 4 },
						{ id: 1, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(0, 0, 0.1)) }
					], texture: sunTexture},
					// Moon
					{ geometry: <circleGeometry args={[0.3]} />, acceptTransformations: true, color: new Color(0xffffff), staticTransformations: [
						{ id: 1, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(0, 0, 0.1)) }
					], texture: moonTexture },
                ]}
				/>
		</DemoLayout>
	)
}			