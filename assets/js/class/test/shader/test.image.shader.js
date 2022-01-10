import ShaderMethod from '../../../method/method.shader.js'

export default {
    vertex: `
        attribute vec3 aStartPosition;
        attribute vec3 aEndPosition;
        attribute vec3 aControl0;
        attribute vec3 aControl1;
        attribute float aDuration;
        attribute float aDelay;

        uniform float uTime;

        ${ShaderMethod.cubicBezier()}

        void main(){
            vec3 newPosition = position;

            float p = clamp(uTime - aDelay, 0.0, aDuration) / aDuration;

            newPosition = cubicBezier(aStartPosition, aControl0, aControl1, aEndPosition, p);

            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
    `,
    fragment: `
        uniform sampler2D uTexture;
        uniform vec2 uResolution;
        uniform float uRatio;

        void main(){
            vec2 coord = gl_FragCoord.xy;
            vec2 uv = coord / uResolution.xy;

            vec2 hf = uResolution * uRatio;
            vec2 offset = (uResolution - hf) * 0.5;



            // test 1
            // vec2 nUv;

            // if(coord.x >= offset.x && coord.x <= hf.x + offset.x){
            //     nUv.x = (coord.x - offset.x) / hf.x;
            // }
            
            // if(coord.y >= offset.y && coord.y <= hf.y + offset.y){
            //     nUv.y = (coord.y - offset.y) / hf.y;
            // }
            // vec4 tex = texture(uTexture, nUv);



            // test 2
            vec2 nUv;
            nUv.x = clamp(distance(coord.x, offset.x) * sign(coord.x - offset.x) / hf.x, 0.0, 1.0);
            nUv.y = clamp(distance(coord.y, offset.y) * sign(coord.y - offset.y) / hf.y, 0.0, 1.0);
            vec4 tex = texture(uTexture, nUv);



            gl_FragColor = tex;
            // gl_FragColor = vec4(nUv, 0.0, 1.0);
        }
    `
}