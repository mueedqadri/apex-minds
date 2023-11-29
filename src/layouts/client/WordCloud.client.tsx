"use client";
import * as THREE from "three";
import { useRef, useState, useMemo, useEffect, use } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { Text, TrackballControls } from "@react-three/drei";

interface WordProps {
  children: React.ReactNode;
  position: THREE.Vector3;
}

const Word: React.FC<WordProps> = ({ children, ...props }) => {
  const color = new THREE.Color();

  const fontProps = {
    font: "/mono.woff",
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const ref = useRef<any>();
  const [hovered, setHovered] = useState(false);

  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
  };
  const out = (e: ThreeEvent<PointerEvent>) => setHovered(false);

  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  useFrame(({ camera }) => {
    ref.current.quaternion.copy(camera.quaternion);
    ref.current.material.color.lerp(
      color.set(hovered ? "#fa2720" : "black"),
      0.1,
    );
  });

  return (
    <Text
      ref={ref}
      onPointerOver={over}
      onPointerOut={out}
      onClick={() => console.log("clicked")}
      {...props}
      {...fontProps}
    >
      {children}
    </Text>
  );
};

interface CloudProps {
  count?: number;
  radius?: number;
}

const Cloud: React.FC<CloudProps> = ({ count = 4, radius = 20 }) => {
  const words = useMemo(() => {
    const temp: [THREE.Vector3, string][] = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (count + 1);
    const thetaSpan = (Math.PI * 2) / count;
    for (let i = 1; i < count + 1; i++)
      for (let j = 0; j < count; j++)
        temp.push([
          new THREE.Vector3().setFromSpherical(
            spherical.set(radius, phiSpan * i, thetaSpan * j),
          ),
          getWord()[i + j],
        ]);
    return temp;
  }, [count, radius]);

  return (
    <>
      {words.map(([pos, word], index) => (
        <Word key={index} position={pos}>
          {word}
        </Word>
      ))}
    </>
  );
};

function getWord() {
  return [
    "AI",
    "NLP",
    "Computer Vision",
    "MLFlow",
    "DevOps",
    "Machine Learning",
    "Deep Learning",
    "GenerativeAI",
    "Large Language Models",
    "JavaScript",
    "PHP",
    "WordPress",
    "jQuery",
    "ExpressJS",
    "Bootstrap",
    "React",
    "Full-Stack Development",
    "Next.js",
    "Front-End Development",
    "Startup Company",
    "Node.js",
    "MySQL",
    "MongoDB",
    "Python",
    "Azure Synapse",
    "Google Cloud Platform",
    "Deep Learning",
    "Amazon Web Services",
    "ASP.NET",
    "Java",
    "C",
    "C#",
    "C++",
    "CSS",
    "Git",
  ];
}
const WordCloud: React.FC = () => {
  return (
    <Canvas dpr={[1, 1]} camera={{ position: [0, 0, 30], fov: 90 }}>
      <fog attach="fog" args={["#202025", 0, 80]} />
      <Cloud count={8} radius={30} />
      <TrackballControls />
    </Canvas>
  );
};

export default WordCloud;
