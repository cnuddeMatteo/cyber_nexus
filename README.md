# 🛡️ CYBER_NEXUS

> **Portfolio Opérationnel & Simulateur d'Outils de Cybersécurité**

**Cyber_Nexus** est un hub interactif conçu pour démontrer de manière visuelle et pédagogique des concepts clés de la cybersécurité. Contrairement aux scripts en ligne de commande traditionnels, ce projet met l'accent sur l'**UI/UX**, la **Data Visualisation** et la compréhension des mécanismes d'attaque et de défense.

🔗 **[Accéder au Nexus (Live Demo)](#)** *(Remplace par ton lien GitHub Pages)*

---

## 🚀 Les Modules

Le Nexus regroupe 3 outils majeurs couvrant les aspects Blue Team, Red Team et OSINT, ainsi qu'un terminal d'identification de l'auteur.

### 1. 📡 Project Aegis (Blue Team / SOC)
*Simulateur de Honeypot et Cartographie des Menaces.*
* **Concept :** Visualisation en temps réel des attaques sur un serveur vulnérable exposé sur Internet (Port 22).
* **Features :** Radar d'attaques interactif développé avec l'API Canvas HTML5, génération de logs dynamiques (IPs, Pays, Ports), et compteurs de statistiques en direct.
* **Compétences démontrées :** Threat Intelligence, Visualisation de logs, Logique algorithmique.

### 2. 💥 Hash_Breaker (Red Team / Crypto)
*Simulateur d'Attaques Cryptographiques & Sensibilisation.*
* **Concept :** Démonstration visuelle de la différence entre une attaque par dictionnaire et par force brute.
* **Features :** Calculateur d'entropie en temps réel, estimation réaliste du temps de craquage (simulation d'un cluster GPU à 100 GH/s), générateur de mots de passe robustes et interface pédagogique.
* **Compétences démontrées :** Mathématiques du hachage, Gestion du DOM asynchrone, Pédagogie Cyber.

### 3. 🔍 Phish_Hunter (OSINT / Forensics)
*Moteur d'Analyse d'URL et de Fichiers (Style VirusTotal).*
* **Concept :** Agrégation de données pour déterminer la légitimité d'une cible (URL ou Fichier).
* **Features :** Simulation de scans multi-moteurs (plus de 15 AV), calcul de faux positifs (Heuristique/Liste blanche), empreintes SHA-256 simulées, et génération de rapports WHOIS/SSL.
* **Compétences démontrées :** OSINT, Analyse comportementale statique, Conception de Dashboard (UI).

### 4. 👤 SYS.ADMIN (Profil)
*Terminal interactif de présentation.*
* **Concept :** Un CV sous forme de terminal Linux avec effet "machine à écrire".
* **Features :** Animation JS personnalisée, affichage dynamique des compétences (Blue Team, Red Team, DevSec), liens vers les réseaux sociaux et le CV PDF.

---

## 🛠️ Stack Technique

Ce projet a été construit **sans aucune librairie ou framework externe** pour prouver une maîtrise totale des langages fondamentaux du web :

* **Frontend :** HTML5, CSS3 (Variables, CSS Grid, Flexbox, Animations, Glassmorphism).
* **Logique & Rendu :** JavaScript (ES6+), API DOM, Canvas HTML5 2D.
* **Icônes :** FontAwesome.

---

## ⚙️ Installation & Lancement

Ce projet est 100% statique (Client-side). Aucune base de données ou serveur backend n'est requis pour exécuter la simulation.

1. **Cloner le dépôt :**
   ```bash
   git clone [https://github.com/TonPseudo/cyber_nexus.git](https://github.com/TonPseudo/cyber_nexus.git)
