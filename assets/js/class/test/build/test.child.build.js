import * as THREE from '../../../lib/three.module.js'
import {PrefabBufferGeometry} from '../../../lib/three.module.extends.js'
import Shader from '../shader/test.child.shader.js'

export default class{
    constructor({group}){
        this.param = {
            count: 10000,
            defaultDuration: 6,
            randomDuration: 4,
            delay: 5
        }

        this.init(group)
    }


    // init
    init(group){
        this.create(group)
        // this.createTween()
    }


    // create
    create(group){
        const prefabGeometry = new THREE.BoxGeometry(10, 10, 10)
        const prefabGeometryCount = prefabGeometry.attributes.position.count

        const geometry = new PrefabBufferGeometry(prefabGeometry, this.param.count)

        geometry.createAttribute('aStartPosition', 3)
        geometry.createAttribute('aEndPosition', 3)
        geometry.createAttribute('aDuration', 1)
        geometry.createAttribute('aDelay', 1)

        const startPosArr = geometry.attributes['aStartPosition'].array
        const endPosArr = geometry.attributes['aEndPosition'].array
        const durationArr = geometry.attributes['aDuration'].array
        const delayArr = geometry.attributes['aDelay'].array

        for(let i = 0; i < this.param.count; i++){
            const index = i * prefabGeometryCount * 3
            
            const sx = Math.random() * 1000 - 500
            const sy = Math.random() * 1000 - 500
            const sz = Math.random() * 1000 - 500

            const ex = Math.random() * 1000 - 500
            const ey = Math.random() * 1000 - 500
            const ez = Math.random() * 1000 - 500

            const duration = Math.random() * this.param.randomDuration + this.param.defaultDuration

            const delay = Math.random() * this.param.delay

            for(let j = 0; j < prefabGeometryCount; j++){
                const idx1 = index + j
                const idx3 = index + j * 3

                startPosArr[idx3] = sx
                startPosArr[idx3 + 1] = sy
                startPosArr[idx3 + 2] = sz

                endPosArr[idx3] = ex
                endPosArr[idx3 + 1] = ey
                endPosArr[idx3 + 2] = ez

                durationArr[idx1] = duration
                
                delayArr[idx1] = delay
            }
        }

        const material = new THREE.ShaderMaterial({
            vertexShader: Shader.vertex,
            fragmentShader: Shader.fragment,
            transparent: true,
            blending: THREE.AdditiveBlending,
            uniforms: {
                uTime: {value: 0}
            }
        })

        this.mesh = new THREE.Mesh(geometry, material)

        group.add(this.mesh)
    }


    // tween
    createTween(){
        const start = {time: 0}
        const end = {time: 1}

        const tw = new TWEEN.Tween(start)
        .to(end, 10000)
        .onUpdate(() => this.updateTween(start))
        .repeat(Infinity)
        .start()
    }
    updateTween({time}){
        this.mesh.material.uniforms['uTime'].value = time
    }


    // animate
    animate(){
        this.mesh.material.uniforms['uTime'].value += 1 / 60

        this.mesh.material.uniforms['uTime'].value %= (this.param.randomDuration + this.param.defaultDuration + this.param.delay)
    }
}