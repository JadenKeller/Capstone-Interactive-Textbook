import styles from "./VectorLayout.module.css";

export default function VectorLayout({ content, canvas }: { content: JSX.Element, canvas: JSX.Element }) {
	return (

			<div className={styles.content_wrapper}>
				{/*
					For each pair of content + canvas, wrap each in a div.content_wrapper
				*/}
				<div className={styles.lesson_content}>{content}</div>
				<div className={styles.lesson_canvas}>{canvas}</div>
			</div>

	);
}