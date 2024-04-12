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
							Additionally, we will go over how to visualize each transformation to get the desired result using a model solar system.
						</p>

						<h2>What is a Matrix Transformation?</h2>
						<p>
							Matrix transformations are used to manipulate objects in a graphical scene.
							Matrices support various operations such as addition, subtraction, multiplication, and scalar multiplication. These operations are essential for animating objects and creating visual effects.
							Multiple matrices are combined together to get the desired result, however,
							the order in which they are applied matters greatly.
						</p>

						<h3 className={styles.transformation_header}>Scaling</h3>
						<p>
							Scaling involves modifying the size of an object along different axes. To uniformly scale an object, you scale each axis by the same value.
						</p>

						<h3 className={styles.transformation_header}>Translations</h3>
						<p>
							Translation involves moving an object from one position to another in a specific direction.
						</p>

						<h3 className={styles.transformation_header}>Rotations</h3>
						<p>
							Rotation involves rotating an object around a specific point or axis.
						</p>

						<h2>Applying Matrices Together</h2>
						<p>
							Multiple transformations can be combined to create more complex effects.
							Combining matrices together is as simple as multiplying them together.
							This reuslts in a final matrix that contains a numerical representation
							of an objects position and scale.

							In the activity to your right, you must add matrix transformations together to 
							move the moon in its proper place. Currently it sits on top of our sun in the middle.
							Ideally, it should be rotating itself and spinning around the Earth.
						</p>

						<h3>Order Matters!</h3>
						<p>
							The order in which transformations are applied can significantly affect the final result.
							For example, rotating an object and then translating it produces a different result than 
							translating it and then rotating it.

							When reading an order of matrix transformations, remember that they orderer right to left. This is important
							to note for the solar system activity to your right, where you will have to add matrix transformations in reverse
							order so that they are read right to left. 
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
