(function() {
    /**
     * window.data.places should be like this:
     * window.data.places = [
     *     id: 1,
     *     title: "Title",
     *     description: "Description here",
     *     photos: [{
     *         src: 'dist/pictures/file1.jpg',
     *         msrc: 'dist/pictures/thumb/file1.jpg',
     *         w: 952,
     *         h: 578
     *     }],
     *     url: "http://test.com",
     *     lon: -1.16339210000001,
     *     lat: 48.2811742
     * ]
     */

    // Store places and currently display place
    var places = window.data.places,
        currentPlace = null,
        map;

    var body = document.querySelector('body'),
        mainContentEl = document.querySelector('#main-content'),
        navigationEl = document.querySelector('#navigation');
        mapEl = document.querySelector('#map');

    /**
     * Div is now on the left of the screen, switch the content
     */
    var mainContentTransitionEnd = function(e) {
        var placeDescriptionIntroContainerEl = document.querySelector('#place-description-intro-container');

        if (e.target == mainContentEl && e.propertyName === 'left') {
            mainContentEl.removeEventListener('transitionend', mainContentTransitionEnd);
            body.classList.remove('welcome');
            mainContentEl.classList.remove('move-down-phone');
            mainContentEl.classList.remove('move-left-desktop');
            body.classList.add('places');
            navigationEl.setAttribute('style', 'transform: translateY(200%) rotate(10deg);');
            mapEl.setAttribute('style', 'transform: translateX(100%) rotate(10deg);');
            placeDescriptionIntroContainerEl.setAttribute('style', 'opacity: 0;');

            initSecondPage();

            setTimeout(function() {
                navigationEl.removeAttribute('style');
                mapEl.removeAttribute('style');
                placeDescriptionIntroContainerEl.removeAttribute('style');
            }, 0);
        }
    }

    /**
     * Handles the animation from the first to the second page
     */
    var displaySecondPage = function() {
        var mainContentPosition = mainContentEl.getBoundingClientRect(),
            top = mainContentPosition.top + window.scrollY,
            left = mainContentPosition.left + window.scrollX,
            width = mainContentEl.offsetWidth;

        mainContentEl.setAttribute('style', 'position: absolute; top:' + top + 'px; left: ' + left + 'px; width: ' + width + 'px;');

        window.requestAnimationFrame(function() {
            if (window.matchMedia("(max-width: 900px)").matches) {
                mainContentEl.classList.add('move-down-phone');
            } else {
                mainContentEl.classList.add('move-left-desktop');
            }

            window.requestAnimationFrame(function() {
                mainContentEl.addEventListener('transitionend', mainContentTransitionEnd);
                mainContentEl.removeAttribute('style');
            });
        });
    };

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
        var placeDescription = document.createElement('div');
        placeDescription.setAttribute('id', 'place-description-' + place.id);
        placeDescription.setAttribute('class', 'place-description');
        placeDescription.setAttribute('style', 'display: none;');

        var backToList = document.createElement('button');
        backToList.setAttribute('type', 'button');
        backToList.setAttribute('class', 'back-to-list');
        backToList.innerHTML = '<svg class="left-arrow" viewBox="0 0 20 20"><path d="m335 274c0 3-1 5-3 7l-133 133c-2 2-5 3-7 3-2 0-5-1-7-3l-14-14c-2-2-3-4-3-7 0-2 1-5 3-6l112-113-112-112c-2-2-3-4-3-7 0-2 1-4 3-6l14-14c2-2 5-3 7-3 2 0 5 1 7 3l133 133c2 2 3 4 3 6z" transform="scale(0.046875 0.046875)"></path></svg> Retour';
        placeDescription.appendChild(backToList);

        var h1 = document.createElement('h1');
        h1.appendChild(document.createTextNode(place.title));
        placeDescription.appendChild(h1);

        var p = document.createElement('p');
        p.appendChild(document.createTextNode(place.description));
        placeDescription.appendChild(p);

        var placeDescriptionPictures = document.createElement('div');
        var img;
        for (var i = 0, l = place.photos.length; i < l; i++) {
            img = document.createElement('img');
            img.setAttribute('alt', '');
            img.setAttribute('src', place.photos[i].msrc);
            img.addEventListener('click', function() {
                openPhotoGallery(place, i);
            });
            placeDescriptionPictures.appendChild(img);
        }
        placeDescription.appendChild(placeDescriptionPictures);

        var link = document.createElement('a');
        link.setAttribute('class', 'link button primary');
        link.setAttribute('href', place.url);
        link.setAttribute('target', '_blank');
        link.appendChild(document.createTextNode('En savoir plus'));
        placeDescription.appendChild(link);

        return placeDescription;
    };

    /**
     * Handle picture gallery
     */
    var openPhotoGallery = function(place, el, index) {
        var pswpElement = document.querySelectorAll('.pswp')[0];

        // build items array
        var items = place.photos;
        var options = {
            index: index ? index - 1 : 0,
            history: false,
            shareEl: false
        };

        // Initializes and opens PhotoSwipe
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    /**
     * Transitionend handler
     */
    var backToListTransitionendHandler = function(currentPlaceElement) {
        return function (e) {
            if (e.target == document.querySelector('#place-description') && e.propertyName === 'transform') {
                currentPlaceElement.setAttribute('style', 'display: none;');
                document.querySelector('#place-description').removeEventListener('transitionend', arguments.callee);
            }
        }
    };

    /**
     * Transitionend handler
     */
    var betweenPlacesTransitionendHandler = function(currentPlaceElement, placeElement) {
        return function (e) {
            if (e.target == placeElement && e.propertyName === 'opacity') {
                currentPlaceElement.setAttribute('style', 'display: none;');
                placeElement.classList.remove('show');
                document.querySelector('#place-description').removeEventListener('transitionend', arguments.callee);
            }
        };
    };

    /**
     * Show place with the given id or the list if null is given
     */
    var showPlace = function(id) {
        var currentPlaceElement = null,
            placeElement = null,
            currentNavigationLink = null,
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

        // Show transition
        if (id && currentPlace) {
            // Switch between places (opacity)
            document.querySelector('#place-description').addEventListener('transitionend', betweenPlacesTransitionendHandler(currentPlaceElement, placeElement));
            placeElement.classList.add('show');
        } else if (currentPlace) {
            // Go back to list
            document.querySelector('#place-description').addEventListener('transitionend', backToListTransitionendHandler(currentPlaceElement));
        }
        currentNavigationLink.classList.remove('active');
        placeElement.setAttribute('style', 'display: block;');
        if (id && currentPlace) {
            setTimeout(function() {
                placeElement.setAttribute('style', 'display: block;opacity: 1;');
            }, 1);
        }
        navigationLink.classList.add('active');
        if (id) {
            document.querySelector('#place-description').classList.add('show-description');
        } else {
            document.querySelector('#place-description').classList.remove('show-description');
        }
        currentPlace = id;
        map.resize();

        if (id) {
            map.flyTo({
                center: [
                    place ? place.lon : 2.197,
                    place ? place.lat : 46.514
                ],
                zoom: place ? 9 : 5
            });
        } else {
            map.fitBounds([[-3.9, 46.2], [8.8, 50.5]])
        }
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

    var initSecondPage = function() {
        // Create the map
        map = new mapboxgl.Map({
            container: 'map-container',
            style: 'mapbox://styles/mapbox/light-v9',
            center: [2.8530387, 48.6791841],
            zoom: 5
        });

        /*
        * Display the different places and handle switch between them
        */

        // Add correct divs
        var placeDescription = document.querySelector('#place-description-container');
        for (var i = 0, l = places.length; i < l; i++) {
            var place = places[i],
                placeDescriptionList,
                navigationLinks;

            // Add link to the menu
            placeDescriptionList = placeDescription.querySelector('#place-description-list');
            placeDescriptionList.innerHTML += '<li><button type="button" data-place="' + place.id + '">' + place.id + '. ' + place.title + '<svg class="right-arrow" viewBox="0 0 20 20"><path d="m335 274c0 3-1 5-3 7l-133 133c-2 2-5 3-7 3-2 0-5-1-7-3l-14-14c-2-2-3-4-3-7 0-2 1-5 3-6l112-113-112-112c-2-2-3-4-3-7 0-2 1-4 3-6l14-14c2-2 5-3 7-3 2 0 5 1 7 3l133 133c2 2 3 4 3 6z" transform="scale(0.046875 0.046875)"></path></svg></button></li>';

            // Add content div
            placeDescription.appendChild(createPlace(place));

            // Add link in navigation
            navigationLinks = document.querySelector('#navigation-links');
            navigationLinks.innerHTML += '<li><button class="button-link" type="button" data-place="' + place.id + '"></button></li>';

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
        map.fitBounds([[-3.9, 46.2], [8.8, 50.5]], { duration: 0 })

        document.querySelector('#navigation .arrow-button.previous').addEventListener('click', previousPlace);
        document.querySelector('#navigation .arrow-button.next').addEventListener('click', nextPlace);
    }

    document.querySelector('.display-places').addEventListener('click', displaySecondPage);
}());