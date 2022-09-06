import { useState } from "react";

export function App() {
    const [sliderValue, setSliderValue] = useState(0);
    const [isPlaying, setIsPlaying] = useState();
    return (
        <>
            <input
                type="range"
                name="slider"
                min="0"
                max="10"
                value={sliderValue}
                onChange={(e) => setSliderValue(e.target.valueAsNumber)}
            />
            <button
                type="button"
                onClick={() => setIsPlaying((oldVal) => !oldVal)}
            >
                {isPlaying ? "⏸️" : "▶️"}
            </button>
        </>
    );
}
