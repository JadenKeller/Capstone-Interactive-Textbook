import { InlineMath } from "react-katex";
import styles from "./DotProductInfoWidget.module.css";

export default function DotProductInfoWidget() {
	return (
		<div className={styles.controls_list}>
			<span className={styles.control}>
				<div>
					<InlineMath math={
						`{{\\color{57FFEB}\\vec d}}={\\vec f}
							-
							{\\vec p}`
					} />
				</div>
			</span>
			<span className={styles.control}>
				<div>
					<InlineMath math={
						`{{\\color{57FFEB}\\vec d}}\\cdot{\\color{red}{{\\hat n}}}
							{>} 0
							{\\Rightarrow}`
					} />
					{" not finished"}
				</div>
				<div>
					<InlineMath math={
						`{{\\color{57FFEB}\\vec d}}\\cdot{\\color{red}{{\\hat n}}}
							{<} 0
							{\\Rightarrow}`
					} />
					{" finished"}
				</div>
			</span>
		</div>
	);
}
