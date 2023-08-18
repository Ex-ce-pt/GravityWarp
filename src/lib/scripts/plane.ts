import * as THREE from "three"

export interface Plane {
    geometry: THREE.PlaneGeometry,
    material: THREE.ShaderMaterial | THREE.MeshBasicMaterial,
    mesh: THREE.Mesh
}

export function createPlane(): Plane {
    let geometry = new THREE.PlaneGeometry(100, 100);
    let material = new THREE.MeshBasicMaterial({ color: 0xffffffff });
    let mesh = new THREE.Mesh(geometry, material);

    return { geometry, material, mesh };
}
