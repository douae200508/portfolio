import { Float, MeshDistortMaterial } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

import { useTheme } from '@/components/theme-provider'

/** Forme géométrique animée qui suit légèrement la souris (parallax) — tourne
 * doucement en continu, se déforme avec MeshDistortMaterial pour un rendu
 * organique plutôt qu'un simple solide statique. */
function AnimatedBlob() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { resolvedTheme } = useTheme()
  const { pointer } = useThree()

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.08
    meshRef.current.rotation.y += delta * 0.12
    // Parallax doux : la forme s'incline légèrement vers le pointeur, sans
    // jamais sortir d'une plage raisonnable (évite un effet nauséeux).
    meshRef.current.rotation.x += (pointer.y * 0.15 - meshRef.current.rotation.x * 0.02) * delta
    meshRef.current.rotation.y += (pointer.x * 0.15 - meshRef.current.rotation.y * 0.02) * delta
  })

  // Or unique, plus saturé que le token --primary (qui vire au marron une
  // fois mélangé au terracotta du halo CSS) — un seul ton franc.
  const color = resolvedTheme === 'dark' ? '#F7CE92' : '#EAC06E'

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={1.85}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.35}
          metalness={0.12}
          distort={0.22}
          speed={1.8}
        />
      </mesh>
    </Float>
  )
}

/**
 * Scène 3D du Hero (§4.2) — chargée via React.lazy depuis <Hero> pour ne
 * jamais bloquer l'affichage du texte/CTA pendant le téléchargement de
 * Three.js. Un simple dégradé CSS suffit de secours (voir hero.tsx) tant
 * qu'elle charge, ou si WebGL est indisponible.
 */
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.95} />
      <directionalLight position={[3, 3, 4]} intensity={0.85} />
      <AnimatedBlob />
    </Canvas>
  )
}
