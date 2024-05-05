import { Scene } from "@components/CanvasWrapper/CanvasWrapper";
import InteractiveCanvas from "@components/InteractiveCanvas/InteractiveCanvas";
import LightingControlWidget from "@components/lessons/vector_operations/lighting/LightingControlWidget";
import { Line, QuadraticBezierLine, Text } from "@react-three/drei";
import { useState } from "react";
import { Color, Euler, Matrix4, Vector3 } from "three";

export default function LambertianLighting() {
    // The light and object to be lit
    const defaultScenes: Scene[] = [
        {
            geometry: <circleGeometry />, color: new Color(0x999999), acceptTransformations: false, initialPosition: new Vector3(0, 0, 0.01)
        },
        {
            geometry: <circleGeometry args={[0.5]} />, color: new Color(0xccaa22), staticTransformations: [{ id: 0, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(4, 4, 0.01)) }], acceptTransformations: false
        }
    ]

    const [scenes, setScenes] = useState<Scene[]>(defaultScenes)

    /**
     * Sets up the scene to show the vectors and color of the object at the hit location
     * @param angle The location to hit on the sphere
     * @returns `cos()` part of `cos() = dot(light, normal)`
     */
    const generateRandomRay = (angle: number) => {
        // const angle = Math.random()*Math.PI*0.5;
        console.log(angle)
        const hitX = Math.cos(angle);
        const hitY = Math.sin(angle);

        let lightRayAngle = new Vector3(hitX, hitY, 0).angleTo(new Vector3(4, 4, 0))

        let arcStartPosition = new Vector3(hitX, hitY, 0).lerp(new Vector3(4, 4, 0), 0.5)
        let arcEndPotion = new Vector3(0, 0, 0).lerp(new Vector3(hitX, hitY, 0).multiplyScalar(6), 0.5)

        let color = new Vector3(153, 153, 153)
        color.multiplyScalar(Math.max(0, Math.cos(lightRayAngle))).multiplyScalar(0.18).multiplyScalar(10).multiplyScalar(1/255)
        console.log(lightRayAngle,color)

        let rayScenes: Scene[] = [
            {
                geometry: <Line lineWidth={2} points={[new Vector3(0, 0, 0), new Vector3(hitX, hitY, 0)]} color={0xdd0000} />, staticTransformations: [{id: 0, type: 'raw', matrix4: new Matrix4().makeScale(4, 4, 1)}]
            },
            // Light Vector
            {
                geometry: <Line lineWidth={2} points={[new Vector3(hitX - 4, hitY - 4, 0), new Vector3(0, 0, 0)]} color={0xccaa22} />, staticTransformations: [{id: 1, type: 'raw', matrix4: new Matrix4().makeTranslation(4, 4, 0)}, { id: 0, type: 'scale', amount: [1, 1, 1], max: [1, 1, 1], matrix4: new Matrix4().makeScale(0, 0, 0)}]
            },
            // Arc to show angle between vectors
            {
                geometry: <QuadraticBezierLine start={arcStartPosition} end={arcEndPotion} mid={arcStartPosition.clone().lerp(arcEndPotion, 0.5).multiplyScalar(1.1)} />, staticTransformations: [{id: 1, type: 'scale', matrix4: new Matrix4().makeScale(0, 0, 0), operation: 'set', delay: 1, amount: [100, 100, 100], max: [1, 1, 1]}]
            },
            // Arc label
            {
                geometry: <Text position={arcStartPosition.clone().lerp(arcEndPotion, 0.5).multiplyScalar(1.15)} fontSize={0.25} anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor={0x000000}>Angle</Text>, staticTransformations: [{id: 1, type: 'scale', matrix4: new Matrix4().makeScale(0, 0, 0), operation: 'set', delay: 1.1, amount: [100, 100, 100], max: [1, 1, 1]}]
            },
            // Light Vector label
            {
                geometry: <Text position={[arcStartPosition.x/1.5 - 0.15, arcStartPosition.y/1.5 + 0.15, 0.1]} fontSize={0.25} anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor={0x000000}>Light Vector</Text>, staticTransformations: [{id: 1, type: 'scale', matrix4: new Matrix4().makeScale(0, 0, 0), operation: 'set', delay: 1.2, amount: [100, 100, 100], max: [1, 1, 1]}]
            },
            // Normal Vector label
            {
                geometry: <Text position={[arcEndPotion.x * 1.25 + 0.15, arcEndPotion.y * 1.25 - 0.15, 0.1]} fontSize={0.25} anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor={0x000000}>Normal Vector</Text>, staticTransformations: [{id: 1, type: 'scale', matrix4: new Matrix4().makeScale(0, 0, 0), operation: 'set', delay: 1.2, amount: [100, 100, 100], max: [1, 1, 1]}]
            },
            // Color swatch geometries
            {
                geometry: <circleGeometry args={[0.2]} />, color: new Color(color.x, color.y, color.z), staticTransformations: [{ id: 0, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(hitX - 0.5, hitY, 0.012) )}, {id: 1, type: 'scale', matrix4: new Matrix4().makeScale(0, 0, 0), amount: [100, 100, 100], max: [1, 1, 1], delay: 1.3}]
            },
            {
                geometry: <circleGeometry args={[0.25]} />, color: new Color(0x000000), staticTransformations: [{ id: 0, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(hitX - 0.5, hitY, 0.01) )}, {id: 1, type: 'scale', matrix4: new Matrix4().makeScale(0, 0, 0), amount: [100, 100, 100], max: [1, 1, 1], delay: 1.3}]
            },
            {
                geometry: <coneGeometry args={[0.15, 0.3, 32]} />, color: new Color(0x000000), staticTransformations: [{ id: 1, type: 'raw', matrix4: new Matrix4().makeTranslation(new Vector3(hitX - 0.2, hitY, 0.01) )},{id: 2, type: 'raw', matrix4: new Matrix4().makeScale(1.3, 1.3, 0.01)},{ id: 0, type: 'raw', matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, -Math.PI * 0.5))}, {id: 1, type: 'scale', matrix4: new Matrix4().makeScale(0, 0, 0), amount: [100, 100, 100], max: [1, 1, 1], delay: 1.3}]
            }
        ]
        setScenes([...scenes.slice(0, 2), ...rayScenes])

        return lightRayAngle
    }

    const clearRays = () => {
        setScenes([...scenes.slice(0, 3)])
    }

    const setFireLocation = (location: number) => {
        const hitX = Math.cos(location);
        const hitY = Math.sin(location);
        setScenes([...defaultScenes, {
            geometry: <Line lineWidth={2} points={[new Vector3(0, 0, 0), new Vector3(hitX, hitY, 0)]} color={0xdd0000} />, staticTransformations: [{id: 0, type: 'raw', matrix4: new Matrix4().makeScale(4, 4, 1)}]
        }])
    }

    return (
        <div style={{position: "relative"}}>
            <LightingControlWidget fireRays={generateRandomRay} clearRays={clearRays} setHitLocation={setFireLocation}/>
            <InteractiveCanvas scenes={scenes} useDND={false} useUndoControls={false} tooltipContent={[<h4>How To Use The Interactive Canvas</h4>,<p>
                Use the slider to change the target of the light ray, then fire it to see the vectors and light color at that location</p>]}/>
        </div>
    )
}