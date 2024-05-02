import { Canvas } from "@react-three/fiber";
import TitleScene from "./Scene/TitleScene";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { TransformationStateManager } from "@components/InteractiveCanvas/InteractiveCanvas";

export default function LandingPage() {
	const nav = useNavigate();

	const navigate = (fullPath: string) => {
		TransformationStateManager.clear();
		nav(fullPath);
	}

	const Aside = () => {
		return (
			<div className={styles.aside}>
				<div className={styles.landingPageLogo}>
					<img src="/logo-icon.svg" height={"250px"} width={"250px"}></img>
				</div>
				<p>
					Explore math concepts foundational to computer graphics,
					and do it at your own pace.
				</p>
				<div className={styles.lessonList}>
					<div><span className={styles.nav_button} onClick={() => navigate("/lesson/vectors")}>Vectors</span></div>
					<div><span className={styles.nav_button} onClick={() => navigate("/lesson/vector-operations")}>Vector Operations</span></div>
					<div><span className={styles.nav_button} onClick={() => navigate("/lesson/matrices")}>Matrix Transformations</span></div>
				</div>
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
						height: "80vh",
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