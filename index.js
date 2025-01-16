const mongoose = require('mongoose');
const Users = require('./user');  // Assurez-vous que ce fichier exporte correctement votre modèle Users

// Importer dotenv pour gérer les variables d'environnement
require('dotenv').config({ path: './.env' });

(async function () {
    try {
        // Connexion à la base de données MongoDB avec l'URI dans le fichier .env
        console.log('Tentative de connexion à la base de données...');
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Vous êtes connectés à la base de données');

        // Insertion d'un seul utilisateur avec la méthode save
        const user = new Users({
            nom: "Aida",
            age: 25,
            favoriteFoods: ["poulet", "thieb"]
        });

        const result = await user.save();
        console.log('Utilisateur ajouté avec succès:', result);

        // Insertion de plusieurs utilisateurs avec la méthode create
        const arraypeople = [
            { nom: "Fatou", age: 15, favoriteFoods: ["yassa", "hamburger"] },
            { nom: "Iboulaye Sarr", age: 15, favoriteFoods: ["yassa", "spaghetti"] },
            { nom: "Baye Ndiaye", age: 15, favoriteFoods: ["fataya", "soupe"] },
            { nom: "Iboulaye", age: 15, favoriteFoods: ["viande"] }
        ];

        // Utilisation de la méthode create pour insérer plusieurs utilisateurs
        const result2 = await Users.create(arraypeople);
        console.log('Utilisateurs ajoutés avec succès:', result2);


        // pour rechercher dans la base de donnees
         const recher = await Users.find();
         console.log(recher);
         

        // pour   Utilisez model.findOne() pour renvoyer un seul document correspondant de votre base de données
         const  collect1 = await Users.findOne()

        //Utilisez model.findById() pour rechercher votre base de données par _id 
        const  collect2 = await Users.findById('6787db0cbe868ac2f894d1d4');

        //Trouvez une personne par _id (utilisez l'une des méthodes ci-dessus) avec le paramètre personId comme clé de recherche. 
        // Ajoutez "hamburger" à la liste des aliments préférés de la personne (vous pouvez utiliser Array.push()). Puis - dans le callback find - save() la personne mise à jour.
        const userId = '6787db0cbe868ac2f894d1d3';
        const person = await Users.findById(userId);
    person.favoriteFoods.push('hamburger');
    await person.save();
//Exécuter de nouvelles mises à jour sur un document à l'aide de model.findOneAndUpdate() Trouve une personne par son nom et fixe son âge à 20 ans.
const updatedUser = await Users.findOneAndUpdate(
    { nom: 'Fatou' },
    { age: 20 }, 
    { new: true } 
);
console.log('Utilisateur mis à jour:', updatedUser);

//Supprimer un document à l'aide de model.findByIdAndRemove ,Supprimer une personne par son _id.
const deletedUser = await Users.findByIdAndRemove('6787db0cbe868ac2f894d1d4');
console.log('Utilisateur supprimé:', deletedUser);

    } catch (error) {
        console.error('Erreur lors de l\'insertion des utilisateurs:', error.message);
    } finally {
        // Fermer la connexion à la base de données après l'exécution
        await mongoose.disconnect();
        console.log('Déconnexion de la base de données.');
    }
})();
