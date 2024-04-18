import { InlineMath } from "react-katex";
import { TransformationStateManager } from "../InteractiveCanvas/InteractiveCanvas";
import { Transformation } from "../Scene/Scene";
import Matrix from "../Matrix/Matrix";
import styles from './AppliedTransformations.module.css'
import { useEffect, useState } from "react";



export default function AppliedTransformations() {
    const [activeTransforms, setActiveTransforms] = useState(TransformationStateManager.getTransformations())

    useEffect(() => {
        const handleTransformationChange = () => {
            setActiveTransforms(TransformationStateManager.getTransformations());
        }

        TransformationStateManager.addChangedCallback(handleTransformationChange);
      
        return () => {
            TransformationStateManager.removeChangedCallback();
        };
    }, [])
    return (
        <div className={styles.applied_transformations}>
                {activeTransforms && [...activeTransforms].reverse().map((t, idx) => {
                    return (
                        <div key={idx}>
                            {(t.name) ? <InlineMath math={t.name} /> : <></> }
                            <Matrix idx={idx} selected={false} transformation={t} small={true} />
                        </div>
                    )
                })}
        </div>
    )
}