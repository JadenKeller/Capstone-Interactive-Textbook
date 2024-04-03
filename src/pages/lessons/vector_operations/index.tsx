import Header from "@components/ui/Header/Header";
import PlusMinus from "./dot_product/PlusMinus/PlusMinus";
import VectorLayout from "@components/ui/layout/VectorLayout/VectorLayout";
import styles from "./index.module.css";
import LambertianLighting from "./lighting/Lighting";

export default function VectorOpChapter() {
	return (
		<div className={styles.body_root}>
			<Header />
			{/* Each lessons':
			- structured content
			- canvas element
			 */}
			 {/* TODO: consider exporting into different lesson components? */}
			<VectorLayout
				content={
					<section>
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
					</section>}
				canvas={<LambertianLighting />} />

			{/* Chapter navigation buttons */}
		</div>
	)
}