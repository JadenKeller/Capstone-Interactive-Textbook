import styles from './Matrix.module.css'

import { Transformation } from "../Scene/Scene"
import { BlockMath, InlineMath } from "react-katex";
import { Matrix4 } from "three";
import { useDrag } from 'react-dnd';

export default function Matrix({idx, selected, transformation, small, onClick}: {idx: number, transformation: Transformation, selected: boolean, small?: boolean, onClick?: (t: Transformation) => void}) {
    
    const renderLatex = (matrix: Matrix4) => {
        let s = '\\begin{bmatrix} '
        matrix.toArray().forEach((ele, idx) => {
            if((idx + 1) % 4 === 0) s += ele.toFixed(2) + "\\\\\n"
            else s += ele.toFixed(2) + " & "
        })
        s += "\\end{bmatrix}"
        return s;
    }

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "matrix",
        item: { transformation },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))
    
    return (
        <div key={idx} ref={drag} onClick={() => {
            if(onClick)
                onClick(transformation)
        }} className={(selected) ? styles.matrix_selected : styles.matrix}>
            {(small) ? <InlineMath math={`${renderLatex(transformation.matrix4)}`} /> : <BlockMath math={`${String.fromCharCode(idx + 80)} = ${renderLatex(transformation.matrix4)}`} />}
        </div>
    )
}