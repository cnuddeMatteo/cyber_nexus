const canvas = document.getElementById('map-canvas');
const ctx = canvas.getContext('2d');
const terminal = document.getElementById('terminal-logs');
const atkCountEl = document.getElementById('atk-count');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let attacksCount = 0;
const attacks = [];
const targetNode = { x: canvas.width / 2, y: canvas.height / 2 };

// --- DONNÉES DE SIMULATION ---
const fakeIPs = ["192.168.1.104", "45.33.32.156", "112.85.42.11", "89.234.10.2", "185.15.22.44", "220.181.108.113"];
const fakeCountries = ["RU", "CN", "BR", "US", "IR", "KP", "FR"];
const targetPorts = [22, 23, 80, 443, 3389, 5900];
const usernames = ["root", "admin", "postgres", "user", "test"];

// Générer un log dans le terminal
function createLog() {
    const ip = fakeIPs[Math.floor(Math.random() * fakeIPs.length)];
    const country = fakeCountries[Math.floor(Math.random() * fakeCountries.length)];
    const port = targetPorts[Math.floor(Math.random() * targetPorts.length)];
    const user = usernames[Math.floor(Math.random() * usernames.length)];
    
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    
    const logLine = document.createElement('div');
    logLine.className = 'log-line';
    logLine.innerHTML = `<span class="time">[${time}]</span> <span class="alert">ALERT</span> Unauthorized access attempt on port <span class="port">${port}</span> from <span class="ip">${ip}</span> [${country}] (user: ${user})`;
    
    terminal.appendChild(logLine);
    
    // Auto-scroll en bas
    terminal.scrollTop = terminal.scrollHeight;
    
    // Garder seulement les 50 derniers logs
    if (terminal.childElementCount > 50) {
        terminal.removeChild(terminal.firstChild);
    }

    attacksCount++;
    atkCountEl.innerText = attacksCount.toLocaleString();
}

// Lancer une attaque visuelle (Arc sur le radar)
function spawnAttack() {
    // Point d'origine aléatoire sur les bords de l'écran
    const angle = Math.random() * Math.PI * 2;
    const distance = (Math.max(canvas.width, canvas.height) / 2) + 100;
    
    const startX = targetNode.x + Math.cos(angle) * distance;
    const startY = targetNode.y + Math.sin(angle) * distance;

    attacks.push({
        x: startX, y: startY,
        startX: startX, startY: startY,
        progress: 0,
        speed: 0.01 + (Math.random() * 0.02),
        color: Math.random() > 0.8 ? '#00e5ff' : '#ff003c' // La plupart sont rouges (attaques), parfois bleus (scans)
    });

    createLog();
}

// --- BOUCLE DE RENDU ---
let radarAngle = 0;

function draw() {
    // Fond avec léger fondu (rémanence)
    ctx.fillStyle = 'rgba(5, 10, 15, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dessin du Serveur Central (Honeypot)
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#00e5ff';
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(targetNode.x, targetNode.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Dessin du Radar de balayage
    radarAngle += 0.02;
    ctx.beginPath();
    ctx.moveTo(targetNode.x, targetNode.y);
    ctx.arc(targetNode.x, targetNode.y, canvas.width, radarAngle, radarAngle + 0.2);
    ctx.fillStyle = 'rgba(0, 229, 255, 0.1)';
    ctx.fill();

    // Grille
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, targetNode.y); ctx.lineTo(canvas.width, targetNode.y);
    ctx.moveTo(targetNode.x, 0); ctx.lineTo(targetNode.x, canvas.height);
    ctx.stroke();

    // Mise à jour et dessin des attaques (Tirs)
    for (let i = attacks.length - 1; i >= 0; i--) {
        let a = attacks[i];
        a.progress += a.speed;

        if (a.progress >= 1) {
            attacks.splice(i, 1); // Impact
            // Petit flash à l'impact
            ctx.fillStyle = a.color;
            ctx.beginPath(); ctx.arc(targetNode.x, targetNode.y, 15, 0, Math.PI*2); ctx.fill();
            continue;
        }

        // Interpolation linéaire
        a.x = a.startX + (targetNode.x - a.startX) * a.progress;
        a.y = a.startY + (targetNode.y - a.startY) * a.progress;

        // Dessin du projectile
        ctx.fillStyle = a.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = a.color;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Ligne de traînée
        ctx.strokeStyle = a.color;
        ctx.globalAlpha = 1 - a.progress;
        ctx.beginPath();
        ctx.moveTo(a.startX, a.startY);
        ctx.lineTo(a.x, a.y);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
    }

    requestAnimationFrame(draw);
}

// --- LOGIQUE DE DÉMARRAGE ---
let isRadarActive = false;

// Fonction appelée par le bouton "INITIALISER LE SUIVI RADAR"
function startRadar() {
    document.getElementById('start-screen').classList.add('hidden');
    isRadarActive = true;
    
    // Petit log système initial pour faire joli
    const logLine = document.createElement('div');
    logLine.className = 'log-line';
    logLine.innerHTML = `<span class="time">[${new Date().toLocaleTimeString('en-US', { hour12: false })}]</span> <span class="text-cyan">SYSTEM</span> Radar initialized. Awaiting inbound connections...`;
    terminal.appendChild(logLine);
}

// Lancement des attaques simulées (Ne tire que si le radar est actif)
setInterval(() => {
    if(isRadarActive && Math.random() < 0.6) {
        spawnAttack();
    }
}, 400); 

// ... (le reste du code : window.addEventListener resize et draw() restent inchangés)

// Lancement des attaques simulées
setInterval(() => {
    if(Math.random() < 0.6) spawnAttack();
}, 400); // Une attaque toutes les quelques millisecondes

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    targetNode.x = canvas.width / 2;
    targetNode.y = canvas.height / 2;
});

draw();