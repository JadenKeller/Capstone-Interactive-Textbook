import { useState } from "react"
import { BlockMath, InlineMath } from "react-katex"
import style from "./AngleDirectionControl.module.css"
import { Euler, Matrix4, Vector3 } from "three"

export default function AngleDirectionControls({range, enemyLocation, guardLocation, angle, setAngle, setRange}: {range: number, enemyLocation: Matrix4, guardLocation: Matrix4, angle: number, setAngle: (angle: number) => void, setRange: (range:number) => void}) {
    let distance = Math.sqrt(Math.pow(enemyLocation.elements[12] - guardLocation.elements[12], 2) + Math.pow(enemyLocation.elements[13] - guardLocation.elements[13], 2))
    let direction = new Vector3(enemyLocation.elements[12], enemyLocation.elements[13], 0).sub(new Vector3(guardLocation.elements[12], guardLocation.elements[13], 0)).normalize()
    let facing = new Vector3(1, 0, 0).applyEuler(new Euler(0, 0, angle))
    let dot = Math.acos(direction.dot(new Vector3(1, 0, 0).applyEuler(new Euler(0, 0, angle)))) * (180/Math.PI)
    
    return (
        <div className={style.control}>
            <div className={style.math}>
                <div className={style.info}>
                    <InlineMath math={`Dist:  ${distance.toFixed(2)} < ${range} = ${Math.sqrt(Math.pow(enemyLocation.elements[12] - guardLocation.elements[12], 2) + Math.pow(enemyLocation.elements[13] - guardLocation.elements[13], 2)) < range}`} />
                    <InlineMath math={`Dot: {\\arccos(X \\cdot N)} * (180/\\pi) < 90 = ${Math.acos(direction.dot(facing)) * (180/Math.PI) < 90}`} />
                    
                    
                    {distance < range && dot < 90 ? <p> Guard can see the enemy </p> : <p> Guard cannot see the enemy </p>}
                </div>
                
            </div>
            <div className={style.controls}>
                <div className={style.slider}>
                    <p>Angle</p>
                    <input type="range" min={0} max={360} defaultValue={0} onChange={(e) => setAngle(parseInt(e.target.value) * (Math.PI/180))} />
                </div>
                <div className={style.slider}>
                    <p>Range</p>
                    <input type="range" min={2} max={5} step={0.01} defaultValue={2} onChange={(e) => setRange(parseInt(e.target.value))} />
                </div>
            </div>
        </div>
    )
}