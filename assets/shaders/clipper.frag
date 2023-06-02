// pixijs builtins
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

// shared frame values
varying float ox;
varying float oy;
varying float oz;
varying float ow;

// passed waver variables
uniform float minX;
uniform float medX;
uniform float maxX;
uniform float minY;
uniform float medY;
uniform float maxY;
uniform float rads;

// tau constant for sine calculations
const float TAU = 3.1415926535897932384626433832795 * 2.0;

float atan2 (float y, float x) {
   return mod(atan(y, x), TAU);
}

// calculate angle from a vector (ported from 2C)
float angleFrom (vec2 position, vec2 target) {
   return atan2(position.y - target.y, position.x - target.x);
}

// calculate extent of a vector (ported from 2C)
float extentOf (vec2 position, vec2 target) {
   float dx = target.x - position.x;
   float dy = target.y - position.y;
   return sqrt(dx * dx + dy * dy);
}

// calculate endpoint of a casted ray (ported from 2C)
vec2 endpoint (vec2 position, float angle, float extent) {
   return vec2(position.x + extent * sin(angle), position.y + extent * cos(angle));
}

// shift around an origin (ported from 2C)
vec2 shift (vec2 position, float angle, float extent, vec2 origin) {
   return endpoint(origin, angleFrom(position, origin) + angle, extentOf(position, origin) + extent);
}

void main (void) {
   // extend pixel values into integer space
   vec4 frame = vec4(ox, oy, oz, ow);
   vec2 position = vTextureCoord * frame.zw - frame.xy;
   
   // get extended pixel values
   float x = position.x;
   float y = position.y;

   // shift the point if necessary
   if (rads < 0.0 || rads > 0.0) {
      vec2 rotted = shift(position.xy, rads, 0.0, vec2(medX, medY));
      x = rotted.x;
      y = rotted.y;
   }

   // check position
   if (x < minX || x > maxX || y < minY || y > maxY) {
      gl_FragColor = vec4(0, 0, 0, 0);
   } else {
      gl_FragColor = texture2D(uSampler, (position.xy + frame.xy) / frame.zw);
   }
}