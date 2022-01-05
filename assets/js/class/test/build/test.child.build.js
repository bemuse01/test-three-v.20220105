import * as THREE from '../../../lib/three.module.js'
import {PrefabBufferGeometry} from '../../../lib/three.module.extends.js'
import Shader from '../shader/test.child.shader.js'

export default class{
    constructor({group}){
        this.param = {
            count: 10000
        }

        this.init(group)
    }


    // init
    init(group){
        this.create(group)
    }


    // create
    create(group){
        const prefabGeometry = new THREE.BoxGeometry(10, 10, 10)
        const prefabGeometryCount = prefabGeometry.attributes.position.count

        console.log(prefabGeometry)

        const geomerty = new PrefabBufferGeometry(prefabGeometry, this.param.count)

        geomerty.createAttribute('aStartPosition', 3)

        const array = geomerty.attributes['aStartPosition'].array

        for(let i = 0; i < this.param.count; i++){
            const index = i * prefabGeometryCount * 3
            
            const x = Math.random() * 1000 - 500
            const y = Math.random() * 1000 - 500
            const z = Math.random() * 1000 - 500

            for(let j = 0; j < prefabGeometryCount; j++){
                const idx = index + j * 3
                array[idx] = x
                array[idx + 1] = y
                array[idx + 2] = z
            }
        }

        // const material = new THREE.MeshBasicMaterial({
        //     color: 0xffffff,
        //     transparent: true,
        //     opacity: 0.01
        // })
        const material = new THREE.ShaderMaterial({
            vertexShader: Shader.vertex,
            fragmentShader: Shader.fragment,
            transparent: true,
            blending: THREE.AdditiveBlending,
            uniforms: {

            }
        })

        const mesh = new THREE.Mesh(geomerty, material)

        console.log(geomerty)

        group.add(mesh)
    }
}