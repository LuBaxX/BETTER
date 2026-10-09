let currentPhrase = "None";
let Zone = 0;
let Part = 1;
const currentPhraseElement = document.getElementById("current-phrase");
const currentPartElement = document.getElementById("current-part");
const partProgressElement = document.getElementById("part-progress");
const zoneProgressElement = document.getElementById("zone-progress");
const previousButton = document.getElementById("previous-phrase");
const nextButton = document.getElementById("next-phrase");

const table = {
    name: "Devenir",
    1: "Je te demande une chose, sois régulier.",
    2: "le premier des filtres, c'est celui-ci. Le premier des obstacles à la réussite il est là.",
    3: "Sérieusement, t'es pas foutu de passer le premier jour ? T'es pas foutu de passer le première semaine ?",
    4: "Alors pourquoi tu t'arrête et tu reprends ? T'as qu'une chose à faire, sois régulier !",
    5: "Continue d'avancer, encore, encore, encore, d'accord le premier jour tu verras pas de résultat.",
    6: "D'accord le deuxième non plus, d'accord le dixième toujours pas.",
    7: "Mais crois moi, plus la boule de neige avanceras, plus c'est obligée elle grossira.",
    8: "Alors tu continues d'avancer, Hiver, Printemps, Été, Automne !",
    9: "Attend c'est pas beau de voir quelqu'un progresser, juste parce qu'il a rien laché ?",
    10: "C'est pas beau de le voir progresser juste parce que tous les jours il se seras bougé ?",
    11: "Mais même comme ça c'est pas fini, parce que même tu seras devenu monstrueux, tu crois que tu va t'arrêter ?",
    12: "Et non ! Tu va continuer d'avancer et garder le rythme parce que tu seras conscient de la puissance de la régularité.",
};

const table2 = {
    name: "Evoluer",
    1: "Tu es capable de faire des pas à la suite des autres, ok.",
    2: "Certes, tu avance tous les jours, ok on sais. Mais est-ce que tu évolue ?",
    3: "Le deuxième filtre à la réussite est juste ici. Tu avance, mais est-ce que tu évolue ?",
    4: "Evoluer ce n'est pas difficile, ça ne cherche qu'une seule chose.",
    5: "Découvre. Découvre de nouvelles personnes, de nouvelles idées, de nouvelles façons de faire.",
    6: "Découvrir, c'est aussi sortir de sa zone de confort, pour chercher quelque chose qu'on n'a pas aujourd'hui.",
    7: "Parce que laisser les autres faire, c'est se laisser dépasser, c'est se laisser distancer, c'est régresser.",
    8: "Alors découvre, apprends, évolue, parce que c'est ça le but de la vie.",
    9: "Soit comme un enfant, comme un papillion, comme un oiseau, découvre, apprends, évolue et bat toi pour ça.",
    10: "Bat toi pour ce que tu vaut, bat toi pour ce que tu veux devenir, bat toi pour ce que tu veux être.",
    11: "Evoluer ça veux dire découvrir et devenir, même si ces choix sont remis en question.",
    12: "Maintenant, cès que t'as une idée risquée, assume la et note la, t'as du temps pour ça mais sans ça tu vas te laisser distancer.",
};

const table3 = {
    name: "Respect",
    1: "Tu es régulier, tu évolue, mais est-ce que tu respectes ? Est-ce qu'on parle bien de toi ?",
    2: "Régulier et évoluer, c'est du dévelopement personnel, mais le respect c'est du développement social.",
    3: "Dans la vie, pas tout peut se faire seul, il faut des gens autour de toi pour t'aider à avancer.",
    4: "C'est ici que le troisième filtre à la réussite se trouve, le respect.",
    5: "Le respect c'est la base de tout, c'est le ciment de la société.",
    6: "Le respect c'est ce qui fait que tu peux avancer dans la vie, parce que les gens vont t'aider.",
    7: "Donner du respect et être respecter c'est tout gagner. Parce que agir en communauté c'est agir pour soi et pour les autres.",
    8: "Alors respecte les autres, respecte toi même, et tu verras que la vie sera plus facile.",
    9: "Respecter c'est aussi savoir écouter, savoir comprendre, savoir aider.",
    10: "Mais c'est facile de dire 'Respecter', mais tu sais le définir ? Alors je te le défini pour la dernière fois.",
    11: "Respecter c'est agir avec les autres, agir pour les autres, agir pour soi et agir pour la société.",
    12: "Respecter c'est donner de l'amour et de la considération, que ce soit un objet ou une personne.",
};

