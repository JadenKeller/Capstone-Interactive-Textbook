import { BlockMath, InlineMath } from "react-katex";
import styles from "./DotProductWidget.module.css";

interface WidgetProps {
	dotResult: number,
	passed: boolean,
	x: number,
	setX: React.Dispatch<React.SetStateAction<number>>
};

/**
 * Dot product widget - informational only
 * @todo convert this widget to show the components of a dot product calculation (vars => values => result)
 */
export default function DotProductWidget({ dotResult, passed, x, setX }: WidgetProps) {
	return (
		<div className={styles.controls_list}>
			<span className={styles.control}>
				<input type={"range"} min={-5} max={7} step={0.05} value={x} onChange={
					(e) => setX(Number(e.target.value))
				} />
			</span>
			<span className={styles.control}>
				<div>
					<InlineMath math={`{{\\color{57FFEB}\\vec A}}\\cdot{\\color{red}{{\\hat N}}} 
					= {\\left|{A}\\right|}{cos(\\theta)}`} />
				</div>
			</span>
			<span className={styles.control}>
				<div>
					<InlineMath math={`{\\left|{A}\\right|}{cos(\\theta)} = ${Math.round(dotResult)}`} />
				</div>
			</span>
		</div>
	);
}