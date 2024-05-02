import { Canvas } from "@react-three/fiber";
import TitleScene from "./Scene/TitleScene";
import styles from "./index.module.css";
import Header from "@components/ui/Header/Header";

export default function LandingPage() {
	const Title = () => {
		return (
			<div className={styles.canvasContainer}>
				<Canvas
					dpr={[1, 2]}
					gl={{
						antialias: true,
						preserveDrawingBuffer: true,
					}}
					camera={{
						fov: 55,
						near: 0.1,
						far: 200,
					}}
					style={{
						height: "100vh",
						width: "100vw"
					}}>
					<TitleScene />
				</Canvas>
			</div>
		);
	}

	const Aside = () => {
		return (
			<div className={styles.aside}>
				<p>
					Learn about math concepts foundational to computer graphics,
					and do it at your own pace.
				</p>
				<p>
					Play with interactive examples.
				</p>
			</div>
		);
	}

    return (
		<>
			<Header />
			<Title />
			<Aside />
		</>
    );
}