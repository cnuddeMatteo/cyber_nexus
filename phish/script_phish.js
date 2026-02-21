// --- ÉLÉMENTS DOM ---
const tabUrl = document.getElementById('tab-url');
const tabFile = document.getElementById('tab-file');
const boxUrl = document.getElementById('box-url');
const boxFile = document.getElementById('box-file');

const urlInput = document.getElementById('url-input');
const fileInput = document.getElementById('file-input');
const btnScanUrl = document.getElementById('btn-scan-url');
const btnScanFile = document.getElementById('btn-scan-file');

const scanTerminal = document.getElementById('scan-terminal');
const scanLogs = document.getElementById('scan-logs');
const scanProgress = document.getElementById('scan-progress');
const reportDashboard = document.getElementById('report-dashboard');

const fileNameDisplay = document.getElementById('file-name-display');
const fpWarning = document.getElementById('fp-warning');

const targetTitle = document.getElementById('target-title');
const targetDetails = document.getElementById('target-details');
const networkDetails = document.getElementById('network-details');
const avGrid = document.getElementById('av-grid');
const lastAnalysisEl = document.getElementById('last-analysis');
const scoreCircle = document.getElementById('threat-score');
const threatStatus = document.getElementById('threat-status');

// --- LISTE DES MOTEURS ANTIVIRUS ---
const avEnginesList = [
    "Kaspersky", "BitDefender", "Sophos", "Fortinet", "Palo Alto Networks", 
    "CrowdStrike", "FireEye", "Symantec", "McAfee", "Avast", "ESET-NOD32", 
    "TrendMicro", "Malwarebytes", "Cisco-AMP", "DrWeb", "Comodo", "Avira", "Baidu"
];

function startScanner() {
    document.getElementById('start-screen').classList.add('hidden');
}

// --- GESTION DES ONGLETS ---
tabUrl.addEventListener('click', () => {
    tabUrl.classList.add('active'); tabFile.classList.remove('active');
    boxUrl.classList.remove('hidden'); boxFile.classList.add('hidden');
});
tabFile.addEventListener('click', () => {
    tabFile.classList.add('active'); tabUrl.classList.remove('active');
    boxFile.classList.remove('hidden'); boxUrl.classList.add('hidden');
});
// --- MISE À JOUR VISUELLE DU FICHIER ---
fileInput.addEventListener('change', function() {
    if (this.files && this.files.length > 0) {
        fileNameDisplay.textContent = this.files[0].name;
        fileNameDisplay.style.color = "#fff"; // Met le texte en blanc quand un fichier est choisi
    } else {
        fileNameDisplay.textContent = "Sélectionner un fichier...";
        fileNameDisplay.style.color = "var(--text-muted)";
    }
});

// --- UTILITAIRES ---
function addLog(text) {
    const div = document.createElement('div');
    div.innerHTML = `<span style="color:var(--yellow)">[~]</span> ${text}`;
    scanLogs.appendChild(div);
    scanLogs.scrollTop = scanLogs.scrollHeight;
}

function generateFakeHash() {
    const chars = 'abcdef0123456789'; let hash = '';
    for (let i = 0; i < 64; i++) hash += chars[Math.floor(Math.random() * chars.length)];
    return hash;
}

// --- LOGIQUE DE SCAN ---
btnScanUrl.addEventListener('click', () => runScan('url', urlInput.value.trim().toLowerCase()));
btnScanFile.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (file) runScan('file', file.name, file.size);
    else alert("Veuillez sélectionner un fichier.");
});

function runScan(type, targetStr, fileSize = 0) {
    if (!targetStr) return;

    btnScanUrl.disabled = true; btnScanFile.disabled = true;
    reportDashboard.classList.add('hidden');
    scanTerminal.classList.remove('hidden');
    scanLogs.innerHTML = '';
    scanProgress.style.width = '0%';
    
    // --- Détermination de la menace (Simulation Avancée) ---
    let isMalicious = false;

    if (type === 'url') {
        const suspiciousUrlWords = ['login', 'secure', 'account', 'update', 'free', 'verify', 'paypal', 'bank'];
        for(let word of suspiciousUrlWords) {
            if(targetStr.includes(word)) { isMalicious = true; break; }
        }
        if (!targetStr.includes('.')) isMalicious = true;
    } else {
        const ext = targetStr.split('.').pop();
        
        // 1. Liste Blanche (Fichiers connus et légitimes)
        const whitelist = ['unity.exe', 'chrome.exe', 'discord.exe', 'steam.exe', 'setup.exe'];
        
        // 2. Mots-clés suspects dans le nom du fichier
        const suspiciousFileWords = ['crack', 'keygen', 'hack', 'cheat', 'patch', 'free', 'bypass'];

        if (whitelist.includes(targetStr)) {
            isMalicious = false;
        } else if (['bat', 'vbs', 'docm', 'scr'].includes(ext)) {
            isMalicious = true;
        } else if (ext === 'exe') {
            isMalicious = false; 
            for(let word of suspiciousFileWords) {
                if(targetStr.includes(word)) { isMalicious = true; break; }
            }
        }
    }

    // --- LA PARTIE QUI MANQUAIT : L'animation du Terminal ---
    const stepsUrl = [
        "Résolution DNS de l'hôte...", "Interrogation des serveurs WHOIS...",
        "Extraction du certificat SSL/TLS...", "Croisement avec les Threat Feeds..."
    ];
    const stepsFile = [
        "Calcul des empreintes (MD5, SHA-1, SHA-256)...", "Analyse statique des en-têtes (PE/ELF)...",
        "Extraction des chaînes de caractères (Strings)...", "Interrogation des moteurs heuristiques..."
    ];
    
    const steps = type === 'url' ? stepsUrl : stepsFile;
    let currentStep = 0;

    const interval = setInterval(() => {
        if (currentStep < steps.length) {
            addLog(steps[currentStep]);
            scanProgress.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
            currentStep++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                showResults(type, targetStr, isMalicious, fileSize);
            }, 500);
        }
    }, 600);
}