const table4 = {
    name: "sans dévier",
    1: "Regarde le chemin qu'on a fait. Il ne reste qu'une chose qui peut te bloquer : la déviation.",
    2: "Le temps et l'attention sont tes ressources les plus limitées. Chaque distraction te vole un peu de ton avenir.",
    3: "Entre scroller sans fin, subir les notifications et ne pas prendre le temps de planifier, ton énergie fuit.",
    4: "Le dernier filtre à la réussite, et c'est celui qui peux tout couper, t'obliger à recommencer.",
    5: "Ne pas dévié reviens à tout économiser, ton temps, ton argent, et ton calme",
    6: "Chaque petite notification va te faire perdre du temps, qui te feras perdre de l'argent et andomagera ton humeur.",
    7: "Mentalement tu auras mal, ce sera dur d'avancer si ton esprit est constamment fragmenté par le bruit extérieur.",
    8: "La confiance se gagne, mais ton attention, elle, se protège comme un trésor inestimable.",
    9: "Supprime les distractions, médite, et planifie consciemment tes journées pour ne plus les subir.",
    10: "N'oublie pas de prendre des pauses et de souffler. La discipline sans récupération mène à l'épuisement.",
    11: "Accepte le doute et la critique avant d'agir, parce que les critiques ne cherchent pas à te faire perdre ton calme.",
    12: "Protège ton temps, et retiens qu'on est tous humains et qu'on est censé s'entre aider, malgré un système qui fait le contraire."
};

const multiTable = {
    1: table,
    2: table2,
    3: table3,
    4: table4
};

const partNumbers = Object.keys(multiTable).map(Number).sort((first, second) => first - second);

function getPhrases(part) {
    return Object.keys(multiTable[part])
        .filter((key) => /^\d+$/.test(key))
        .sort((first, second) => Number(first) - Number(second))
        .map((key) => multiTable[part][key]);
}

function getProgress(index, itemCount) {
    return itemCount > 1 ? (index / (itemCount - 1)) * 100 : 0;
}

function renderBlock() {
    const partIndex = partNumbers.indexOf(Part);
    const phrases = getPhrases(Part);

    currentPhrase = phrases[Zone] || "None";
    currentPhraseElement.textContent = currentPhrase;
    currentPartElement.textContent = multiTable[Part].name;
    partProgressElement.value = getProgress(partIndex, partNumbers.length);
    zoneProgressElement.value = getProgress(Zone, phrases.length);
    previousButton.disabled = partIndex === 0 && Zone === 0;
    nextButton.disabled = partIndex === partNumbers.length - 1 && Zone === phrases.length - 1;
}

function showPreviousPhrase() {
    if (Zone > 0) {
        Zone--;
    } else {
        const previousPartIndex = partNumbers.indexOf(Part) - 1;
        if (previousPartIndex < 0) return;
        Part = partNumbers[previousPartIndex];
        Zone = getPhrases(Part).length - 1;
    }

    renderBlock();
}

function showNextPhrase() {
    if (Zone < getPhrases(Part).length - 1) {
        Zone++;
    } else {
        const nextPartIndex = partNumbers.indexOf(Part) + 1;
        if (nextPartIndex >= partNumbers.length) return;
        Part = partNumbers[nextPartIndex];
        Zone = 0;
    }

    renderBlock();
}

previousButton.addEventListener("click", showPreviousPhrase);
nextButton.addEventListener("click", showNextPhrase);
renderBlock();