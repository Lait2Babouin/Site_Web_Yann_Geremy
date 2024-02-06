document.addEventListener("DOMContentLoaded", function() {
    // Récupérer l'élément .artist
    var artistElement = document.querySelector('.artist');
    
    // Faire une requête à l'API "theaudiodb"
    fetch('https://www.theaudiodb.com/api/v1/json/2/artist.php?i=112024')
    .then(response => response.json())
    .then(data => {
        // Vérifier si des données sont disponibles
        if(data.artists && data.artists.length > 0) {
            var artistInfo = data.artists[0]; // Prendre le premier artiste trouvé
            
            // Construire le tableau HTML avec les informations spécifiques
            var tableHTML = '<table>';
            // Ajouter chaque champ spécifique dans une ligne du tableau
            var fieldsToDisplay = ['strArtist', 'strLabel', 'intFormedYear', 'intBornYear', 'strStyle', 'strGenre'];
            fieldsToDisplay.forEach(field => {
                if (artistInfo[field]) { // Vérifier si la valeur existe
                    tableHTML += '<tr>';
                    tableHTML += '<td>' + artistInfo[field] + '</td>'; // Valeur de l'information
                    tableHTML += '</tr>';
                }
            });
            tableHTML += '</table>';
            
            // Mettre à jour le contenu de l'élément .artist avec le tableau
            artistElement.innerHTML = tableHTML;
        } else {
            // Afficher un message si aucun artiste n'est trouvé
            artistElement.innerHTML = '<p>Aucune information disponible pour cet artiste.</p>';
        }
    })
    .catch(error => {
        // Gérer les erreurs de requête pour l'API "theaudiodb"
        console.error('Erreur de requête:', error);
        artistElement.innerHTML = '<p>Erreur lors de la récupération des informations de l\'artiste.</p>';
    });
});
