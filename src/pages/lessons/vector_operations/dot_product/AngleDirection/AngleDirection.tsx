import { Scene } from "@components/CanvasWrapper/CanvasWrapper";
import InteractiveCanvas from "@components/InteractiveCanvas/InteractiveCanvas";
import AngleDirectionControls from "@components/lessons/vector_operations/angle_direction/AngleDirectionControls";
import { Circle, Line, Plane, Text } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Color, Euler, Matrix4, Shape, Vector3 } from "three";

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
    const [guardLocation, setGuardLocation] = useState<Matrix4>(new Matrix4().makeTranslation(new Vector3(-2, 2, 0.02)))
    const [spyLocation, setSpyLocation] = useState<Matrix4>(new Matrix4().makeTranslation(new Vector3(2, -2, 0.02)))
    const [angle, setAngle] = useState(0)
    const [range, setRange] = useState(2)
    const [distance, setDistance] = useState(0)
    const [dotAngle, setDotAngle] = useState(0)
    

    const updateGuardLocation = (m: Matrix4) => {
        setGuardLocation((prev) => {
            if(prev.equals(m)) return prev;
            let same = true;
            for(let i = 0; i < 16; i++) {
                if(prev.elements[i] !== m.elements[i]) {
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
            geometry: Stickman(), staticTransformations:[{id: 0, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(-2, 2, 0.1))}], moveable: true, publishFinalMatrix: updateGuardLocation
        },
        {
            geometry: Stickman(), staticTransformations:[{id: 0, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(2, -2, 0.1))}], moveable: true, publishFinalMatrix: updateSpyLocation
        }
])

    useEffect(() => {
        let newScenes = [scenes[0], scenes[1]]

        let distance = Math.sqrt(Math.pow(spyLocation.elements[12] - guardLocation.elements[12], 2) + Math.pow(spyLocation.elements[13] - guardLocation.elements[13], 2))
        let direction = new Vector3(spyLocation.elements[12], spyLocation.elements[13], 0).sub(new Vector3(guardLocation.elements[12], guardLocation.elements[13], 0)).normalize()
        let da = Math.acos(direction.dot(new Vector3(1, 0, 0).applyEuler(new Euler(0, 0, angle)))) * (180/Math.PI)
        setDotAngle(da)
        setDistance(distance)

        let detectionShape = new Shape();
        detectionShape.arc(guardLocation.elements[12], guardLocation.elements[13], range, Math.PI/2 + angle, -Math.PI/2 + angle, true);
        newScenes.push(
            {
                geometry: <Line color={(da < 90) ? (distance < range) ? new Color(0x229922) : new Color(0xffffff): new Color(0x888888)} lineWidth={2} points={[new Vector3(guardLocation.elements[12], guardLocation.elements[13], 0.015), new Vector3(spyLocation.elements[12], spyLocation.elements[13], 0.015)]} />
            },
            {
                geometry: <Line color={new Color(0xff0000)} lineWidth={2} points={[new Vector3(guardLocation.elements[12], guardLocation.elements[13], 0.015), new Vector3(3, 0, 0).applyEuler(new Euler(0, 0, angle)).add(new Vector3(guardLocation.elements[12], guardLocation.elements[13], 0.015))]} />
            },
            {
                geometry: <Text position={[guardLocation.elements[12] + 1, guardLocation.elements[13], 0.1]} fontSize={0.5} anchorX="center" anchorY="middle" outlineWidth={0.05} outlineColor={0x000000}>N</Text>
            },
            {
                geometry: <Text position={new Vector3(guardLocation.elements[12], guardLocation.elements[13], 0.02).lerp(new Vector3(spyLocation.elements[12], spyLocation.elements[13], 0.02), 0.5)} fontSize={0.5} anchorX="center" anchorY="middle" outlineWidth={0.05} outlineColor={0x000000}>X</Text>
            },
            {
                geometry: <shapeGeometry args={[detectionShape]} />, color: {color: new Color(0x55aa55), opacity: 1}, staticTransformations: [{id: 2, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(0, 0, 0.01))}]
            }
        )
        setScenes(newScenes)
    }, [guardLocation, spyLocation, angle, range])
    return (
        <div style={{position: "relative"}}>
            <InteractiveCanvas scenes={scenes} useDND={false} useUndoControls={false} tooltipContent={[<h4>How To Use The Interactive Canvas</h4>,<p>
            Click on the guard and the enemy to drag them around and use the sliders to change how much and where the guard can see.</p>]}/>
            <AngleDirectionControls angle={angle} range={range} enemyLocation={spyLocation} guardLocation={guardLocation} setAngle={(setAngle)} setRange={setRange}/>
        </div>
    )
}