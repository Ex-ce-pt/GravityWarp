import * as THREE from "three"

export class ObjectProperties {

    mesh;
    name;
    mass; // ISSUE: constrain the mass

    constructor() {
        this.mass = 1;
        this.name = "Object";
        this.mesh = new THREE.Mesh(new THREE.CircleGeometry(), new THREE.MeshBasicMaterial());
    }

    set pos(p: THREE.Vector3) {
        this.mesh.position.copy(p);
    }

    get pos() {
        return this.mesh.position;
    }

    set radius(r: number) {
        this.mesh.scale.set(r, r, 0.1);
    }

    get radius(): number {
        return this.mesh.scale.x;
    }

    set color(c: THREE.Color) {
        this.mesh.material.color = c;
    }

    get color(): THREE.Color {
        return this.mesh.material.color;
    }

};

export function emptyShaderObjectProperties(count: number): { pos: THREE.Vector2, mass: number }[] {
    let a = [];
    for (let i = 0; i < count; i++) a.push({ pos: new THREE.Vector2(), mass: 0 });
    return a;
}
