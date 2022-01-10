export default {
    createAttribute({width, height}){
        const uv = []

        for(let i = 0; i < width; i++){
            for(let j = 0; j < height; j++){
                uv.push(i / width, j / height)
            }
        }

        return {uv: new Float32Array(uv)}
    },
    createAnimAttribute({widthSeg, heightSeg}){
        const startPosition = []
        const endPosition = []
        const control0 = []
        const control1 = []
        const duration = []
        const delay = []

        const w = widthSeg * 2
        const h = heightSeg

        for(let i = 0; i < h; i++){
            for(let j = 0; j < w; i++){
                
            }
        }
    },
    createTextureFromCanvas({img, size}){
        const {w, h} = size

        const ctx = document.createElement('canvas').getContext('2d')
        ctx.canvas.width = w
        ctx.canvas.height = h

        const x = 0
        const y = 0
        const offsetX = 0.5
        const offsetY = 0.5

        let iw = img.width
        let ih = img.height
        let r = Math.min(w / iw, h / ih)
        let nw = iw * r
        let nh = ih * r
        let cx, cy, cw, ch, ar = 1

        if (nw < w) ar = w / nw
        if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh
        nw *= ar
        nh *= ar

        cw = iw / (nw / w)
        ch = ih / (nh / h)

        cx = (iw - cw) * offsetX
        cy = (ih - ch) * offsetY

        if (cx < 0) cx = 0
        if (cy < 0) cy = 0
        if (cw > iw) cw = iw
        if (ch > ih) ch = ih

        ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h)

        return ctx.canvas
    }
}