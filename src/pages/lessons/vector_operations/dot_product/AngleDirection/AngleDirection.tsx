import { Scene } from "@components/CanvasWrapper/CanvasWrapper";
import InteractiveCanvas from "@components/InteractiveCanvas/InteractiveCanvas";
import { Circle, Line, Plane } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Color, Matrix4, Shape, Vector3 } from "three";

export function Stickman() {
    return (
        <group>
            <Line points={[[0, 0], [0, -1.5]]} />
            <Line points={[[0, -0.5], [0.5, -0.75]]} />
            <Line points={[[0, -0.5], [-0.5, -0.75]]} />
            <Line points={[[0, -1.5], [0.5, -2]]} />
            <Line points={[[0, -1.5], [-0.5, -2]]} />
            <Circle args={[0.5]} />
            
        </group>
    )
}

export default function AngleDirection() {
    const [guardLocation, setGuardLocation] = useState<Matrix4>(new Matrix4().makeTranslation(new Vector3(-2, 2, 1)))
    const [spyLocation, setSpyLocation] = useState<Matrix4>(new Matrix4().makeTranslation(new Vector3(2, -2, 1)))
    const [updateTime, setUpdateTime] = useState(0)
    const updateID = useRef(0)
    let detectionShape = new Shape();
    detectionShape.moveTo(0, 1);
    detectionShape.lineTo(0, -1);
    detectionShape.arc(0, 0, 2, Math.PI/2, -Math.PI/2, true);

    const updateGuardLocation = (m: Matrix4) => {
        setGuardLocation((prev) => {
            if(prev.equals(m)) return prev;
            let same = true;
            for(let i = 0; i < 16; i++) {
                if(prev.elements[i] !== m.elements[i]) {
                    console.log(prev.elements[i], m.elements[i], i)
                    same = false;
                    break;
                }
            }
            if(same) return prev;
            return m;
        })
    }

    const updateSpyLocation = (m: Matrix4) => {
        setSpyLocation((prev) => {
            if(prev.equals(m)) return prev;
            let same = true;
            for(let i = 0; i < 16; i++) {
                if(prev.elements[i] !== m.elements[i]) {
                    console.log(prev.elements[i], m.elements[i], i)
                    same = false;
                    break;
                }
            }
            if(same) return prev;
            return m;
        })
    }

    const [scenes, setScenes] = useState<Scene[]>([
        {
            geometry: Stickman(), staticTransformations:[{id: 0, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(-2, 2, 1))}], moveable: true, publishFinalMatrix: updateGuardLocation
        },
        {
            geometry: Stickman(), staticTransformations:[{id: 0, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(2, -2, 1))}], moveable: true, publishFinalMatrix: updateSpyLocation
        }
])

    useEffect(() => {
        clearTimeout(updateID.current)
        updateID.current = setTimeout(() => {
            setUpdateTime(Math.random())
        }, 200)
        if(scenes.length > 1) setScenes([scenes[0], scenes[1]])
    }, [guardLocation, spyLocation])

    useEffect(() => {
        console.log('updating')
        if(updateTime === 0) return;
        let newScenes = [scenes[0], scenes[1]]
        newScenes.push(
            {
                geometry: <shapeGeometry args={[detectionShape]} />, color: {color: new Color(0x99dd99), opacity: 0.4}, staticTransformations: [{id: 1, type: 'raw', matrix4: guardLocation}, {id: 2, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(0, 0, -0.01))}]
            }
        )
        setScenes(newScenes)
    }, [updateTime])
    return (
        <>
            <InteractiveCanvas scenes={scenes} useDND={false} useUndoControls={false} tooltipContent={[<h4>How To Use The Interactive Canvas</h4>,<p>
            Use the slider to change the target of the light ray, then fire it to see the vectors and light color at that location</p>]}/>
        </>
    )
}