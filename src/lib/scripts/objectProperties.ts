export interface ObjectProperties {
    name: string,
    position: {
        x: number,
        y : number
    },
    mass: number,
    radius: number
}

export type ObjectRenderProperties = Omit<ObjectProperties, 'name'>;

// TODO: add THREE object type
