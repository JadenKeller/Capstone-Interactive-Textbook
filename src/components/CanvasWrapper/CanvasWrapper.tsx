import styles from './CanvasWrapper.module.css'

import { Canvas, Node, extend } from '@react-three/fiber'
import Scene, { Transformation } from '../Scene/Scene'
import { Color, Euler, Matrix4, Texture, Vector3 } from 'three'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { useDrop } from 'react-dnd'
import Matrix from '../Matrix/Matrix'
import { TransformationStateManager } from '../InteractiveCanvas/InteractiveCanvas'
import { Delete, RefreshCcw } from 'react-feather'
import { MapControls, OrbitControls } from '@react-three/drei'
import { InlineMath } from 'react-katex'
import CanvasTooltipButton from "../CanvasTooltipButton/CanvasTooltipButton"
import AppliedTransformations from '../AppliedTransformations/AppliedTransformations'

/**
 * CanvasWrapper component props
 * @param orbitCamera - Enables camera controls, this is currently WIP.
 * @param scenes - A list of scenes to be rendered. A scene represents a 3D object to be rendered in the canvas.
 */
export interface CanvasWrapperProps {
	cameraControls?: boolean,
	scenes?: Scene[]
}

/**
 * A scene
 * @param geometry represents the geometry to be rendered in the scene
 * @param acceptTransformations represents whether the scene accepts transformations
 * @param color represents the color of the geometry
 * @param initialPosition represents the initial position of the geometry. It is recommended to set static transformations instead.
 * @param staticTransformations represents the static transformations to be applied to the geometry. These are not changeable through controls or drag and drop
 */
export interface Scene {
	geometry: ReactElement,
	acceptTransformations?: boolean,
	color?: Color | TransparentColor,
	initialPosition?: Vector3,
	staticTransformations?: Transformation[],
	texture?: Texture
}

export interface TransparentColor {
	color: Color,
	opacity: number
}

/**
 * A wrapper for the Canvas to enable more functionality.
 */
export default function CanvasWrapper(props: CanvasWrapperProps) {
	// Enables animations, uses useRef so it does not trigger a re-render on the whole canvas
	let incrementor = useRef(0);
	// RunID is stored per component so it can be cleared correctly when the component re-renders
	let runID = useRef(-1)
	// Currently active transformations.
	const [stateTransformations, setStateTransformations] = useState<Transformation[]>(TransformationStateManager.getTransformations())
	// Handles animations.
	useEffect(() => {
		TransformationStateManager.addChangedCallback(setStateTransformations)
		clearInterval(runID.current)
		runID.current = setInterval(() => {
			incrementor.current = incrementor.current + 0.01

			// Animate applied transformations
			TransformationStateManager.activeTransformations.forEach((transformation) => {
				switch (transformation.type) {
					case 'rotation':
						if (!transformation.amount) {
							console.error('Transformations of type rotation require an amount field')
							return;
						}
						transformation.matrix4 = new Matrix4().makeRotationFromEuler(new Euler(incrementor.current * transformation.amount[0], incrementor.current * transformation.amount[1], incrementor.current * transformation.amount[2]));
						break;
					case 'translation':
						if (!transformation.amount) {
							console.error('Transformations of type translation require an amount field')
							return;
						}
						transformation.matrix4 = new Matrix4().makeTranslation(new Vector3(incrementor.current * transformation.amount[0], incrementor.current * transformation.amount[1], incrementor.current * transformation.amount[2]))
						break;
				}
			})

			// Animate static transformations
			props.scenes?.forEach(scene => {
				scene.staticTransformations?.forEach(transformation => {
					switch (transformation.type) {
						case 'rotation':
							if (!transformation.amount) {
								console.error('Transformations of type rotation require an amount field')
								return;
							}
							transformation.matrix4 = new Matrix4().makeRotationFromEuler(new Euler(incrementor.current * transformation.amount[0], incrementor.current * transformation.amount[1], incrementor.current * transformation.amount[2]));
							if (transformation.publishToId !== undefined) {
								TransformationStateManager.activeTransformations.forEach((t) => {
									if (t.id === transformation.publishToId && transformation.publishToId !== undefined) {
										t.matrix4 = new Matrix4().makeRotationFromEuler(new Euler(incrementor.current * transformation.amount![0], incrementor.current * transformation.amount![1], incrementor.current * transformation.amount![2]));
									}
								})
							}
							break;
						case 'translation':
							if (!transformation.amount) {
								console.error('Transformations of type translation require an amount field')
								return;
							}
							transformation.matrix4 = new Matrix4().makeTranslation(new Vector3(incrementor.current * transformation.amount[0], incrementor.current * transformation.amount[1], incrementor.current * transformation.amount[2]))
							break;
					}
				})
			})
		}, 10)
	}, [])

	// ReactDnD drop handler
	const [{canDrop}, drop] = useDrop(() => ({
		accept: "matrix",
		drop: (item, monitor) => {
			TransformationStateManager.pushTransformation((monitor.getItem() as any).transformation)
			setStateTransformations(TransformationStateManager.getTransformations());
		},
		collect: (monitor) => ({
			canDrop: monitor.canDrop()
		})
	}))

	return (
		<div className={styles.wrapper} ref={drop}>
			<Canvas camera={{ position: [0, 0, 10] }} className={styles.canvas}>
				<gridHelper args={[40, 40, 0xF4FFFF, 0x4B585D]} rotation={[Math.PI / 2, 0, 0]} />
				{props.scenes?.map((scene, idx) => {
					return (
						<Scene texture={scene.texture} key={idx} geometry={scene.geometry} color={scene.color} initialPosition={scene.initialPosition} transformations={(scene.acceptTransformations) ? (scene.staticTransformations) ? [...TransformationStateManager.activeTransformations.concat(scene.staticTransformations)].reverse() : [...TransformationStateManager.activeTransformations].reverse() : scene.staticTransformations} />
					)
				})}
				{(props.cameraControls) ? <MapControls enableRotate={false} minDistance={12} maxDistance={12} screenSpacePanning={true} /> : <></>}
			</Canvas>
			<div className={styles.controls_list}>
				<span className={styles.control} onClick={() => {
					TransformationStateManager.clear()
					setStateTransformations(TransformationStateManager.getTransformations())
				}}>
					<RefreshCcw />
				</span>
				<span className={styles.control} onClick={() => {
					TransformationStateManager.undo()
					setStateTransformations(TransformationStateManager.getTransformations())
				}}>
					<Delete />
				</span>
			</div>
			<CanvasTooltipButton />
			<AppliedTransformations />
			<div className={styles.overlay} style={{display: (canDrop) ? "flex" : "none"}}>
				<p className={styles.overlay_text}>Drop here to apply transformation</p>
			</div>
		</div>
	)
}