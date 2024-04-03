import { useFrame } from "@react-three/fiber";
import { ReactElement, useEffect, useRef } from "react";
import { Color, Matrix4, Mesh, Vector3 } from "three";
import { TransparentColor } from "../CanvasWrapper/CanvasWrapper";

/**
 * Scene component props
 * @param transformations represents the transformations to be applied to geometry in the scene
 * @param geometry represents the geometry to be rendered in the scene
 * @param color represents the color of the geometry
 * @param initialPosition represents the initial position of the geometry. It is recommended to set static transformations instead.
 */
export interface SceneProps {
    transformations?: Transformation[],
    geometry?: ReactElement,
    color?: Color | TransparentColor,
    initialPosition?: Vector3
}

/**
 * A transformation
 * @param type is the type of transformation. `rotation` and `translation` require an amount field and are animated.
 * @param matrix4 is the transformation matrix
 * @param amount is the amount of rotation or translation to apply every frame
 */
export interface Transformation {
    id: number,
    type: 'rotation' | 'translation' | 'raw' | 'empty' | 'scale',
    matrix4: Matrix4,
    name?: string,
    amount?: [number, number, number],
    publishToId?: number,
    max?: [number, number, number],
    startTime?: number,
    delay?: number
}

export default function Scene(props: SceneProps) {
    const box = useRef<Mesh>(null!)

    useFrame(() => {
        if (props.transformations) {
            box.current.matrixAutoUpdate = false;
            box.current.matrix = new Matrix4()
            props.transformations.forEach(transformation => {
                if(transformation.matrix4)
                    box.current!.matrix?.multiply(transformation.matrix4)
            })
        }
    })
    setTimeout(() => {
    }, 1)
    
    return (
        <mesh position={props.initialPosition} ref={box}>
            {props.geometry}
            <meshBasicMaterial transparent={(props.color && 'opacity' in props.color)} opacity={(props.color && 'opacity' in props.color) ? props.color.opacity : 1} color={(props.color && props.color instanceof Color) ? props.color : (props.color && 'opacity' in props.color) ? props.color.color :  0xdd6666} />
        </mesh>
    )
}