import 'katex/dist/katex.min.css';

import CanvasWrapper, { Scene } from "../CanvasWrapper/CanvasWrapper";
import { Transformation } from "../Scene/Scene";
import { useState } from "react";
import TransformationOptions from './TransformationOptions';
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from "./InteractiveCanvas.module.css"

/**
 * Manages the state of transformations on the canvas. Needed for Drag and Drop.
 */
export class TransformationStateManager {
    static activeTransformations: Transformation[] = []

    /**
     * Undoes the last transformation
     */
    static undo() {
        this.activeTransformations.pop();
    }

    /**
     * Clears all transformations
     */
    static clear() {
        this.activeTransformations = [];
    }

    /**
     * Adds a transformation to the active list
     * @param t - the transformation to be added
     */
    static pushTransformation(t: Transformation) {
       this.activeTransformations.push(t)
    }

    /**
     * Gets a list of all active transformations
     * @returns the list of transformations
     */
    static getTransformations() {
        return this.activeTransformations.slice(0, this.activeTransformations.length)
    }

    static moveTransformation(fromIndex: number, toIndex: number) {
        
    }
}

/**
 * An Interactive Canvas
 * @param availableTransformations - A list of transformations that can be applied to the canvas.
 * @param scenes - A list of scenes to be rendered. A scene represents a 3D object to be rendered in the canvas. 
 * @returns 
 */
export default function InteractiveCanvas({availableTransformations, scenes}: {availableTransformations: Transformation[], scenes: Scene[]}) {

    return (
        <div className={styles.canvas}>
            <DndProvider backend={HTML5Backend}>
                <TransformationOptions transformations={availableTransformations} />
                {/* Draggable matrices are applied to the canvas. Order is maintained :p */}
                <CanvasWrapper scenes={scenes} cameraControls={true}/>
            </DndProvider>
        </div>
    )
}