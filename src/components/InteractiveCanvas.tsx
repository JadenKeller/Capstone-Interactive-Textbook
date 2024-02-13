import { Euler, Matrix4, Vector3 } from "three";
import CanvasWrapper from "./CanvasWrapper";

export default function InteractiveCanvas() {
    return (
        <div>
            <div>
                {/* Draggable matrices go here */}
            </div>
            {/* Draggable matrices are applied to the canvas. Order is maintained :p */}
            <CanvasWrapper transformations={[
                { matrix4: new Matrix4().makeRotationFromEuler(new Euler(0, 0, 1)), animate: true, type: 'rotation' },
                { matrix4: new Matrix4().makeTranslation(new Vector3(4, 0, 0)), animate: false }
                ]}/>
        </div>
    )
}