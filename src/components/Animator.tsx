import { useEffect, useState } from "react";
import Scene, { Transformation } from "./Scene";
import { Euler } from "three";
import { useFrame } from "@react-three/fiber";

export default function Animator({transformations, geometry}: {transformations?: Transformation[], geometry?: React.ReactElement}) {
    const [incrementor, setIncrementor] = useState(0);

    useFrame(() => {
        setIncrementor(incrementor + 0.01)
    })

    transformations?.forEach(transformation => {
        if(transformation.animate) {
            switch (transformation.type) {
                case 'rotation': 
                    transformation.matrix4.makeRotationFromEuler(new Euler(0, 0, incrementor));
                    break;
            }
        }
    })
    
    return (
        <Scene  geometry={geometry} transformations={transformations}/>
    )
}