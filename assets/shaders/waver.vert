// pixijs builtins
attribute vec2 aVertexPosition;
uniform mat3 projectionMatrix;
varying vec2 vTextureCoord;
uniform vec4 inputSize;
uniform vec4 outputFrame;

// shared frame values
varying float ox;
varying float oy;
varying float oz;
varying float ow;

// default pixel handling (dont change this)
vec4 filterVertexPosition (void) {
   vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;
   return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

// default pixel handling (dont change this)
vec2 filterTextureCoord (void) {
   return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main (void) {
   // default pixel handling (dont change this)
   gl_Position = filterVertexPosition();
   vTextureCoord = filterTextureCoord();

   // update frame values
   ox = outputFrame.x;
   oy = outputFrame.y;
   oz = outputFrame.z;
   ow = outputFrame.w;
}