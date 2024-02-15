import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Matrix4, Mesh } from "three";

export interface Transformation {
    type?: 'rotation' | 'translation' | 'raw'
    matrix4: Matrix4
    amount?: [number, number, number]
}

export default function Scene({transformations, geometry}: {transformations?: Transformation[], geometry?: React.ReactElement}) {
    const box = useRef<Mesh>(null!)

    useFrame(() => {
        if (transformations) {
            box.current.matrixAutoUpdate = false;
            box.current.matrix = new Matrix4()
            transformations.forEach(transformation => {
                if(transformation.matrix4)
                    box.current!.matrix?.multiply(transformation.matrix4)
            })
        }
    })
    setTimeout(() => {
    }, 1)
    
    return (
        <mesh ref={box}>
            {geometry}
            <meshBasicMaterial color="red" />
        </mesh>
    )
}