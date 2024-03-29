import styles from './Matrix.module.css'

import { Transformation } from "../Scene/Scene"
import { BlockMath, InlineMath } from "react-katex";
import { Matrix4 } from "three";
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import type { Identifier } from 'dnd-core';
import { TransformationStateManager } from '../InteractiveCanvas/InteractiveCanvas';

export interface DraggingMatrix {
    index: number,
    id: number
}

/**
 * Renders a matrix on screen with `react-katex`
 * @param {number} idx - the index of the matrix to be displayed as a character
 * @param {number} selected - Is this matrix currently selected?
 * @param {Transformation} transformation - Values of the matrix to be rendered in Transformation form.
 * @param {boolean} small - Should the matrix be rendered with `InlineMath` rather than `BlockMath`
 * @param {function} onClick - A function to be called when the matrix is clicked
 * @returns 
 */
export default function Matrix({idx, selected, transformation, small, onClick,}: {idx: number, transformation: Transformation, selected: boolean, small?: boolean, onClick?: (t: Transformation) => void}) {
    
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

    // const ref = useRef<HTMLDivElement>(null)
    // const [{ handlerId }, drop] = useDrop<
    //     DraggingMatrix,
    //     void,
    //     { handlerId: Identifier | null }
    // >({
    //     accept: 'matrix-list',
    //     collect(monitor) {
    //     return {
    //         handlerId: monitor.getHandlerId(),
    //     }
    //     },
    //     hover(item: DraggingMatrix, monitor) {
    //         if (!ref.current) {
    //             return
    //         }
    //         // console.log('hovering matrix')
    //         const dragIndex = item.index
    //         const hoverIndex = idx

    //         // Don't replace items with themselves
    //         if (dragIndex === hoverIndex) {
    //             // console.log('hovering same matrix')
    //             return
    //         }

    //         // Determine rectangle on screen
    //         const hoverBoundingRect = ref.current?.getBoundingClientRect()

    //         // Get vertical middle
    //         const hoverMiddleX =
    //             (hoverBoundingRect.right - hoverBoundingRect.left) / 2

    //         // Determine mouse position
    //         const clientOffset = monitor.getClientOffset()

    //         // Get pixels to the top
    //         const hoverClientX = clientOffset!.x - hoverBoundingRect.left

    //         // Only perform the move when the mouse has crossed half of the items height
    //         // When dragging downwards, only move when the cursor is below 50%
    //         // When dragging upwards, only move when the cursor is above 50%

    //         // Dragging downwards
    //         if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
    //             return
    //         }

    //         // Dragging upwards
    //         if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
    //             return
    //         }

    //         // Time to actually perform the action
    //         TransformationStateManager.moveTransformation(dragIndex, hoverIndex)
    //         // Note: we're mutating the monitor item here!
    //         // Generally it's better to avoid mutations,
    //         // but it's good here for the sake of performance
    //         // to avoid expensive index searches.
    //         item.index = hoverIndex
    //     },
    // })

    let [{ isDragging }, drag] = useDrag({
        type: 'matrix',
        item: () => {
            return { transformation, idx }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    if(small) {
        [{ isDragging }, drag] = useDrag({
            type: 'matrix-list',
            item: () => {
                return { transformation, idx }
            },
            collect: (monitor: any) => ({
                isDragging: monitor.isDragging(),
            }),
        })
        // drag(drop(ref))
    }
    
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