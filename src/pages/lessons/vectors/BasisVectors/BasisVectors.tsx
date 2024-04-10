import ArrowWrapper from "@components/ArrowWrapper/ArrowWrapper";
import InteractiveCanvas from "@components/InteractiveCanvas/InteractiveCanvas";
import { useEffect, useState } from "react";
import { Color, Vector3 } from "three";

enum BasisToward {
    Standard = "standard",
    Altered = "altered",
}
/**
 * 
 * @todo TODO: calculate the goal vectors (free and basis) after toggle
 * @todo TODO: keep base saved or have logic to send back to standard
 * @todo TODO: investigate whether the grid can be easily altered alongside the base
 * @todo TODO: options for transformation matrix to apply - rotation, shear, scale, reflect
 */
export default function BasisVectors() {
    const vDefault = new Vector3(2, 3, 1);
    const defaultBasis = {
        x: new Vector3(1, 0, 0),
        y: new Vector3(0, 1, 0),
        z: new Vector3(0, 0, 1),
    }
    const tempVector = new Vector3(1, -2, 3);

    const [toggle, setToggle] = useState(BasisToward.Standard);
    const [dynamicVector, setDynamicVector] = useState(vDefault);
    const [basisVectors, setBasisVectors] = useState(defaultBasis);

    const vOrigin = new Vector3(0, 0, 0);
    const basisLengthScalar = 3;
    const basisHeadLength = 0.25;
    const basisHeadWidth = 0.3;

    useEffect(() => {
        const goalVector = toggle == BasisToward.Standard
            ? vDefault
            : tempVector;
        const fromVector = dynamicVector;

        const startTime = Date.now();

        const interval = setInterval(() => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            const duration = 1000;

            if (elapsedTime >= duration) {
                clearInterval(interval)
                setDynamicVector(goalVector);
                return;
            }
            console.log(elapsedTime)

            const interpolationFactor = elapsedTime / duration;
            setDynamicVector(new Vector3().copy(fromVector).lerp(goalVector, interpolationFactor))
        }, 16)

        return () => clearInterval(interval);
    }, [toggle])

    const handleToggle = () => {
        setToggle((prevToward) =>
            prevToward == BasisToward.Standard
                ? BasisToward.Altered
                : BasisToward.Standard
        );
    };

    return (
        <>
            <button type="button" onClick={handleToggle}>
                Standard
            </button>
            <InteractiveCanvas
                availableTransformations={[]}
                scenes={[
                    {
                        geometry: (
                            <ArrowWrapper
                                lineWidth={3}
                                arrowHelperArgs={[
                                    // X
                                    basisVectors.x.normalize(),
                                    vOrigin,
                                    basisVectors.x.length() * basisLengthScalar,
                                    Color.NAMES.indianred,
                                    basisHeadLength,
                                    basisHeadWidth,
                                ]}
                            />
                        ),
                    },
                    {
                        geometry: (
                            <ArrowWrapper
                                lineWidth={3}
                                arrowHelperArgs={[
                                    // Y
                                    basisVectors.y.normalize(),
                                    vOrigin,
                                    basisVectors.y.length() * basisLengthScalar,
                                    Color.NAMES.green,
                                    basisHeadLength,
                                    basisHeadWidth,
                                ]}
                            />
                        ),
                    },
                    {
                        geometry: (
                            <ArrowWrapper
                                lineWidth={3}
                                arrowHelperArgs={[
                                    // Z
                                    basisVectors.z.normalize(),
                                    vOrigin,
                                    basisVectors.z.length() * basisLengthScalar,
                                    Color.NAMES.skyblue,
                                    basisHeadLength,
                                    basisHeadWidth,
                                ]}
                            />
                        ),
                    },
                    {
                        geometry: (
                            <ArrowWrapper
                                lineWidth={3}
                                arrowHelperArgs={[
                                    // free-moving, change-able vector shown relative to basis
                                    new Vector3().copy(dynamicVector).normalize(),
                                    vOrigin,
                                    dynamicVector.length(),
                                    Color.NAMES.yellow,
                                    basisHeadLength,
                                    basisHeadWidth,
                                ]}
                            />
                        ),
                    },
                ]}
            />
        </>
    );
}
