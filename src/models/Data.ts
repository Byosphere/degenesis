export interface Culte {
    name: string;
    desc: string;
    bonus: Bonus[];
}

export interface Culture {
    name: string;
    desc: string;
    img: string;
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