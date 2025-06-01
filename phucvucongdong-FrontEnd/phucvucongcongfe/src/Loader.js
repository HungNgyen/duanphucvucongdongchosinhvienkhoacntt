

import React from "react";

const Loader = () => {
    return (
        <div style={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }}>
            <div style={{ position: "relative", width: "100px", height: "100px" }}>
                {[...Array(5)].map((_, index) => {
                    const sizes = [20, 35, 50, 65, 80];
                    const colors = ["red", "orange", "yellow", "green", "blue"];
                    const durations = [1.2, 1.5, 2, 2.5, 3];
                    const reverse = index % 2 !== 0;

                    return (
                        <div key={index}
                            style={{
                                position: "absolute",
                                width: `${sizes[index]}px`,
                                height: `${sizes[index]}px`,
                                top: `${(100 - sizes[index]) / 2}px`,
                                left: `${(100 - sizes[index]) / 2}px`,
                                border: "4px solid transparent",
                                borderTopColor: colors[index],
                                borderRadius: "50%",
                                animation: `spin ${durations[index]}s linear infinite`,
                                animationDirection: reverse ? "reverse" : "normal",
                            }}
                        />
                    );
                })}
            </div>

            <style>
                {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
            </style>
        </div>
    );
};

export default Loader;
