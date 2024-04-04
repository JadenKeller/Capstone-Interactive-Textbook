import { Scene } from "@components/CanvasWrapper/CanvasWrapper";
import InteractiveCanvas from "@components/InteractiveCanvas/InteractiveCanvas";
import LightingControlWidget from "@components/lessons/vector_operations/lighting/LightingControlWidget";
import { Line, QuadraticBezierLine, Text } from "@react-three/drei";
import { useState } from "react";
import { Color, Euler, Matrix4, Vector3 } from "three";

export default function LambertianLighting() {
    const defaultScenes: Scene[] = [
        {
            geometry: <circleGeometry />, color: new Color(0x999999), acceptTransformations: false, initialPosition: new Vector3(0, 0, 0.01)
        },
        {
            geometry: <circleGeometry args={[0.5]} />, color: new Color(0xccaa22), staticTransformations: [{ id: 0, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(4, 4, 0.01)) }], acceptTransformations: false
        }
    ]

    const [scenes, setScenes] = useState<Scene[]>(defaultScenes)

    const generateRandomRay = (angle: number) => {
        // const angle = Math.random()*Math.PI*0.5;
        console.log(angle)
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
                geometry: <Line lineWidth={2} points={[new Vector3(hitX - 4, hitY - 4, 0), new Vector3(0, 0, 0)]} color={0xccaa22} />, staticTransformations: [{id: 1, type: 'raw', matrix4: new Matrix4().makeTranslation(4, 4, 0)}, { id: 0, type: 'scale', amount: [1, 1, 1], max: [1, 1, 1], matrix4: new Matrix4().makeScale(0, 0, 0)}]
            },
            {
                geometry: <QuadraticBezierLine start={arcStartPosition} end={arcEndPotion} mid={arcStartPosition.clone().lerp(arcEndPotion, 0.5).multiplyScalar(1.1)} />, staticTransformations: [{id: 1, type: 'scale', matrix4: new Matrix4().makeScale(0, 0, 0), operation: 'set', delay: 2.5, amount: [100, 100, 100], max: [1, 1, 1]}]
            },
            {
                geometry: <Text position={arcStartPosition.clone().lerp(arcEndPotion, 0.5).multiplyScalar(1.15)} fontSize={0.25} anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor={0x000000}>Angle</Text>, staticTransformations: [{id: 1, type: 'scale', matrix4: new Matrix4().makeScale(0, 0, 0), operation: 'set', delay: 2.6, amount: [100, 100, 100], max: [1, 1, 1]}]
            },
            {
                geometry: <Text position={[arcStartPosition.x/1.5 - 0.15, arcStartPosition.y/1.5 + 0.15, 0.1]} fontSize={0.25} anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor={0x000000}>Light Vector</Text>, staticTransformations: [{id: 1, type: 'scale', matrix4: new Matrix4().makeScale(0, 0, 0), operation: 'set', delay: 2.7, amount: [100, 100, 100], max: [1, 1, 1]}]
            },
            {
                geometry: <Text position={[arcEndPotion.x * 1.25 + 0.15, arcEndPotion.y * 1.25 - 0.15, 0.1]} fontSize={0.25} anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor={0x000000}>Normal Vector</Text>, staticTransformations: [{id: 1, type: 'scale', matrix4: new Matrix4().makeScale(0, 0, 0), operation: 'set', delay: 2.7, amount: [100, 100, 100], max: [1, 1, 1]}]
            }
        ]
        setScenes([...scenes.slice(0, 2), ...rayScenes])

        return lightRayAngle
    }

    const clearRays = () => {
        setScenes([...scenes.slice(0, 2)])
    }

    const setFireLocation = (location: number) => {
        const hitX = Math.cos(location);
        const hitY = Math.sin(location);
        setScenes([...defaultScenes, {
            geometry: <circleGeometry args={[0.05]} />, color: new Color(0xaa0000), staticTransformations: [{ id: 0, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(hitX, hitY, 0.01) )}]
        }])
    }

    return (
        <div style={{position: "relative"}}>
            <LightingControlWidget fireRays={generateRandomRay} clearRays={clearRays} setHitLocation={setFireLocation}/>
            <InteractiveCanvas scenes={scenes} availableTransformations={[]} useUndoControls={false} />
        </div>
    )
}