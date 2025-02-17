import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CircularText = () => {
    const textRef = useRef(null);

    useEffect(() => {
        gsap.to(textRef.current, {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "none",
        });
    }, []);

    const letters = [
        "T", "H", "I", "R", "T", "Y", "S", "I", "X", "S", "T", "U", "D", "I", "O", " ",
        "—", " ", "F", "O", "R", " ", "A", "L", "L", " ", "T", "H", "I", "N", "G", "S",
        " ", "D", "I", "G", "I", "T", "A", "L", " ", "P", "R", "O", "D", "U", "C", "T",
        "I", "O", "N", " ", "—"
    ];

    return (
        <div className="flex justify-center items-center absolute top-5 right-36 mix-blend-exclusion">
            <div className="relative w-64 h-64">
                <div
                    ref={textRef}
                    className="absolute w-full h-full flex items-center justify-center"
                    style={{ transformOrigin: "center" }}
                >
                    <div
                        className="text-lg font-bold text-center"
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            transform: "rotate(0deg)",
                        }}
                    >
                        {letters.map((letter, index) => (
                            <span
                                key={index}
                                className="absolute"
                                style={{
                                    transform: `rotate(${(index * 360) / letters.length}deg) translateY(-9rem)`,
                                    transformOrigin: "center",
                                }}
                            >
                                {letter}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CircularText;
