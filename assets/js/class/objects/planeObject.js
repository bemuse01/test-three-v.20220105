import * as THREE from '../../lib/three.module.js'

export default class{
    constructor({width, height, widthSeg, heightSeg, materialOpt}){
        this.width = width
        this.height = height
        this.widthSeg = widthSeg
        this.heightSeg = heightSeg
        this.materialOpt = materialOpt
        
        const plane = new THREE.PlaneGeometry(width, height, widthSeg, heightSeg)

        this.position = plane.attributes.position
        this.uv = plane.attributes.uv
        this.index = plane.index

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        const geometry = this.createGeometry()
        const material = this.createMaterial()
        this.mesh = new THREE.Mesh(geometry, material)
    }
    createGeometry(){
        const geometry = new THREE.BufferGeometry()

        const posArr = this.position.array

        const indexArr = this.index.array
        const indexCnt = this.index.count

        const w = this.widthSeg * 2
        const h = this.heightSeg

        const positions = []
        const normals = []

        const pA = new THREE.Vector3()
        const pB = new THREE.Vector3()
        const pC = new THREE.Vector3()

        const cb = new THREE.Vector3()
        const ab = new THREE.Vector3()

        for(let i = 0; i < h; i++){
            for(let j = 0; j < w; j++){
                const idx = (i * w + j) * 3

                const p1 = indexArr[idx] * 3
                const p2 = indexArr[idx + 1] * 3
                const p3 = indexArr[idx + 2] * 3

                const a = 0
                const b = 0

                const x1 = posArr[p1] + a
                const y1 = posArr[p1 + 1] + b
                const z1 = posArr[p1 + 2]

                const x2 = posArr[p2] + a
                const y2 = posArr[p2 + 1] + b
                const z2 = posArr[p2 + 2]

                const x3 = posArr[p3] + a
                const y3 = posArr[p3 + 1] + b
                const z3 = posArr[p3 + 2]

                positions.push(x1, y1, z1)
                positions.push(x2, y2, z2)
                positions.push(x3, y3, z3)

                pA.set(x1, y1, z1)
                pB.set(x2, y2, z2)
                pC.set(x3, y3, z3)

                cb.subVectors(pC, pB)
                ab.subVectors(pA, pB)
                cb.cross(ab)

                cb.normalize()

                const nx = cb.x
                const ny = cb.y
                const nz = cb.z

                normals.push(nx, ny, nz)
                normals.push(nx, ny, nz)
                normals.push(nx, ny, nz)
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))

        return geometry
    }
    createMaterial(){
        if(this.materialOpt.vertexShader){
            return new THREE.ShaderMaterial(this.materialOpt)
        }else{
            return new THREE.MeshBasicMaterial(this.materialOpt)
        }
    }


    // dispose
    dispose(){
    
    }


    // resize
    resize({width, height, widthSeg, heightSeg}){
        this.width = width
        this.height = height
        this.widthSeg = widthSeg
        this.heightSeg = heightSeg
        
        const plane = new THREE.PlaneGeometry(width, height, widthSeg, heightSeg)

        this.position = plane.attributes.position
        this.uv = plane.attributes.uv
        this.index = plane.index
        
        this.mesh.geometry.dispose()
        this.mesh.geometry =  this.createGeometry()
    }


    // set
    setAttribute(name, array, itemSize){
        this.mesh.geometry.setAttribute(name, new THREE.BufferAttribute(array, itemSize))
    }


    // get
    get(){
        return this.mesh
    }
    getGeometry(){
        return this.mesh.geometry
    }
    getMaterial(){
        return this.mesh.material
    }
    getAttribute(name){
        return this.mesh.geometry.attributes[name]
    }
}