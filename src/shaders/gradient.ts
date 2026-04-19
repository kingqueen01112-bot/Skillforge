export const gradientVertexShader = `
varying vec2 vUv;
varying float vElevation;
uniform float uTime;
uniform float uMouse;

void main() {
  vUv = uv;
  vec3 pos = position;

  float wave1 = sin(pos.x * 2.0 + uTime * 0.5) * 0.15;
  float wave2 = sin(pos.y * 3.0 + uTime * 0.3) * 0.1;
  float wave3 = cos(pos.x * 1.5 + pos.y * 2.0 + uTime * 0.4) * 0.12;

  pos.z += wave1 + wave2 + wave3;
  pos.z += uMouse * sin(pos.x * 2.0 + pos.y * 2.0) * 0.1;
  vElevation = pos.z;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const gradientFragmentShader = `
varying vec2 vUv;
varying float vElevation;
uniform float uTime;

void main() {
  vec3 indigo = vec3(0.388, 0.4, 0.945);
  vec3 pink = vec3(0.925, 0.282, 0.6);
  vec3 cyan = vec3(0.024, 0.714, 0.835);
  vec3 dark = vec3(0.039, 0.039, 0.059);

  float t = vUv.x + sin(vUv.y * 3.0 + uTime * 0.2) * 0.2;
  vec3 color = mix(indigo, pink, smoothstep(0.0, 0.5, t));
  color = mix(color, cyan, smoothstep(0.5, 1.0, t));

  float elevation = smoothstep(-0.3, 0.3, vElevation);
  color = mix(dark, color, elevation * 0.6 + 0.1);

  float alpha = 0.12 + elevation * 0.08;

  gl_FragColor = vec4(color, alpha);
}
`;

export const noiseVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const noiseFragmentShader = `
varying vec2 vUv;
uniform float uTime;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 st = vUv * 5.0;
  float n = noise(st + uTime * 0.1);
  n += noise(st * 2.0 - uTime * 0.15) * 0.5;
  n += noise(st * 4.0 + uTime * 0.08) * 0.25;
  n /= 1.75;

  vec3 indigo = vec3(0.388, 0.4, 0.945);
  vec3 pink = vec3(0.925, 0.282, 0.6);
  vec3 color = mix(indigo, pink, n);

  gl_FragColor = vec4(color, n * 0.06);
}
`;
