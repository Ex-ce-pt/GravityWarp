export const FRAGMENT_SHADER = `
varying vec2 vUV;
varying mat4 transform;

uniform vec3 BG_COLOR;
uniform vec2 GRID_SIZE;
uniform float LINE_WIDTH;
uniform vec3 LINE_COLOR;
uniform float TIME;
uniform bool ACTION;

struct Sphere {
    vec2 pos;
    float mass;
};

uniform int OBJECTS_COUNT;
const int MAX_OBJECTS_COUNT = 10;
uniform Sphere[MAX_OBJECTS_COUNT] OBJECTS;

// Unsafe, apparently
/*
float moduloFloat(float a, float b) {
    bool negative = a < 0.0;
    float res = abs(a);
    while (res >= b) {
        res -= b;
    }
    return res * (negative ? -1.0 : 1.0);
}
*/

float moduloFloat(float a, float b) {
    return a - float(int(a / b)) * b;
}

float gravity(float distance, float m) {
    if (distance == 0.0) {
        return 0.0;
    }
    return (0.0000001 * m) / (distance * distance);
}

bool grid(vec2 pos, Sphere[MAX_OBJECTS_COUNT] spheres, out vec3 color) {
    
    vec2 gravitationalOffset = vec2(0.0);
    for (int i = 0; i < MAX_OBJECTS_COUNT; i++) {
        if (i >= OBJECTS_COUNT) break;

        vec2 tempPos = pos - spheres[i].pos;
        float distance = length(tempPos);
        vec2 sphereGravityDirection = normalize(tempPos);
		vec2 sphereGravitationalOffset = sphereGravityDirection * gravity(distance, spheres[i].mass);
		if (ACTION) {
			sphereGravitationalOffset *= TIME;
		}
		if (length(sphereGravitationalOffset) > distance) {
			sphereGravitationalOffset = tempPos;
		}
        gravitationalOffset.x += sphereGravitationalOffset.x;
        gravitationalOffset.y += sphereGravitationalOffset.y;
    }

    vec2 cellSize = vec2(1.0 / GRID_SIZE.x, 1.0 / GRID_SIZE.y);
    vec2 moduloPos = vec2(moduloFloat(pos.x + gravitationalOffset.x, cellSize.x), moduloFloat(pos.y + gravitationalOffset.y, cellSize.y));

    bool isHorizontalLine = moduloPos.x <= LINE_WIDTH * 0.5 || moduloPos.x >= cellSize.x - LINE_WIDTH * 0.5;
    bool isVerticalLine = moduloPos.y <= LINE_WIDTH * 0.5 || moduloPos.y >= cellSize.y - LINE_WIDTH * 0.5;

    if (isHorizontalLine || isVerticalLine) {
        color = LINE_COLOR;
        return true;
    } else {
        return false;
    }
    
}

void main() {
    vec2 uv = vUV;
    vec3 color;

    if (!(grid(uv, OBJECTS, color))) {
        color = BG_COLOR;
    }

    gl_FragColor = vec4(color, 1.0);
}
`;

export const VERTEX_SHADER = `
varying vec2 vUV;
varying mat4 transform;

void main() {
    // Taken from THREE js doc page
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    
    vUV = uv;
    transform = modelMatrix;
}
`;
