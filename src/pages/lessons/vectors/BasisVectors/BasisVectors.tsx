import ArrowWrapper from "@components/ArrowWrapper/ArrowWrapper";
import InteractiveCanvas from "@components/InteractiveCanvas/InteractiveCanvas";
import { useEffect, useState } from "react";
import { Color, Vector3 } from "three";

enum BasisToward {
    Standard = "standard",
    Altered = "altered",
}

export default function BasisVectors() {
    const vDefault = new Vector3(2, 3, 1);
    const [dynamicVector, setDynamicVector] = useState(vDefault);
    const vOrigin = new Vector3(0, 0, 0);
    const basisLength = 3;
    const basisHeadLength = 0.25;
    const basisHeadWidth = 0.3;

    const [tempVector, setTempVector] = useState(new Vector3(1, -2, 3));
    const [toggle, setToggle] = useState(BasisToward.Standard);

    useEffect(() => {
        console.log("Toggled basis to: " + toggle)
        const goalVector = toggle == BasisToward.Standard
            ? vDefault
            : tempVector;
        const fromVector = dynamicVector;

        const startTime = Date.now();

        const interval = setInterval(() => {
            console.log(dynamicVector.x, dynamicVector.y, dynamicVector.z)
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            const duration = 1000;

            if (dynamicVector.equals(goalVector) || elapsedTime >= duration) {
                clearInterval(interval)
                setDynamicVector(goalVector);
                return;
            }
            console.log(elapsedTime)

            const interpolationFactor = elapsedTime / duration;
            setDynamicVector(new Vector3().copy(fromVector).lerp(goalVector, interpolationFactor))
        }, 10)

        return () => clearInterval(interval);
    }, [toggle])

    const handleStandard = () => {
        setToggle((prevToward) =>
            prevToward == BasisToward.Standard
                ? BasisToward.Altered
                : BasisToward.Standard
        );
    };

    const handleChanged = () => { };

    return (
        <>
            <button type="button" onClick={handleStandard}>
                Standard
            </button>
            <button type="button" onClick={handleChanged}>
                Changed
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
                                    new Vector3(1, 0, 0),
                                    vOrigin,
                                    basisLength,
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
                                    new Vector3(0, 1, 0),
                                    vOrigin,
                                    basisLength,
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
                                    new Vector3(0, 0, 1),
                                    vOrigin,
                                    basisLength,
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
