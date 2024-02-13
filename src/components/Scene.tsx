import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Matrix4, Mesh } from "three";

export interface Transformation {
    matrix4: Matrix4
    animate: boolean,
    type?: 'rotation' | 'translation'
}

export default function Scene({transformations, geometry}: {transformations?: Transformation[], geometry?: React.ReactElement}) {
    const box = useRef<Mesh>(null!)

    useFrame(({clock}) => {
		if (box.current && transformations) {
            box.current.matrixAutoUpdate = false;
            box.current.matrix = new Matrix4()
            transformations.forEach(transformation => {
                box.current!.matrix?.multiply(transformation.matrix4)
            })
        }
	})
    
    return (
        <mesh ref={box}>
            {geometry}
            <meshBasicMaterial color="red" />
        </mesh>
    )
}