import PlusMinus from "./dot_product/PlusMinus/PlusMinus";
import Nav from "@components/ui/Nav/Nav";
import VectorLayout from "@components/ui/layout/VectorLayout/VectorLayout";
import LessonNav from "@components/ui/LessonNav/LessonNav";
import styles from "./index.module.css";
import LambertianLighting from "./lighting/Lighting";
import AngleDirection from "./dot_product/AngleDirection/AngleDirection";


export default function VectorOpChapter() {
	return (
		<div className={styles.body_root}>

			<div className={styles.nav_section}>
				<Nav />
			</div>

			<div className={styles.page_title}>
				<h1>Vector Operations</h1>
			</div>

			<VectorLayout
				content={
					<section>
						<p>
							In this lesson, we discuss different vector operations that are foundational to computer graphics and geometric linear algebra.
							Furthermore, we give examples of use cases and interactive activities to explore them in action.
						</p>
						<h2>
							The Dot Product
						</h2>
						<p>
							The dot product is a mathematical operation that takes two equal-length (normalized) vectors and returns a single number.
							This resulting number value can be used to interpret the relationship between angles in a scene, and it is used for multiple situations.
							Just to name a few, the dot product is used to calculate the angle between two vectors, projecting a vector onto another, and is useful for shadow mapping and projections of 3D objects onto surfaces or screens.
							The dot product is also used to calculate surface normals and detecting collisions between objects or detecting whether they are facing the same direction.
							We go over the latter in the first activity below.
						</p>
						<h3>+/- Determination & Landmark Values</h3>
						<p>
							The sign of the dot product result indicates a specific relationship between two vectors.
							A positive sign means that the angle between the two vectors is less than 90 degrees.
							A negative sign means that the angle is more than 90 degrees.
							If the result is zero, it means the vectors are orthogonal to each other.
						</p>
						<p>
							A <b>landmark value</b> is a dot product result that equals <b>one</b>, <b>zero</b>, or <b>negative one</b>.
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
						<h2>Angle Distance Logic</h2>
						<p>
							In the realm of computer graphics, the synergy between the dot product and distance offers a powerful tool for range detection. Imagine you're designing a virtual environment where objects interact realistically. Understanding if one object is within range of another is pivotal for various functionalities, such as collision detection.
						</p>
						<p>	
							To achieve this, we leverage the dot product and distance. Let's say we have a guard and an enemy object. By calculating the vector between them, we obtain both direction and distance information. The dot product then helps us ascertain the alignment between these vectors. If the dot product of the normalized direction vector and the distance vector exceeds a predetermined threshold, it signifies that the enemy is within the guard's range.
						</p>
					</section>}
				canvas={<AngleDirection />} />
				<VectorLayout
					content={
						<section>
							<h2>Lambertian Lighting</h2>
							<p>
								Lambertian lighting is a model used for simulating diffuse reflection from surfaces in which vector operations like the dot product and normalization play a curcial role.
								In this activity, we demonstrate the relationship between these angles and how the dot product is used to calculate the intensity of diffused light.
							</p>
							<h3>More Dot Product</h3>
							<p>
								One helpful interpretation of the dot product we haven't mentioned previously is that it can be used to find the cosine of the angle between two vectors.
								The cosine of the surface normal and the incoming light vector reveals how much light the point receives.
								In other words, the intensity of the light on a surface is proportional to the cosine of the angle between the surface normal and the direction of the incoming light.
								Our landmark values are helpful for interpreting this result too. A value of one means the point is in direct lighting, and a value of zero or less means that point is in shadow.
								In the activity below, this relationship between surface normals and lighting vectors is demonstrated to calculate the diffuse lighting on a sphere.
								What happens when the angle between these vectors changes?
							</p>
						</section>
					}
					canvas={<LambertianLighting />} />

				<div className={styles.lesson_nav_section}>
					<LessonNav />
				</div>
		</div>
	)
}