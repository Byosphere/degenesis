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

    id: number;
    name: string;
    age: number;
    rang: number;
    sex: number;
    size: number;
    weight: number;
    money: number;
    _culture: number;
    _culte: number;
    _concept: number;
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
        const { id, name, age, ego, sporulation, trauma, blessures, rang, sex, size, weight, money, culte, culture, concept, story, belief, behavior, attributes, potentials, inventory, notes } = data;
        this.id = id || 0;
        this.name = name || '';
        this.age = age;
        this.rang = rang || 0;
        this.sex = sex;
        this.size = size;
        this.weight = weight;
        this.money = money;
        this._culte = culte;
        this._culture = culture;
        this._concept = concept;
        this.story = story;
        this.belief = belief;
        this.behavior = behavior;
        this.attributes = attributes || JSON.parse(JSON.stringify(baseAttributes));
        this.potentials = potentials || [];
        this.inventory = inventory || [];
        this.notes = notes || [];
        this.ego = ego || 0;
        this.sporulation = sporulation || 0;
        this.blessures = blessures || 0;
        this.trauma = trauma || 0;
        this._resetAttributeBonus();

    }

    set culte(id: number) {
        this._culte = id;
        this._updateAttributes();
    }

    get culte(): number {
        return this._culte;
    }

    set culture(id: number) {
        this._culture = id;
        this._updateAttributes();
    }

    get culture(): number {
        return this._culture;
    }

    set concept(id: number) {
        this._concept = id;
        this._updateAttributes();
    }

    get concept(): number {
        return this._concept;
    }

    get sporulationMax(): number {
        // PSY + foi/volonté * 2
        const psyche = this.attributes.find((attr: Attribute) => attr.id === 4);
        if (psyche) {
            const foiVolonte = psyche.skills.find((skill: Skill) => SKILLS[4][skill.id] === this.belief);
            return foiVolonte ? (psyche.base + foiVolonte.value) * 2 : 0;
        } else {
            return 0;
        }
    }

    get egoMax(): number {
        // INT + concentration/pulsions * 2

        if (this.behavior === 'concentration') {
            const intellect = this.attributes.find((attr: Attribute) => attr.id === 3);
            if (intellect) {
                const concentration = intellect.skills.find((skill: Skill) => SKILLS[3][skill.id] === this.behavior);
                return concentration ? (intellect.base + concentration.value) * 2 : 0;
            } else {
                return 0;
            }
        } else if (this.behavior === 'pulsions') {
            const instinct = this.attributes.find((attr: Attribute) => attr.id === 5);
            if (instinct) {
                const pulsions = instinct.skills.find((skill: Skill) => SKILLS[5][skill.id] === this.behavior);
                return pulsions ? (instinct.base + pulsions.value) * 2 : 0;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    get blessuresMax(): number {
        // PHY + resistance * 2
        const physique = this.attributes.find((attr: Attribute) => attr.id === 0);
        if (physique) {
            const resistance = physique.skills.find((skill: Skill) => SKILLS[0][skill.id] === 'resistance');
            return resistance ? (physique.base + resistance.value) * 2 : 0;
        } else {
            return 0;
        }
    }

    get traumaMax(): number {
        // PHY + PSY
        const physique = this.attributes.find((attr: Attribute) => attr.id === 0);
        const psyche = this.attributes.find((attr: Attribute) => attr.id === 4);
        return physique && psyche ? physique.base + psyche.base : 0;
    }

    public clone(): Character {
        return new Character({
            culte: this._culte,
            culture: this._culture,
            concept: this._concept,
            ...JSON.parse(JSON.stringify(this))
        });
    }

    public addToMaxAttr(name: string) {
        let attribute = this.attributes.find(attr => attr.name === name);
        if (attribute) attribute.bonusMax++;
    }

    public toObject() {
        return {
            id: this.id,
            name: this.name,
            age: this.age,
            rang: this.rang,
            sex: this.sex,
            size: this.size,
            weight: this.weight,
            money: this.money,
            culture: this._culture,
            culte: this._culte,
            concept: this._concept,
            story: this.story,
            ego: this.ego,
            sporulation: this.sporulation,
            blessures: this.blessures,
            trauma: this.trauma,
            attributes: this.attributes,
            potentials: this.potentials,
            inventory: this.inventory,
            notes: this.notes,
            belief: this.belief,
            behavior: this.behavior
        };
    }

    private _updateAttributes() {
        this._resetAttributeBonus();
        if (!isNaN(this._culture)) {
            let currentCulture = CULTURES[this._culture];
            this._incrementBonus(currentCulture.bonus);
        }

        if (!isNaN(this._culte)) {
            let currentCulte = CULTES[this._culte];
            this._incrementBonus(currentCulte.bonus);
        }

        if (!isNaN(this._concept)) {
            let currentConcept = CONCEPTS[this._concept];
            this._incrementBonus(currentConcept.bonus);
        }
    }

    private _resetAttributeBonus() {
        this.attributes.forEach((attr: Attribute) => {
            attr.bonusMax = 0;
            if (attr.base === 0) attr.base = 1;
            attr.skills.forEach((skill) => {
                skill.bonusMax = 0;
            });
        });
    }

    private _incrementBonus(array: any[]) {
        array.forEach((attr) => {
            let charAttribute = this.attributes[ATTRIBUTES.indexOf(attr.name)];
            if (attr.bonusAttribute) {
                charAttribute.bonusMax++;
            }
            attr.skills.forEach((skill: string) => {
                let charSkill = charAttribute.skills[SKILLS[charAttribute.id].indexOf(skill)];
                charSkill.bonusMax++;
            });
        });
    }
}