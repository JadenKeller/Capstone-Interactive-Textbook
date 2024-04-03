import { Scene } from "@components/CanvasWrapper/CanvasWrapper";
import InteractiveCanvas from "@components/InteractiveCanvas/InteractiveCanvas";
import LightingControlWidget from "@components/lessons/vector_operations/lighting/LightingControlWidget";
import { Line, QuadraticBezierLine } from "@react-three/drei";
import { useState } from "react";
import { Color, Matrix4, Vector3 } from "three";

export default function LambertianLighting() {
    const [scenes, setScenes] = useState<Scene[]>([
        {
        geometry: <circleGeometry />, color: new Color(0x999999), acceptTransformations: false, initialPosition: new Vector3(0, 0, 0.01)
    },
    {
        geometry: <circleGeometry args={[0.5]} />, color: new Color(0xccaa22), staticTransformations: [{ id: 0, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(4, 4, 0.01)) }], acceptTransformations: false
    }
])

    const generateRandomRay = () => {
        const angle = Math.random()*Math.PI*0.5;
        const hitX = Math.cos(angle);
        const hitY = Math.sin(angle);

        let lightRayAngle = new Vector3(hitX, hitY, 0).angleTo(new Vector3(4, 4, 0))

        let arcStartPosition = new Vector3(hitX, hitY, 0).lerp(new Vector3(4, 4, 0), 0.5)
        let arcEndPotion = new Vector3(0, 0, 0).lerp(new Vector3(hitX, hitY, 0).multiplyScalar(6), 0.5)

        let rayScenes: Scene[] = [
            {
                geometry: <Line lineWidth={2} points={[new Vector3(0, 0, 0), new Vector3(hitX, hitY, 0)]} color={0xdd0000} />, staticTransformations: [{id: 0, type: 'scale', amount: [3, 3, 1], max: [4, 4, 1], delay: 1, matrix4: new Matrix4()}]
            },
            {
                geometry: <Line lineWidth={2} points={[new Vector3(hitX - 4, hitY - 4, 0), new Vector3(0, 0, 0)]} color={0xccaa22} />, staticTransformations: [{id: 1, type: 'raw', matrix4: new Matrix4().makeTranslation(4, 4, 0)}, { id: 0, type: 'scale', amount: [1, 1, 1], max: [1, 1, 1], matrix4: new Matrix4()}]
            },
            {
                geometry: <QuadraticBezierLine start={arcStartPosition} end={arcEndPotion} mid={arcStartPosition.clone().lerp(arcEndPotion, 0.5).multiplyScalar(1.1)} />
            }
        ]
        setScenes([...scenes, ...rayScenes])

        return lightRayAngle
    }

    const clearRays = () => {
        setScenes([...scenes.slice(0, 2)])
    }

    return (
        <div style={{position: "relative"}}>
            <LightingControlWidget fireRays={generateRandomRay} clearRays={clearRays} />
            <InteractiveCanvas scenes={scenes} availableTransformations={[]} useUndoControls={false} />
        </div>
    )
}