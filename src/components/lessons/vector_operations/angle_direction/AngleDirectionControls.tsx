import { useState } from "react"
import { BlockMath, InlineMath } from "react-katex"
import style from "./AngleDirectionControl.module.css"

export default function AngleDirectionControls({range, distance, angle, setAngle, setRange}: {range: number, distance: number, angle: number, setAngle: (angle: number) => void, setRange: (range:number) => void}) {
    return (
        <div className={style.control}>
            <div className={style.info}>
                <InlineMath math={`${distance.toFixed(2)} < ${range} = ${distance < range}`} />
                <InlineMath math={`${angle.toFixed(2)} < 90 = ${angle < 90}`} />
                {distance < range && angle < 90 ? <p> Guard can see the enemy </p> : <p> Guard cannot see the enemy </p>}
            </div>
            <div className={style.slider}>
                <p>Angle</p>
                <input type="range" min={0} max={360} defaultValue={0} onChange={(e) => setAngle(parseInt(e.target.value) * (Math.PI/180))} />
            </div>
            <div className={style.slider}>
                <p>Range</p>
                <input type="range" min={2} max={5} step={0.01} defaultValue={2} onChange={(e) => setRange(parseInt(e.target.value))} />
            </div>
        </div>
    )
}