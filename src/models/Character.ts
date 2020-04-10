import { SKILLS, CULTES, CULTURES, CONCEPTS, ATTRIBUTES } from "../constants";
import baseAttributes from '../data/attributes.json';

export interface Attribute {
    id: number;
    name: string;
    base: number;
    skills: Skill[];
    bonusMax?: number;
}

export interface Skill {
    id: number;
    value: number;
    bonusMax?: number;
}

export interface Potential {
    id: number;
    level: number;
    group: number;
}

export interface Item {
    id: number;
    name: string;
    group: number;
    desc: string;
    weight: number;
    tech: number;
    defense?: number;
    degats?: string;
    title?: string;
}

export interface Character {
    _id?: string;
    name: string;
    age: number;
    rang: number;
    sex: number;
    size: number;
    weight: number;
    money: number;
    culture: number;
    culte: number;
    concept: number;
    story: string;
    ego: number;
    sporulation: number;
    blessures: number;
    trauma: number;
    attributes: Attribute[];
    potentials: Potential[];
    inventory: Item[];
    notes: string[];
    belief: string;
    behavior: string;
}