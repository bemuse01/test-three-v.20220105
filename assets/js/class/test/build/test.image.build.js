import * as THREE from '../../../lib/three.module.js'
import Plane from '../../objects/plane.js'
// import PrefabObject from '../../objects/prefab.js'
import PlaneObject from '../../objects/planeObject.js'
import Method from '../method/test.image.method.js'
import Shader from '../shader/test.image.shader.js'

export default class{
    constructor({group, size}){
        this.size = size

        this.param = {
            width: 1920,
            height: 1080,
            ratio: 16 / 9,
            rd: 1
        }

        this.src = './assets/src/1.jpg'

        this.init(group)
    }

    
    // init
    init(group){
        this.create(group)
    }


    // create
    create(group){
        const width = this.size.obj.w
        const height = this.size.obj.h
        const widthSeg = ~~(width / 10)
        const heightSeg = ~~(height / 10)



        // test 1
        // const plane = new THREE.PlaneGeometry(width, height, widthSeg, heightSeg)

        // const planePos = plane.attributes.position
        // const planePosArr = planePos.array

        // const planeIndex = plane.index
        // // const planeIndexCnt = planeIndex.count
        // const planeIndexCnt = 100 * 3
        // // an item of plane index array is point not coordinate(x, y, z)
        // const planeIndexArr = planeIndex.array

        // const geometry = new THREE.BufferGeometry()
        // const position = new Float32Array(3 * planeIndexCnt)

        // for(let i = 0; i < planeIndexCnt; i++){
        //     const idx = planeIndexArr[i]
        //     const index = idx * 3
        //     position[i * 3] = planePosArr[index]
        //     position[i * 3 + 1] = planePosArr[index + 1]
        //     position[i * 3 + 2] = planePosArr[index + 2]
        // }

        // geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))

        // group.add(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial()))

        // const prefab = 
        // this.object = new PrefabObject({
        //     prefab,
        //     count,
        //     materialOpt: {
                
        //     }
        // })



        // test 2
        // const loader = new THREE.TextureLoader()

        // loader.load('./assets/src/1.jpg', texture => this.onLoadTexture({width, height, widthSeg, heightSeg, texture, group}))



        // test 3
        const img = new Image()
        img.src = this.src

        img.onload = () => {
            const canvas = Method.createTextureFromCanvas({img, size: this.size.el})
            const texture = new THREE.CanvasTexture(canvas)

            this.object = new PlaneObject({
                width, height, widthSeg, heightSeg,
                materialOpt: {
                    vertexShader: Shader.vertex,
                    fragmentShader: Shader.fragment,
                    transparent: true,
                    uniforms: {
                        uTexture: {value: texture},
                        uResolution: {value: new THREE.Vector2(this.size.el.w, this.size.el.h)}
                    }
                }
            })

            const {uv} = Method.createAttribute({width, height})
            // const uv = this.object.uv.array

            this.object.setAttribute('aUv', uv, 2)

            group.add(this.object.get())
        }
    }
    onLoadTexture({width, height, widthSeg, heightSeg, texture, group}){
        // const planeAspect = width / height
        // const imageAspect = texture.image.width / texture.image.height
        // const aspect = imageAspect / planeAspect
  
        // texture.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0
        // texture.repeat.x = aspect > 1 ? 1 / aspect : 1
  
        // texture.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2
        // texture.repeat.y = aspect > 1 ? 1 : aspect

        texture.wrapS = THREE.ClampToEdgeWrapping
        texture.wrapT = THREE.RepeatWrapping

        console.log(texture.image.width, texture.image.height)
        console.log(width, height)
        console.log(this.size.el.w, this.size.el.h)

        this.object = new PlaneObject({
            width, height, widthSeg, heightSeg,
            materialOpt: {
                vertexShader: Shader.vertex,
                fragmentShader: Shader.fragment,
                transparent: true,
                uniforms: {
                    uTexture: {value: texture},
                    uResolution: {value: new THREE.Vector2(this.size.el.w, this.size.el.h)}
                }
            }
        })

        // const {uv} = Method.createAttribute({width, height})

        // this.object.setAttribute('aUv', uv, 2)

        group.add(this.object.get())
    }


    // resize
    resize(size){
        this.size = size

        const width = this.size.obj.w
        const height = this.size.obj.h
        const widthSeg = ~~(width / 10)
        const heightSeg = ~~(height / 10)

        this.object.resize({width, height, widthSeg, heightSeg})

        this.resizeTexture()
    }
    resizeTexture(){
        const img = new Image()
        img.src = this.src

        img.onload = () => {
            const canvas = Method.createTextureFromCanvas({img, size: this.size.el})
            const texture = new THREE.CanvasTexture(canvas)

            this.object.getMaterial().uniforms['uTexture'].value = texture
            this.object.getMaterial().uniforms['uResolution'].value = new THREE.Vector2(this.size.el.w, this.size.el.h)
        }
    }
}