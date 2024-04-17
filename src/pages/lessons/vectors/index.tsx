import Header from "@components/ui/Header/Header";
import LessonNav from "@components/ui/LessonNav/LessonNav";
import VectorLayout from "@components/ui/layout/VectorLayout/VectorLayout";
import PlusMinus from "../vector_operations/dot_product/PlusMinus/PlusMinus";

export default function VectorChapter() {
	return (
		<>
			<Header />
			<VectorLayout 
				content={
					<section>
						<h1>Vectors</h1>
						<p>
							In this lesson, we cover what a vector is what it represents numerically in different contexts.
							Additionally, we provide interactive activities and examples to highlight how vectors are represented in a graphical scene.
						</p>

						<h2>3D Basis Vectors</h2>
						<p>
							3D bassis vectors are a set of three vectors that form a basis for the three-dimensional Euclidean space.
							They are most typically orthogonal and have a unit length.
							Most commonly they are denoted as <b>i, j, k</b> or <b>x, y, z</b>.
						</p>

						<h3>What are they for?</h3>
						<p>
							Basis vectors defined the coordinate system used to represent positions and directions in 3D space.
							This is vital for locating objects, define camera perspectives, and specify light directions in a scene.
							They are also essential for performing geometric transformations, which we cover in a future lesson.
							Lastly, basis vectors play a crucial role in transforming 3D coordinates into 2D screen sapce coordinates, known as projection.
						</p>

						<h3>Differnces in Rendering Engine Basis Vectors</h3>
						<p>
							When two different rendering engines use 3D basis vectors in different directions, it can lead to inconsistencies and issues in rendering objects in a scene correctly.

						</p>
					</section>
				}
				canvas={<PlusMinus />}/>
			<LessonNav />
		</>
	)
}