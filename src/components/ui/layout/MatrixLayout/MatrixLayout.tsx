import Header from "@components/ui/Header/Header";
import styles from "./MatrixLayout.module.css";
import LessonNav from "@components/LessonNav/LessonNav";

/**
 * A demonstration layout for developing lessons within page section constraints.
 * @param children JSX Elements to be rendered within the interactable section of the page.
 * @todo Fix: Change the sections do be their own individual UI components with required params for layout flexibility.
 */
export default function MatrixLayout({ children }: { children: JSX.Element }) {
	return (
		<div className={styles.body_root}>
			<div className={styles.vertical_divide}>
				<div className={styles.left_section}>
					<section className={styles.lesson_content}>
						<h1>Matrix Transformations</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi congue, dolor sit amet viverra convallis, tortor est faucibus erat, eu ullamcorper mauris odio quis quam. Integer in gravida enim, eu lobortis orci.
						</p>
						<h2>
							Order Matters
						</h2>
						<p>
							Suspendisse potenti. Nullam eu nunc et libero ultrices ornare. Nulla et ultrices nisl. Vivamus lacinia sodales diam id ullamcorper. Morbi eleifend eros volutpat dolor vehicula efficitur. Sed porttitor metus pharetra odio scelerisque interdum. Ut lacinia felis in ullamcorper blandit. Aliquam ipsum magna, porttitor sed diam quis, imperdiet laoreet purus. Donec dictum odio a mi pharetra, nec auctor sem feugiat. Aenean nisl elit, egestas at fringilla ut, luctus ut libero. Ut ac risus ante. Nullam eu efficitur lectus.
						</p>
						<p>Suspendisse potenti. Mauris quis justo</p><h3> Matrix Multiplication</h3>
						<p>
							vehicula, cursus lorem quis, pellentesque justo. Proin quis ligula metus. In egestas sollicitudin magna sed posuere. Duis aliquet volutpat tristique. Nullam
						</p>
						<p>
							semper aliquet nulla suscipit elementum. Nulla volutpat orci nisl, vel mollis nibh tincidunt sit amet. Praesent id sapien ipsum. Fusce tempusSed porttitor metus pharetra odio scelerisque interdum. Ut lacinia felis in ullamcorper blandit. Aliquam ipsum magna, porttitor sed diam quis, imperdiet laoreet purus. Donec dictum odio a mi pharetra,
						</p>
						<LessonNav />
					</section>
				</div>
				<div className={styles.right_section}>
					<Header />
					{children}
				</div>
			</div>
		</div>
	);
}
