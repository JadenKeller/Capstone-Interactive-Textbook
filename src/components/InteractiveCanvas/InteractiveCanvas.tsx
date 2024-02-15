import 'katex/dist/katex.min.css';
import styles from './InteractiveCanvas.module.css'

import { BlockMath } from "react-katex";
import CanvasWrapper from "./CanvasWrapper";
import { Transformation } from "./Scene";
import { useRef, useState } from "react";
import { Matrix4 } from 'three';

export default function InteractiveCanvas({availableTransformations}: {availableTransformations: Transformation[]}) {
    const [activeTransformations, setActiveTransformations] = useState<Transformation[]>([])
    const [updateMatrixOptions, setUpdateMatrixOptions] = useState(0)

    const renderLatex = (matrix: Matrix4) => {
        let s = '\\begin{bmatrix} '
        matrix.toArray().forEach((ele, idx) => {
            if((idx + 1) % 4 === 0) s += ele.toFixed(2) + "\\\\\n"
            else s += ele.toFixed(2) + " & "
        })
        s += "\\end{bmatrix}"
        return s;
    }

    setTimeout(() => {
        setUpdateMatrixOptions(updateMatrixOptions + 1)
    }, 200)

    return (
        <div>
            <div className={styles.matrix_list}>
                {availableTransformations.map((transformation, idx) => {

                    return (
                        <div key={idx} onClick={() => {
                            let i = activeTransformations.findIndex((t) => {return t === transformation})
                            if(i >= 0) {
                                let c: Transformation[] = []
                                activeTransformations.filter((t, idx) => {
                                    if(i === idx) return;
                                    c.push(t);
                                })
                                setActiveTransformations(c)
                            } else {
                                setActiveTransformations([...activeTransformations, transformation])
                            }
                        }} className={(activeTransformations.includes(transformation)) ? styles.matrix_list_item_selected : styles.matrix_list_item}>
                            <BlockMath math={`${idx} = ${renderLatex(transformation.matrix4)}`} />
                            <input type='hidden' value={updateMatrixOptions} />
                        </div>
                    )
                })}
            </div>
            {/* Draggable matrices are applied to the canvas. Order is maintained :p */}
            <CanvasWrapper transformations={activeTransformations}/>
        </div>
    )
}