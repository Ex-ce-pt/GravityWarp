import * as THREE from "three"
import { FRAGMENT_SHADER, VERTEX_SHADER } from "./shaders";
import { emptyShaderObjectProperties } from "./objectProperties";

export interface Plane {
    geometry: THREE.PlaneGeometry,
    material: THREE.ShaderMaterial | THREE.MeshBasicMaterial,
    mesh: THREE.Mesh
}

export function createPlane(): Plane {
    let geometry = new THREE.PlaneGeometry(500, 500);

    // Testing purpose
    // let material = new THREE.MeshBasicMaterial({ color: 0xffffffff });
    
    let material = new THREE.ShaderMaterial({ fragmentShader: FRAGMENT_SHADER, vertexShader: VERTEX_SHADER });
    material.uniforms = {
        'BG_COLOR': { value: new THREE.Vector3(0.1, 0.1, 0.1) },
        'GRID_SIZE': { value: new THREE.Vector2(10, 10) },
        'LINE_WIDTH': { value: 0.005 },
        'LINE_COLOR': { value: new THREE.Vector3(1, 1, 1) },
        'TIME': { value: 0 },
        'ACTION': { value: false },

        'OBJECTS_COUNT': { value: 1 },
        'OBJECTS': { value: [{ pos: new THREE.Vector2(0.5, 0.5), mass: 10000 }, ...emptyShaderObjectProperties(9)] }
    };

    let mesh = new THREE.Mesh(geometry, material);

    return { geometry, material, mesh };
}
