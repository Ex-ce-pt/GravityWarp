import * as THREE from "three"
import { type Plane, createPlane } from "./plane"
import { ObjectProperties } from "./objectProperties";

let canvas: HTMLCanvasElement;

let camera: THREE.OrthographicCamera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;

let plane: Plane;

// ISSUE: the range of the value is not restricted
let zoomCoefficient: number = 1;

export const MIN_ZOOM = 0.1;
export const MAX_ZOOM = 3;

export const objects: ObjectProperties[] = [];

export function createObject() {
    const newObj = new ObjectProperties();
    newObj.radius = 100;
    objects.push(newObj);
    scene.add(newObj.mesh);
    updateObjects();
}

export function updateObjects() {
    
}

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

    plane = createPlane();
    scene.add(plane.mesh);

    renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setAnimationLoop(onRender);
    
}

export function resize(width: number, height: number): void {

    if (canvas == undefined) {
        console.error("Canvas is undefined. Try calling `initSpace` first.");
        return;
    }

    // The size needs to be divided by the zoom coefficient, not multiplied.
    // The logic is that the zoom coefficient's value should reflect the zoom percentage.
    // e.g. 1.5 = 150%
    // The zoom percentage is inversely proportional to the camera size.
    // (obvious?)
    [camera.left, camera.right, camera.top, camera.bottom] = sizeIntoOrthCameraBounds(width / zoomCoefficient, height / zoomCoefficient);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

}

export function setZoom(c: number): void {
    zoomCoefficient = Math.min(Math.max(c, MIN_ZOOM), MAX_ZOOM);
    resize(canvas.width, canvas.height);
}

export function setCameraPos(pos: { x: number, y: number }): void {
    camera.position.setX(pos.x);
    camera.position.setY(pos.y);
}

export function getCameraPos(): THREE.Vector3 {
    if (camera === undefined) {
        console.error("The space is not initialized. Try calling `initSpace` first.");
        return new THREE.Vector3(); // TODO: figure something out, exception?
    }

    return camera.position;
}
