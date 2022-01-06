import * as THREE from '../../lib/three.module.js'

export default class{
    constructor({width, height, widthSeg, heightSeg, materialOpt}){
        this.width = width
        this.height = height
        this.widthSeg = widthSeg
        this.heightSeg = heightSeg
        this.materialOpt = materialOpt

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        this.createGeometry()
        this.createMaterial()
        this.mesh = new THREE.Mesh(this.geometry, this.material)
    }
    createGeometry(){
        this.geometry = new THREE.PlaneGeometry(this.width, this.height, this.widthSeg, this.heightSeg)
    }
    createMaterial(){
        if(this.materialOpt.vertexShader){
            this.material = new THREE.ShaderMaterial(this.materialOpt)
        }else{
            this.material = new THREE.MeshBasicMaterial(this.materialOpt)
        }
    }


    // dispose
    dispose(){
        
    }


    // set
    setAttribute(name, array, itemSize){
        this.mesh.geometry.setAttribute(name, new THREE.BufferAttribute(array, itemSize))
    }


    // get
    get(){
        return this.mesh
    }
    getAttribute(name){
        return this.mesh.geometry.attributes[name]
    }
}