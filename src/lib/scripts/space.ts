import * as THREE from "three"

let canvas: HTMLCanvasElement;

let camera: THREE.OrthographicCamera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;

let object: any = {};

function sizeIntoOrthCameraBounds(width: number, height: number): [number, number, number, number] {
    return [width / -2, width / 2, height / 2, height / -2];
}

function onRender(): void {
    renderer.render(scene, camera);
}

export function initSpace(c: HTMLCanvasElement): void {

    canvas = c;

    scene = new THREE.Scene();

    camera = new THREE.OrthographicCamera();
    camera.near = 1;
    camera.far = 10_000;
    camera.position.z = 1000;
    scene.add(camera);
    
    object.geometry = new THREE.BoxGeometry(100, 100, 100);
    object.material = new THREE.MeshBasicMaterial({
        color: new THREE.Color('white'),
        wireframe: true
    });

    object.mesh = new THREE.Mesh(object.geometry, object.material);
    scene.add(object.mesh);

    renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setAnimationLoop(onRender);
    
}

export function resize(width: number, height: number): void {

    if (canvas == undefined) {
        console.error("Canvas is undefined. Try calling `initSpace` first.");
        return;
    }

    [camera.left, camera.right, camera.top, camera.bottom] = sizeIntoOrthCameraBounds(width, height);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

}
