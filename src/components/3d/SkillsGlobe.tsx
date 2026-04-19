"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";

const skills = [
  { name: "HTML5", color: "#f97316" },
  { name: "CSS3", color: "#3b82f6" },
  { name: "Grid", color: "#3b82f6" },
  { name: "Flexbox", color: "#3b82f6" },
  { name: "Bootstrap", color: "#8b5cf6" },
  { name: "Animations", color: "#ec4899" },
  { name: "Typography", color: "#14b8a6" },
  { name: "Responsive", color: "#06b6d4" },
  { name: "Design", color: "#14b8a6" },
  { name: "Semantic", color: "#f97316" },
  { name: "A11y", color: "#f97316" },
  { name: "Variables", color: "#14b8a6" },
  { name: "Forms", color: "#f97316" },
  { name: "Layout", color: "#14b8a6" },
  { name: "Components", color: "#8b5cf6" },
  { name: "Color", color: "#14b8a6" },
];

function fibonacciSphere(samples: number, radius: number) {
  const points: [number, number, number][] = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < samples; i++) {
    const theta = (2 * Math.PI * i) / goldenRatio;
    const phi = Math.acos(1 - (2 * (i + 0.5)) / samples);

    points.push([
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi),
    ]);
  }
  return points;
}

function SkillLabel({
  position,
  name,
  color,
}: {
  position: [number, number, number];
  name: string;
  color: string;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={0.18}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.woff"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {name}
      </Text>
    </group>
  );
}

function GlobeWireframe() {
  const wireRef = useRef<THREE.Group>(null);

  const circles = useMemo(() => {
    const arcs: THREE.BufferGeometry[] = [];
    for (let i = 0; i < 6; i++) {
      const curve = new THREE.EllipseCurve(0, 0, 2.2, 2.2, 0, Math.PI * 2, false, 0);
      const points = curve.getPoints(80);
      const geo = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, p.y, 0))
      );
      arcs.push(geo);
    }
    return arcs;
  }, []);

  return (
    <group ref={wireRef}>
      {circles.map((geo, i) => (
        <line key={i} geometry={geo} rotation={[0, (i * Math.PI) / 6, 0]}>
          <lineBasicMaterial color="#6366f1" transparent opacity={0.06} />
        </line>
      ))}
      {circles.slice(0, 3).map((geo, i) => (
        <line key={`h-${i}`} geometry={geo} rotation={[Math.PI / 2, 0, (i * Math.PI) / 3]}>
          <lineBasicMaterial color="#6366f1" transparent opacity={0.04} />
        </line>
      ))}
    </group>
  );
}

function GlobeDots() {
  const dotsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.15;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  return (
    <points ref={dotsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#6366f1"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function RotatingGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseSmooth = useRef({ x: 0, y: 0 });
  const positions = useMemo(() => fibonacciSphere(skills.length, 2.5), []);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    mouseSmooth.current.x += (pointer.x * 0.5 - mouseSmooth.current.x) * 0.02;
    mouseSmooth.current.y += (pointer.y * 0.3 - mouseSmooth.current.y) * 0.02;

    groupRef.current.rotation.y = clock.elapsedTime * 0.08 + mouseSmooth.current.x * 0.5;
    groupRef.current.rotation.x = 0.2 + mouseSmooth.current.y * 0.3;
  });

  return (
    <group ref={groupRef}>
      <GlobeWireframe />
      <GlobeDots />
      {skills.map((skill, i) => (
        <Float key={skill.name} speed={0.5} floatIntensity={0.1}>
          <SkillLabel
            position={positions[i]}
            name={skill.name}
            color={skill.color}
          />
        </Float>
      ))}
      <mesh>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export default function SkillsGlobe() {
  return (
    <div className="w-full h-[400px] lg:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <RotatingGlobe />
      </Canvas>
    </div>
  );
}
