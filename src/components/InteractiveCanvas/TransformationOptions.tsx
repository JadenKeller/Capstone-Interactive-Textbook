import styles from './InteractiveCanvas.module.css'

import { BlockMath } from "react-katex";
import { Transformation } from "./Scene";
import { Matrix4 } from "three";
import { useState } from "react";

export default function TransformationOptions({transformations, activeTransformations, addToActiveCallback}: {transformations: Transformation[], activeTransformations: Transformation[], addToActiveCallback: (transformations: Transformation[]) => void}) {
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
        <div className={styles.matrix_list}>
                {transformations.map((transformation, idx) => {

                    return (
                        <div key={idx} onClick={() => {
                            let i = activeTransformations.findIndex((t) => {return t === transformation})
                            if(i >= 0) {
                                let c: Transformation[] = []
                                activeTransformations.filter((t, idx) => {
                                    if(i === idx) return;
                                    c.push(t);
                                })
                                addToActiveCallback(c)
                            } else {
                                addToActiveCallback([...activeTransformations, transformation])
                            }
                        }} className={(activeTransformations.includes(transformation)) ? styles.matrix_list_item_selected : styles.matrix_list_item}>
                            <BlockMath math={`${String.fromCharCode(idx + 80)} = ${renderLatex(transformation.matrix4)}`} />
                            <input type='hidden' value={updateMatrixOptions} />
                        </div>
                    )
                })}
            </div>
    )
}