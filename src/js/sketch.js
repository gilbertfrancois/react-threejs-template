import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import fragment from "../shader/fragment.glsl";
import vertex from "../shader/vertex.glsl";

export class Sketch {
    constructor(options) {
        this.destroyed = false;
        this.sliderValue = 0;
        this.scene = new THREE.Scene();
        this.container = options.dom;
        console.log(this.container);
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0xeeeeee, 1);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.test_settings = undefined;

        this.container.appendChild(this.renderer.domElement);

        // Setup Camera
        this.camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.001,
            1000,
        );
        // const frustumSize = 10;
        // const aspect = window.innerWidth / window.innerHeight;
        // this.camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -1000, 1000 );
        this.camera.position.set(0, 0, 2);

        // Setup controls
        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement,
        );

        this.isPlaying = false;

        this.addObjects();
        this.resize();
        this.render();
        this.resize_bound = this.resize.bind(this);
        this.setupResize();

        // Enable the GUI element if you want to change values quickly during
        // development and testing.
        //
        // this.gui = new GUI();
        // this.setupTestSettings();
    }

    // setupTestSettings() {
    //     this.test_settings = {
    //         val1: 0,
    //     };
    //     this.gui.add(this.test_settings, "val1", 0, 1, 0.01);
    // }

    setupResize() {
        window.addEventListener("resize", this.resize_bound);
    }

    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
    }

    addObjects() {
        this.material = new THREE.ShaderMaterial({
            extensions: {
                derivatives: "#extension GL_OES_standard_derivatives : enable",
            },
            side: THREE.DoubleSide,
            uniforms: {
                time: { type: "f", value: 0 },
                resolution: { type: "v4", value: new THREE.Vector4() },
                uvRate1: {
                    value: new THREE.Vector2(1, 1),
                },
            },
            // wireframe: true,
            // transparent: true,
            vertexShader: vertex,
            fragmentShader: fragment,
        });

        this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
    }

    stop() {
        this.isPlaying = false;
    }

    play() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.render();
        }
    }

    render() {
        if (!this.isPlaying) return;
        this.plane.rotation.y += this.sliderValue / 1000;
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
    }

    setSliderValue(value) {
        this.sliderValue = value;
    }

    destroy() {
        this.renderer.dispose();
        this.camera = undefined;
        window.removeEventListener("resize", this.resize_bound);
        this.destroyed = true;
    }
}
