import { useEffect, useState } from "react";
import styles from './index.module.css'
import { InlineMath } from "react-katex";

export default function LightingControlWidget({fireRays, clearRays, setHitLocation}: {fireRays: (angle: number) => number, clearRays: () => void, setHitLocation: (location: number) => void}) {
    const [angle, setAngle] = useState(0);
    const[fireAngle, setFireAngle] = useState(0);

    useEffect(() => {
        setHitLocation(fireAngle)
    }, [fireAngle])

    const fireRay = () => {
        setAngle(fireRays(fireAngle))
    }

    return (
        <div className={styles.widget}>
            <div className={styles.buttons}>
                <input type='range' min={-1.57} max={1.57} step={0.01} defaultValue={angle} onChange={(e) => setFireAngle(parseFloat(e.target.value))} className={styles.slider}></input>
                {fireAngle.toFixed(2)}
                <button className={styles.button} onClick={fireRay}>Fire!</button>
                <button className={styles.button} onClick={() => {clearRays(); setAngle(0)}}>Clear</button>
            </div>
            <div className={styles.info}>
                {/* <p>Angle: <InlineMath math={`${angle.toFixed(2)} r`} /><br></br> */}
                <p>Light Amount: <InlineMath math={`cos(\\theta) = ${Math.cos(angle).toFixed(2)}`} /><br></br>
                Color: <InlineMath math={`albedo * color * ${Math.max(0, Math.cos(angle)).toFixed(2)}`} /></p>
            </div>
        </div>
    )
}