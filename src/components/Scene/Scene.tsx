import { useFrame } from "@react-three/fiber";
import { ReactElement, useEffect, useRef } from "react";
import { Color, Matrix4, Mesh, Vector3 } from "three";

export interface SceneProps {
    transformations?: Transformation[],
    geometry?: ReactElement,
    color?: Color,
    initialPosition?: Vector3
}

export interface Transformation {
    type?: 'rotation' | 'translation' | 'raw'
    matrix4: Matrix4
    amount?: [number, number, number]
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
            <meshBasicMaterial color={(props.color) ? props.color :  0xdd6666} />
        </mesh>
    )
}