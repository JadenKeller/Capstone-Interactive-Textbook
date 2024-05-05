import InteractiveCanvas from "@components/InteractiveCanvas/InteractiveCanvas";
import { Circle, Line, Plane } from "@react-three/drei";
import { useState } from "react";
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
    const [guardLocation, setGuardLocation] = useState<Matrix4>( new Matrix4().makeTranslation(new Vector3(0, 0, 0)))
    let detectionShape = new Shape();
    detectionShape.moveTo(0, 1);
    detectionShape.lineTo(0, -1);
    detectionShape.arc(0, 0, 2, Math.PI/2, -Math.PI/2, true);
    console.log(guardLocation)
    return (
        <>
            <InteractiveCanvas scenes={[
                {
                    geometry: Stickman(), staticTransformations: [{id: 0, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(0, 1, 0))}], moveable: true, publishFinalMatrix: (m) => {(guardLocation.equals(m) ? null : setGuardLocation(m))}
                },
                {
                    geometry: <shapeGeometry args={[detectionShape]} />, color: new Color(0x99dd99), staticTransformations: [{id: 1, type: 'raw', matrix4: guardLocation, operation: 'set'}]
                }
            ]} useDND={false} useUndoControls={false} tooltipContent={[<h4>How To Use The Interactive Canvas</h4>,<p>
            Use the slider to change the target of the light ray, then fire it to see the vectors and light color at that location</p>]}/>
        </>
    )
}