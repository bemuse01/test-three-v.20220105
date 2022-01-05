import * as THREE from '../../../lib/three.module.js'
import {PrefabBufferGeometry} from '../../../lib/three.module.extends.js'

export default class{
    constructor({group}){
        this.param = {
            count: 10
        }

        this.init(group)
    }


    // init
    init(group){
        this.create(group)
    }


    // create
    create(group){
        const prefabGeometry = new THREE.BoxGeometry(50, 50, 50)

        const geomerty = new PrefabBufferGeometry(prefabGeometry, this.param.count)
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.01
        })
        const mesh = new THREE.Mesh(geomerty, material)

        console.log(geomerty)

        group.add(mesh)
    }
}