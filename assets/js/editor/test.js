
console.log("HEre is editor tags");
window.alp = function () {
    $.ajax({
        method: "POST",
        url: "/editor/create/slides",
        dataType: "json",
        data: {
            "slides": [
                {
                    'subTitle': 'I am subtitle',
                    'slideTitle': 'I am slide title',
                    'sentences': [
                        'We visited the country park.',
                        'The unnecessary movement of vehicles every day is a major cause of pollution.',
                        'Youth, speed, production ($) are American ideals',
                        'Physical and mental weakness are stigmatized',
                        'feel ashamed or embarrassed when weak, ill, or need help'
                    ],
                    'direction': 'ltr'
                }, {
                    'subTitle': 'I am subtitle 2',
                    'slideTitle': 'I am slide title 2',
                    'sentences': [
                        'Blame the Victim',
                        'Economic barriers: energy, telephne, servers, hardware, software',
                        'Technical barriers: costs of acquisition, use and updating',
                        'Cultural barriers: information illiteracy, biases, domination of English',
                        'The former New York mayor, now Trump"s personal lawyer, lost it during an appearance on the cable news network.'
                    ],
                    'direction': 'rtl'
                }
            ]
        },
        success: function (result) {
            console.log(result)
        }
    })
}