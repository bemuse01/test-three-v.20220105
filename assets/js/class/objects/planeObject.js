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
        this.index = plane.index

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        
    }
    createGeometry(){
        this.geometry = new THREE.BufferGeometry()

        const indexArr = this.index.array
        const indexCnt = this.index.count

        const positions = []
        const normals = []

        const pA = new THREE.Vector3()
        const pB = new THREE.Vector3()
        const pC = new THREE.Vector3()

        const cb = new THREE.Vector3()
        const ab = new THREE.Vector3()

        for(let i = 0; i < indexCnt; i++){
            // positions
            const idx = i * 3

            const x = Math.random() * n - n2
            const y = Math.random() * n - n2
            const z = Math.random() * n - n2

            const ax = x + Math.random() * d - d2
            const ay = y + Math.random() * d - d2
            const az = z + Math.random() * d - d2

            const bx = x + Math.random() * d - d2
            const by = y + Math.random() * d - d2
            const bz = z + Math.random() * d - d2

            const cx = x + Math.random() * d - d2
            const cy = y + Math.random() * d - d2
            const cz = z + Math.random() * d - d2

            positions.push( ax, ay, az )
            positions.push( bx, by, bz )
            positions.push( cx, cy, cz )

            // flat face normals

            pA.set( ax, ay, az )
            pB.set( bx, by, bz )
            pC.set( cx, cy, cz )

            cb.subVectors( pC, pB )
            ab.subVectors( pA, pB )
            cb.cross( ab )

            cb.normalize()

            const nx = cb.x
            const ny = cb.y
            const nz = cb.z

            normals.push( nx, ny, nz )
            normals.push( nx, ny, nz )
            normals.push( nx, ny, nz )
        }

        // geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ).onUpload( disposeArray ) );
        // geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ).onUpload( disposeArray ) );
    }
}