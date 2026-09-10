import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const vertexShader = `
varying vec2 waveUv;
void main() {
  waveUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

const fragmentShader = `
uniform float waveTime;
varying vec2 waveUv;
void main() {
  float x = waveUv.x;
  float y = waveUv.y;
  float crest = 0.29 + 0.15 * sin(x * 7.0 + waveTime)
    + 0.055 * sin(x * 12.0 - waveTime * 0.65);
  float wave = 1.0 - smoothstep(crest - 0.09, crest + 0.14, y);
  float baseGlow = exp(-y * 15.0);
  vec3 tint = mix(vec3(1.0, 0.045, 0.025), vec3(1.0, 0.44, 0.36), baseGlow * 0.7);
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
  tint += grain * 0.018;
  // Alpha masks the upper canvas while retaining the moving gradient below.
  float alpha = 1.0 - wave * 0.5;
  gl_FragColor = vec4(tint * wave * 0.5 / max(alpha, 0.001), alpha);
}`;

export default function HeroWaveEnvelope({ animate }) {
  const materialRef = useRef(null);
  const uniforms = useMemo(() => ({ waveTime: { value: 0.75 } }), []);
  useFrame((_, delta) => {
    if (animate && materialRef.current) {
      materialRef.current.uniforms.waveTime.value += Math.min(delta, 0.05) * 0.18;
    }
  });

  return (
    <mesh frustumCulled={false} renderOrder={100}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={materialRef} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} transparent depthTest={false} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}
