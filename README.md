
---

# 🛡️ CYBER_NEXUS

> **Exploration Interactive de la Cybersécurité & Simulations Défensives**

**Cyber_Nexus** est un hub immersif regroupant **quatre modules interactifs** dédiés à la Blue Team, la Red Team, l’OSINT et à la présentation professionnelle.

Ce projet démontre comment les mécanismes d’attaque et de défense peuvent être rendus **visuels, pédagogiques et accessibles**, à travers une interface Sci-Fi minimaliste entièrement développée en **Vanilla JS**.

🔗 **[Voir le projet en ligne](https://cnuddematteo.github.io/cyber_nexus/)**

---

# 🧪 Les Modules

Le Nexus regroupe quatre environnements distincts, simulant des outils et logiques utilisés en cybersécurité réelle.

---

## 1. 📡 Project Aegis

### *(Blue Team / SOC Simulation)*

*Cartographie dynamique des menaces.*

### 🎯 Concept

Simulation d’un serveur vulnérable exposé sur Internet (Port 22) recevant des attaques en temps réel.

### 🧩 Features

* Radar d’attaques interactif (Canvas HTML5)
* Génération dynamique de logs (IP, Pays, Ports)
* Compteurs statistiques en direct
* Simulation algorithmique de trafic malveillant

### 🧠 Compétences démontrées

* Threat Intelligence
* Analyse & visualisation de logs
* Logique algorithmique
* Conception d’interface SOC

🎨 **Thème : Bleu Défensif**

---

## 2. 💥 Hash_Breaker

### *(Red Team / Cryptographie)*

*Comprendre la puissance du hachage et la faiblesse humaine.*

### 🎯 Concept

Visualisation comparative entre :

* Attaque par dictionnaire
* Attaque par force brute

### 🧩 Features

* Calculateur d’entropie en temps réel
* Estimation réaliste du temps de craquage (cluster GPU simulé à 100 GH/s)
* Générateur de mots de passe robustes
* Interface pédagogique interactive

### 🧠 Compétences démontrées

* Mathématiques du hachage
* Manipulation asynchrone du DOM
* Vulgarisation cyber
* UX pédagogique

🎨 **Thème : Rouge Offensif**

---

## 3. 🔍 Phish_Hunter

### *(OSINT / Forensics Simulation)*

*Analyse comportementale & scoring de menace.*

### 🎯 Concept

Moteur simulé d’agrégation d’informations pour évaluer la légitimité d’une URL ou d’un fichier.

### 🧩 Features

* Simulation de scans multi-moteurs (>15 antivirus)
* Gestion heuristique des faux positifs
* Génération d’empreinte SHA-256 simulée
* Rapport WHOIS / SSL
* Dashboard interactif avec scoring

### 🧠 Compétences démontrées

* OSINT
* Analyse statique
* Logique de scoring
* Conception de dashboard cyber

🎨 **Thème : Violet Analyse**

---

## 4. 👤 SYS.ADMIN

### *(Terminal Profil Interactif)*

*Un CV sous forme de terminal Linux.*

### 🧩 Features

* Animation “machine à écrire” personnalisée
* Affichage dynamique des compétences (Blue Team / Red Team / DevSec)
* Liens vers GitHub, LinkedIn, CV PDF

🎨 **Thème : Vert Terminal**

---

# ✨ Fonctionnalités Globales

* **Architecture modulaire** (un dossier par outil)
* **Interface immersive minimaliste**
* **Zéro dépendance externe (hors icônes)**
* **Optimisé pour fluidité & lisibilité pédagogique**

---

# 📂 Structure du Projet

```text
cyber_nexus/
│
├── README.md               # Documentation du projet
├── index.html              # Hub central
├── style_hub.css           # Styles globaux
│
├── aegis/                  # 🛡️ Blue Team
│   ├── aegis.html
│   ├── style_aegis.css
│   └── script_aegis.js
│
├── hash/                   # 💥 Red Team
│   ├── hash.html
│   ├── style_hash.css
│   └── script_hash.js
│
├── phish/                  # 🔍 OSINT
│   ├── phish.html
│   ├── style_phish.css
│   └── script_phish.js
│
└── about/                  # 👤 Profil
    ├── about.html
    ├── style_about.css
    └── script_about.js
```

---

# 🛠️ Stack Technique

* **Core :** HTML5, CSS3, JavaScript (ES6+)
* **Rendu :** HTML5 `<canvas>` (2D Context)
* **Design :** CSS Variables, Grid/Flexbox, Glassmorphism
* **Icônes :** FontAwesome
* **Zéro Framework :** Aucune librairie externe

---

# 🚀 Installation

Projet 100% statique (Client-side).

1️⃣ **Cloner le dépôt**

```bash
git clone https://github.com/cnuddeMatteo/cyber_nexus.git
```

2️⃣ **Lancer**

Ouvrir `index.html` dans un navigateur moderne
(Chrome, Firefox, Brave, Edge)

---

# 💡 Vision du Projet

Cyber_Nexus a été conçu pour :

* 🛡️ Rendre la cybersécurité visuellement compréhensible
* 🧠 Illustrer des concepts complexes via simulation
* ⚙️ Démontrer une approche DevSec orientée produit
* 📚 Sensibiliser aux bonnes pratiques de sécurité

---

# 👤 Auteur

**Mattéo Cnudde**
🎓 Étudiant en Cybersécurité & Développeur

* 🔗 GitHub : [https://github.com/cnuddeMatteo](https://github.com/cnuddeMatteo)
* 🔗 LinkedIn : [https://www.linkedin.com/in/mattéo-cnudde-71a7b5327/](https://www.linkedin.com/in/mattéo-cnudde-71a7b5327/)

> *“Defense in depth, from code to infrastructure.”*

---

