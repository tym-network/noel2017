// https://www.mapbox.com/help/custom-markers-gl-js/
// https://www.mapbox.com/mapbox-gl-js/example/flyto/


(function() {
    var places = [
        {
            id: 1,
            title: "La Kerterre",
            description: "Pourquoi ne pas passer une petite soirée dans une cabane en chanvre et chaux, au fond d'une petite bambouseraie? Aux portes de la Bretagne, la Kerterre vous permettra de passer un petit week-end reposant à la campagne.",
            photos: [{
                src: 'dist/pictures/kerterre1.jpg',
                msrc: 'dist/pictures/thumb/kerterre1.jpg',
                w: 952,
                h: 578
            }, {
                src: 'dist/pictures/kerterre2.jpg',
                msrc: 'dist/pictures/thumb/kerterre2.jpg',
                w: 954,
                h: 716
            }],
            url: "http://www.bambouturage.com/la-kerterre.html",
            lon: -1.16339210000001,
            lat: 48.2811742
        },
        {
            id: 2,
            title: "Yourte de la tanière des p'tits loups",
            description: "Quoi de mieux qu'une petite yourte pour se dépayser un peu? Accompagnée de son ranch, c'est une douce parenthèse qui vous attends dans la yourte des p'tits loups.",
            photos: [{
                src: 'dist/pictures/yourte1.jpg',
                msrc: 'dist/pictures/thumb/yourte1.jpg',
                w: 2048,
                h: 1400
            }, {
                src: 'dist/pictures/yourte2.jpg',
                msrc: 'dist/pictures/thumb/yourte2.jpg',
                w: 2048,
                h: 1365
            }, {
                src: 'dist/pictures/yourte3.jpg',
                msrc: 'dist/pictures/thumb/yourte3.jpg',
                w: 2048,
                h: 1536
            }],
            url: "http://ayourtenature.canalblog.com/",
            lon: 4.249141,
            lat: 46.778166
        },
        {
            id: 3,
            title: "Yourte chez Cathyourte",
            description: "Si vous voulez une yourte tout confort, c'est chez Cathyourte qu'il faut aller. Douche et espace cuisine, ces yourtes ont tout ce qu'il faut!",
            photos: [{
                src: 'dist/pictures/cathyourte1.jpg',
                msrc: 'dist/pictures/thumb/cathyourte1.jpg',
                w: 1024,
                h: 633
            }, {
                src: 'dist/pictures/cathyourte2.jpg',
                msrc: 'dist/pictures/thumb/cathyourte2.jpg',
                w: 1920,
                h: 1280
            }],
            url: "https://www.yourte-en-touraine.com/nos-yourtes",
            lon: 0.8517579,
            lat: 47.4517514
        },
        {
            id: 4,
            title: "Dôme aux étoiles",
            description: "Comment faire pour avoir la tête dans les étoiles, tout en étant au sec? Il suffit d'aller dans le dôme aux étoiles, une tente avec des parrois transparentes pour profiter de la nuit tout en étant à l'abris.",
            photos: [{
                src: 'dist/pictures/domeetoile1.jpg',
                msrc: 'dist/pictures/thumb/domeetoile1.jpg',
                w: 1166,
                h: 1458
            }, {
                src: 'dist/pictures/domeetoile2.jpg',
                msrc: 'dist/pictures/thumb/domeetoile2.jpg',
                w: 800,
                h: 1000
            }],
            url: "http://chouette-etoilee.fr/le-dome/",
            lon: 3.9643653,
            lat: 48.0753174
        },
        {
            id: 5,
            title: "Le voilier des rêves",
            description: "Le remous de l'eau, la vie sur un bateau, le bruit reposant des vagues, voilà ce qu'il vous attend sur ce voilier.",
            photos: [{
                src: 'dist/pictures/voilier1.jpg',
                msrc: 'dist/pictures/thumb/voilier1.jpg',
                w: 914,
                h: 683
            }, {
                src: 'dist/pictures/voilier2.jpg',
                msrc: 'dist/pictures/thumb/voilier2.jpg',
                w: 914,
                h: 683
            }],
            url: "https://www.airbnb.fr/rooms/10851698",
            lon: -2.544923,
            lat: 47.380844
        },
        {
            id: 6,
            title: "La roulotte de la bergère",
            description: "Roule ma poule! Cette grande roulotte vous propose une nuit charmante et originale.",
            photos: [{
                src: 'dist/pictures/roulotte1.jpg',
                msrc: 'dist/pictures/thumb/roulotte1.jpg',
                w: 1300,
                h: 858
            }, {
                src: 'dist/pictures/roulotte2.jpg',
                msrc: 'dist/pictures/thumb/roulotte2.jpg',
                w: 1300,
                h: 858
            }, {
                src: 'dist/pictures/roulotte3.jpg',
                msrc: 'dist/pictures/thumb/roulotte3.jpg',
                w: 1156,
                h: 858
            }],
            url: "https://www.fermedelapomme.com/roulotte-chambre-hotes-pays-auge/",
            lon: 0.3362553,
            lat: 49.208905
        },
        {
            id: 7,
            title: "La roulotte de 1920",
            description: "Presque 100ans et toutes ses roues! Cette roulotte atypique saura vous dépayser.",
            photos: [{
                src: 'dist/pictures/roulotte4.jpg',
                msrc: 'dist/pictures/thumb/roulotte4.jpg',
                w: 1800,
                h: 1200
            }, {
                src: 'dist/pictures/roulotte5.jpg',
                msrc: 'dist/pictures/thumb/roulotte5.jpg',
                w: 960,
                h: 720
            }],
            url: "https://fermedeboheme.jimdo.com/fran%C3%A7ais/la-roulotte/",
            lon: -0.4078997,
            lat: 48.326429
        },
        {
            id: 8,
            title: "La roulotte des Anges",
            description: "Bien équipée et toute confortable, c'est une nuit dans les bras de Morphée qui vous est réservée!",
            photos: [{
                src: 'dist/pictures/roulotte6.jpg',
                msrc: 'dist/pictures/thumb/roulotte6.jpg',
                w: 1200,
                h: 553
            }, {
                src: 'dist/pictures/roulotte7.jpg',
                msrc: 'dist/pictures/thumb/roulotte7.jpg',
                w: 100,
                h: 750
            }],
            url: "http://www.roulottesdeshayes.fr/?p=19",
            lon: 1.0015653,
            lat: 47.524765
        },
        {
            id: 9,
            title: "Nuit à la Ferme Aventure",
            description: "Tente suspendues, cabanes dans les arbres, domes de verre et même avion, la Ferme Aventure vous propose différents logements, tous plus originaux les uns que les autres.",
            photos: [{
                src: 'dist/pictures/fermeaventure1.jpg',
                msrc: 'dist/pictures/thumb/fermeaventure1.jpg',
                w: 550,
                h: 366
            }, {
                src: 'dist/pictures/fermeaventure2.jpg',
                msrc: 'dist/pictures/thumb/fermeaventure2.jpg',
                w: 550,
                h: 366
            }, {
                src: 'dist/pictures/fermeaventure3.jpg',
                msrc: 'dist/pictures/thumb/fermeaventure3.jpg',
                w: 550,
                h: 366
            }, {
                src: 'dist/pictures/fermeaventure4.jpg',
                msrc: 'dist/pictures/thumb/fermeaventure4.jpg',
                w: 600,
                h: 400
            }, {
                src: 'dist/pictures/fermeaventure5.jpg',
                msrc: 'dist/pictures/thumb/fermeaventure5.jpg',
                w: 600,
                h: 400
            }],
            url: "http://nuitsinsolites.com/#hebergements",
            lon: 6.3121181,
            lat: 48.0047743
        },
        {
            id: 10,
            title: "Tentes suspendues",
            description: "On sait déjà que vous avez la tête dans les étoiles, mais avec ces tentes suspendues, c'est votre soirée qui sera loin du sol!",
            photos: [{
                src: 'dist/pictures/tentesuspendue.jpg',
                msrc: 'dist/pictures/thumb/tentesuspendue.jpg',
                w: 800,
                h: 600
            }],
            url: "http://www.woody-park.com/tentes-suspendues/",
            lon: 0.3807663,
            lat: 49.747389
        }
    ];

    // var geojson = {
    //     type: 'FeatureCollection',
    //     features: []
    // };

    var currentPlace = null;

    // Create map
    mapboxgl.accessToken = 'pk.eyJ1IjoieXVuYXBzcCIsImEiOiJjamIwdXgxN3U4ajZqMnFudzE3NnRrdTljIn0.ZcH3shQklHQ9_0_VLhk7pQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v9',
        center: [2.197, 46.514],
        zoom: 5
    });

    var getPlaceById = function(id) {
        var place = null;
        for (var i = 0, l = places.length; i < l; i++) {
            if (places[i].id === id) {
                place = places[i];
                break;
            }
        }

        return place;
    };

    /**
     * Create the architecture about a place
     */
    var createPlace = function(place) {
        var html = '<div id="place-description-' + place.id + '" style="display: none;">';
        html += '<button type="button" class="back-to-list">Retour</button>';
        html += '<h1>' + place.title + '</h1>';
        html += '<p>' + place.description + '</p>';
        html += '<div class="place-description-pictures">';
        for (var i = 0, l = place.photos.length; i < l; i++) {
            html += '<img alt="" src="' + place.photos[i].msrc + '"/>';
        }
        html += '</div>';
        html += '<a class="button primary" href="' + place.url + '" target="_blank">En savoir plus</a>';
        html += '</div>';
        return html;
    };

    // var placeToGeoJSon = function(place) {
    //     if ('lon' in place && 'lat' in place) {
    //         geojson.features.push({
    //             type: 'Feature',
    //             geometry: {
    //                 type: 'Point',
    //                 coordinates: [place.lon, place.lat]
    //             }
    //         });
    //     }
    // }

    /**
     * Handle picture gallery
     */
    var openPhotoGallery = function(place) {
        var pswpElement = document.querySelectorAll('.pswp')[0];

        // build items array
        var items = place.photos;

        var options = {
            index: 0,
            history: false
        };

        // Initializes and opens PhotoSwipe
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    /**
     * Show place with the given id or the list if null is given
     */
    var showPlace = function(id) {
        var currentPlaceElement = null,
            currentNavigationLink = null,
            placeElement = null,
            navigationLink = null,
            place;

        if (id) {
            place = getPlaceById(parseInt(id, 10));
        }

        if (currentPlace) {
            currentPlaceElement = document.querySelector('#place-description-' + currentPlace);
            currentNavigationLink = document.querySelector('#navigation-links button[data-place="' + currentPlace + '"]');
        } else {
            currentPlaceElement = document.querySelector('#place-description-intro');
            currentNavigationLink = document.querySelector('#navigation-links button[data-place=""]');
        }

        if (id) {
            placeElement = document.querySelector('#place-description-' + id);
            navigationLink = document.querySelector('#navigation-links button[data-place="' + id + '"]');
        } else {
            placeElement = document.querySelector('#place-description-intro');
            navigationLink = document.querySelector('#navigation-links button[data-place=""]');
        }

        currentPlaceElement.setAttribute("style", "display: none;");
        currentNavigationLink.classList.remove("active");
        placeElement.setAttribute("style", "display: block;");
        navigationLink.classList.add("active");
        currentPlace = id;
        map.resize();

        map.flyTo({
            center: [
                place ? place.lon : 2.197,
                place ? place.lat : 46.514
            ],
            zoom: place ? 9 : 5
        });
    };

    var addMarker = function(place) {
        // Create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';
        el.addEventListener('click', function() {
            showPlace(place.id);
        });

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
            .setLngLat([place.lon, place.lat])
            .addTo(map);
    };

    var nextPlace = function() {
        var nextPlace = currentPlace + 1;
        if (nextPlace > places.length) {
            nextPlace = 1;
        }
        showPlace(nextPlace);
    };

    var previousPlace = function() {
        var previousPlace = currentPlace - 1;
        if (previousPlace < 1) {
            previousPlace = places.length;
        }
        showPlace(previousPlace);
    };

    /*
     * Display the different places and handle switch between them
     */

    // Add correct divs
    var placeDescription = document.querySelector('#place-description');
    for (var i = 0, l = places.length; i < l; i++) {
        var place = places[i],
            placeDescriptionList,
            navigationLinks;

        // Add link to the menu
        placeDescriptionList = placeDescription.querySelector('#place-description-list');
        placeDescriptionList.innerHTML += '<li><button type="button" data-place="' + place.id + '">' + place.id + '. ' + place.title + '</button></li>';

        // Add content div
        placeDescription.innerHTML += createPlace(place);

        // Add link in navigation
        navigationLinks = document.querySelector('#navigation-links');
        navigationLinks.innerHTML += '<li><button type="button" data-place="' + place.id + '"></button></li>';

        // Fill Geojson
        addMarker(place);
    }

    // Handle button to see each place's description
    var placeDescriptionButtons = document.querySelectorAll('#place-description-list li > button');
    for (var i = 0, l = placeDescriptionButtons.length; i < l; i++) {
        placeDescriptionButtons[i].addEventListener('click', function() {
            var placeId = this.getAttribute('data-place');
            showPlace(placeId);
        });
    }

    // Handle back button
    var placeDescriptionBack = document.querySelectorAll('#place-description .back-to-list');
    for (var i = 0, l = placeDescriptionBack.length; i < l; i++) {
        placeDescriptionBack[i].addEventListener('click', function() {
            showPlace();
        });
    }

    // Handle navigation links
    var navigationLinks = document.querySelectorAll('#navigation-links button');
    for (var i = 0, l = navigationLinks.length; i < l; i++) {
        navigationLinks[i].addEventListener('click', function() {
            var placeId = this.getAttribute('data-place');
            showPlace(placeId);
        });
    }

    map.resize();

    document.querySelector('#navigation .arrow-button.previous').addEventListener('click', previousPlace);
    document.querySelector('#navigation .arrow-button.next').addEventListener('click', nextPlace);
}());