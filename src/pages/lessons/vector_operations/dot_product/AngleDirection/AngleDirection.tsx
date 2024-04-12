import InteractiveCanvas from "@components/InteractiveCanvas/InteractiveCanvas";
import { Circle, Line, Plane } from "@react-three/drei";
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
    let detectionShape = new Shape();
    detectionShape.moveTo(0, 1);
    detectionShape.lineTo(0, -1);
    detectionShape.arc(0, 0, 2, Math.PI/2, -Math.PI/2, true);

    return (
        <>
            <InteractiveCanvas scenes={[
                {
                    geometry: Stickman(), staticTransformations: [{id: 0, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(0, 1, 0))}]
                },
                {
                    geometry: <shapeGeometry args={[detectionShape]} />, color: new Color(0x99dd99)
                }
            ]} />
        </>
    )
}