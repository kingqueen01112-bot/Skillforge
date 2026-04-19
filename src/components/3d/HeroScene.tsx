"use client";
/* eslint-disable react-hooks/purity */

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import {
  gradientVertexShader,
  gradientFragmentShader,
} from "@/shaders/gradient";

function GradientMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: 0 },
  }), []);

  useFrame(({ clock, pointer }) => {
    uniforms.uTime.value = clock.elapsedTime;
    uniforms.uMouse.value +=
      (pointer.y * 0.5 - uniforms.uMouse.value) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -4]} rotation={[-0.3, 0, 0]}>
      <planeGeometry args={[20, 20, 64, 64]} />
      <shaderMaterial
        vertexShader={gradientVertexShader}
        fragmentShader={gradientFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function EnhancedParticles({ count = 1200 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseSmooth = useRef({ x: 0, y: 0 });

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    const indigo = new THREE.Color("#6366f1");
    const pink = new THREE.Color("#ec4899");
    const cyan = new THREE.Color("#06b6d4");
    const palette = [indigo, pink, cyan];

    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi) - 3;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      sz[i] = Math.random() * 3 + 0.5;
    }
    return [pos, col, sz];
  }, [count]);

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current) return;
    mouseSmooth.current.x +=
      (pointer.x * 0.3 - mouseSmooth.current.x) * 0.02;
    mouseSmooth.current.y +=
      (pointer.y * 0.3 - mouseSmooth.current.y) * 0.02;

    pointsRef.current.rotation.y =
      mouseSmooth.current.x * 0.4 + clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x =
      mouseSmooth.current.y * 0.2 + clock.elapsedTime * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function MorphingSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!sphereRef.current) return;
    sphereRef.current.rotation.x = clock.elapsedTime * 0.1;
    sphereRef.current.rotation.y = clock.elapsedTime * 0.15;
    sphereRef.current.position.y = Math.sin(clock.elapsedTime * 0.4) * 0.4;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere ref={sphereRef} args={[1.8, 64, 64]} position={[3.5, 0.5, -1]}>
        <MeshDistortMaterial
          color="#6366f1"
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.15}
          wireframe
        />
      </Sphere>
    </Float>
  );
}

function FloatingTorus() {
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!torusRef.current) return;
    torusRef.current.rotation.x = Math.PI / 3 + clock.elapsedTime * 0.08;
    torusRef.current.rotation.z = clock.elapsedTime * 0.06;
    torusRef.current.position.y =
      1 + Math.sin(clock.elapsedTime * 0.3) * 0.5;
  });

  return (
    <mesh ref={torusRef} position={[-4, 1, -3]}>
      <torusGeometry args={[2.5, 0.015, 16, 120]} />
      <meshBasicMaterial color="#ec4899" transparent opacity={0.25} />
    </mesh>
  );
}

function FloatingOctahedron() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.elapsedTime * 0.2;
    ref.current.rotation.z = clock.elapsedTime * 0.15;
    ref.current.position.y = -1 + Math.sin(clock.elapsedTime * 0.6) * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.5}>
      <mesh ref={ref} position={[-2.5, -1, -2]}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </Float>
  );
}

function ConnectingLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const points: number[] = [];
    const lineCount = 15;

    for (let i = 0; i < lineCount; i++) {
      const x1 = (Math.random() - 0.5) * 16;
      const y1 = (Math.random() - 0.5) * 10;
      const z1 = -2 - Math.random() * 4;

      const x2 = x1 + (Math.random() - 0.5) * 4;
      const y2 = y1 + (Math.random() - 0.5) * 4;
      const z2 = z1 + (Math.random() - 0.5) * 2;

      points.push(x1, y1, z1, x2, y2, z2);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(points, 3)
    );
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!linesRef.current) return;
    linesRef.current.rotation.y = clock.elapsedTime * 0.01;
    linesRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.05) * 0.05;
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial
        color="#6366f1"
        transparent
        opacity={0.06}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.8}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0.0005, 0.0005)}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette
        offset={0.3}
        darkness={0.7}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}

function AdaptiveCamera() {
  const { camera } = useThree();
  const mouseSmooth = useRef({ x: 0, y: 0 });

  useFrame(({ pointer }) => {
    mouseSmooth.current.x +=
      (pointer.x * 0.3 - mouseSmooth.current.x) * 0.03;
    mouseSmooth.current.y +=
      (pointer.y * 0.2 - mouseSmooth.current.y) * 0.03;

    camera.position.x = mouseSmooth.current.x;
    camera.position.y = mouseSmooth.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroScene() {
  const handleCreated = useCallback(
    (state: { gl: THREE.WebGLRenderer }) => {
      state.gl.toneMapping = THREE.ACESFilmicToneMapping;
      state.gl.toneMappingExposure = 1.2;
    },
    []
  );

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={handleCreated}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#6366f1" />
        <pointLight position={[-5, -3, 3]} intensity={0.2} color="#ec4899" />

        <AdaptiveCamera />
        <GradientMesh />
        <EnhancedParticles />
        <MorphingSphere />
        <FloatingTorus />
        <FloatingOctahedron />
        <ConnectingLines />
        <PostProcessing />
      </Canvas>
    </div>
  );
}
