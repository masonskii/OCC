import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import React from "react";

const TSPR: React.FC = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine)
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
  }, []);

  return (
    <Particles
      id="background"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: false,
        },
        background: {
          color: {
            value: "#1e1f26",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ["#b3f18f", "#f5b427", "#8a2697", "#00000", "#ffffff"],
          },

          links: {
            blink: false,
            enable: true,
            color: "random",
            consent: false,
            distance: 150,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            bounce: false,
            random: false,
            speed: 3,
            straight: false,
            attract: {
              enable: false,
              rotateX: 3000,
              rotateY: 3000
            }
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 100,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};
export default TSPR;