import { useState } from "react";
import styles from './index.module.css'
import { InlineMath } from "react-katex";

export default function LightingControlWidget({fireRays, clearRays}: {fireRays: () => number, clearRays: () => void}) {
    const [angle, setAngle] = useState(0);

    return (
        <div className={styles.widget}>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={() => {setAngle(fireRays())}}>Fire New Ray</button>
                <button className={styles.button} onClick={() => {clearRays(); setAngle(0)}}>Clear Rays</button>
            </div>
            <div className={styles.info}>
                <p>Angle: <InlineMath math={`${angle.toFixed(2)} r`} /><br></br>
                Light Amount: <InlineMath math={`${Math.cos(angle).toFixed(2)}`} /><br></br>
                Color: <InlineMath math={`albedo * color * ${Math.cos(angle).toFixed(2)}`} /></p>
            </div>
        </div>
    )
}