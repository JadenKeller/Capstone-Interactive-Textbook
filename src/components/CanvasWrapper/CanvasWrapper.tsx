import styles from './CanvasWrapper.module.css'

import { Canvas } from '@react-three/fiber'
import Scene, { Transformation } from '../Scene/Scene'
import { Color, Euler, Matrix4, Vector3 } from 'three'
import { ReactElement, useRef, useState } from 'react'
import { OrbitControls } from 'three-stdlib'
import { useDrop } from 'react-dnd'
import Matrix from '../Matrix/Matrix'
import { TransformationStateManager } from '../InteractiveCanvas/InteractiveCanvas'
import { ArrowLeftCircle, Delete } from 'react-feather'
// extend(OrbitControls)

export interface CanvasWrapperProps {
    orbitCamera?: boolean,
    scenes?: Scene[]
}

export interface Scene {
    geometry: ReactElement,
    acceptTransformations: boolean,
    color?: Color,
    initialPosition?: Vector3
}

export default function CanvasWrapper(props: CanvasWrapperProps) {
    let incrementor = useRef(0);
    let runID = useRef(-1)
    const [stateTransformations, setStateTransformations] = useState<Transformation[]>(TransformationStateManager.getTransformations())

    clearInterval(runID.current)
    runID.current = setInterval(() => {
        incrementor.current = incrementor.current + 0.01
        // console.log(incrementor)
        stateTransformations.forEach((transformation) => {
                switch (transformation.type) {
                    case 'rotation': 
                        if(!transformation.amount) {
                            console.error('Transformations of type rotation require an amount field')
                            return;
                        }
                        transformation.matrix4 = new Matrix4().makeRotationFromEuler(new Euler(incrementor.current * transformation.amount[0], incrementor.current * transformation.amount[1], incrementor.current * transformation.amount[2]));
                        break;
                    case 'translation':
                        if(!transformation.amount) {
                            console.error('Transformations of type translation require an amount field')
                            return;
                        }
                        transformation.matrix4 = new Matrix4().makeTranslation(new Vector3(incrementor.current * transformation.amount[0], incrementor.current * transformation.amount[1], incrementor.current * transformation.amount[2]))
                        break;
                }
        })
    }, 10)

    const [, drop] = useDrop(() => ({
        accept: "matrix",
        drop: (item, monitor) => {
            TransformationStateManager.pushTransformation((monitor.getItem() as any).transformation)
            setStateTransformations(TransformationStateManager.getTransformations());
        }
    }))

    return (
        <div className={styles.wrapper} ref={drop}>
            <Canvas camera={{position: [0, 0, 10]}} className={styles.canvas}>
                <gridHelper args={[20, 20, 0xffffff, 0x555555]} rotation={[Math.PI /2, 0, 0]}/>
                {props.scenes?.map((scene, idx) => {
                    return (
                        <Scene key={idx} geometry={scene.geometry} color={scene.color} initialPosition={scene.initialPosition} transformations={(scene.acceptTransformations) ? stateTransformations: undefined}/>
                    )
                })}
            </Canvas>
            <div className={styles.controls_list}>
                <span className={styles.control} onClick={() => {
                    TransformationStateManager.undo()
                    setStateTransformations(TransformationStateManager.getTransformations())
                }}>
                    <ArrowLeftCircle />
                </span>
                <span className={styles.control} onClick={() => {
                    TransformationStateManager.clear()
                    setStateTransformations(TransformationStateManager.getTransformations())
                }}>
                    <Delete />
                </span>
            </div>
            <div className={styles.applied_transformations}>
                {stateTransformations.map((t, idx) => {
                    return (
                        <Matrix key={idx} idx={idx} selected={false} transformation={t} small={true} />
                    )
                })}
            </div>
        </div>
    )
}