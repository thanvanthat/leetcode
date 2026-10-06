"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Hero WebGL scene: a procedurally displaced terrain (the game world)
 * streaming toward the camera, with a faceted intelligence core and a
 * particle shell orbiting above it (the AI). One scene, one draw loop.
 */

const terrainVertex = /* glsl */ `
  uniform float uTime;
  varying float vHeight;
  varying float vDepth;

  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(dot(hash(i), f), dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
               mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
  }

  void main() {
    vec3 p = position;
    vec2 q = vec2(p.x * 0.16, (p.y + uTime * 1.4) * 0.16);
    float h = noise(q) * 2.2 + noise(q * 2.3) * 0.7;
    // Carve a valley down the middle so the core floats above a path
    float valley = smoothstep(0.0, 6.0, abs(p.x));
    h *= mix(0.15, 1.0, valley);
    p.z += h;
    vHeight = h;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const terrainFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccent;
  varying float vHeight;
  varying float vDepth;
  void main() {
    float fog = 1.0 - smoothstep(6.0, 34.0, vDepth);
    vec3 col = mix(uColor, uAccent, smoothstep(1.2, 2.4, vHeight));
    gl_FragColor = vec4(col, fog * 0.55);
  }
`;

function Terrain() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#8b8b90") },
      uAccent: { value: new THREE.Color("#9fd4ff") },
    }),
    [],
  );
  useFrame((_, delta) => {
    if (material.current) material.current.uniforms.uTime!.value += delta;
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, -10]}>
      <planeGeometry args={[48, 44, 96, 88]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={terrainVertex}
        fragmentShader={terrainFragment}
        wireframe
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function Core() {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.05, 1)), []);

  useFrame((state, delta) => {
    if (!group.current || !shell.current) return;
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    group.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
    shell.current.rotation.y -= delta * 0.08;
    shell.current.rotation.z += delta * 0.05;
  });

  return (
    <group ref={group} position={[1.6, 0.5, 0]}>
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#1a1a1d" metalness={0.9} roughness={0.28} flatShading />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#9fd4ff" transparent opacity={0.55} />
      </lineSegments>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.75, 2]} />
        <meshBasicMaterial color="#ecebe6" wireframe transparent opacity={0.07} />
      </mesh>
    </group>
  );
}

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    let s = 7;
    const rand = () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
    for (let i = 0; i < count; i++) {
      const r = 2.2 + rand() * 2.6;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.6;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05;
  });

  return (
    <points ref={ref} position={[1.6, 0.5, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#ecebe6" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function CameraRig({ mobile }: { mobile: boolean }) {
  const target = useMemo(() => new THREE.Vector3(mobile ? 0.8 : 0.6, 0.2, 0), [mobile]);
  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * 0.6 + (mobile ? 0.8 : 0) - camera.position.x) * 0.04;
    camera.position.y += (0.6 + pointer.y * 0.35 - camera.position.y) * 0.04;
    camera.lookAt(target);
  });
  return null;
}

interface HeroSceneProps {
  active: boolean;
  reduced: boolean;
  mobile: boolean;
}

export default function HeroScene({ active, reduced, mobile }: HeroSceneProps) {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, mobile ? 1.25 : 1.6]}
      frameloop={reduced ? "demand" : active ? "always" : "never"}
      camera={{ position: [0, 0.6, 6.5], fov: mobile ? 55 : 42, near: 0.1, far: 60 }}
      gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 5, 3]} intensity={2.2} color="#ecebe6" />
      <pointLight position={[-3, -1, 2]} intensity={6} color="#9fd4ff" distance={10} />
      <Terrain />
      <Core />
      <Particles count={mobile ? 350 : 900} />
      {!reduced && <CameraRig mobile={mobile} />}
    </Canvas>
  );
}