function showResults(type, targetStr, isMalicious, fileSize) {
    scanTerminal.classList.add('hidden');
    reportDashboard.classList.remove('hidden');
    btnScanUrl.disabled = false; btnScanFile.disabled = false;

    // --- 1. GÉNÉRATION DES DÉTECTIONS AV ---
    const totalEngines = avEnginesList.length;
    let detections = 0;
    avGrid.innerHTML = ''; // Reset de la grille

    // On mélange la liste pour que ce ne soit jamais dans le même ordre
    const shuffledEngines = avEnginesList.sort(() => 0.5 - Math.random());

    shuffledEngines.forEach(engine => {
        let isDetected = false;
        if (isMalicious) {
            // 70% de chance qu'un AV le détecte si c'est malveillant
            isDetected = Math.random() > 0.3;
        } else {
            // Faux positif (2% de chance)
            isDetected = Math.random() > 0.98;
        }

        if(isDetected) detections++;

        const resultText = isDetected ? (type === 'url' ? "Phishing/Malware" : "Trojan.Generic.KD") : "Clean";
        const cssClass = isDetected ? "av-malicious" : "av-clean";
        const icon = isDetected ? "fa-exclamation-triangle" : "fa-check-circle";

        avGrid.innerHTML += `
            <div class="av-item ${cssClass}">
                <span class="av-name">${engine}</span>
                <span class="av-result"><i class="fas ${icon}"></i> ${resultText}</span>
            </div>
        `;
    });

    // --- 2. GESTION DU SCORE ET STATUT ---
    scoreCircle.innerText = `${detections}/${totalEngines}`;
    fpWarning.classList.add('hidden'); // Reset du message par défaut

    if (detections > 0) {
        if (detections <= 3) {
            // Faux Positif Probable (Moins de 3 détections)
            scoreCircle.className = "score-circle border-yellow text-yellow";
            threatStatus.innerText = "SUSPECT (SCORE FAIBLE)";
            threatStatus.className = "status-label text-yellow";
            fpWarning.classList.remove('hidden');
        } else {
            // Vraie Menace
            scoreCircle.className = "score-circle border-red text-red";
            threatStatus.innerText = "MENACE DÉTECTÉE";
            threatStatus.className = "status-label text-red";
        }
    } else {
        scoreCircle.className = "score-circle border-green text-green";
        threatStatus.innerText = "CIBLE SÛRE";
        threatStatus.className = "status-label text-green";
    }

    // --- 3. DÉTAILS DYNAMIQUES (URL vs FILE) ---
    if (type === 'url') {
        targetTitle.innerHTML = '<i class="fas fa-globe"></i> INFOS DOMAINE (WHOIS)';
        const fakeIp = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.1`;
        
        targetDetails.innerHTML = `
            <li><span>Cible:</span> <strong>${targetStr}</strong></li>
            <li><span>IP Résolue:</span> <strong>${fakeIp}</strong></li>
            <li><span>Création:</span> <strong class="${isMalicious ? 'text-red' : ''}">${isMalicious ? 'Il y a 3 jours' : 'Il y a 5 ans'}</strong></li>
            <li><span>Registrar:</span> <strong>${isMalicious ? 'Namecheap (Privacy)' : 'Cloudflare, Inc.'}</strong></li>
        `;
        networkDetails.innerHTML = `
            <li><span>Certificat SSL:</span> <strong>${isMalicious ? "Let's Encrypt (Gratuit)" : "DigiCert SHA2"}</strong></li>
            <li><span>Serveur Web:</span> <strong>nginx/1.18.0</strong></li>
            <li><span>Redirections:</span> <strong>${isMalicious ? "2 (Masquage)" : "0"}</strong></li>
        `;
    } else {
        targetTitle.innerHTML = '<i class="fas fa-file-alt"></i> EMPREINTES DU FICHIER';
        const sizeMb = (fileSize / (1024*1024)).toFixed(2);
        
        targetDetails.innerHTML = `
            <li><span>Nom:</span> <strong>${targetStr}</strong></li>
            <li><span>Taille:</span> <strong>${fileSize > 0 ? sizeMb + ' MB' : 'Inconnue'}</strong></li>
            <li><span>SHA-256:</span> <strong style="font-size:0.7rem;">${generateFakeHash()}</strong></li>
            <li><span>Type MIME:</span> <strong>application/octet-stream</strong></li>
        `;
        networkDetails.innerHTML = `
            <li><span>Signature numérique:</span> <strong class="${isMalicious ? 'text-red' : 'text-green'}">${isMalicious ? "Absente / Invalide" : "Valide (Signé)"}</strong></li>
            <li><span>Entropie:</span> <strong>${isMalicious ? "7.9 (Packé/Chiffré)" : "4.2 (Normal)"}</strong></li>
            <li><span>Comportement:</span> <strong>${isMalicious ? "Tente de modifier le Registre" : "Aucune action suspecte"}</strong></li>
        `;
    }
}