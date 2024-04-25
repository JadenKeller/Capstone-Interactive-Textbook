import styles from './CanvasWrapper.module.css'

import { Canvas } from '@react-three/fiber'
import Scene, { Transformation } from '../Scene/Scene'
import { Color, Euler, GridHelper, Matrix4, Texture, Vector3 } from 'three'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { ConnectDropTarget, useDrop } from 'react-dnd'
import { TransformationStateManager } from '../InteractiveCanvas/InteractiveCanvas'
import { MapControls } from '@react-three/drei'
import { Delete, RefreshCcw } from 'react-feather'
import CanvasTooltipButton from "../CanvasTooltipButton/CanvasTooltipButton"
import AppliedTransformations from '../AppliedTransformations/AppliedTransformations'

/**
 * CanvasWrapper component props
 * @param orbitCamera - Enables camera controls, this is currently WIP.
 * @param scenes - A list of scenes to be rendered. A scene represents a 3D object to be rendered in the canvas.
 * @param useUndoControls - Enables undo and clear controls.
 * @param tooltipText - The text to be displayed in the tooltip.
 */
export interface CanvasWrapperProps {
	cameraControls?: boolean,
	scenes?: Scene[],
	useUndoControls?: boolean,
	tooltipContent?: React.ReactNode,
	useDND?: boolean,
	gridTransformation?: Matrix4
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
	// Set grid matrix transform
	const identity = new Matrix4();
	if (props.gridTransformation) {
		identity.multiply(props.gridTransformation);
	}
	// Rotate for y-forward
	const gridMatrix = identity.multiply(new Matrix4().makeRotationFromEuler(new Euler(Math.PI / 2, 0, 0)));
	// Handles animations.
	useEffect(() => {
		TransformationStateManager.addChangedCallback(setStateTransformations)
		clearInterval(runID.current)
		runID.current = setInterval(() => {
			incrementor.current = incrementor.current + 0.01

			// Animate applied transformations
			TransformationStateManager.activeTransformations.forEach((transformation) => {

				let transform;
				switch (transformation.type) {
					case 'rotation':
						transform = applyTransformation(transformation)
						if (!transform) return;

						transformation.matrix4 = new Matrix4().makeRotationFromEuler(new Euler(transform[0], transform[1], transform[2]));
						break;
					case 'translation':
						transform = applyTransformation(transformation)
						if (!transform) return;

						transformation.matrix4 = new Matrix4().makeTranslation(new Vector3(transform[0], transform[1], transform[2]))
						break;
					case 'scale':
						transform = applyTransformation(transformation)
						if (!transform) return;

						transformation.matrix4 = new Matrix4().makeScale(transform[0], transform[1], transform[2])
						break;
				}
			})
			let transform;
			// Animate static transformations
			props.scenes?.forEach(scene => {
				scene.staticTransformations?.forEach(transformation => {
					switch (transformation.type) {
						case 'rotation':
							transform = applyTransformation(transformation)
							if (!transform) return;

							transformation.matrix4 = new Matrix4().makeRotationFromEuler(new Euler(transform[0], transform[1], transform[2]));

							// If the transformation is set to publish to another transformation, copy the current transformation to the other transformation
							if (transformation.publishToId !== undefined) {
								TransformationStateManager.activeTransformations.forEach((t) => {
									if (t.id === transformation.publishToId && transformation.publishToId !== undefined) {
										t.matrix4 = new Matrix4().makeRotationFromEuler(new Euler(transform![0], transform![1], transform![2]));
									}
								})
							}
							break;
						case 'translation':
							transform = applyTransformation(transformation)
							if (!transform) return;

							transformation.matrix4 = new Matrix4().makeTranslation(new Vector3(transform[0], transform[1], transform[2]))
							break;
						case 'scale':
							transform = applyTransformation(transformation)
							if (!transform) return;

							transformation.matrix4 = new Matrix4().makeScale(transform[0], transform[1], transform[2])
							break;
					}
				})
			})
		}, 10)
	})

	// ReactDnD drop handler
	const [{ canDrop }, drop] = useDrop(() => ({
		accept: "matrix",
		drop: (item, monitor) => {
			TransformationStateManager.pushTransformation((monitor.getItem() as any).transformation)
			setStateTransformations(TransformationStateManager.getTransformations());
		},
		collect: (monitor) => ({
			canDrop: monitor.canDrop()
		})
	}))


	/**
	 * Name is disingenuous, actually formats the transformation matrix based on the transformation type.
	 * @param transformation The transformation to format
	 * @returns An x, y and z value to create a new matrix
	 */
	const applyTransformation = (transformation: Transformation) => {
		if (!transformation.amount) {
			console.error('Transformations of type rotation, translation or scale require an amount field')
			return;
		}
		// Start the transformation if it has not started yet
		if (!transformation.startTime) transformation.startTime = incrementor.current;
		// Is the start time currently less than the delay?
		if (transformation.delay && transformation.delay > incrementor.current - transformation.startTime) return;
		// Set the delay to 0 if it is not set
		if (!transformation.delay) transformation.delay = 0;

		let transformX = 0;
		let transformY = 0;
		let transformZ = 0;

		// Calculate the transformation based on the start time, delay and amount
		transformX = (incrementor.current - (transformation.startTime + transformation.delay)) * transformation.amount[0]
		transformY = (incrementor.current - (transformation.startTime + transformation.delay)) * transformation.amount[1]
		transformZ = (incrementor.current - (transformation.startTime + transformation.delay)) * transformation.amount[2]

		// If the transformation is going to be greater than it's max, cap it at max.
		if (transformation.max) {
			if ((incrementor.current - (transformation.startTime + transformation.delay)) * transformation.amount[0] > transformation.max[0]) {
				transformX = transformation.max[0]
			}
			if ((incrementor.current - (transformation.startTime + transformation.delay)) * transformation.amount[1] > transformation.max[1]) {
				transformY = transformation.max[1]
			}
			if ((incrementor.current - (transformation.startTime + transformation.delay)) * transformation.amount[2] > transformation.max[2]) {
				transformZ = transformation.max[2]
			}
		}
		return [transformX, transformY, transformZ]
	}

	return (
		<div className={styles.wrapper} ref={(props.useDND) ? drop : undefined}>
			<Canvas camera={{ position: [0, 0, 10] }} className={styles.canvas}>
				<gridHelper matrixAutoUpdate={false} matrix={gridMatrix} args={[40, 40, 0xF4FFFF, 0x4B585D]} />
				{props.scenes?.map((scene, idx) => {
					return (
						<Scene texture={scene.texture} key={idx} geometry={scene.geometry} color={scene.color} initialPosition={scene.initialPosition} transformations={(scene.acceptTransformations) ? (scene.staticTransformations) ? [...TransformationStateManager.activeTransformations.concat(scene.staticTransformations)].reverse() : [...TransformationStateManager.activeTransformations].reverse() : scene.staticTransformations} />
					)
				})}
				{(props.cameraControls) ? <MapControls enableRotate={false} minDistance={12} maxDistance={12} screenSpacePanning={true} /> : <></>}
			</Canvas>
			{props.useUndoControls && <div className={styles.controls_list}>
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
			</div>}
			<CanvasTooltipButton>{props.tooltipContent}</CanvasTooltipButton>
			<AppliedTransformations />
			<div className={styles.overlay} style={{ display: (canDrop) ? "flex" : "none" }}>
				<p className={styles.overlay_text}>Drop here to apply transformation</p>
			</div>
		</div>
	)
}