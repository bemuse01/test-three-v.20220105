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
            scale: 0.5,
            div: 4,
            defaultDuration: 1.5,
            defaultDelay: 1.2,
            randomDelay: 0.8,
            maxDelayX: 0.9,
            maxDelayY: 0.125,
            stretch: 0.11
        }

        this.width = ~~(this.size.obj.w * this.param.scale)
        this.height = ~~(this.size.obj.h * this.param.scale)
        this.widthSeg = ~~(this.width / this.param.div)
        this.heightSeg = ~~(this.height / this.param.div)

        console.log(this.widthSeg, this.heightSeg)

        this.src = './assets/src/1.jpg'

        this.init(group)
    }

    
    // init
    init(group){
        this.create(group)
    }


    // create
    create(group){

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
            const canvas = Method.createTextureFromCanvas({img, size: this.size.el, ...this.param})
            const texture = new THREE.CanvasTexture(canvas)

            this.object = new PlaneObject({
                width: this.width, 
                height: this.height, 
                widthSeg: this.widthSeg, 
                heightSeg: this.heightSeg,
                materialOpt: {
                    vertexShader: Shader.vertex,
                    fragmentShader: Shader.fragment,
                    transparent: true,
                    uniforms: {
                        uTexture: {value: texture},
                        uResolution: {value: new THREE.Vector2(this.size.el.w, this.size.el.h)},
                        uRatio: {value: 0.5},
                        uTime: {value: null}
                    }
                }
            })

            const position = this.object.getAttribute('position')

            const {startPosition, endPosition, control0, control1, duration, delay} = Method.createAnimAttribute({
                position, 
                width: this.width, 
                height: this.height, 
                widthSeg: this.widthSeg, 
                heightSeg: this.heightSeg, 
                ...this.param
            })

            this.object.setAttribute('aStartPosition', new Float32Array(startPosition), 3)
            this.object.setAttribute('aEndPosition', new Float32Array(endPosition), 3)
            this.object.setAttribute('aControl0', new Float32Array(control0), 3)
            this.object.setAttribute('aControl1', new Float32Array(control1), 3)
            this.object.setAttribute('aDuration', new Float32Array(duration), 1)
            this.object.setAttribute('aDelay', new Float32Array(delay), 1)

            // const {uv} = Method.createAttribute({width: this.size.el.w * this.param.scale, height: this.size.el.h * this.param.scale})
            // const uv = this.object.uv.array

            // this.object.setAttribute('uv', uv, 2)

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

        this.object = new PlaneObject({
            width, height, widthSeg, heightSeg,
            materialOpt: {
                vertexShader: Shader.vertex,
                fragmentShader: Shader.fragment,
                transparent: true,
                side: THREE.DoubleSide,
                uniforms: {
                    uTexture: {value: texture},
                    uResolution: {value: new THREE.Vector2(this.size.el.w, this.size.el.h)},
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
        
        this.width = ~~(this.size.obj.w * this.param.scale)
        this.height = ~~(this.size.obj.h * this.param.scale)
        this.widthSeg = ~~(this.width / this.param.div)
        this.heightSeg = ~~(this.height / this.param.div)

        this.object.resize({width: this.width, height: this.height, widthSeg: this.widthSeg, heightSeg: this.heightSeg})

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

    
    // animate
    animate(){
        if(!this.object) return 

        this.object.getMaterial().uniforms['uTime'].value += 1 / 60

        this.object.getMaterial().uniforms['uTime'].value %= (this.param.defaultDuration + this.param.defaultDelay + this.param.randomDelay + 1)
    }
}