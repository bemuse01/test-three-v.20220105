export default {
    createAttribute({width, height}){
        const uv = []

        for(let i = 0; i < height; i++){
            for(let j = 0; j < width; j++){
                uv.push(i / height, j / width)
            }
        }

        return {uv: new Float32Array(uv)}
    }
}