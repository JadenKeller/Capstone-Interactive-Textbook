import { Canvas } from '@react-three/fiber'
import Scene, { Transformation } from './Scene'
import { Euler, Matrix4, Vector3 } from 'three'
import { useState } from 'react'

export default function CanvasWrapper({transformations}: {transformations: Transformation[]}) {
    const [incrementor, setIncrementor] = useState(0);

    setTimeout(() => {
        setIncrementor(incrementor + 0.03)
    }, 10)

    transformations.forEach((transformation) => {
        if(transformation.animate) {
            switch (transformation.type) {
                case 'rotation': 
                    transformation.matrix4.makeRotationFromEuler(new Euler(0, 0, incrementor));
                    break;
            }
        }
    })

    return (
        <div>
            <Canvas camera={{position: [0, 0, 10]}} style={{width: '100%', height: '100vh'}}>
                <gridHelper args={[20, 20, 0x000000, 0xaaaaaa]} rotation={[Math.PI /2, 0, 0]}/>
                <Scene  geometry={<boxGeometry args={[1, 1, 0.1]} />} transformations={transformations}/>
            </Canvas>
        </div>
    )
}