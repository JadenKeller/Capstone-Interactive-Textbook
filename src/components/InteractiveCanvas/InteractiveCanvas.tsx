import 'katex/dist/katex.min.css';

import CanvasWrapper, { Scene } from "../CanvasWrapper/CanvasWrapper";
import { Transformation } from "../Scene/Scene";
import TransformationOptions from './TransformationOptions';
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from "./InteractiveCanvas.module.css"

/**
 * Manages the state of transformations on the canvas. Needed for Drag and Drop.
 */
export class TransformationStateManager {
    static activeTransformations: Transformation[] = []
    static transformationChangeCallbacks: Function[] = []

    /**
     * Undoes the last transformation
     */
    static undo() {
        this.activeTransformations.pop();
        this.transformationChangeCallbacks.forEach((callback) => callback())
    }

    /**
     * Clears all transformations
     */
    static clear() {
        this.activeTransformations = [];
        this.transformationChangeCallbacks.forEach((callback) => callback(this.activeTransformations))
    }

    /**
     * Adds a transformation to the active list
     * @param t - the transformation to be added
     */
    static pushTransformation(t: Transformation) {
       this.activeTransformations.push(t)
       this.transformationChangeCallbacks.forEach((callback) => callback(this.activeTransformations))
    }

    /**
     * Gets a list of all active transformations
     * @returns the list of transformations
     */
    static getTransformations() {
        return this.activeTransformations.slice(0, this.activeTransformations.length)
    }

    static moveTransformation(fromIndex: number, toIndex: number) {
        this.activeTransformations.splice(toIndex, 0, this.activeTransformations.splice(fromIndex, 1)[0]);
        this.transformationChangeCallbacks.forEach((callback) => callback(this.activeTransformations))
    }

    static addChangedCallback(callback: Function) {
        this.transformationChangeCallbacks.push(callback)
    }
}

/**
 * An Interactive Canvas
 * @param availableTransformations - A list of transformations that can be applied to the canvas.
 * @param scenes - A list of scenes to be rendered. A scene represents a 3D object to be rendered in the canvas. 
 * @param useUndoControls - Enables undo and clear controls.
 * @param tooltipText - The text to be displayed in the tooltip.
 * @returns 
 */
export default function InteractiveCanvas({availableTransformations, scenes, useUndoControls, tooltipContent}: {availableTransformations: Transformation[], scenes: Scene[], useUndoControls?: boolean, tooltipContent?: React.ReactNode}) {

    return (
        <div className={styles.canvas}>
            {availableTransformations && <DndProvider backend={HTML5Backend}>
                <TransformationOptions transformations={availableTransformations} />
                {/* Draggable matrices are applied to the canvas. Order is maintained :p */}
                <CanvasWrapper scenes={scenes} cameraControls={true} useUndoControls={useUndoControls} tooltipContent={tooltipContent}/>
            </DndProvider>}
            {!availableTransformations && <CanvasWrapper scenes={scenes} cameraControls={true} useUndoControls={useUndoControls} tooltipContent={tooltipContent}/>}
        </div>
    )
}