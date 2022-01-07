export default {
    vertex: `
        varying vec2 vUv;

        void main(){
            vUv = uv;

            float scaleX = 0.5;
            float scaleY = 0.5;
            float scaleZ = 1.0;

            mat4 sPos = mat4(
                            vec4(scaleX,0.0,0.0,0.0),
                            vec4(0.0,scaleY,0.0,0.0),
                            vec4(0.0,0.0,scaleZ,0.0),
                            vec4(0.0,0.0,0.0,1.0)
                        );

            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragment: `
        uniform sampler2D uTexture;
        uniform vec2 uResolution;
        uniform float uRatio;

        varying vec2 vUv;

        void main(){
            vec2 uv = gl_FragCoord.xy / uResolution.xy;

            float x = gl_FragCoord.x;
            float y = gl_FragCoord.y;

            vec2 h = uResolution * uRatio;
            vec2 offset = h * 0.5;

            float nu, nv;            

            if(x >= offset.x && x <= h.x + offset.x){
                nu = (x - offset.x) / h.x;
            }
            
            if(y >= offset.y && y <= h.y + offset.y){
                nv = (y - offset.y) / h.y;
            }

            vec4 tex = texture(uTexture, vec2(nu, nv));
            // vec4 tex = texelFetch(uTexture, ivec2(gl_FragCoord.xy), 0);

            gl_FragColor = tex;
            // gl_FragColor = vec4(nu, nv, 0.0, 1.0);
        }
    `
}