/**
 * Shaders for the E-Summit'27 hero canvas.
 * Colour ramp: #12002b → #6211BF → #9030F0 → #C537F8 → #F5D4FE (purple/white only).
 * All fragment outputs are premultiplied (rgb * a, a) and drawn with ONE/ONE
 * additive blending, so overlapping fire / embers / shards glow without bloom.
 */

/** Full-screen quad: PlaneGeometry(2,2) already spans clip space -1…1. */
export const FIRE_VERT = /* glsl */ `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const FIRE_FRAG = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2  uResolution; // drawing-buffer size in px
uniform vec2  uPointer;    // smoothed pointer, -1…1
uniform float uQuality;    // fbm octave count (2–4), set by the adaptive tier

const vec3 C0 = vec3(0.071, 0.000, 0.169); // #12002b
const vec3 C1 = vec3(0.384, 0.067, 0.749); // #6211BF
const vec3 C2 = vec3(0.565, 0.188, 0.941); // #9030F0
const vec3 C3 = vec3(0.773, 0.216, 0.973); // #C537F8
const vec3 C4 = vec3(0.961, 0.831, 0.996); // #F5D4FE

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

// Octave count comes from a uniform with an early break, so changing quality
// tiers never forces a shader recompile (no hitch).
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    if (float(i) >= uQuality) break;
    v += a * noise(p);
    p = p * 2.02 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / uResolution.y;
  float t = uTime;

  // Horizon of the CSS grid floor sits at ~43–45% from the bottom.
  float base = 0.43;
  float h = clamp((uv.y - base) / (1.0 - base), 0.0, 1.0); // 0 at horizon → 1 at top

  // Aspect-correct x; flames lean toward the cursor, more so the higher they are.
  float x = (uv.x - 0.5) * aspect;
  x -= uPointer.x * 0.18 * h;
  vec2 p = vec2(x, uv.y);

  // Domain warping: offset the lookup with two fbm fields, all scrolling upward.
  vec2 q = vec2(fbm(p * 2.0 + vec2(0.0, -t * 0.6)),
                fbm(p * 2.0 + vec2(5.2, -t * 0.8)));
  float n = fbm(p * 3.0 + q * 1.8 + vec2(0.0, -t * 1.4));

  // Flame mask: wide at the base, narrowing + flickering (noise-modulated) toward the top.
  // (1.0 - smoothstep(low, high, v)) keeps edge0 < edge1, which the GLSL spec requires.
  float width = mix(0.95, 0.12, pow(h, 0.7)) * (0.75 + 0.5 * n);
  float body = 1.0 - smoothstep(width * 0.15, width, abs(x + (q.x - 0.5) * 0.25 * h));
  body *= smoothstep(base - 0.02, base + 0.03, uv.y); // fire starts at the horizon line
  float fire = body * (n * 1.7 - h * 0.9);

  // Halo ring around the flame logo (hollow centre so the logo stays crisp).
  vec2 hc = vec2(x, (uv.y - 0.6) * 1.3);
  float d = length(hc);
  float halo = exp(-d * d * 9.0) * (0.35 + 0.9 * n) * smoothstep(0.05, 0.22, d);

  float f = clamp(fire + halo * 0.8, 0.0, 1.0);
  f = smoothstep(0.05, 1.0, f);

  vec3 c = mix(C0, C1, smoothstep(0.0, 0.3, f));
  c = mix(c, C2, smoothstep(0.3, 0.55, f));
  c = mix(c, C3, smoothstep(0.55, 0.8, f));
  c = mix(c, C4, smoothstep(0.8, 1.0, f));

  gl_FragColor = vec4(c * f, f);
}
`;

/**
 * Embers: `position` holds 3 random numbers (0…1) per point, aSeed a 4th.
 * Everything is computed from uTime in the vertex shader → zero CPU work per frame.
 * Output is directly in clip space (no camera).
 */
export const EMBER_VERT = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
uniform vec2  uPointer;
attribute float aSeed;
varying float vAlpha;
varying float vLife;

void main() {
  float speed = 0.04 + 0.07 * position.z;
  float life = fract(uTime * speed + aSeed);           // 0 → 1 loop, staggered per ember

  float x = (position.x - 0.5) * 1.4 * (1.0 + 0.8 * life);  // spread out as they rise
  x += sin(uTime * (0.6 + position.y) + aSeed * 6.283) * 0.06 * (0.3 + life); // sideways drift
  x += uPointer.x * 0.12 * life;
  float y = mix(-0.14, 1.15, life);                     // horizon (clip -0.14) → above top

  gl_Position = vec4(x, y, 0.0, 1.0);

  float depth = 0.35 + 0.65 * position.y;               // fake size attenuation
  gl_PointSize = uSize * depth * uPixelRatio * (1.0 - 0.5 * life);
  vAlpha = sin(life * 3.14159) * depth;                 // fade in and out
  vLife = life;
}
`;

export const EMBER_FRAG = /* glsl */ `
precision mediump float;
varying float vAlpha;
varying float vLife;

void main() {
  // Soft round dot: 1 at the centre, 0 at the edge (edge0 < edge1 on purpose).
  float a = (1.0 - smoothstep(0.0, 0.5, length(gl_PointCoord - 0.5))) * vAlpha;
  vec3 col = mix(vec3(0.773, 0.216, 0.973), vec3(0.961, 0.831, 0.996), vLife);
  gl_FragColor = vec4(col * a, a);
}
`;

/**
 * Shards: one InstancedMesh. instanceMatrix (set once) gives position/scale;
 * rotation and pointer parallax happen here in the shader.
 */
export const SHARD_VERT = /* glsl */ `
uniform float uTime;
uniform vec2  uPointer;
attribute vec4 aSpin; // xyz = rotation axis, w = angular speed
varying vec3 vView;

vec3 rotateAxis(vec3 v, vec3 k, float a) {
  float c = cos(a);
  float s = sin(a);
  return v * c + cross(k, v) * s + k * dot(k, v) * (1.0 - c); // Rodrigues
}

void main() {
  vec3 pos = rotateAxis(position, normalize(aSpin.xyz), uTime * aSpin.w);
  vec4 world = modelMatrix * instanceMatrix * vec4(pos, 1.0);
  world.xy += uPointer * (1.6 / -world.z);                  // nearer shards move more
  vec4 view = viewMatrix * world;
  vView = view.xyz;
  gl_Position = projectionMatrix * view;
}
`;

export const SHARD_FRAG = /* glsl */ `
precision mediump float;
varying vec3 vView;

void main() {
  // Flat facet normal from screen-space derivatives → faceted glass look, no lights.
  vec3 n = normalize(cross(dFdx(vView), dFdy(vView)));
  float facet = abs(n.z);
  float rim = pow(1.0 - facet, 2.0);
  vec3 col = mix(vec3(0.384, 0.067, 0.749), vec3(0.816, 0.439, 0.941), facet) * 0.35
           + vec3(0.961, 0.831, 0.996) * rim * 0.6;
  float a = 0.55;
  gl_FragColor = vec4(col * a, a * 0.6);
}
`;