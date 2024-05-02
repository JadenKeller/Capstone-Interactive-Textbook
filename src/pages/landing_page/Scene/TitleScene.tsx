import { useRef, useMemo, useEffect, useState } from "react";
import styles from "../index.module.css";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import html2canvas from "html2canvas";
import { MathUtils, Vector2, CanvasTexture, MeshBasicMaterial } from "three";
import CustomShaderMaterial from "three-custom-shader-material";

const fragmentShader: string = `
    uniform sampler2D uTexture;
    uniform vec2 uMouse;
    varying vec2 vUv;

    float circle(vec2 uv, vec2 circlePosition, float radius) {
        float dist = distance(circlePosition, uv);
        return 1. - smoothstep(0.0, radius, dist);
    }

    void main() {
        vec4 finalTexture = texture2D(uTexture, vUv);
        csm_DiffuseColor = finalTexture;
    }`;

const vertexShader: string = `
    uniform float time;
    uniform vec2 uMouse;

    varying vec2 vUv;

    float circle(vec2 uv, vec2 circlePosition, float radius) {
        float dist = distance(circlePosition, uv);
        return 1. - smoothstep(0.0, radius, dist);
    }

    float elevation(float radius, float intensity) {
        float circleShape = circle(uv, (uMouse * 0.5) + 0.5, radius);
        return circleShape * intensity;
    }

    void main() {
        vec3 newPosition = position;
        newPosition.z += elevation(0.2, .7);

        csm_Position = newPosition;
        vUv = uv;
    }`;


const useDomToCanvas = (domElement) => {
    const [texture, setTexture] = useState();

    useEffect(() => {
        if (!domElement) return;

        const convertDomToCanvas = async () => {
            const canvas = await html2canvas(domElement, {backgroundColor: null});
            setTexture(new CanvasTexture(canvas));
        }

        convertDomToCanvas();
    }, [domElement]);

    return texture;
};

export default function Scene() {
    const state = useThree();
    const { width, height } = state.viewport;
    const [domElement, setDomElement] = useState(null);
    
    const materialRef = useRef();
    const textureDOM = useDomToCanvas(domElement);

    const uniforms = useMemo(
        () => ({
            uTexture: { value: textureDOM },
            uMouse: { value: new Vector2(0, 0) },
        }),
        [textureDOM]
    );

    const mouseLerp = useRef({ x: 0, y: 0});
    useFrame((state, delta) => {
        const mouse = state.mouse;
        mouseLerp.current.x = MathUtils.lerp(mouseLerp.current.x, mouse.x, 0.1);
        mouseLerp.current.y = MathUtils.lerp(mouseLerp.current.y, mouse.y, 0.1);
        materialRef.current.uniforms.uMouse.value.x = mouseLerp.current.x;
        materialRef.current.uniforms.uMouse.value.y = mouseLerp.current.y;
    });

    extend({ br: 'br' });

    return (
        <>
            <Html zIndexRange={[-1, -10]} prepend fullscreen>
                <main style={styles} ref={(el) => setDomElement(el)}>
                    <h1>
                        INTERACTIVE
                        TEXTBOOK
                        FOR
                        GEOMETRIC
                        LINEAR
                        ALGEBRA
                    </h1>
                </main>
            </Html> 
			<mesh>
				<planeGeometry args={[width, height, 254, 254]} />
				<CustomShaderMaterial
                    ref={materialRef}
                    baseMaterial={MeshBasicMaterial}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                    silent
                />
			</mesh>
        </>
    );
}