export default {
    vertex: `
        attribute vec2 aUv;

        varying vec2 vUv;
    
        void main(){
            vUv = aUv;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragment: `
        uniform sampler2D uTexture;
        uniform vec2 uResolution;

        varying vec2 vUv;

        void main(){
            vec2 uv = gl_FragCoord.xy / uResolution.xy;

            vec4 tex = texture(uTexture, uv);
            // vec4 tex = texelFetch(uTexture, ivec2(gl_FragCoord.xy), 0);

            gl_FragColor = tex;
            // gl_FragColor = vec4(vec3(1), uv.x);
            // gl_FragColor = vec4(uv, 0.0, 1.0);
        }
    `
}