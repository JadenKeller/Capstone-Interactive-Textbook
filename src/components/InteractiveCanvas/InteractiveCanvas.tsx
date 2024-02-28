import 'katex/dist/katex.min.css';

import CanvasWrapper, { Scene } from "../CanvasWrapper/CanvasWrapper";
import { Transformation } from "../Scene/Scene";
import { useState } from "react";
import TransformationOptions from './TransformationOptions';
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export class TransformationStateManager {
    static activeTransformations: Transformation[] = []

    static undo() {
        this.activeTransformations.pop();
    }

    static clear() {
        this.activeTransformations = [];
    }

    static pushTransformation(t: Transformation) {
       this.activeTransformations.push(t)
    }

    static getTransformations() {
        return this.activeTransformations.slice(0, this.activeTransformations.length)
    }
}

export default function InteractiveCanvas({availableTransformations, scenes}: {availableTransformations: Transformation[], scenes: Scene[]}) {

    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <TransformationOptions transformations={availableTransformations} />
                {/* Draggable matrices are applied to the canvas. Order is maintained :p */}
                <CanvasWrapper scenes={scenes}/>
            </DndProvider>
        </div>
    )
}