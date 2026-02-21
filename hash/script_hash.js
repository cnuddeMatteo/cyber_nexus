// --- ÉLÉMENTS DOM ---
const pwdInput = document.getElementById('target-pwd');
const togglePwdBtn = document.getElementById('toggle-pwd');
const btnBrute = document.getElementById('btn-brute');
const btnDict = document.getElementById('btn-dict');
const btnLaunch = document.getElementById('btn-launch');
const btnGenerate = document.getElementById('btn-generate');

const statEntropy = document.getElementById('stat-entropy');
const statTime = document.getElementById('stat-time');
const termBody = document.getElementById('term-output');
const statusBadge = document.getElementById('status-badge');
const hashRateDisplay = document.getElementById('hash-rate');
const progressBar = document.getElementById('progress-bar');

let attackMode = 'brute'; 
let isCracking = false;
let crackInterval;
let visualInterval;

// Données calculées pour le crack
let isCrackable = true;
let realTimeString = "";

// --- GESTION DE L'UI ---
function startCracker() {
    document.getElementById('start-screen').classList.add('hidden');
}

togglePwdBtn.addEventListener('click', () => {
    if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        togglePwdBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        pwdInput.type = 'password';
        togglePwdBtn.innerHTML = '<i class="fas fa-eye"></i>';
    }
});
// --- GÉNÉRATEUR DE MOT DE PASSE FORT ---
btnGenerate.addEventListener('click', () => {
    // Tous les caractères possibles
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~|}{[]:;?><,./-=";
    let strongPwd = "";
    
    // Génération de 16 caractères au hasard
    for (let i = 0; i < 16; i++) {
        strongPwd += chars[Math.floor(Math.random() * chars.length)];
    }
    
    // Insérer dans le champ
    pwdInput.value = strongPwd;
    
    // Révéler le mot de passe pour que l'utilisateur puisse le voir
    pwdInput.type = 'text';
    togglePwdBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    
    // Déclencher l'analyse mathématique
    analyzePassword();
});
btnBrute.addEventListener('click', () => { attackMode = 'brute'; btnBrute.classList.add('active'); btnDict.classList.remove('active'); analyzePassword(); });
btnDict.addEventListener('click', () => { attackMode = 'dict'; btnDict.classList.add('active'); btnBrute.classList.remove('active'); analyzePassword(); });

// Formatage du temps de manière lisible
function formatRealTime(seconds) {
    if (seconds < 1) return "Instantané";
    if (seconds < 60) return `${Math.round(seconds)} secondes`;
    if (seconds < 3600) return `${Math.round(seconds/60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds/3600)} heures`;
    if (seconds < 31536000) return `${Math.round(seconds/86400)} jours`;
    if (seconds < 3153600000) return `${Math.round(seconds/31536000)} ans`;
    return `${Math.round(seconds/31536000).toExponential(2)} ans (Impossible)`;
}

// --- EVALUATION DU MOT DE PASSE ---
pwdInput.addEventListener('input', analyzePassword);

function analyzePassword() {
    if (isCracking) return;
    const pwd = pwdInput.value;
    
    if (pwd.length === 0) {
        statEntropy.innerText = "-- bits"; statTime.innerText = "--";
        statEntropy.className = "text-muted"; statTime.className = "text-muted";
        btnLaunch.disabled = true;
        return;
    }
    btnLaunch.disabled = false;

    // Calcul d'entropie
    let charset = 0;
    let hasSpecial = false;
    if (/[a-z]/.test(pwd)) charset += 26;
    if (/[A-Z]/.test(pwd)) charset += 26;
    if (/[0-9]/.test(pwd)) charset += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) { charset += 32; hasSpecial = true; }

    const entropy = Math.round(pwd.length * Math.log2(charset));
    statEntropy.innerText = `${entropy} bits`;

    // Estimation réaliste à 100 Milliards de Hashs / seconde (Cluster GPU)
    const combinations = Math.pow(2, entropy);
    const realSecondsToCrack = combinations / 100000000000; 
    
    realTimeString = formatRealTime(realSecondsToCrack);

    // Détermination de la réussite selon le mode
    if (attackMode === 'dict') {
        // Le dictionnaire échoue si le mot de passe est complexe (symboles + long)
        if (hasSpecial || pwd.length > 10) {
            isCrackable = false;
            statTime.innerText = "Échec probable (Hors dictionnaire)";
            statTime.className = "text-red";
        } else {
            isCrackable = true;
            statTime.innerText = "Quelques secondes (Dictionnaire)";
            statTime.className = "text-red";
        }
    } else {
        // Force brute
        if (realSecondsToCrack < 3600) { // Moins d'une heure
            isCrackable = true;
            statTime.innerText = realTimeString;
            statTime.className = "text-red";
        } else { // Trop long
            isCrackable = false;
            statTime.innerText = realTimeString;
            statTime.className = "text-green"; // Vert car c'est sécurisé !
        }
    }
    
    // Couleurs de l'entropie
    if (entropy < 40) statEntropy.className = "text-red";
    else if (entropy < 60) statEntropy.className = "text-yellow";
    else statEntropy.className = "text-green";
}

