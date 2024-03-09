import { InlineMath } from "react-katex";
import { TransformationStateManager } from "../InteractiveCanvas/InteractiveCanvas";
import { Transformation } from "../Scene/Scene";
import Matrix from "../Matrix/Matrix";
import styles from './AppliedTransformations.module.css'

export interface AppliedTransformationProps {
    transformations: Transformation[]
}


export default function AppliedTransformations(props: AppliedTransformationProps) {
    // This needs to be moved to the Matrix somehow
    return (
        <div className={styles.applied_transformations}>
                {props.transformations.map((t, idx) => {
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