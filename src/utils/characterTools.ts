import { Character, Attribute, Skill, Potential } from "../models/Character";
import { SKILLS, ATTRIBUTES, CULTURES, CULTES, CONCEPTS } from "../constants";
import baseAttributes from '../data/attributes.json';

export function getSporulationMax(character: Character): number {
    const psyche = character.attributes.find((attr: Attribute) => attr.id === 4);
    if (psyche) {
        const foiVolonte = psyche.skills.find((skill: Skill) => SKILLS[4][skill.id] === character.belief);
        return foiVolonte ? (psyche.base + foiVolonte.value) * 2 : 0;
    } else {
        return 0;
    }
}

export function getEgoMax(character: Character): number {
    if (character.behavior === 'concentration') {
        const intellect = character.attributes.find((attr: Attribute) => attr.id === 3);
        if (intellect) {
            const concentration = intellect.skills.find((skill: Skill) => SKILLS[3][skill.id] === character.behavior);
            return concentration ? (intellect.base + concentration.value) * 2 : 0;
        } else {
            return 0;
        }
    } else if (character.behavior === 'pulsions') {
        const instinct = character.attributes.find((attr: Attribute) => attr.id === 5);
        if (instinct) {
            const pulsions = instinct.skills.find((skill: Skill) => SKILLS[5][skill.id] === character.behavior);
            return pulsions ? (instinct.base + pulsions.value) * 2 : 0;
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}

export function getBlessuresMax(character: Character): number {
    const physique = character.attributes.find((attr: Attribute) => attr.id === 0);
    if (physique) {
        const resistance = physique.skills.find((skill: Skill) => SKILLS[0][skill.id] === 'resistance');
        return resistance ? (physique.base + resistance.value) * 2 : 0;
    } else {
        return 0;
    }
}

export function getTraumaMax(character: Character) {
    const physique = character.attributes.find((attr: Attribute) => attr.id === 0);
    const psyche = character.attributes.find((attr: Attribute) => attr.id === 4);
    return physique && psyche ? physique.base + psyche.base : 0;
}

export function addToMaxAttr(character: Character, name: string) {
    let attribute = character.attributes.find(attr => attr.name === name);
    if (attribute) attribute.bonusMax++;
}

export function resetAttributeBonus(character: Character) {
    character.attributes.forEach((attr: Attribute) => {
        attr.bonusMax = 0;
        if (attr.base === 0) attr.base = 1;
        attr.skills.forEach((skill) => {
            skill.bonusMax = 0;
        });
    });
}

function incrementBonus(character: Character, array: any[]) {
    array.forEach((attr) => {
        let charAttribute = character.attributes[ATTRIBUTES.indexOf(attr.name)];
        if (attr.bonusAttribute) {
            charAttribute.bonusMax++;
        }
        attr.skills.forEach((skill: string) => {
            let charSkill = charAttribute.skills[SKILLS[charAttribute.id].indexOf(skill)];
            if (charSkill)
                charSkill.bonusMax++;
            else
                console.log('error : "' + skill + '" inconnu dans ' + SKILLS[charAttribute.id]);
        });
    });
}

export function updateAttributes(character: Character) {
    resetAttributeBonus(character);
    if (!isNaN(character.culture)) {
        let currentCulture = CULTURES[character.culture];
        if (currentCulture) incrementBonus(character, currentCulture.bonus);
    }

    if (!isNaN(character.culte)) {
        let currentCulte = CULTES[character.culte];
        if (currentCulte) incrementBonus(character, currentCulte.bonus);
    }

    if (!isNaN(character.concept)) {
        let currentConcept = CONCEPTS[character.concept];
        if (currentConcept) incrementBonus(character, currentConcept.bonus);
    }
}

export function getNewCharacter(): Character {
    return {
        name: '',
        age: 0,
        rang: 0,
        sex: 0,
        size: 0,
        weight: 0,
        money: 0,
        culte: undefined,
        culture: undefined,
        concept: undefined,
        story: '',
        belief: undefined,
        behavior: undefined,
        attributes: JSON.parse(JSON.stringify(baseAttributes)),
        potentials: [],
        inventory: [],
        notes: [''],
        ego: 0,
        sporulation: 0,
        blessures: 0,
        trauma: 0,
        exp: 0
    };
}

export function getPotentialXpCost(potentials: Potential[]): number {
    let totalLevels = 0;
    potentials.forEach(potential => {
        totalLevels += potential.level;
    });
    return (totalLevels + 1) * 10;
}

export function getAttributeXpCost(attribute: Attribute, behavior: 'pulsions' | 'concentration'): number {
    let cost = 0;
    if (behavior === 'concentration') {
        cost = (attribute.name === 'intellect' || attribute.name === 'agilite' || attribute.name === 'psyche') ? 10 : 12;
    } else if (behavior === 'pulsions') {
        cost = (attribute.name === 'physique' || attribute.name === 'charisme' || attribute.name === 'instinct') ? 10 : 12;
    }

    return (attribute.base + 1) * cost;
}

export function getSkillXpCost(skillId: number, attribute: Attribute, behavior: 'pulsions' | 'concentration'): number {
    let cost = 0;
    if (behavior === 'concentration') {
        cost = (attribute.name === 'intellect' || attribute.name === 'agilite' || attribute.name === 'psyche') ? 4 : 5;
    } else if (behavior === 'pulsions') {
        cost = (attribute.name === 'physique' || attribute.name === 'charisme' || attribute.name === 'instinct') ? 4 : 5;
    }
    return (attribute.skills.find((skill) => skill.id === skillId).value + 1) * cost;
}