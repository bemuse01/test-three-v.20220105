import * as THREE from '../../../lib/three.module.js'

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
    createAnimAttribute({position, width, height, widthSeg, heightSeg, xRange, yRange, zRange, defaultDuration, defaultDelay, randomDelay, maxDelayX, maxDelayY, stretch}){
        const {array} = position
        const startPosition = []
        const endPosition = []
        const control0 = []
        const control1 = []
        const duration = []
        const delay = []

        const w = widthSeg * 2
        const h = heightSeg
        
        const d = defaultDuration / w

        for(let i = 0; i < h; i++){
            for(let j = 0; j < w; j++){
                const idx = (i * w + j) * 3 * 3
                
                const x1 = array[idx + 0]
                const y1 = array[idx + 1]
                const z1 = array[idx + 2]

                const x2 = array[idx + 3]
                const y2 = array[idx + 4]
                const z2 = array[idx + 5]
                
                const x3 = array[idx + 6]
                const y3 = array[idx + 7]
                const z3 = array[idx + 8]


                // position
                startPosition.push(x1, y1, z1)
                startPosition.push(x2, y2, z2)
                startPosition.push(x3, y3, z3)

                endPosition.push(x1, y1, z1)
                endPosition.push(x2, y2, z2)
                endPosition.push(x3, y3, z3)


                // cubic bezier control points
                const cx = (x1 + x2 + x3) / 3
                const cy = (y1 + y2 + y3) / 3
                const sign = Math.sign(cy)

                const rx0 = (Math.random() * 0.2 + 0.1) * xRange
                const ry0 = (Math.random() * 0.2 + 0.1) * yRange * sign
                const rz0 = Math.random() * zRange

                const rx1 = (Math.random() * 0.2 + 0.1) * xRange
                const ry1 = (Math.random() * 0.2 + 0.1) * yRange * -sign
                const rz1 = Math.random() * zRange

                control0.push(rx0 + x1, ry0 + y1, rz0 + z1)
                control0.push(rx0 + x2, ry0 + y2, rz0 + z2)
                control0.push(rx0 + x3, ry0 + y3, rz0 + z3)

                control1.push(rx1 + x1, ry1 + y1, rz1 + z1)
                control1.push(rx1 + x2, ry1 + y2, rz1 + z2)
                control1.push(rx1 + x3, ry1 + y3, rz1 + z3)


                // duration
                const dur = Math.random() * randomDelay + defaultDelay

                duration.push(dur, dur, dur)
                // duration.push(dur, dur, dur)
                // duration.push(dur, dur, dur)


                // delay
                const delayX = THREE.Math.mapLinear(cx, -width * 0.5, width * 0.5, 0.0, maxDelayX);
                const delayY = THREE.Math.mapLinear(Math.abs(cy), 0, height * 0.5, maxDelayY, 0.0)

                const del = delayX + delayY + (Math.random() * stretch * dur);

                delay.push(del, del, del)
            }
        }

        return {startPosition, endPosition, control0, control1, duration, delay}
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