// --- UTILITAIRES VISUELS ---
function generateRandomHash() {
    const chars = 'abcdef0123456789'; let hash = '';
    for (let i = 0; i < 32; i++) hash += chars[Math.floor(Math.random() * chars.length)];
    return hash;
}
function generateRandomString(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'; let str = '';
    for (let i = 0; i < length; i++) str += chars[Math.floor(Math.random() * chars.length)];
    return str;
}
function addLogLine(html) {
    const div = document.createElement('div'); div.innerHTML = html;
    termBody.appendChild(div);
    if (termBody.childElementCount > 40) termBody.removeChild(termBody.firstChild);
    termBody.scrollTop = termBody.scrollHeight;
}

// --- MOTEUR DE CRAQUAGE (SIMULATION) ---
btnLaunch.addEventListener('click', () => {
    if (isCracking) return;
    const pwd = pwdInput.value;
    
    // La durée de la simulation visuelle (Pas la durée réelle)
    // Si c'est crackable, ça prend 2 à 5 sec. Si c'est impossible, ça timeout après 6 sec.
    const durationToCrack = isCrackable ? (Math.random() * 3000 + 2000) : 6000; 
    
    isCracking = true; btnLaunch.disabled = true; pwdInput.disabled = true;
    termBody.innerHTML = '';
    statusBadge.innerText = 'CRACKING...'; statusBadge.className = 'badge-cracking';
    progressBar.style.width = '0%'; progressBar.style.background = 'var(--red)';

    addLogLine(`<span class="text-cyan">[*]</span> Initializing ${attackMode === 'brute' ? 'Brute-Force' : 'Dictionary'} attack...`);
    addLogLine(`<span class="text-cyan">[*]</span> Hardware: 8x RTX 4090 (Estimated 100 GH/s)`);
    addLogLine(`<span class="text-cyan">[*]</span> Target Hash: ${generateRandomHash()}`);
    
    const startTime = Date.now();
    let hashCount = 0;

    visualInterval = setInterval(() => {
        let fakeGuess = attackMode === 'dict' ? "word_" + generateRandomString(4) : generateRandomString(pwd.length);
        addLogLine(`<span class="log-hash">${generateRandomHash()}</span> <span class="log-attempt">-> ${fakeGuess}</span>`);
        hashCount += Math.floor(Math.random() * 50000 + 50000); 
    }, 50); 

    crackInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        let progress = (elapsed / durationToCrack) * 100;
        
        hashRateDisplay.innerText = (hashCount * 20).toLocaleString(); 
        hashCount = 0; 

        if (progress >= 100) {
            progress = 100;
            finishCracking(pwd, elapsed);
        }
        
        progressBar.style.width = `${progress}%`;
    }, 100);
});

function finishCracking(password, timeTaken) {
    clearInterval(visualInterval); clearInterval(crackInterval);
    hashRateDisplay.innerText = '0';
    
    if (isCrackable) {
        progressBar.style.background = 'var(--green)';
        statusBadge.innerText = 'SUCCESS'; statusBadge.className = 'badge-success';
        
        addLogLine(`<div class="log-success">
            [+] PASSWORD RECOVERED: <span class="text-main">${password}</span><br>
            [+] Simulation time: ${(timeTaken/1000).toFixed(2)}s
        </div>`);
    } else {
        progressBar.style.background = 'var(--text-muted)';
        statusBadge.innerText = 'ABORTED'; statusBadge.className = 'badge-idle';
        
        const reason = attackMode === 'dict' ? "Mot introuvable dans le dictionnaire (rockyou.txt)." : "Complexité trop élevée.";
        
        addLogLine(`<div class="log-success" style="color: var(--red); border-color: var(--red);">
            [-] ERROR / TIMEOUT<br>
            [-] Raison : ${reason}<br>
            [-] Temps réel estimé pour casser : <span style="font-weight:bold;">${realTimeString}</span>
        </div>`);
    }

    setTimeout(() => {
        isCracking = false; pwdInput.disabled = false; analyzePassword();
    }, 2000);
}
// --- GESTION DE LA MODALE CONSEILS ---
const btnTips = document.getElementById('btn-tips');
const tipsModal = document.getElementById('tips-modal');
const closeTipsBtn = document.getElementById('close-tips');

// Ouvrir la modale
btnTips.addEventListener('click', () => {
    tipsModal.classList.remove('hidden');
});

// Fermer via le bouton X
closeTipsBtn.addEventListener('click', () => {
    tipsModal.classList.add('hidden');
});

// Fermer en cliquant en dehors de la carte (sur le fond noir)
tipsModal.addEventListener('click', (e) => {
    if (e.target === tipsModal) {
        tipsModal.classList.add('hidden');
    }
});