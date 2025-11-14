# Est-ce que ce conseiller est un piège ? Version Calculatrice
Évaluation scientifique de la force globale du conseiller, vous aidant à faire des choix académiques éclairés.
Comparez scientifiquement plusieurs conseillers pour vous aider à éviter les superviseurs problématiques.

![Banner](assets/Banner-advisor-calculator.png)

[![Website](https://img.shields.io/website?url=https%3A//ktwu01.github.io/advisor-calculator/)](https://ktwu01.github.io/advisor-calculator/) [![GitHub stars](https://img.shields.io/github/stars/ktwu01/advisor-calculator)](https://github.com/ktwu01/advisor-calculator) [![GitHub forks](https://img.shields.io/github/forks/ktwu01/advisor-calculator)](https://github.com/ktwu01/advisor-calculator/fork) ![cc-by-nc-nd](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)

[![English](https://img.shields.io/badge/lang-English-blue.svg)](README.md) [![中文](https://img.shields.io/badge/lang-中文-brown.svg)](README.CN.md) [![Español](https://img.shields.io/badge/lang-Espa%C3%B1ol-red.svg)](README.es.md) [![Français](https://img.shields.io/badge/lang-Fran%C3%A7ais-purple.svg)](README.fr.md) [![日本語](https://img.shields.io/badge/lang-日本語-green.svg)](README.ja.md)

---

![demo](assets/demo-View-Detailed-Analysis.png)

## 🎯 Fonctionnalités du Produit

### 🔍 Nouveau Système d'Évaluation à 20 Dimensions
- **Évaluation de la Personnalité**: Caractère du conseiller, compétences en communication, style de gestion, relation étudiant-conseiller.
- **Capacité Académique**: Force de recherche, réputation académique, perspectives de carrière, financement de la recherche.
- **Environnement de Travail**: Équilibre vie pro-vie perso, conditions du laboratoire, localisation géographique, taille du groupe de recherche.
- **Développement de Carrière**: Difficulté d'obtention du diplôme, politique de stage, salaire et avantages, relations entre pairs.

### 🎚️ Système de Pondération Intelligent
- **Recommandation pour Master**: Établissement 60% | Conseiller 40%
- **Recommandation pour Doctorat**: Établissement 30% | Conseiller 70%
- **Recommandation pour Post-doctorat**: Établissement 20% | Conseiller 80%
- **Ajustement Manuel**: Prend en charge la configuration de pondération personnalisée.
- **Conseils Intelligents**: Explications détaillées des définitions de pondération.

### 📊 Rapport d'Analyse Intelligent
- **Visualisation des Sous-scores**: Score de personnalité, score académique, score de traitement, score de perspectives.
- **Identification Précise des Risques**: Identifie automatiquement toutes les métriques d'évaluation spécifiques qui obtiennent moins de 3 points.
- **Analyse Personnalisée des Avantages**: Met en évidence les excellentes performances (4-5 points).
- **Suggestions Ciblées**: Conseils de décision basés sur des points de risque spécifiques.
- **Rapport Détaillé Pliable**: L'analyse complète peut être étendue.

### 💾 Gestion Complète des Données
- **Fonctionnalité d'Importation/Exportation**: Sauvegarde des données au format JSON.
- **Système de Surnoms de Conseiller**: Prend en charge les pseudonymes pour la protection de la vie privée.
- **Stockage Local**: Les données sont sécurisées et ne sont pas téléchargées sur les serveurs.
- **Contrôle de Version**: Les fichiers de données incluent des informations de version.

### 🎨 Excellente Expérience Utilisateur
- **Notation Descriptive**: Descriptions textuelles intuitives (par exemple, "996/007") au lieu de chiffres.
- **Conception Réactive**: Prise en charge parfaite des appareils de bureau et mobiles.
- **Calcul en Temps Réel**: Mises à jour instantanées des scores et des suggestions.
- **Comparaison Multi-Conseillers**: Prend en charge l'évaluation simultanée de jusqu'à 3 conseillers.
- **Conception d'Accessibilité**: Prend en charge la navigation au clavier et les lecteurs d'écran.

## 🚀 Démarrage Rapide

### Exigences de l'Environnement
- Node.js 16+
- npm/yarn/pnpm/bun

### Installation et Exécution

```bash
# Cloner le dépôt
git clone https://github.com/ktwu01/advisor-calculator.git
cd advisor-calculator

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Visitez [http://localhost:3000](http://localhost:3000) pour voir l'application.

### Déploiement

```bash
# Construire pour la production
npm run build

# Démarrer le serveur de production
npm start
```

## 📋 Guide d'Utilisation Détaillé

### 1. Configuration des Informations de Base
- **Surnom du Conseiller**: Utilisez un pseudonyme (par exemple, "Prof. X") pour faciliter l'identification et la gestion des données.
- **Sexe du Conseiller**: Influence le calcul du poids du style de gestion.
- **Tranche d'Âge**: Jeune/Milieu de carrière/Professeur senior, influence l'évaluation de l'expérience.
- **Titre du Conseiller**: De Maître de Conférences/Professeur Associé à Membre de l'Académie, ajuste automatiquement les poids académiques.
- **Niveau de l'Établissement**: 7 niveaux du Collège Communautaire à l'Ivy League / Université de Recherche de Premier Plan.
- **Programme de Diplôme**: Ajuste automatiquement la configuration du poids après la sélection.

### 2. Explication des 20 Métriques d'Évaluation
**Dimension Personnalité (4 éléments)**
- Caractère du conseiller, compétences en communication, style de gestion, relation étudiant-conseiller.

**Dimension Académique (4 éléments)**
- Force de recherche, réputation académique, perspectives de carrière, financement de la recherche.

**Dimension Travail (6 éléments)**
- Équilibre vie pro-vie perso, financement du groupe de recherche, conditions du laboratoire, localisation géographique, taille du groupe de recherche, proportion de sexe.

**Dimension Développement (6 éléments)**
- Difficulté d'obtention du diplôme, fréquence d'encadrement, politique de stage, salaire et avantages, coûts de la vie, relations entre pairs.

### 3. Système d'Évaluation Intelligent
- **Calcul en Temps Réel**: Les résultats se mettent à jour immédiatement après chaque évaluation.
- **Précision Décimale**: Tous les scores sont affichés avec une décimale.
- **Évaluation de Niveau**: Excellent Conseiller, Bon Conseiller, Moyen, Quelque peu Problématique, Drapeaux Rouges Majeurs.

### 4. Rapport d'Analyse Détaillé
**Informations de Base**
- Score total et évaluation de niveau.
- Affichage de la configuration de pondération actuelle.

**Sous-scores**
- Score de personnalité, score académique, score de traitement, score de perspectives.
- Disposition en grille 2x2, avec code couleur.

**Analyse Détaillée (Pliable)**
- **Principaux Avantages**: Métriques à score élevé et avantages de sous-catégorie.
- **Risques Potentiels**: Liste détaillée de toutes les métriques dont le score est inférieur à 3 points.
- **Suggestions Personnalisées**: Conseils ciblés basés sur des problèmes spécifiques.

### 5. Gestion des Données
- **Exporter les Données**: Sauvegarde sous forme de fichier JSON, y compris un horodatage.
- **Importer les Données**: Restaure les données d'évaluation précédentes.
- **Comparaison Multi-Conseillers**: Prend en charge l'évaluation simultanée de jusqu'à 3 conseillers.

## 🛠️ Architecture Technique

### Pile Technologique Frontend
- **Framework**: Next.js 15 + TypeScript
- **Bibliothèque d'UI**: shadcn/ui (Radix UI + Tailwind CSS)
- **Icônes**: Lucide React
- **Style**: Tailwind CSS
- **Composants**: Panneaux pliables, info-bulles, etc.

### Algorithme Central
- **Système de Pondération Intelligent**: Poids dynamiques basés sur le type de diplôme et le titre du conseiller.
- **Algorithme d'Identification des Risques**: Détection complète des métriques à faible score et génération de rapports de risques personnalisés.
- **Algorithme d'Analyse des Avantages**: Identification et déduplication des avantages multi-niveaux.
- **Algorithme de Génération de Suggestions**: Système de suggestions ciblé basé sur des problèmes spécifiques.

### Traitement des Données
- **Stockage Local**: Utilise localStorage pour les statistiques de visite.
- **Opérations de Fichiers**: Importation/exportation au format JSON.
- **Calcul en Temps Réel**: Calcul réactif basé sur l'état de React.

## 📦 Structure du Projet

```
advisor-calculator/
├── README.md, README.CN.md          # Documentation du Projet
├── assets/                          # Actifs
│   ├── Banner-advisor-calculator.png
│   └── todo.md                     # Journal de Développement
├── src/
│   ├── app/
│   │   ├── page.tsx                # Composant Principal de l'Application
│   │   ├── layout.tsx              # Disposition de l'Application
│   │   └── globals.css             # Styles Globaux
│   ├── components/ui/              # Bibliothèque de Composants UI
│   │   ├── badge.tsx, button.tsx, card.tsx
│   │   ├── collapsible.tsx         # Composant Pliable
│   │   ├── input.tsx, label.tsx, select.tsx
│   │   ├── slider.tsx, tooltip.tsx
│   └── lib/
│       └── utils.ts                # Fonctions Utilitaires
├── tailwind.config.ts              # Configuration Tailwind
├── components.json                 # Configuration shadcn/ui
└── deploy/                         # Configuration de Déploiement
    └── netlify.toml
```

## 🔬 Caractéristiques de l'Algorithme

### Identification Précise des Risques
- **Couverture Complète**: Détecte les éléments dont le score est <3 points sur les 20 métriques d'évaluation.
- **Résumé Intelligent**: Si ≤3 éléments, les liste ; si >3 éléments, affiche "les 3 premiers + nombre total".
- **Alertes Spéciales**: Vérifications spécifiques pour les métriques critiques (par exemple, 996/007, difficulté d'obtention du diplôme).
- **Analyse Stratifiée**: Risques de métriques spécifiques + risques de sous-scores.

### Système de Suggestion Personnalisé
- **Plage de Score Élevée (≥80)**: Fortement recommandé.
- **Score Moyen-Élevé (70-79)**: Généralement recommandé.
- **Plage de Score Moyenne (60-69)**: Une attention particulière aux points de risque est conseillée.
- **Plage de Score Faible (<60)**: Liste détaillée des problèmes majeurs.

### Algorithme de Pondération Multidimensionnel
- **Poids de Base**: Poids prédéfinis basés sur le type de diplôme.
- **Bonus de Titre**: Académicien, Professeur Distingué, etc., fournissent des bonus de poids académiques.
- **Influence de l'Établissement**: 7 niveaux de prestige de l'établissement fournissent des bonus de poids de marque.
- **Sexe et Âge**: Ajustements subtils basés sur l'expérience de gestion.

## 🤝 Guide de Contribution

### Flux de Travail de Développement
1. Forkez ce projet.
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`).
3. Validez vos modifications (`git commit -m 'Add some AmazingFeature'`).
4. Poussez vers la branche (`git push origin feature/AmazingFeature`).
5. Ouvrez une Pull Request.

### Normes de Code
- Utilisez TypeScript pour la vérification des types.
- Suivez les normes de code ESLint + Biome.
- Les composants utilisent la programmation fonctionnelle.
- Utilisez Tailwind CSS pour le style.

### Exigences de Test
- Assurez-vous que toutes les fonctionnalités fonctionnent correctement.
- Testez diverses combinaisons de scores.
- Vérifiez les fonctions d'importation/exportation.
- Vérifiez la mise en page réactive.

## 📄 Licence

Ce projet est sous licence [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/).
- ✅ Permet le téléchargement, l'utilisation et le partage.
- ❌ Interdit l'utilisation commerciale.
- ❌ Interdit les modifications et adaptations.

## ⚠️ Clause de Non-responsabilité

- **Outil de Référence**: Cet outil est à titre indicatif seulement. Veuillez faire des choix rationnels basés sur les circonstances réelles.
- **Protection de la Vie Privée**: Les données sont stockées localement uniquement et ne sont pas téléchargées sur les serveurs.
- **Évaluation Subjective**: Les résultats de l'évaluation sont basés sur un jugement subjectif et ne représentent pas une précision absolue.
- **Responsabilité de la Décision**: La responsabilité de la décision finale incombe uniquement à l'utilisateur.

## 🔗 Liens Connexes

- [🌐 Démo en Direct](https://ktwu01.github.io/advisor-calculator/)
- [🐛 Rapports de Bugs](https://github.com/ktwu01/advisor-calculator/issues)
- [💡 Suggestions de Fonctionnalités](https://github.com/ktwu01/advisor-calculator/discussions)
- [📖 README en Chinois](README.CN.md)

## 🎉 Journal des Modifications

### v2.1.0 Dernière Version
- ✅ Prise en charge de 5 langues : anglais, chinois, espagnol, français, japonais.
- ✅ Nouveau système d'évaluation à 20 dimensions
- ✅ Algorithme intelligent d'identification des risques
- ✅ Rapport d'analyse détaillé pliable
- ✅ Interface de notation descriptive
- ✅ Fonctionnalité complète d'importation/exportation
- ✅ Système de comparaison multi-conseillers
- ✅ Configuration de pondération personnalisée

### Versions Historiques
- **v2.0.0**: Ajout du système de pondération intelligent et de la gestion des données.
- **v1.5.0**: Nouvelle évaluation de la dimension économique.
- **v1.0.0**: Lancement du système d'évaluation de base.

---

**Si ce projet vous est utile, veuillez lui donner une ⭐ Étoile !**

> Que chaque étudiant trouve son conseiller idéal et évite les pièges sur son parcours académique ! 🎓
