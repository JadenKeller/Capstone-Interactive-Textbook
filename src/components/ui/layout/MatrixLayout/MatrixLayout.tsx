import Header from "@components/ui/Header/Header";
import styles from "./MatrixLayout.module.css";
import LessonNav from "@components/ui/LessonNav/LessonNav";

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
							In this lesson, we discuss matrix transformations and their importance to computer graphics.
							Additionally, we will go over how to visualize each transformation to get the desired result using different kinds of transformations.
						</p>

						<h2>What is a Matrix Transformation?</h2>
						<p>
							Matrices are rectangular arrays of numbers arranged in rows and columns.
							Matrices support various operations such as addition, subtraction, multiplication, and scalar multiplication. These operations are essential for performing transformations in computer graphics.
							When combining multiple matrices together, the order in which they are applied matters greatly to get the desired result.
						</p>

						<h3>Scaling</h3>
						<p>
							Vehicula, cursus lorem quis, pellentesque justo. Proin quis ligula metus. In egestas sollicitudin magna sed posuere. Duis aliquet volutpat tristique. 
						</p>

						<h3>Translations</h3>
						<p>
							Translation involves moving an object from one position to another in a specific direction.
						</p>

						<h3>Rotations</h3>
						<p>
							Vehicula, cursus lorem quis, pellentesque justo. Proin quis ligula metus. In egestas sollicitudin magna sed posuere. Duis aliquet volutpat tristique.
						</p>

						<h2>Applying Matrices Together</h2>
						<p>
							Multiple transformations can be combined using matrix multiplication to achieve complex effects.
							Combining matrices together is as simple as multiplying them together.
							Unlike multiplying a vector with a matrix (which results in a vector), multiplying matrix transformation results in a final matrix
							contains a numerical representation of an objects position and scale.
						</p>

						<h3>Order Matters!</h3>
						<p>
							The order in which transformations are applied can significantly affect the final result.
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
