export interface Attribute {
    id: number;
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
    type: number;
}

export interface Item {
    name: string;
    type: number;
    desc: string;
    weight: number;
    tech: number;
    defense?: number;
    degats?: string;
    title?: string;
}

export interface Note {
    date: string;
    text: string;
}

export interface ICharacter {
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
    notes: Note[];
    belief: string;
    behavior: string;
}

export default class Character implements ICharacter {
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
    notes: Note[];
    belief: string;
    behavior: string;

    public constructor(data: any = {}) {
        const { name, age, ego, sporulation, trauma, blessures, rang, sex, size, weight, money, culte, culture, concept, story, belief, behavior, attributes, potentials, inventory, notes } = data;
        this.name = name || '';
        this.age = age;
        this.rang = rang;
        this.sex = sex;
        this.size = size;
        this.weight = weight;
        this.money = money;
        this.culte = culte;
        this.culture = culture;
        this.concept = concept;
        this.story = story;
        this.belief = belief;
        this.behavior = behavior;
        this.attributes = attributes || [];
        this.potentials = potentials || [];
        this.inventory = inventory || [];
        this.notes = notes || [];
        this.ego = ego || 0;
        this.sporulation = sporulation || 0;
        this.blessures = blessures || 0;
        this.trauma = trauma || 0;
    }

    get sporulationMax(): number {
        // PSY + foi/volonté * 2
        return 5;
    }

    get egoMax(): number {
        // INT + concentration/pulsions * 2
        return 5;
    }

    get blessuresMax(): number {
        // PHY + resistance * 2
        return 5;
    }

    get traumaMax(): number {
        // PHY + PSY
        return 5;
    }

    public clone(): Character {
        return new Character(JSON.parse(JSON.stringify(this)));
    }
}