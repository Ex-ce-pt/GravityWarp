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

    camera = new THREE.OrthographicCamera(...sizeIntoOrthCameraBounds(canvas.width, canvas.height), 1, 10000);
    camera.position.z = 1000;
    camera.matrixAutoUpdate = true;
    scene.add(camera);
    
    object.geometry = new THREE.BoxGeometry(100, 100, 100);
    object.material = new THREE.MeshBasicMaterial({
        color: new THREE.Color('white'),
        wireframe: true
    });

    object.mesh = new THREE.Mesh(object.geometry, object.material);
    scene.add(object.mesh);

    renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.width, canvas.height);
    renderer.setAnimationLoop(onRender);

}
