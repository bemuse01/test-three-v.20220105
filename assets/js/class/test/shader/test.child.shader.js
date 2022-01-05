export default {
    vertex: `
        uniform float uTime;
        
        attribute vec3 aStartPosition;
        attribute vec3 aEndPosition;
        attribute float aDuration;
        attribute float aDelay;

        void main(){
            vec3 newPosition = position;
            
            // not working
            float p = clamp(uTime, 0.0, aDuration);
            
            newPosition += mix(aStartPosition, aEndPosition, uTime);

            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
    `,
    fragment: `
        void main(){
            gl_FragColor = vec4(vec3(1), 0.5);
        }
    `
}