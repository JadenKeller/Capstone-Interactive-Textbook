import { MeshProps, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const RefDemo = () => {
	const myBox = useRef<MeshProps>();

	useFrame(({ clock }) => {
		if (myBox.current) {
			myBox.current.rotation.x = clock.getElapsedTime();
			myBox.current.rotation.z = clock.getElapsedTime() * 0.25;
		}
	})

	return (
		<mesh ref={myBox}>
			<boxGeometry />
			<meshStandardMaterial color="red" />
		</mesh>
	)
}

export default RefDemo;