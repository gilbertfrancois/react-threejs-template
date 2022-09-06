import { useCallback, useEffect, useState } from "react";
import { Sketch } from "./sketch";

export function App() {
    const [sliderValue, setSliderValue] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    return (
        <>
            <div className="controls">
                <button
                    type="button"
                    onClick={() => setIsPaused((oldVal) => !oldVal)}
                >
                    {isPaused ? "▶️" : "⏸️"}
                </button>
                <input
                    type="range"
                    name="slider"
                    min="0"
                    max="10"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(e.target.valueAsNumber)}
                />
            </div>
            <div className="sketches">
                <ThreeScene
                    paused={isPaused}
                    sliderValue={sliderValue}
                    className="border-blue"
                />
                <ThreeScene
                    paused={isPaused}
                    sliderValue={sliderValue}
                    className="border-green"
                />
            </div>
        </>
    );
}

function ThreeScene({ paused, sliderValue, className }) {
    const [scene, setScene] = useState();

    const nodeRef = useCallback((node) => {
        if (node !== null) {
            setScene(new Sketch({ dom: node }));
        }
    }, []);

    useEffect(() => {
        if (!scene) {
            return;
        }
        if (paused) {
            scene.stop();
        } else {
            scene.play();
        }
    }, [paused, scene]);

    useEffect(() => {
        if (!scene) {
            return;
        }
        scene.setSliderValue(sliderValue);
    }, [sliderValue, scene]);

    return <div ref={nodeRef} className={className} />;
}
