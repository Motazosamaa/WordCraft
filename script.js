$(document).ready(function() {
    const lettersVAR = [
        { letter: 'A', image: './assets/images/a.jpg' },
        { letter: 'B', image: './assets/images/b.jpg' },
        { letter: 'C', image: './assets/images/c.jpg' },
        { letter: 'D', image: './assets/images/d.jpg' },
        { letter: 'E', image: './assets/images/e.jpg' },
        { letter: 'F', image: './assets/images/f.jpg' },
        { letter: 'G', image: './assets/images/g.jpg' },
        { letter: 'H', image: './assets/images/h.jpg' },
        { letter: 'I', image: './assets/images/i.jpg' },
        { letter: 'J', image: './assets/images/j.jpg' },
        { letter: 'K', image: './assets/images/k.jpg' },
        { letter: 'L', image: './assets/images/l.jpg' },
        { letter: 'M', image: './assets/images/m.jpg' },
        { letter: 'N', image: './assets/images/n.jpg' },
        { letter: 'O', image: './assets/images/o.jpg' },
        { letter: 'P', image: './assets/images/p.jpg' },
        { letter: 'Q', image: './assets/images/q.jpg' },
        { letter: 'R', image: './assets/images/r.jpg' },
        { letter: 'S', image: './assets/images/s.jpg' },
        { letter: 'T', image: './assets/images/t.jpg' },
        { letter: 'U', image: './assets/images/u.jpg' },
        { letter: 'V', image: './assets/images/v.jpg' },
        { letter: 'W', image: './assets/images/w.jpg' },
        { letter: 'X', image: './assets/images/x.jpg' },
        { letter: 'Y', image: './assets/images/y.jpg' },
        { letter: 'Z', image: './assets/images/z.jpg' },
    ];

    const backgroundMusicVAR = new Audio('./assets/sounds/b.mp3'); 
    let isMusicPlayingVAR = false;

    function playBackgroundMusicFUNC() {
        backgroundMusicVAR.loop = true; 
        backgroundMusicVAR.volume = 0.5; 
        backgroundMusicVAR.play();
        isMusicPlayingVAR = true; 
    }

    function playSoundFUNC() {
        const audioVAR = new Audio('./assets/sounds/s.wav');
        audioVAR.play();
    }

    function pauseBackgroundMusicFUNC() {
        backgroundMusicVAR.pause();
        isMusicPlayingVAR = false; 
    }

    function toggleBackgroundMusicFUNC() {
        if (isMusicPlayingVAR) {
            pauseBackgroundMusicFUNC();
        } else {
            playBackgroundMusicFUNC();
        }
    }

    function getUniqueRandomIntegersFUNC(countVAR, minVAR, maxVAR) {
        const uniqueRandomIntegersVAR = new Set();
        let iVAR;
        while (uniqueRandomIntegersVAR.size < countVAR) {
            iVAR = Math.floor(Math.random() * (maxVAR - minVAR + 1)) + minVAR;
            uniqueRandomIntegersVAR.add(iVAR);
        }
        return Array.from(uniqueRandomIntegersVAR);
    }

    function shuffleArrayFUNC(arrayVAR) {
        for (let iVAR = arrayVAR.length - 1; iVAR > 0; iVAR--) {
            const jVAR = Math.floor(Math.random() * (iVAR + 1));
            [arrayVAR[iVAR], arrayVAR[jVAR]] = [arrayVAR[jVAR], arrayVAR[iVAR]];
        }
        return arrayVAR;
    }

    function showFeedbackFUNC(messageVAR) {
        $('#feedback').text(messageVAR).fadeIn().delay(2000).fadeOut();
    }

    function generateLettersFUNC(numberOfLettersVAR) {
        const shuffledLettersVAR = shuffleArrayFUNC(lettersVAR.slice());
        const selectedLettersVAR = getUniqueRandomIntegersFUNC(numberOfLettersVAR, 0, shuffledLettersVAR.length - 1);

        $('#lettersContainer').empty();
        $('#stopMusicButton').show();
        for (let iVAR = 0; iVAR < selectedLettersVAR.length; iVAR++) {
            const indexVAR = selectedLettersVAR[iVAR];
            const letterVAR = shuffledLettersVAR[indexVAR];
            const buttonVAR = $('<button class="letter-button btn btn-primary m-3"></button>').text(letterVAR.letter);

            buttonVAR.on('click', () => {
                playSoundFUNC();
                showFeedbackFUNC(`You clicked on ${letterVAR.letter}`);

                const imageVAR = $('.image');
                if (imageVAR.length > 0) {
                    imageVAR.remove();
                }

                const imageContainerVAR = $('<div class="col-12 col-md-6 offset-md-3 mt-3 mb-4 text-center" tabindex="-1" style="outline: none;"></div>');
                const newImageVAR = $('<img class="image img-fluid rounded" src="' + letterVAR.image + '" alt="' + letterVAR.letter + '" />');
                imageContainerVAR.append(newImageVAR);
                $('#lettersContainer').append(imageContainerVAR);

     
            });
            $('#lettersContainer').append(buttonVAR);
        }


    }

    $('#generateButton').click(function() {
        const numberOfLettersVAR = parseInt($('#numberInput').val(), 10);
        if (isNaN(numberOfLettersVAR) || numberOfLettersVAR <= 0 || numberOfLettersVAR > lettersVAR.length) {
            alert('Please enter a valid number between 1 and ' + lettersVAR.length);
            return;
        }

        generateLettersFUNC(numberOfLettersVAR);
        playBackgroundMusicFUNC();
    });

    $('#stopMusicButton').click(function() {
        toggleBackgroundMusicFUNC();
    });
});
