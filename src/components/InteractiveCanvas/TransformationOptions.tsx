import styles from './InteractiveCanvas.module.css'

import { BlockMath } from "react-katex";
import { Transformation } from "../Scene/Scene";
import { Matrix4 } from "three";
import { useState } from "react";
import Matrix from '../Matrix/Matrix';
import { useDrop } from 'react-dnd';
import { TransformationStateManager } from './InteractiveCanvas';

export default function TransformationOptions({transformations}: {transformations: Transformation[]}) {
    const [updateMatrixOptions, setUpdateMatrixOptions] = useState(0)

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