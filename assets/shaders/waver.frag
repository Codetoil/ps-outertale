// pixijs builtins
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

// shared frame values
varying float ox;
varying float oy;
varying float oz;
varying float ow;

// passed waver variables
uniform float size;
uniform float phase;
uniform float widthTop;
uniform float widthBottom;

// tau constant for sine calculations
const float TAU = 3.1415926535897932384626433832795 * 2.0;

// numeric remapper (ported from 2C)
float remap (float value, float min1, float max1, float min2, float max2) {
   return ((value - min1) * (max2 - min2)) / (max1 - min1) + min2;
}

void main (void) {
   // extend pixel values into integer space
   vec4 frame = vec4(ox, oy, oz, ow);
   vec2 position = vTextureCoord * frame.zw - frame.xy;

   // get extended pixel values
   float h = frame.w;
   float x = position.x;
   float y = position.y;

   // apply waver math
   x += sin(TAU * (y / size + phase)) * max(remap(y, 0.0, h, widthTop * h, widthBottom * h), 0.0);

   // apply color from target
   gl_FragColor = texture2D(uSampler, (vec2(x, y) + frame.xy) / frame.zw);
}