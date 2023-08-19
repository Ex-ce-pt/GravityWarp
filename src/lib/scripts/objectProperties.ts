import * as THREE from "three"

export type ShaderObjectProperties = {
    pos: THREE.Vector2,
    mass: number
};

export type ThreeObjectProperties = ShaderObjectProperties & {
    radius: number,
    color: THREE.Color
};

export type ObjectProperties = ThreeObjectProperties & {
    name: string
}

export function emptyShaderObjectProperties(count: number): ShaderObjectProperties[] {
    let a = [];
    for (let i = 0; i < count; i++) a.push({ pos: new THREE.Vector2(), mass: 0 });
    return a;
}
