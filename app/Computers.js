import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import { useRef, useState, Suspense } from 'react'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import * as THREE from 'three'

function Commodore({ index, z, speed }) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/commodore-transformed.glb')

  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height * 2),
    spin: THREE.MathUtils.randFloat(8, 12),
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI
  })

  useFrame((state, dt) => {
    if (dt < 0.1) ref.current.position.set(index === 0 ? 0 : data.x * width, (data.y += dt * speed), z)
    // Rotate the object around
    ref.current.rotation.set((data.rX += dt / data.spin), Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI, (data.rZ += dt / data.spin))
    // If they're too far up, set them back to the bottom
    if (data.y > height * (index === 0 ? 4 : 1)) data.y = -(height * (index === 0 ? 4 : 1))
  });

  return (
    <mesh
      ref={ref}
      scale={1}
      material-emissive="gray"
      geometry={nodes.Object_4.geometry}
      material={materials.Material} />
  )
}

export default function App({ speed = 1, count = 50, depth = 80 }) {
  return (
  <Canvas gl={{ alpha: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 20, near: 0.01, far: depth + 15 }}>
    <color attach="background" args={["#faf0e6"]} />
    <ambientLight intensity={0.8} />
    <spotLight position={[10, 10, 10]} intensity={4}/>
    { Array.from({ length: count }, (_, i) => (<Commodore key={i} speed={speed} index={i} z={ -(i / count) * depth - 20 } />))}
    <Environment preset="sunset"/>
    <EffectComposer multisampling={0}>
      <DepthOfField target={[0, 0, depth / 2]} focalLength={0.3} bokehScale={11} height={700} />
    </EffectComposer>
  </Canvas>)
}