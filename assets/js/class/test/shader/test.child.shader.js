export default {
    vertex: `
        uniform float uTime;
        
        attribute vec3 aStartPosition;
        attribute vec3 aEndPosition;
        attribute float aStartTime;

        void main(){
            vec3 newPosition = position;
            
            // newPosition.x += 200.;
            newPosition += aStartPosition;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
    `,
    fragment: `
        void main(){
            gl_FragColor = vec4(vec3(1), 0.5);
        }
    `
}