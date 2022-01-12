import * as THREE from '../../../lib/three.module.js'
import Plane from '../../objects/plane.js'
// import PrefabObject from '../../objects/prefab.js'
import PlaneObject from '../../objects/planeObject.js'
import Method from '../method/test.image.method.js'
import Shader from '../shader/test.image.shader.js'

export default class{
    constructor({group, size}){
        this.size = size

        console.log(this.size.obj)

        this.param = {
            scale: 0.5,
            div: 3,
            defaultDuration: 1.5,
            defaultDelay: 1.2,
            randomDelay: 0.8,
            maxDelayX: 0.9,
            maxDelayY: 0.125,
            stretch: 0.11,
            xRange: 50,
            yRange: 70,
            zRange: 20,
            width: 192,
            height: 108,
            z: 0.1
        }

        this.width = ~~(this.param.width * this.param.scale)
        this.height = ~~(this.param.height * this.param.scale)
        this.widthSeg = ~~(this.width * this.param.div)
        this.heightSeg = ~~(this.height * this.param.div)

        const rw = this.width / this.size.obj.w
        const rh = this.height / this.size.obj.h

        this.textureWidth = rw * this.size.el.w
        this.textureHeight = rh * this.size.el.h

        this.src = './assets/src/1.jpg'
        this.idx = 0
        this.data = [
            // {
            //     src: './assets/src/3.jpg',
            //     phase: IN
            // },
            {
                src: './assets/src/1.jpg',
                phase: OUT,
                z: this.param.z,
            },
            {
                src: './assets/src/2.jpg',
                phase: IN,
                z: 0
            }
        ]
        this.objects = []
        this.slideTime = this.param.defaultDuration + this.param.defaultDelay + this.param.randomDelay + 1

        this.tweens = []

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



        // test 3
        // const img = new Image()
        // img.src = this.src

        // img.onload = () => {
        //     const canvas = Method.createTextureFromCanvas({img, size: this.size.el, ...this.param})
        //     const texture = new THREE.CanvasTexture(canvas)

        //     this.object = new PlaneObject({
        //         width: this.width, 
        //         height: this.height, 
        //         widthSeg: this.widthSeg, 
        //         heightSeg: this.heightSeg,
        //         materialOpt: {
        //             vertexShader: Shader.vertex,
        //             fragmentShader: Shader.fragment,
        //             transparent: true,
        //             uniforms: {
        //                 uTexture: {value: texture},
        //                 uResolution: {value: new THREE.Vector2(this.size.el.w, this.size.el.h)},
        //                 uRatio: {value: 0.5},
        //                 uTime: {value: null},
        //                 uPhase: {value: OUT},
        //             }
        //         }
        //     })

        //     const position = this.object.getAttribute('position')

        //     const {startPosition, endPosition, control0, control1, duration, delay} = Method.createAnimAttribute({
        //         position, 
        //         width: this.width, 
        //         height: this.height, 
        //         widthSeg: this.widthSeg, 
        //         heightSeg: this.heightSeg, 
        //         ...this.param,
        //         phase: OUT
        //     })

        //     this.object.setAttribute('aStartPosition', new Float32Array(startPosition), 3)
        //     this.object.setAttribute('aEndPosition', new Float32Array(endPosition), 3)
        //     this.object.setAttribute('aControl0', new Float32Array(control0), 3)
        //     this.object.setAttribute('aControl1', new Float32Array(control1), 3)
        //     this.object.setAttribute('aDuration', new Float32Array(duration), 1)
        //     this.object.setAttribute('aDelay', new Float32Array(delay), 1)

        //     group.add(this.object.get())
        // }



        // test 4
        this.data.forEach(({src, phase, z}, idx) => {

            const positionGroup = new THREE.Group()
            
            const img = new Image()
            img.src = src

            img.onload = () => {
                const canvas = Method.createTextureFromCanvas({img, size: {w: this.textureWidth, h: this.textureHeight}, ...this.param})
                const texture = new THREE.CanvasTexture(canvas)
    
                const object = new PlaneObject({
                    width: this.width, 
                    height: this.height, 
                    widthSeg: this.widthSeg, 
                    heightSeg: this.heightSeg,
                    // blending: THREE.AdditiveBlending,
                    // side: THREE.DoubleSide,
                    materialOpt: {
                        vertexShader: Shader.vertex,
                        fragmentShader: Shader.fragment,
                        transparent: true,
                        uniforms: {
                            uTexture: {value: texture},
                            uTime: {value: null},
                            uPhase: {value: phase},
                            uOpacity: {value: 1}
                        }
                    }
                })
    
                const position = object.getAttribute('position')
    
                const {startPosition, endPosition, control0, control1, duration, delay} = Method.createAnimAttribute({
                    position, 
                    width: this.width, 
                    height: this.height, 
                    widthSeg: this.widthSeg, 
                    heightSeg: this.heightSeg, 
                    ...this.param,
                    phase
                })
    
                object.setAttribute('aStartPosition', new Float32Array(startPosition), 3)
                object.setAttribute('aEndPosition', new Float32Array(endPosition), 3)
                object.setAttribute('aControl0', new Float32Array(control0), 3)
                object.setAttribute('aControl1', new Float32Array(control1), 3)
                object.setAttribute('aDuration', new Float32Array(duration), 1)
                object.setAttribute('aDelay', new Float32Array(delay), 1)

                positionGroup.add(object.get())

                positionGroup.position.set(0, 0, z)

                group.add(positionGroup)

                this.objects.push(object)

                this.createTween(object, phase, z, positionGroup)

                if(idx === this.data.length - 1){
                    this.startTween()
                }
            }

        })


        // const texture = new THREE.TextureLoader().load(this.src)
        // const geometry = new THREE.PlaneGeometry(92, 54, 1, 1)

        // group.add(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        //     map: texture,
        //     transparent: true
        // })))

        // console.log(geometry)
    }


