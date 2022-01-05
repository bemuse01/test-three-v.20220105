import * as THREE from '../../../lib/three.module.js'
import {PrefabBufferGeometry} from '../../../lib/three.module.extends.js'

export default class{
    constructor(){
        this.param = {
            count: 100
        }

        this.init()
    }


    // init
    init(){

    }


    // create
    create(){
        const prefabGeometry = new THREE.BoxGeometry(50, 50, 50)

        const geomerty = new PrefabBufferGeometry(prefabGeometry, this.param.count)
    }
}