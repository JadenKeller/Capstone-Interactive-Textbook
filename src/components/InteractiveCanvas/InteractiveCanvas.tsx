import 'katex/dist/katex.min.css';

import CanvasWrapper from "./CanvasWrapper";
import { Transformation } from "./Scene";
import { useState } from "react";
import TransformationOptions from './TransformationOptions';

export default function InteractiveCanvas({availableTransformations}: {availableTransformations: Transformation[]}) {
    const [activeTransformations, setActiveTransformations] = useState<Transformation[]>([])
    

    return (
        <div>
            <TransformationOptions transformations={availableTransformations} activeTransformations={activeTransformations} addToActiveCallback={setActiveTransformations} />
            {/* Draggable matrices are applied to the canvas. Order is maintained :p */}
            <CanvasWrapper transformations={activeTransformations}/>
        </div>
    )
}