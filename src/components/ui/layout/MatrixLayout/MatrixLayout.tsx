import Nav from "@components/ui/Nav/Nav";
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
							In this lesson, we dive into the topic of matrix transformations and their importance to computer graphics.
							While you read the lesson, practice applying transformations on an object, the moon, using a model solar system.
						</p>

						<h2>What are they?</h2>
						<p>
							Matrix transformations are used to manipulate objects in a graphical scene. 
							Objects are manipulated using matrix operations to achieve desired (or undesired) effects like moving them around, rotating, or changing their size.
							Matrices support various operations such as addition, subtraction, multiplication, scalar multiplication, and more.
							These operations are essential for animating objects and creating visual effects.
							Modern GPUs are highly optimized for performing matrix operations, making them a fundamental part of real-time rendering in computer graphics applications.
						</p>

						<h3 className={styles.transformation_header}>Scaling</h3>
						<p>
							Scaling involves modifying the size of an object along different axes.
							To uniformly scale an object, you scale each axis by the same value.
						</p>

						<h3 className={styles.transformation_header}>Translations</h3>
						<p>
							Translation involves moving an object from one position to another in a specific direction.
							A homogeneous coordinate matrix is required for translations because it allows us to represent the translations
							as matrix multiplication.
						</p>

						<h3 className={styles.transformation_header}>Rotations</h3>
						<p>
							Rotation involves rotating an object around a specific point or axis.
						</p>

						<h2>Applying matrices together</h2>
						<p>
							Multiple transformations can be combined to create more complex effects.
							Combining matrices together is as simple as multiplying them together.
							This results in a final matrix that contains a numerical representation
							of an object's position and scale.
						</p>

						<h3>Now you try!</h3>
						<p>
							In the activity to your right, you must add matrix transformations together to 
							help our <b>moon</b> find its proper place in the model solar system.
							Currently it sits on top of our sun in the middle.
							Ideally, it should be <b>moving exactly the same as the opaque red square.</b> Applying the Earth transformations to the moon is half the battle to moving it to its proper position.
						</p>

						<h3>Order matters</h3>
						<p>
							Just like following a recipe, the order in which transformations are applied can significantly affect the final result.
							For example, rotating an object and then translating it produces a different result than translating it and then rotating it.
							When reading an order of matrix transformations, remember that they orderer right to left. This is important
							to note for the solar system activity, where you will have to add matrix transformations in reverse
							order so that they are read right to left. 
						</p>

						<LessonNav />
					</section>
				</div>

				<div className={styles.right_section}>
					<Nav />
					{children}
				</div>

			</div>
		</div>
	);
}
