import { useState } from "react"
import { BlockMath, InlineMath } from "react-katex"

export default function AngleDirectionControls({range, distance, angle, setAngle, setRange}: {range: number, distance: number, angle: number, setAngle: (angle: number) => void, setRange: (range:number) => void}) {
    return (
        <div>
            <div>
                <BlockMath math={`${distance.toFixed(2)} < ${range} = ${distance < range}`} />
                <BlockMath math={`${angle.toFixed(2)} < 90 = ${angle < 90}`} />
                {distance < range && angle < 90 ? <BlockMath math={`\\text{Guard can see the enemy}`} /> : <BlockMath math={`\\text{Guard cannot see the enemy}`} />}
            </div>
            <input type="range" min={0} max={360} defaultValue={0} onChange={(e) => setAngle(parseInt(e.target.value) * (Math.PI/180))} />
            <input type="range" min={2} max={5} step={0.01} defaultValue={2} onChange={(e) => setRange(parseInt(e.target.value))} />
        </div>
    )
}