import { useCallback, useEffect, useState } from "react";
import { Sketch } from "./sketch";

export function App() {
    const [sliderValue, setSliderValue] = useState(20);
    const [isPaused, setIsPaused] = useState(false);
    return (
        <>
            <div className="controls">
                <div className="label-control-grid">
                <div className="label-control-grid-item">
                    <label htmlFor="loop">Render loop</label>
                </div>
                <div className="label-control-grid-item">
                    <button
                        id="loop"
                        type="button"
                        onClick={() => setIsPaused((oldVal) => !oldVal)}
                    >
                        {isPaused ? "Start render loop" : "Stop render loop"}
                    </button>
                </div>

                <div className="label-control-grid-item">
                    <label htmlFor="rotate_y">Rotation</label>
                </div>
                <div className="label-control-grid-item">
                    <input
                        id="rotate_y"
                        type="range"
                        name="slider"
                        min="0"
                        max="100"
                        value={sliderValue}
                        onChange={(e) => setSliderValue(e.target.valueAsNumber)}
                    />
                </div>
                </div>
            </div>
            <ThreeSketch
                paused={isPaused}
                sliderValue={sliderValue}
                className="sketch"
            />
        </>
    );
}

function ThreeSketch({ paused, sliderValue, className }) {
    const [sketch, setSketch] = useState();

    // Scene constructor
    const nodeRef = useCallback((node) => {
        if (node !== null) {
            setSketch(new Sketch({ dom: node }));
        }
    }, []);

    // Scene destructor
    useEffect(() => {
        if (!sketch) {
            return;
        }
        return () => {
            sketch.destroy();
        };
    }, [sketch]);

    // Passes state from React app to Sketch object.
    useEffect(() => {
        if (!sketch) {
            return;
        }
        if (paused) {
            sketch.stop();
        } else {
            sketch.play();
        }
    }, [paused, sketch]);

    useEffect(() => {
        if (!sketch) {
            return;
        }
        sketch.setSliderValue(sliderValue);
    }, [sliderValue, sketch]);

    return <div ref={nodeRef} className={className} />;
}
