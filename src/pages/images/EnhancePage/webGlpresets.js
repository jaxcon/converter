export const ANIMATED_FILTERS = [
    "glitch",
    "vhs", "zoomPulse",
    "vhsEffect",
    "bulgeAnimated",
];

export const vertexShaderSrc = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    void main() {
        gl_Position = vec4(a_position, 0, 1);
        v_texCoord = a_texCoord;
    }
`;

export const fragmentShaderSrcs = {
    normal: `
    precision mediump float;
    uniform sampler2D u_image;
    varying vec2 v_texCoord;
    void main() {
      gl_FragColor = texture2D(u_image, v_texCoord);
    }
  `,
    cartoon: `
    precision mediump float;
    uniform sampler2D u_image;
    varying vec2 v_texCoord;
    void main() {
      vec4 color = texture2D(u_image, v_texCoord);
      float levels = 5.0;
      color.rgb = floor(color.rgb * levels) / levels;
      gl_FragColor = color;
    }
  `,
    edgeDetect: `
    precision mediump float;
    uniform sampler2D u_image;
    uniform vec2 u_texSize;
    varying vec2 v_texCoord;
    void main() {
        float dx = 1.0 / u_texSize.x;
        float dy = 1.0 / u_texSize.y;
        vec3 tl = texture2D(u_image, v_texCoord + vec2(-dx,-dy)).rgb;
        vec3 t  = texture2D(u_image, v_texCoord + vec2(0.0,-dy)).rgb;
        vec3 tr = texture2D(u_image, v_texCoord + vec2(dx,-dy)).rgb;
        vec3 l  = texture2D(u_image, v_texCoord + vec2(-dx,0.0)).rgb;
        vec3 c  = texture2D(u_image, v_texCoord).rgb;
        vec3 r  = texture2D(u_image, v_texCoord + vec2(dx,0.0)).rgb;
        vec3 bl = texture2D(u_image, v_texCoord + vec2(-dx,dy)).rgb;
        vec3 b  = texture2D(u_image, v_texCoord + vec2(0.0,dy)).rgb;
        vec3 br = texture2D(u_image, v_texCoord + vec2(dx,dy)).rgb;
        vec3 gx = -tl - 2.0*l - bl + tr + 2.0*r + br;
        vec3 gy = -tl - 2.0*t - tr + bl + 2.0*b + br;
        vec3 edge = sqrt(gx*gx + gy*gy);
        gl_FragColor = vec4(edge,1.0);
    }
  `,
    pixelate: `
    precision mediump float;
    uniform sampler2D u_image;
    uniform vec2 u_texSize;
    uniform float u_pixelSize;
    varying vec2 v_texCoord;
    void main() {
        vec2 coord = v_texCoord * u_texSize;
        coord = floor(coord / u_pixelSize) * u_pixelSize + u_pixelSize * 0.5;
        vec2 uv = coord / u_texSize;
        gl_FragColor = texture2D(u_image, uv);
    }
  `,
    glitch: `
    precision mediump float;
    uniform sampler2D u_image;
    varying vec2 v_texCoord;
    uniform float u_time;
    void main() {
      vec2 uv = v_texCoord;
      uv.r += 0.02 * sin(10.0 * uv.y + u_time);
      uv.g += 0.02 * cos(10.0 * uv.y + u_time);
      gl_FragColor = texture2D(u_image, uv);
    }
  `,
    oldPhoto: `
    precision mediump float;
    uniform sampler2D u_image;
    varying vec2 v_texCoord;
    void main() {
      vec2 uv = v_texCoord;
      vec4 c = texture2D(u_image, uv);
      float gray = dot(c.rgb, vec3(0.3,0.59,0.11));
      c.rgb = mix(vec3(gray), c.rgb * 0.9, 0.6);
      float dist = distance(uv, vec2(0.5));
      c.rgb *= smoothstep(0.8,0.5,dist);
      gl_FragColor = c;
    }
  `,
    lens: `
    precision mediump float;
    uniform sampler2D u_image;
    varying vec2 v_texCoord;
    void main() {
      vec2 uv = v_texCoord - 0.5;
      float r = length(uv);
      uv *= mix(1.0, 1.2*r*r, 0.5);
      gl_FragColor = texture2D(u_image, uv + 0.5);
    }
  `,
    bulge: `
    precision mediump float;
    uniform sampler2D u_image;
    uniform float u_strength;
    varying vec2 v_texCoord;
    void main() {
      vec2 uv = v_texCoord - 0.5;
      float r = length(uv);
      if(r < 0.5) {
        float factor = 1.0 + u_strength * (0.5 - r);
        uv *= factor;
      }
      gl_FragColor = texture2D(u_image, uv + 0.5);
    }
  `,
    zoomPulse: `
    precision mediump float;
    uniform sampler2D u_image;
    uniform float u_time;
    uniform float u_speed;
    varying vec2 v_texCoord;
    void main() {
      vec2 uv = v_texCoord - 0.5;
      float factor = 1.0 + 0.1 * sin(u_time * u_speed);
      uv *= factor;
      gl_FragColor = texture2D(u_image, uv + 0.5);
    }
  `,
    duotone: `
    precision mediump float;
    uniform sampler2D u_image;
    uniform vec3 u_color1;
    uniform vec3 u_color2;
    varying vec2 v_texCoord;
    void main() {
      vec4 c = texture2D(u_image, v_texCoord);
      float lum = dot(c.rgb, vec3(0.299, 0.587, 0.114));
      vec3 color = mix(u_color1, u_color2, lum);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
    hsvShift: `
    precision mediump float;
    uniform sampler2D u_image;
    uniform float u_time;
    varying vec2 v_texCoord;

    vec3 rgb2hsv(vec3 c) {
      vec4 K = vec4(0., -1./3., 2./3., -1.);
      vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
      vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
      float d = q.x - min(q.w, q.y);
      float e = 1e-10;
      return vec3(abs((q.w - q.y) / (6. * d + e) + q.z), d / (q.x + e), q.x);
    }

    vec3 hsv2rgb(vec3 c) {
      vec3 p = abs(fract(c.xxx + vec3(0., 1./3., 2./3.)) * 6. - 3.);
      return c.z * mix(vec3(1.), clamp(p - 1., 0., 1.), c.y);
    }

    void main() {
      vec4 c = texture2D(u_image, v_texCoord);
      vec3 hsv = rgb2hsv(c.rgb);
      hsv.x += 0.2 * sin(u_time);
      gl_FragColor = vec4(hsv2rgb(hsv), 1.0);
    }
  `,
    thermalVision: `
    precision mediump float;
    uniform sampler2D u_image;
    varying vec2 v_texCoord;
    void main() {
      vec4 c = texture2D(u_image, v_texCoord);
      float lum = dot(c.rgb, vec3(0.299, 0.587, 0.114));
      vec3 col;
      if(lum < 0.25) col = vec3(0.,0.,1.);
      else if(lum < 0.5) col = vec3(0.,1.,0.);
      else if(lum < 0.75) col = vec3(1.,1.,0.);
      else col = vec3(1.,0.,0.);
      gl_FragColor = vec4(col, 1.0);
    }
  `,
    vhs: `
precision mediump float;
uniform sampler2D u_image;
uniform float u_time;
varying vec2 v_texCoord;
void main() {
    vec2 uv = v_texCoord;
    float offset = 0.005 * sin(20.0*u_time);
    vec3 col;
    col.r = texture2D(u_image, uv + vec2(offset,0.0)).r;
    col.g = texture2D(u_image, uv).g;
    col.b = texture2D(u_image, uv - vec2(offset,0.0)).b;
    col += vec3(0.02*sin(50.0*uv.y + u_time));
    gl_FragColor = vec4(col,1.0);
}
`,
    bloom: `
precision mediump float;
uniform sampler2D u_image;
varying vec2 v_texCoord;
void main() {
    vec3 c = texture2D(u_image, v_texCoord).rgb;
    float brightness = dot(c, vec3(0.299,0.587,0.114));
    c += brightness * 0.3;
    gl_FragColor = vec4(c,1.0);
}
`,
    vignette: `
precision mediump float;
uniform sampler2D u_image;
uniform vec3 u_color;
varying vec2 v_texCoord;
void main() {
    vec2 uv = v_texCoord - 0.5;
    float len = length(uv);
    vec3 c = texture2D(u_image, v_texCoord).rgb;
    c = mix(c, u_color, smoothstep(0.4,0.7,len));
    gl_FragColor = vec4(c,1.0);
}
`,
    bgRemove: `
    precision mediump float;
    uniform sampler2D u_image;
    varying vec2 v_texCoord;
    void main() {
      vec4 c = texture2D(u_image, v_texCoord);
      vec3 keyColor = vec3(0.0, 1.0, 0.0);
      float threshold = 0.4;
      float factor = smoothstep(threshold - 0.1, threshold + 0.1, distance(c.rgb, keyColor));
      gl_FragColor = vec4(c.rgb * factor, factor);
    }
  `,
    emboss3D: `
precision mediump float;
uniform sampler2D u_image;
uniform vec2 u_texSize;
varying vec2 v_texCoord;
void main() {
  float dx = 1.0 / u_texSize.x;
  float dy = 1.0 / u_texSize.y;
  vec3 c1 = texture2D(u_image, v_texCoord + vec2(-dx,-dy)).rgb;
  vec3 c2 = texture2D(u_image, v_texCoord + vec2(dx, dy)).rgb;
  vec3 diff = c2 - c1;
  gl_FragColor = vec4(diff + 0.5, 1.0);
}
`,
    vhsEffect: `
precision mediump float;
uniform sampler2D u_image;
uniform float u_time;
varying vec2 v_texCoord;

void main() {
    vec2 uv = v_texCoord;
    float offset = 0.02 * sin(uv.y * 50.0 + u_time * 5.0);
    
    vec4 c;
    c.r = texture2D(u_image, uv + vec2(offset, 0.0)).r;
    c.g = texture2D(u_image, uv + vec2(0.0, 0.0)).g;
    c.b = texture2D(u_image, uv - vec2(offset, 0.0)).b;
    c.a = 1.0;

    float scan = sin(uv.y * 800.0 + u_time * 10.0) * 0.05;
    c.rgb -= scan;

    c.rgb = clamp(c.rgb * 1.2, 0.0, 1.0);

    gl_FragColor = c;
}
`,
    bulgeAnimated: `
precision mediump float;
uniform sampler2D u_image;
uniform float u_time;
varying vec2 v_texCoord;
void main() {
  vec2 uv = v_texCoord - 0.5;
  float r = length(uv);
  float factor = 1.0 + 0.2 * sin(5.0*r - u_time*3.0);
  uv *= factor;
  gl_FragColor = texture2D(u_image, uv + 0.5);
}
`,
};