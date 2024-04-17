import Header from "@components/ui/Header/Header";
import PlusMinus from "./dot_product/PlusMinus/PlusMinus";
import VectorLayout from "@components/ui/layout/VectorLayout/VectorLayout";
import styles from "./index.module.css";

export default function VectorOpChapter() {
	return (
		<div className={styles.body_root}>
			<Header />
			<VectorLayout
				content={
					<section>
						<h1>Vector Operations</h1>
						<p>
							In this lesson, we discuss different vector operations that are foundational to computer graphics and geometric linear algebra.
							Furthermore, we give examples of specific use cases and interactive activities to explore them in action.
						</p>
						<h2>
							The Dot Product
						</h2>
						<p>
							The dot product, also known as the scalar product, is a mathematical operation that takes two equal-length (normalized) vectors and returns a single number.
							This resulting value can be used to interpret the relationship between objects and angles in a scene depending on the context.
							Just to name a few, some example use cases for the dot product are calculating the angle between two vectors, projecting a vector onto another, useful for shadow mapping and projections of 3D objects onto surfaces or screens.
							They are also used to calculate surface normals and detecting collisions between objects or detecting whether they are facing the same direction or not.
							We go over the latter in the first activity of this lesson.
						</p>
						<h3>+/- Determination & Landmark Values</h3>
						<p>
							The sign of a dot product result indicates a specific relation ship between two vectors.
							A positive sign means that the angle between the two vectors is less than 90 degrees.
							A negative sign means that the angle between the two vectors is more than 90 degrees.
							If the result is zero, it means the vectors are orthogonal to each other.
						</p>
						<p>
							A "landmark value" is a dot product of two vectors that equals one, zero, or negative one.
							These values are significant because they represent different relationships between the directions of the two vectors.
							A value of one means that the directions are entirely parallel, or facing the same direction.
							A value of negative one means the opposite, that the two vectors are non-parallel.
							As stated before, the value zero indicates that the vectors are in perpendicular directions.
						</p>
						<p>
							To demonstrate this relationship, the activity below uses the dot product to detect whether a car
							has passed the finish line by using vectors to represent their direction. The finish line vector always points in the same direction while the car vector always faces the finish line.
							Notice what happens to the resulting dot product when the car passes the finish line. 
						</p>
					</section>}
				canvas={<PlusMinus />} />

				<VectorLayout
					content={
						<section>
							<h2>Lambertian Lighting</h2>
							<p>
								Lambertian lighting is a model used for simulating diffuse reflection from surfaces in which vector operations like the dot product and normalization play a curcial role.
								In this activity, we demonstrate the relationship between the angles of the direction of light and a surface normal vector.
								
							</p>
						</section>
					}
					canvas={<PlusMinus />}
				/>

			{/* Chapter navigation buttons */}
		</div>
	)
}