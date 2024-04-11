import ArrowWrapper from "@components/ArrowWrapper/ArrowWrapper";
import InteractiveCanvas from "@components/InteractiveCanvas/InteractiveCanvas";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
        i: new Vector3(1, 0, 0),
        j: new Vector3(0, 1, 0),
        k: new Vector3(0, 0, 1),
    };
    const tempVector = new Vector3(1, -2, 3);

    /** Trigger state object */
    const [toggle, setToggle] = useState(BasisToward.Standard);

    /** Vector shown as being relative to the basis adjustments */
    const [dynamicVector, setDynamicVector] = useState(vDefault);

    /** Basis vectors that are to be shown and the result of interpolations between open and default */
    const [basisVectors, setBasisVectors] = useState(defaultBasis);

    /** Used alongside input elements to be the changed-to basis */
    const [openVectors, setOpenVectors] = useState(defaultBasis);

    /** Configuration for vectors in the scene via ArrowWrappers */
    const vOrigin = new Vector3(0, 0, 0);
    const basisLengthScalar = 3;
    const basisHeadLength = 0.25;
    const basisHeadWidth = 0.3;

    /** useEffect for interpolating between basis changes, triggered via toggles 
     * @todo consider having this be effected by a change in basis values
    */
    useEffect(() => {
        const goalVector = toggle == BasisToward.Standard ? vDefault : tempVector; // TODO: change this tempVector to be a relative change
        const goalBasis = toggle == BasisToward.Standard ? defaultBasis : openVectors
        const fromVector = dynamicVector;
        const fromBasis = basisVectors;

        const startTime = Date.now();

        const interval = setInterval(() => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            const duration = 1000;

            if (elapsedTime >= duration) {
                clearInterval(interval);
                setDynamicVector(goalVector);
                setBasisVectors(goalBasis);
                return;
            }
            console.log(elapsedTime);

            const interpolationFactor = elapsedTime / duration;
            setDynamicVector( // lerp relative vector
                new Vector3().copy(fromVector).lerp(goalVector, interpolationFactor)
            );
            setBasisVectors({ // lerp basis vectors
                i: new Vector3().copy(fromBasis.i).lerp(goalBasis.i, interpolationFactor),
                j: new Vector3().copy(fromBasis.j).lerp(goalBasis.j, interpolationFactor),
                k: new Vector3().copy(fromBasis.k).lerp(goalBasis.k, interpolationFactor),
            })
        }, 16);

        return () => clearInterval(interval);
    }, [toggle]);

    const handleToggle = () => {
        setToggle((prevToward) =>
            prevToward == BasisToward.Standard
                ? BasisToward.Altered
                : BasisToward.Standard
        );
    };

    interface BasisWidgetProps {
        editableBasis: {
            i: Vector3;
            j: Vector3;
            k: Vector3;
        };
        setBasis: Dispatch<SetStateAction<{ i: Vector3; j: Vector3; k: Vector3 }>>;
    }

    interface BasisVectorI {
        i: Vector3;
    }
    interface BasisVectorJ {
        j: Vector3;
    }
    interface BasisVectorK {
        k: Vector3;
    }
    type BasisVector = BasisVectorI | BasisVectorJ | BasisVectorK;

    function BasisWidget({ editableBasis, setBasis }: BasisWidgetProps) {
        const changeBasisAxis = (changedBasis: BasisVector) => {
            setBasis((prev) => ({ ...prev, ...changedBasis }));
        };

        return (
            <div>
                <div>
                    i
                    <input
                        placeholder={editableBasis.i.x.toString()}
                        type="number"
                        value={editableBasis.i.x}
                        onChange={(e) => {
                            changeBasisAxis({
                                i: new Vector3(
                                    Number(e.target.value),
                                    editableBasis.i.y,
                                    editableBasis.i.z
                                ),
                            });
                        }}
                    ></input>
                    <input
                        placeholder={editableBasis.i.y.toString()}
                        type="number"
                        value={editableBasis.i.y}
                        onChange={(e) => {
                            changeBasisAxis({
                                i: new Vector3(
                                    editableBasis.i.x,
                                    Number(e.target.value),
                                    editableBasis.i.z
                                ),
                            });
                        }}
                    ></input>
                    <input
                        placeholder={editableBasis.i.z.toString()}
                        type="number"
                        value={editableBasis.i.z}
                        onChange={(e) => {
                            changeBasisAxis({
                                i: new Vector3(
                                    editableBasis.i.x,
                                    editableBasis.i.y,
                                    Number(e.target.value),
                                ),
                            });
                        }}
                    ></input>
                </div>
                <div>
                    j
                    <input
                        placeholder={editableBasis.j.x.toString()}
                        type="number"
                        value={editableBasis.j.x}
                        onChange={(e) => {
                            changeBasisAxis({
                                j: new Vector3(
                                    Number(e.target.value),
                                    editableBasis.j.y,
                                    editableBasis.j.z
                                ),
                            });
                        }}
                    ></input>
                    <input
                        placeholder={editableBasis.j.y.toString()}
                        type="number"
                        value={editableBasis.j.y}
                        onChange={(e) => {
                            changeBasisAxis({
                                j: new Vector3(
                                    editableBasis.j.x,
                                    Number(e.target.value),
                                    editableBasis.j.z
                                ),
                            });
                        }}
                    ></input>
                    <input
                        placeholder={editableBasis.j.z.toString()}
                        type="number"
                        value={editableBasis.j.z}
                        onChange={(e) => {
                            changeBasisAxis({
                                j: new Vector3(
                                    editableBasis.j.x,
                                    editableBasis.j.y,
                                    Number(e.target.value),
                                ),
                            });
                        }}
                    ></input>
                </div>
                <div>
                    k
                    <input
                        placeholder={editableBasis.k.x.toString()}
                        type="number"
                        value={editableBasis.k.x}
                        onChange={(e) => {
                            changeBasisAxis({
                                k: new Vector3(
                                    Number(e.target.value),
                                    editableBasis.k.y,
                                    editableBasis.k.z
                                ),
                            });
                        }}
                    ></input>
                    <input
                        placeholder={editableBasis.k.y.toString()}
                        type="number"
                        value={editableBasis.k.y}
                        onChange={(e) => {
                            changeBasisAxis({
                                k: new Vector3(
                                    editableBasis.k.x,
                                    Number(e.target.value),
                                    editableBasis.k.z
                                ),
                            });
                        }}
                    ></input>
                    <input
                        placeholder={editableBasis.k.z.toString()}
                        type="number"
                        value={editableBasis.k.z}
                        onChange={(e) => {
                            changeBasisAxis({
                                k: new Vector3(
                                    editableBasis.k.x,
                                    editableBasis.k.y,
                                    Number(e.target.value),
                                ),
                            });
                        }}
                    ></input>
                </div>
            </div>
        );
    }

    return (
        <>
            <button type="button" onClick={handleToggle}>
                Standard
            </button>
            <BasisWidget editableBasis={openVectors} setBasis={setOpenVectors} />
            <InteractiveCanvas
                availableTransformations={[]}
                scenes={[
                    {
                        geometry: (
                            <ArrowWrapper
                                lineWidth={3}
                                arrowHelperArgs={[
                                    // i
                                    new Vector3().copy(basisVectors.i).normalize(),
                                    vOrigin,
                                    basisVectors.i.length() * basisLengthScalar,
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
                                    // j
                                    new Vector3().copy(basisVectors.j).normalize(),
                                    vOrigin,
                                    basisVectors.j.length() * basisLengthScalar,
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
                                    // k
                                    new Vector3().copy(basisVectors.k).normalize(),
                                    vOrigin,
                                    basisVectors.k.length() * basisLengthScalar,
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
