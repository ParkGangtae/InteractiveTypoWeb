import * as THREE from "../node_modules/three/build/three.module.js";
import gsap from "https://cdn.skypack.dev/gsap";

import { OrbitControls } from "../node_modules/three/build/OrbitControls.js";
import { FontLoader } from "../node_modules/three/build/FontLoader.js";
import { TextGeometry } from "../node_modules/three/build/TextGeometry.js";

class App {
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        //Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        //Scene1
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x101010);
        this._scene = scene;

        this.textMesh = null;
        this.text_index = 0;
        this.particles = new THREE.Object3D();
        this.particles2 = new THREE.Object3D();

        this.countryList = [
            "../korean.html",
            "../english.html",
            "China",
            "Japan",
            "Saudi",
            "Austrailia",
            "Brazil",
            "EUROPE",
        ];

        this._setupCamera();
        this._setupLight();
        this._setupModel_sphere();
        this._setupStars_sphere();
        this._setupBackground_particles();
        this._setupControls();
        this._setupText();

        //Button
        const changeSceneBtn = document.getElementById("changeSceneBtn");
        changeSceneBtn.addEventListener("click", () => {
            const cx = this._camera.position.x;
            const cy = this._camera.position.y;
            const cz = this._camera.position.z;

            gsap.to(this._camera.position, {
                duration: 1,
                x: (2.715 * cx) / Math.abs(cx),
                y: (2.715 * cx) / Math.abs(cx),
                z: (2.715 * cx) / Math.abs(cx),
                onUpdate: () => {
                    this._camera.lookAt(0, 0, 0);
                    this.light.position.copy(this._camera.position);
                },
                onComplete: () => {
                    gsap.to(this._camera.position, {
                        duration: 0.85,
                        x: -2.715,
                        y: 2.715,
                        z: -2.715,
                        onComplete: () => {
                            gsap.to(this._scene.background, {
                                duration: 1,
                                r: 0xec / 255,
                                g: 0xec / 255,
                                b: 0xec / 255,
                                onComplete: () => {
                                    setTimeout(() => {
                                        window.location.href =
                                            this.countryList[this.countryindex];
                                    }, 1000);
                                },
                            });
                        },
                    });
                },
            });
        });

        window.onresize = this.resize.bind(this);
        this.resize();

        //축 생성
        // const axes = new THREE.AxesHelper(3);
        // scene.add(axes);
        ///////

        this._renderer.render(this._scene, this._camera);
        requestAnimationFrame(this.render.bind(this));
    }

    _setupCamera() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        camera.position.set(-1.48, 1.85, -1.85);
        this._camera = camera;
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 3;
        this.light = new THREE.DirectionalLight(color, intensity);

        const cameraPosition = new THREE.Vector3();
        this._camera.getWorldPosition(cameraPosition);
        this.light.position.copy(cameraPosition);
        this._scene.add(this.light);
    }

    _setupModel_sphere() {
        const radius = 1;
        const widthSegments = 32;
        const heightSegments = 32;

        const sphereGeometry = new THREE.SphereGeometry(
            radius,
            widthSegments,
            heightSegments
        );

        const textureLoader = new THREE.TextureLoader();
        const earthTexture = textureLoader.load(
            "../src/images/earth_texture_10k.jpg"
        );
        const earthMaterial = new THREE.MeshBasicMaterial({
            map: earthTexture,
        });

        const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
        earthMesh.position.set(0, 0, 0);
        earthMesh.scale.set(1, 1, 1);
        this._scene.add(earthMesh);
        this._earth = earthMesh;
    }

    _setupStars_sphere() {
        var geom = new THREE.IcosahedronGeometry(1.3, 2);
        var material = new THREE.MeshPhongMaterial({
            color: 0xececec,
            wireframe: true,
        });
        var planet = new THREE.Mesh(geom, material);
        this._scene.add(planet);
        this._planet = planet;
    }

    _setupBackground_particles() {
        var geom = new THREE.SphereGeometry(0.02);
        var material = new THREE.MeshLambertMaterial({
            visible: true,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide,
            color: 0xffffff,
            emissive: 0xffff00,
        });
        for (var i = 0; i < 100; i++) {
            var mesh = new THREE.Mesh(geom, material);
            mesh.position
                .set(
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                    Math.random() - 0.5
                )
                .normalize();
            mesh.position.multiplyScalar(0 + Math.random() * 10);
            mesh.rotation.set(
                Math.random() * 2,
                Math.random() * 2,
                Math.random() * 2
            );
            this.particles.add(mesh);
        }
        for (var j = 0; j < 100; j++) {
            var mesh2 = new THREE.Mesh(geom, material);
            mesh2.position
                .set(
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                    Math.random() - 0.5
                )
                .normalize();
            mesh2.position.multiplyScalar(0 + Math.random() * 10);
            mesh2.rotation.set(
                Math.random() * 2,
                Math.random() * 2,
                Math.random() * 2
            );
            this.particles2.add(mesh2);
        }

        this._scene.add(this.particles);
        this._scene.add(this.particles2);
    }

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }

    _setupControls() {
        this.countryindex = null;

        const countryVector = [
            new THREE.Vector3(-0.492366, 0.615457, -0.615457), //KOR
            new THREE.Vector3(0.0786154, 0.480427, 0.873504), //USA
            new THREE.Vector3(-0.4159, 0.467888, -0.779813), //CHI
            new THREE.Vector3(-0.649227, 0.584305, -0.486921), //JAP
            new THREE.Vector3(0.613572, 0.383482, -0.690268), //SAU
            new THREE.Vector3(-0.57735, -0.57735, -0.57735), //AUS
            new THREE.Vector3(0.459213, -0.267503, 0.847092), //LATIN
            new THREE.Vector3(0.810972, 0.582886, -0.0506857), //EUROPE
        ];

        const controls = new OrbitControls(
            this._camera,
            this._renderer.domElement
        );
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.maxPolarAngle = Math.PI;
        controls.enableZoom = false;
        // controls.enablePan = false;

        controls.addEventListener("change", () => {
            //조명 위치 조절
            const cameraPosition = new THREE.Vector3();
            this._camera.getWorldPosition(cameraPosition);
            this.light.position.copy(cameraPosition);
        });

        controls.domElement.addEventListener("mouseup", () => {
            const cameraPosition = new THREE.Vector3();
            this._camera.getWorldPosition(cameraPosition);

            //camera 좌표에 따라 text_index 조정
            let maxDotProduct = -1;
            let maxIndex = -1;
            for (let i = 0; i < countryVector.length; i++) {
                const dotProduct = cameraPosition.dot(countryVector[i]);
                if (maxDotProduct < dotProduct) {
                    maxDotProduct = dotProduct;
                    maxIndex = i;
                    this.countryindex = i;
                }
            }
            this.text_index = maxIndex;

            this.updateText();
        });
    }

    _setupText() {
        const loader = new FontLoader();
        loader.load(
            "../src/font/nanumsquare.json",
            (font) => {
                const geometry = new TextGeometry("환영합니다", {
                    font: font,
                    size: 2.7,
                    height: 0.01,
                    curveSegments: 12,
                });

                geometry.computeBoundingBox();
                const xMid =
                    -0.5 *
                    (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
                geometry.translate(xMid, 0, -2);

                const textmaterial = new THREE.MeshPhongMaterial({
                    color: 0xececec,
                });

                const textMesh = new THREE.Mesh(geometry, textmaterial);
                textMesh.lookAt(this._camera.position);

                this._scene.add(textMesh);
                this.textMesh = textMesh;

                this._renderer.render(this._scene, this._camera);
                requestAnimationFrame(this.render.bind(this));
            },
            function (xhr) {
                // console.log((xhr.loaded/xhr.total * 100) + '%loaded');
            },
            function (err) {
                console.log("An error happend");
            }
        );
    }

    updateText() {
        const fontList = ["nanumsquare.json", "chinese.json", "arabic.json"];
        const fontIndex = [0, 0, 1, 0, 2, 0, 0, 0];
        const textList = [
            "환영합니다",
            "WELCOME",
            "欢迎光临",
            "ようこそ",
            "السلام عليكم",
            "WELCOME",
            "HOLA",
            "Bienvenidos",
        ];
        const fontsizeList = [2.7, 2.5, 2.9, 2.8, 1.5, 2.5, 2.9, 1.9];

        const loader = new FontLoader();
        loader.load(
            "../src/font/" + fontList[fontIndex[this.text_index]],
            (font) => {
                this.textMesh.geometry.dispose();
                this.textMesh.geometry = new TextGeometry(
                    textList[this.text_index],
                    {
                        font: font,
                        size: fontsizeList[this.text_index],
                        height: 0.01,
                        curveSegments: 12,
                    }
                );

                const geometry = this.textMesh.geometry;
                geometry.computeBoundingBox();
                const xMid =
                    -0.5 *
                    (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
                geometry.translate(xMid, 0, -2);

                this.textMesh.material.color.setHex(0xececec);
                this.textMesh.lookAt(this._camera.position);

                this.render();
            },
            function (xhr) {
                // console.log((xhr.loaded/xhr.total * 100) + '%loaded');
            },
            function (err) {
                console.log("An error happend");
            }
        );
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }

    update(time) {
        time *= 0.0001;
        this._planet.rotation.x = time;
        this._planet.rotation.y = -1.4 * time;
        this.particles.rotation.y = 0.5 * time;
        this.particles2.rotation.y = -0.3 * time;

        const cameraDirection = new THREE.Vector3();
        this._camera.getWorldDirection(cameraDirection);

        const distanceToCamera = 1;
        const textPosition = cameraDirection
            .clone()
            .multiplyScalar(distanceToCamera);

        if (this.textMesh) {
            this.textMesh.position.copy(textPosition);
            this.textMesh.lookAt(this._camera.position);
        }
    }
}

window.onload = function () {
    new App();
};