    // tween
    createTween(object, phase, z, group){
        const start = {time: 0, opacity: 1 - phase, z: z}
        const end = {time: this.slideTime, opacity: phase, z: this.param.z - z}
        const uniforms = object.getMaterial().uniforms

        const tw = new TWEEN.Tween(start)
        .to(end, 6000)
        .onUpdate(() => this.updateTween(start, uniforms, group))
        .easing(TWEEN.Easing.Quadratic.InOut)
        .repeat(Infinity)
        .repeatDelay(1000)
        .yoyo(true)

        this.tweens.push(tw)

    }
    startTween(){
        this.tweens.forEach(tween => tween.start())
    }
    updateTween({time, opacity, z}, {uTime, uOpacity}, group){
        uTime.value = time
        // uOpacity.value = opacity
        group.position.z = z
    }


    // resize
    // resize(size){
    //     this.size = size
        
    //     this.width = ~~(this.param.width * this.param.scale)
    //     this.height = ~~(this.param.height * this.param.scale)
    //     this.widthSeg = ~~(this.width * 6)
    //     this.heightSeg = ~~(this.height * 6)

    //     this.object.resize({width: this.width, height: this.height, widthSeg: this.widthSeg, heightSeg: this.heightSeg})

    //     this.resizeTexture()
    // }
    // resizeTexture(){
    //     const img = new Image()
    //     img.src = this.src

    //     img.onload = () => {
    //         const canvas = Method.createTextureFromCanvas({img, size: this.size.el})
    //         const texture = new THREE.CanvasTexture(canvas)

    //         this.object.getMaterial().uniforms['uTexture'].value = texture
    //         this.object.getMaterial().uniforms['uResolution'].value = new THREE.Vector2(this.size.el.w, this.size.el.h)
    //     }
    // }

    
    // animate
    // animate(){
    //     // if(!this.object) return 

    //     // this.object.getMaterial().uniforms['uTime'].value += 1 / 60

    //     // this.object.getMaterial().uniforms['uTime'].value %= this.slideTime


    //     if(this.objects.length !== this.data.length) return

    //     const current = this.idx
    //     // const next = (this.idx - 1) < 0 ? this.objects.length - 1 : this.idx - 1
    //     // const next = (this.idx + 1) % this.objects.length

    //     this.objects[current].getMaterial().uniforms['uTime'].value += 1 / 60
    //     // this.objects[next].getMaterial().uniforms['uTime'].value += 1 / 60

    //     if(this.objects[current].getUniform('uTime') >= this.slideTime){
    //         // this.objects[current].setUniform('uPhase', IN)
    //         this.objects[current].setUniform('uTime', 0)

    //         // this.objects[next].setUniform('uPhase', OUT)
    //         // this.objects[next].setUniform('uTime', 0)

    //         // this.idx = next
    //     }
    // }
}