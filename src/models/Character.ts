
export interface Jauge {
    id: string;
    actuel: number;
    total: number;
}

export interface Attribute {
    id: string;
    base: number;
    skills: Skill[];
}

export interface Skill {
    id: string;
    value: number;
}

export interface Potential {
    id: number;
    level: number;
    type: number;
}

export interface Item {

}

export default interface Character {
    name: string;
    age: number;
    rang: number;
    sex: number;
    size: string;
    weight: string;
    money: number;
    culture: number;
    culte: number;
    concept: number;
    story: string;
    ego: Jauge;
    sporulation: Jauge;
    blessures: Jauge;
    trauma: Jauge;
    attributes: Attribute[];
    potentials: Potential[];
    inventory: Item[];
}