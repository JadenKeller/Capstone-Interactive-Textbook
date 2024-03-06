import styles from './Matrix.module.css'

import { Transformation } from "../Scene/Scene"
import { BlockMath, InlineMath } from "react-katex";
import { Matrix4 } from "three";
import { useDrag } from 'react-dnd';

/**
 * Renders a matrix on screen with `react-katex`
 * @param {number} idx - the index of the matrix to be displayed as a character
 * @param {number} selected - Is this matrix currently selected?
 * @param {Transformation} transformation - Values of the matrix to be rendered in Transformation form.
 * @param {boolean} small - Should the matrix be rendered with `InlineMath` rather than `BlockMath`
 * @param {function} onClick - A function to be called when the matrix is clicked
 * @returns 
 */
export default function Matrix({idx, selected, transformation, small, onClick}: {idx: number, transformation: Transformation, selected: boolean, small?: boolean, onClick?: (t: Transformation) => void}) {
    
    /**
     * Renders the given matrix as a LaTeX formatted 4x4 matrix.
     *
     * @param {Matrix4} matrix - the matrix to be rendered
     * @return {string} the LaTeX formatted matrix string to be passed into a react-katex component
     */
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
            {(small) ? <InlineMath math={`${renderLatex(transformation.matrix4)}`} /> : 
            <BlockMath math={(transformation.name) ? `${transformation.name} = ${renderLatex(transformation.matrix4)}` : `${String.fromCharCode(idx + 80)} = ${renderLatex(transformation.matrix4)}`} />}
        </div>
    )
}