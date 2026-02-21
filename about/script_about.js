const output = document.getElementById('typewriter-output');
const actionLinks = document.getElementById('action-links');

// Le texte qui va s'afficher (tu peux le modifier comme tu veux !)
const textLines = [
    "<span class='prompt'>[sys]</span> Initialisation du module d'identification...",
    "<span class='prompt'>[sys]</span> Extraction des données utilisateur...",
    "<br>",
    "<span class='prompt'>root@nexus:~$</span> whoami",
    "Nom          : <span class='keyword'>Mattéo Cnudde</span>",
    "Statut       : <span class='keyword'>Étudiant en Cybersécurité / Développeur</span>",
    "Localisation : <span class='keyword'>France</span>",
    "<br>",
    "<span class='prompt'>root@nexus:~$</span> cat motivation.txt",
    "Passionné par l'intersection entre le développement de logiciels et la sécurité informatique.",
    "Je ne me contente pas d'utiliser des outils de sécurité, je les construis pour comprendre leur fonctionnement de l'intérieur.",
    "Mon objectif : Protéger les systèmes complexes tout en rendant la sécurité compréhensible et visuelle.",
    "<br>",
    "<span class='prompt'>root@nexus:~$</span> ./load_skills.sh",
    "Chargement des compétences opérationnelles en cours..."
];

let currentLine = 0;
let currentChar = 0;
let isTag = false;
let textBuffer = "";

function typeWriter() {
    if (currentLine < textLines.length) {
        let line = textLines[currentLine];

        // Gestion du HTML direct (ex: <br> ou <span>) pour ne pas l'écrire lettre par lettre
        if (line.startsWith("<") && currentChar === 0) {
            output.innerHTML += line + "<br>";
            currentLine++;
            setTimeout(typeWriter, 150); // Petite pause entre les lignes
            return;
        }

        // Ajoute le curseur clignotant
        output.innerHTML = textBuffer + line.substring(0, currentChar) + "<span class='cursor'></span>";

        if (currentChar < line.length) {
            // Si on rencontre une balise HTML au milieu d'une ligne
            if (line.charAt(currentChar) === '<') isTag = true;
            if (line.charAt(currentChar) === '>') isTag = false;

            currentChar++;
            let speed = isTag ? 0 : Math.random() * 30 + 10; // Vitesse de frappe aléatoire (plus réaliste)
            setTimeout(typeWriter, speed);
        } else {
            textBuffer += line + "<br>";
            currentLine++;
            currentChar = 0;
            setTimeout(typeWriter, 300); // Pause en fin de ligne
        }
    } else {
        // Fin de l'animation, on affiche le curseur final et les boutons
        output.innerHTML = textBuffer + "<span class='prompt'>root@nexus:~$</span> <span class='cursor'></span>";
        
        actionLinks.classList.remove('hidden');
        actionLinks.classList.add('fade-in');
    }
}

// Démarrer l'animation après un court délai pour laisser l'utilisateur atterrir sur la page
setTimeout(typeWriter, 500);