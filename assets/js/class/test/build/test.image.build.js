import * as THREE from '../../../lib/three.module.js'
import Plane from '../../objects/plane.js'
// import PrefabObject from '../../objects/prefab.js'

export default class{
    constructor({group}){
        this.param = {
            width: 1920,
            height: 1080,
            ratio: 0.5
        }

        this.init(group)
    }

    
    // init
    init(group){
        this.create(group)
    }


    // create
    create(group){
        const width = this.param.width * this.param.ratio
        const height = this.param.height * this.param.ratio
        const widthSeg = ~~(this.param.width * this.param.ratio / 10)
        const heightSeg = ~~(this.param.height * this.param.ratio / 10)



        // test 1
        const plane = new THREE.PlaneGeometry(width, height, widthSeg, heightSeg)

        const planePos = plane.attributes.position
        const planePosArr = planePos.array

        const planeIndex = plane.index
        // const planeIndexCnt = planeIndex.count
        const planeIndexCnt = 100 * 3
        const planeIndexArr = planeIndex.array

        const geometry = new THREE.BufferGeometry()
        const position = new Float32Array(3 * planeIndexCnt)

        for(let i = 0; i < planeIndexCnt; i++){
            const idx = planeIndexArr[i]
            const index = idx * 3
            position[i * 3] = planePosArr[index]
            position[i * 3 + 1] = planePosArr[index + 1]
            position[i * 3 + 2] = planePosArr[index + 2]
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))

        group.add(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial()))

        // const prefab = 
        // this.object = new PrefabObject({
        //     prefab,
        //     count,
        //     materialOpt: {
                
        //     }
        // })



        // test 2
        // this.object = new Plane({
        //     width, height, widthSeg: 2, heightSeg: 2,
        //     materialOpt: {
        //         color: 0xffffff,
        //         transparent: true
        //     }
        // })

        // console.log(this.object.get())
    }
}