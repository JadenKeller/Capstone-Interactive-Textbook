import styles from "./DotProductInteractiveWidget.module.css";

interface WidgetProps {
	dotResult: number,
	passed: boolean,
	x: number,
	setX: React.Dispatch<React.SetStateAction<number>>
};

export default function DotProductInteractiveWidget({ dotResult, passed, x, setX }: WidgetProps) {
	return (
		<div className={styles.controls_list}>
			<span className={styles.control}>
				<input type={"range"} min={-5} max={7} step={0.05} value={x} onChange={
					(e) => setX(Number(e.target.value))
				} />
			</span>
			<span className={styles.control}>
				{dotResult}
			</span>
			<span className={styles.control}>
				{passed ? " finished" : " not finished"}
			</span>
		</div>
	);
}
