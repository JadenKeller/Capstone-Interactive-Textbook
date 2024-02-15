import { Canvas } from '@react-three/fiber'
import Scene, { Transformation } from './Scene'
import { Euler, Matrix4, Vector3 } from 'three'
import { useRef, useState } from 'react'

export default function CanvasWrapper({transformations}: {transformations: Transformation[]}) {
    let incrementor = useRef(0);
    let runID = useRef(-1)

    clearInterval(runID.current)
    runID.current = setInterval(() => {
        incrementor.current = incrementor.current + 0.01
        // console.log(incrementor)
        transformations.forEach((transformation) => {
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


    return (
        <div>
            <Canvas camera={{position: [0, 0, 10]}} style={{width: '100%', height: '100vh'}}>
                <gridHelper args={[20, 20, 0x000000, 0xaaaaaa]} rotation={[Math.PI /2, 0, 0]}/>
                <Scene  geometry={<boxGeometry args={[1, 1, 0.1]} />} transformations={transformations}/>
            </Canvas>
        </div>
    )
}