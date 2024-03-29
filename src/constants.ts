import { Culte, Culture, Concept } from "./models/Data";
import cultes from "./data/cultes.json";
import cultures from "./data/cultures.json";
import concepts from "./data/concepts.json";
import fr from './lang/fr.json';
import en from './lang/en.json';

export const API_PATH = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://degenesis-api.vercel.app';
export const GENERIC_POTENTIALS = 13;
export const BASE_ATTRIBUTES = 10;
export const BASE_SKILLS = 28;
export const LOCALSTORAGE_NAME = 'degenesisapp';
export const CHAR_MAX = 10;
export const STORY_LENGTH: number = 200;
export const BAG_SIZES: number[] = [2, 6, 8];

export const CULTES: Culte[] = cultes;
export const CULTURES: Culture[] = cultures;
export const CONCEPTS: Concept[] = concepts;

export const LANG = {
    'en': en,
    'fr': fr
};

export const NOTES_MAX = 12;

export const MONEY = [
    50,
    100,
    200,
    50,
    128,
    50,
    50,
    100,
    50,
    100,
    50,
    1000,
    100
];

export const GROUPS = [
    'arme',
    'armure',
    'equipement'
];

export const ATTRIBUTES = [
    'physique',
    'agilite',
    'charisme',
    'intellect',
    'psyche',
    'instinct',
];

export const SKILLS = [
    [
        'athletisme',
        'corpsacorps',
        'force',
        'lutte',
        'resistance',
        'vigueur'
    ],
    [
        'projectiles',
        'artisanat',
        'dexterite',
        'furtivite',
        'mobilite',
        'navigation'
    ],
    [
        'art',
        'commandement',
        'consideration',
        'expression',
        'negociation',
        'seduction'
    ],
    [
        'concentration',
        'artefacts',
        'legendes',
        'medecine',
        'science',
        'technologie'
    ],
    [
        'domination',
        'foi',
        'reactivite',
        'ruse',
        'tromperie',
        'volonte'
    ],
    [
        'dressage',
        'empathie',
        'orientation',
        'perception',
        'pulsions',
        'survie'
    ]
];

export const POTENTIALS = [
    [
        'sangdupecheur',
        'coupdeboutoir',
        'pneuma',
        'royaumedesemanations',
        'porteflambeau',
        'zelote'
    ],
    [
        'festindammout',
        'nombrildenefertoum',
        'oeildhorus',
        'pitiedanubis',
        'sommeildesekhmet',
        'regarddudestin'
    ],
    [
        'tapis',
        'cartededestinee',
        'niddecorbeau',
        'miroir',
        'sombreaugure',
        '1000facons'
    ],
    [
        'cauchemar',
        'lamentation',
        'alias',
        'soleildeminuit',
        'elu',
        'insinuateur'
    ],
    [
        'tesla',
        'nova',
        'culdesac',
        'memoirefractale',
        'telechargement',
        'chargement'
    ],
    [],
    [
        'vindicte',
        'rat',
        'duracuire',
        'nitro',
        'cochontruffier',
        'darwin'
    ],
    [
        'revanchedulion',
        'sangancestral',
        'epreuveduheros',
        'riredelahyene',
        'courseduchien',
        'proiedessimba'
    ],
    [
        'doctrineassaut',
        'doctrinebouclier',
        'doctrineinfiltration',
        'doctrinemarcheforcee',
        'doctrinediscipline',
        'doctrinemorale'
    ],
    [
        'coleredejehammet',
        'toisondaries',
        'invocationdejehammet',
        'maledictiondesiconides',
        'benedictiondesiconides',
        'oracle'
    ],
    [
        'fiatlux',
        'rouleaucompresseur',
        'coupdemarteau',
        'visagedejanus',
        'lynchage',
        'tonnerredacier'
    ],
    [
        'partdulion',
        'tireurdelite',
        'inspiration',
        'neufvies',
        'regardbienveillant',
        'rouedelafortune'
    ],
    [
        'dilacerateur',
        'phalange',
        'preservalis',
        'dernier bastion',
        'enseignementkranzler',
        'ultimeadieu'
    ],
    [
        'appeldelether',
        'ascetisme',
        'capourraitetrepire',
        'cuirdelephant',
        'deplacerdesmontagnes',
        'eclairdegenie',
        'inflexible',
        'marathon',
        'mathematicien',
        'sensdudanger',
        'souplesse'
    ]
];

