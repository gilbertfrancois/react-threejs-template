import { useCallback, useEffect, useState } from "react";
import { Sketch } from "./sketch";

export function App() {
    const [sliderValue, setSliderValue] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    return (
        <>
            <div className="controls">
                <button
                    type="button"
                    onClick={() => setIsPlaying((oldVal) => !oldVal)}
                >
                    {isPlaying ? "⏸️" : "▶️"}
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
                <ThreeScene paused={!isPlaying} className="border-blue" />
                <ThreeScene paused={!isPlaying} className="border-green" />
            </div>
        </>
    );
}

function ThreeScene({ isPlaying, className }) {
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
        if (isPlaying) {
            scene.stop();
        } else {
            scene.play();
        }
    }, [isPlaying, scene]);

    return <div ref={nodeRef} className={className} />;
}
