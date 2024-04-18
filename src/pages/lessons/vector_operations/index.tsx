import PlusMinus from "./dot_product/PlusMinus/PlusMinus";
import Header from "@components/ui/Header/Header";
import VectorLayout from "@components/ui/layout/VectorLayout/VectorLayout";
import LessonNav from "@components/ui/LessonNav/LessonNav";
import styles from "./index.module.css";
import LambertianLighting from "./lighting/Lighting";


export default function VectorOpChapter() {
	return (
		<div className={styles.body_root}>

			<div className={styles.nav_section}>
				<Header />
			</div>

			{/* Each lessons':
			- structured content
			- canvas element
			 */}
			{/* TODO: consider exporting into different lesson components? */}

			<div className={styles.page_title}>
				<h1>Vector Operations</h1>
			</div>

			<VectorLayout
				content={
					<section>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi congue, dolor sit amet viverra convallis, tortor est faucibus erat, eu ullamcorper mauris odio quis quam. Integer in gravida enim, eu lobortis orci.
						</p>
						<h2>Use Cases</h2>
						<p>
							Suspendisse potenti. Nullam eu nunc et libero ultrices ornare. Nulla et ultrices nisl. Vivamus lacinia sodales diam id ullamcorper. Morbi eleifend eros volutpat dolor vehicula efficitur. Sed porttitor metus pharetra odio scelerisque interdum. Ut lacinia felis in ullamcorper blandit. Aliquam ipsum magna, porttitor sed diam quis, imperdiet laoreet purus. Donec dictum odio a mi pharetra, nec auctor sem feugiat. Aenean nisl elit, egestas at fringilla ut, luctus ut libero. Ut ac risus ante. Nullam eu efficitur lectus. Suspendisse potenti. Mauris quis justo</p>
						<h3>Interpreting Results</h3>
						<p>
							vehicula, cursus lorem quis, pellentesque justo. Proin quis ligula metus. In egestas sollicitudin magna sed posuere. Duis aliquet volutpat tristique. Nullam
						</p>
						<p>
							semper aliquet nulla suscipit elementum. Nulla volutpat orci nisl, vel mollis nibh tincidunt sit amet. Praesent id sapien ipsum. Fusce tempusSed porttitor metus pharetra odio scelerisque interdum. Ut lacinia felis in ullamcorper blandit. Aliquam ipsum magna, porttitor sed diam quis, imperdiet laoreet purus. Donec dictum odio a mi pharetra,
						</p>
					</section>}
				canvas={<PlusMinus />} 
			/>

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
							This resulting value can be used to interpret the relationship between angles in a scene and is used for multiple situations.
							Just to name a few examples, the dot product is used to calculate the angle between two vectors, projecting a vector onto another, and is useful for shadow mapping and projections of 3D objects onto surfaces or screens.
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
							A "landmark value" is a dot product result that equals one, zero, or negative one.
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
				canvas={<LambertianLighting />} />

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
					canvas={<PlusMinus />} />
				<LessonNav />
		</div>
	)
}