export const SEX = [
    '',
    'male',
    'female',
    'hermaphrodite'
];

export const RANGS = [
    [
        'ravi',
        'ascete',
        'elyseen',
        'orgiastique',
        'fureur',
        'emissaire',
        'conseiller',
        'baptiste',
        'sublime',
        'archeron'
    ],
    [
        'initie',
        'enchanteur',
        'embaumeur',
        'prophetedesames',
        'guerisseur',
        'hecateen',
        'faucille',
        'ammout',
        'hogon'
    ],
    [
        'pinson',
        'epervier',
        'pie',
        'vautour',
        'coucou',
        'chouette',
        'picvert',
        'cigogne',
        'corneille',
        'sterne',
        'mouette',
        'pelican',
        'albatros',
        'colibri',
        'marabout',
        'ibis',
        'toko',
        'busard',
        'phenix'
    ],
    [
        'spectre',
        'solaire',
        'aurore',
        'eveilleur',
        'redempteur',
        'fantome',
        'cyclope',
        'aspirant',
        'demagogue',
        'halo'
    ],
    [
        'bit',
        'agent',
        'mediateur',
        'diffuseur',
        'fragment',
        'paradigme',
        'occulteur',
        'fusible',
        'skalar',
        'zero',
        'aiguille'
    ],
    [
        'eclaireur',
        'chasseur',
        'cueilleur',
        'guerriertribal',
        'chaman',
        'chefdeclan',
        'champion',
        'fondateur'
    ],
    [
        'souris',
        'blaireau',
        'renard',
        'loupsolitaire',
        'oursdescavernes',
        'mecanicien',
        'artisan',
        'recuperateur',
        'loupalpha',
        'legende',
        'malfrat',
        'estimateur',
        'officier'
    ],
    [
        'dufu',
        'hondo',
        'chaga',
        'damu',
        'simba',
        'dumisai',
        'moyo',
        'kifo'
    ],
    [
        'soldat',
        'caporal',
        'sapeur',
        'grenadier',
        'forcespecial',
        'garde',
        'transmetteur',
        'eclaireur',
        'infiltre',
        'escouade',
        'medecin',
        'ingenieur',
        'approvisionneur',
        'subalterne',
        'officiersup',
        'commandant'
    ],
    [
        'ismaeli',
        'glaive',
        'abrami',
        'berger',
        'isaaki',
        'bienfait',
        'iconide',
        'prophete',
        'hagari',
        'dalila',
        'voix',
        'juste',
        'saraeli',
        'fierte',
        'maculee',
        'immaculee',
        'oracle',
        'arianoi',
        'sangdaries',
        'fatum'
    ],
    [
        'vagabond',
        'jugedeville',
        'protecteur',
        'executeur',
        'jugenoir',
        'avocat',
        'arbitre',
        'contrôleur',
        'commissaire',
        'procureur',
        'senateur',
        'jugesupreme'
    ],
    [
        'apprenti',
        'scribe',
        'marchand',
        'navigateur',
        'cartographe',
        'grandchasseur',
        'magnat',
        'cheik',
        'pillard',
        'ambassadeur',
        'waziri',
        'consul'
    ],
    [
        'recrue',
        'aidesoignant',
        'fambulancier',
        'medecinterrain',
        'hygieniste',
        'chirurgien',
        'epigeneticien',
        'pharmacien',
        'hippocrate',
        'anesthesiste',
        'chef',
        'specialiste',
        'preserviste',
        'commando',
        'recteur',
        'medecinvillage',
        'ancien'
    ]
]
