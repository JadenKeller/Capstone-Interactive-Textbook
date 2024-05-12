import { InlineMath } from "react-katex";
import { TransformationStateManager } from "../InteractiveCanvas/InteractiveCanvas";
import Matrix from "../Matrix/Matrix";
import styles from './AppliedTransformations.module.css'
import { useEffect, useState } from "react";

export default function AppliedTransformations() {
    const [activeTransforms, setActiveTransforms] = useState(TransformationStateManager.getTransformations())
    const [_, render] = useState(0);

    useEffect(() => {
        const handleTransformationChange = () => {
            setActiveTransforms(TransformationStateManager.getTransformations());
        }

        TransformationStateManager.addChangedCallback(handleTransformationChange);

        return () => {
            TransformationStateManager.removeChangedCallback();
        };
    }, []);

    useEffect(() => {
        let interval: number;

        if (activeTransforms.length > 0) {
            interval = setInterval(() => {
                render((_) => _ + 1);
            }, 400);
        }
        return () => clearInterval(interval);
    }, [activeTransforms])
    return (
        <div className={styles.applied_transformations}>
            {activeTransforms && [...activeTransforms].reverse().map((t, idx) => {
                return (
                    <div key={idx}>
                        {(t.name) ? <InlineMath math={t.name} /> : <></>}
                        <Matrix idx={idx} selected={false} transformation={t} small={true} />
                    </div>
                )
            })}
        </div>
    )
}