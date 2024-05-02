import { Canvas } from "@react-three/fiber";
import TitleScene from "./Scene/TitleScene";
import styles from "./index.module.css";
import Header from "@components/ui/Header/Header";

export default function LandingPage() {
	const Aside = () => {
		return (
			<div className={styles.aside}>
				<div className={styles.landingPageLogo}>
					<img src="/logo-icon.svg" height={"250px"} width={"250px"}></img>
				</div>
				<p>
					Learn about math concepts foundational to computer graphics,
					and do it at your own pace.
				</p>
				<div className={styles.lessonList}>
					<p>Vectors</p>
					<p>Vector Operations</p>
					<p>Matrix Transformations</p>
				</div>
			</div>
		);
	}

	const Credits = () => {
		return (
			<div>
				<p>
					
				</p>
			</div>
		);
	}

	const Title = () => {
		return (
			<div className={styles.canvasContainer}>
				<Canvas
					dpr={[1, 3]}
					gl={{
						antialias: true,
						preserveDrawingBuffer: true,
					}}
					camera={{
						fov: 45,
						near: 0.1,
						far: 200,
						position: [0, 0, 15]
					}}
					style={{
						height: "70vh",
						width: "100vw"
					}}>
					<TitleScene />
				</Canvas>
			<div>
				<Aside />
			</div>
			</div>
		);
	}

    return (
		<>
			<Title />
		</>
    );
}