import styles from './InteractiveCanvas.module.css'

import { Transformation } from "../Scene/Scene";
// import { useState } from "react";
import Matrix from '../Matrix/Matrix';

/**
 * Takes in transformations to be displayed above the canvas
 */
export default function TransformationOptions({transformations}: {transformations: Transformation[]}) {
    // const [updateMatrixOptions, setUpdateMatrixOptions] = useState(0)

    // Draggable matrix options updating is currently disabled because of issues with drag n drop
    // setTimeout(() => {
    //     setUpdateMatrixOptions(updateMatrixOptions + 1)
    // }, 200)

    return (
        <div className={styles.matrix_list}>
                {transformations.map((transformation, idx) => {

                    return (
                        <div>
                            <Matrix key={idx} idx={idx} selected={false} transformation={transformation} />
                        </div>
                    )
                })}
            </div>
    )
}