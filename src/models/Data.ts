export interface Culte {
    name: string;
    bonus: Bonus[];
}

export interface Culture {
    name: string;
    bonus: Bonus[];
}

export interface Concept {
    name: string;
    bonus: Bonus[];
}

export interface Bonus {
    name: string;
    bonusAttribute: boolean;
    skills: string[];
}