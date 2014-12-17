(function ($) {

console.log(input);

window.onload = function() { init() };

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1PDaUJC_ct90zt2YYbDi4dKYYF1QfVYCAyKlYNWlpptw/pubhtml';

function init() {
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: showInfo,
                     simpleSheet: true } )
    }
var showInfo = function (data, tabletop) {
    
    console.log(data);

    //variables
    var answer,
        qnumber,
        score = 0,
        currentQuestion = 0,
        score_a = parseInt(data[0].a),
        score_b = parseInt(data[0].b),
        score_c = parseInt(data[0].c),
        score_d = parseInt(data[0].d);

    // social media icons
    var facebook = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' style='height: 2.4em;'><circle cx='8' cy='8' r='8' class='shape-1'></circle><path fill='#fff' d='M8.5 3.7h1.4v1.6h-1c-.2 0-.4.1-.4.4v.9h1.4l-.1 1.7h-1.3v4.5h-1.9v-4.5h-.9v-1.7h.9v-1c0-.7.4-1.9 1.9-1.9z' class='shape-2'></path><foreignObject width='200' height='100'><text><tspan style='color:#414141; margin-right: 20px; margin-left: 15px;''>Facebook</tspan></text></foreignObject></svg>";
    var twitter = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' style='height: 2.4em;'><circle cx='8' cy='8' r='8' class='shape-1'></circle><path fill='#fff' d='M4 4.8c1 1.2 2.5 2 4.2 2.1l-.1-.4c0-1.1.9-2 2-2 .6 0 1.1.3 1.5.6.5-.1.9-.3 1.3-.5-.2.4-.5.8-.9 1.1l1.2-.3c-.3.4-.6.8-1 1.1v.3c0 2.7-2 5.8-5.8 5.8-1.1 0-2.2-.3-3.1-.9h.5c.9 0 1.8-.3 2.5-.9-.9 0-1.6-.6-1.9-1.4h.4c.2 0 .4 0 .5-.1-.9-.2-1.6-1-1.6-2 .3.2.6.2.9.3-.6-.5-.9-1.1-.9-1.8 0-.4.1-.7.3-1z' class='shape-2'></path><foreignObject width='200' height='100'><text><tspan style='color:#414141; margin-right: 20px;''>Twitter</tspan></text></foreignObject></svg>";

    // twitter links
    var account = "kpcc";

    // write questions and answers on html
    var buildQuiz = function (input) {

            $(".result-area").empty();

            score_a = parseInt(data[currentQuestion].a),
            score_b = parseInt(data[currentQuestion].b),
            score_c = parseInt(data[currentQuestion].c),
            score_d = parseInt(data[currentQuestion].d),

        qnumber = currentQuestion + 1;
        $(".quiz-container").html(
            "<div class='progressbar col-xs-8 col-sm-8 col-md-8 col-lg-8'>Question " + qnumber + "&nbsp;of&nbsp;" + input.length + "</div><div class='arrows col-xs-8 col-sm-8 col-md-8 col-lg-8'></div><div class='qq-question col-xs-8 col-sm-8 col-md-8 col-lg-8'>" + input[currentQuestion].category + "</div><div class='option col-xs-8 col-sm-8 col-md-8 col-lg-8'><div id='option-a' class='list col-xs-12 col-sm-6 col-md-6 col-lg-6'><img class='headshot' src='http://www.aceshowbiz.com/images/wennpic/eddie-redmayne-24th-annual-palm-springs-international-film-festival-awards-gala-02.jpg' ></br>  " + input[currentQuestion].a + "</div><div id='option-b' class='list col-xs-12 col-sm-6 col-md-6 col-lg-6'><img class='headshot' src='http://press.nationalgeographic.com/files/2013/05/Benedict-Cumberbatch-2.jpg'></br>  " + input[currentQuestion].b + "</div><div id='option-c' class='list col-xs-12 col-sm-6 col-md-6 col-lg-6'><img class='headshot' src='http://www.liveforfilms.com/wp-content/uploads/2014/10/steve-carell.jpg'></br>" + input[currentQuestion].c + "</div><div id='option-d' class='list col-xs-12 col-sm-6 col-md-6 col-lg-6'><img class='headshot' src='http://ia.media-imdb.com/images/M/MV5BNjg0MTkxODUyOF5BMl5BanBnXkFtZTgwOTU0MTU5MDE@._V1_SY317_CR16,0,214,317_AL_.jpg'></br>  " + input[currentQuestion].d + "</div></div>" +"<div class='answer col-xs-8 col-sm-8 col-md-8 col-lg-8'></div>"
        );

            $(".arrows").append("<img src='img/prev.png' class='arrow-img p" + qnumber + "'><img  src='img/next.png' class='arrow-img q" + qnumber + "'>");
            $('.q' + qnumber).on('click', next);
            $('.p' + qnumber).on('click', prev);

            $(".answer").append("<button class='next-button p" + qnumber + "'>Prev</button><button class='next-button q" + qnumber + "'>Next</button>");
            $('.q' + qnumber).on('click', next);
            $('.p' + qnumber).on('click', prev);

            $(".answer").append("</br><button class='qq-button check-score'>See Result</button>");
            $('.check-score').on('click', checkAnswer);

        selectAnswer();
    };

    // write the final question and answers on html to break the tie
    /* var buildExtraQuiz = function () {
        $(".quiz-container").html(
            "<div class='progressbar'>Bonus Question</div><div class='qq-question'><div class='qq-description'>Oops.. Seems like you are a mixed type. Let's decide on this with the final strike!</div><br><div class='question'>What's your drink of choice?</div></div>" +
            "<div class='answers'></div>" +
            "<div class='answer'></div>"
        );

        var finalQuestion = [
            {"state": "North California", "drink": "Red wine"},
            {"state": "Jefferson", "drink": " Marijuana"},
            {"state": "Silicon Valley", "drink": "Martini"},
            {"state": "South California", "drink": "Tequila"},
            {"state": "West California", "drink": "Champagne"},
            {"state": "Central California", "drink": "Beer"}
        ];

        for (i = 0; i < finalQuestion.length; i++) {
            if (finalQuestion[i].state == window.max || finalQuestion[i].state == window.max_2) {
                $(".answers").append("<div class='finallist 'id='" + finalQuestion[i].state + "'>" + finalQuestion[i].drink + "</li>");
            }
        };

        $(".answer").append("<button class='qq-button check-score-final'>See Result</button>");
        $(".check-score-final").on("click", finalScoreFinal);
        selectAnswer();
    }; */

    // shows (1) out of (3) questinos
    var displayProgress = function () {
        $(".progressbar").html(
            "<div class='progressbar'>Question " + qnumber + "&nbsp;of&nbsp;" + input.length + "</div>"
        );
    };

    // style changes when user selects answers
    var selectAnswer = function () {
        $(".list, .finallist").click(function() {
            $(".selected").removeClass("selected");
            $(this).addClass("selected");
            $(".next").addClass("submit-highlight").fadeIn();
        });
    };
    
    //Highcharts
    window.addChart = (function (input) {

        console.log(sum_score);

        
        $(function () {
            $('.result-area').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: input[currentQuestion].category
                },
                subtitle: {
                    text: 'New York Daily News'
                },
                xAxis: {
                    categories: [input[currentQuestion].a, input[currentQuestion].b, input[currentQuestion].c, input[currentQuestion].d],
                    title: {
                        text: null
                    },
                    labels: {
                        style: {
                            fontSize: '14px',
                            fontFamily: 'Helvetica, sans-serif',
                            color: 'black'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Votes',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    enabled: false,
                    valueSuffix: ' votes'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    enabled: false,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 100,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    data: [score_a, score_b, score_c, score_d]
                }, ]
            });
        });
        
        /* $('.result-area').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                height: 800,
                width: 800
            },
            title: {
                text: input[currentQuestion].category,
                align: 'center',
                verticalAlign: 'middle',
                y: 150
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: 0,
                        style: {
                            fontWeight: 'bold',
                            color: 'black',
                            textShadow: '0px 0px 0px black',
                            fontSize: 12
                        }
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['20%', '50%']
                }
            },
            series: [{
                type: 'pie',
                name: input[currentQuestion].category,
                innerSize: '50%',
                data: [
                    [input[currentQuestion].a,   percentage_a],
                    [input[currentQuestion].b,       percentage_b],
                    [input[currentQuestion].c, percentage_c],
                    [input[currentQuestion].d,    percentage_d],
                    {
                        name: 'Others',
                        y: 0.7,
                        dataLabels: {
                            enabled: false
                        }
                    }
                ]
            }]
        });*/
    }); 

  // check selected input for each question and calculate percentage
  var checkAnswer = function () {

        var callPhp = {

             "1" : function () {
                var request = $.ajax({
                url: 'php/myphp1.php',
                type: "GET",            
                dataType: "html",
                });

                request.done(function(msg) {
                alert(msg);          
                });

                request.fail(function(jqXHR, textStatus) {
                alert( "Request failed: " + textStatus );
                });      
            },

            "2" : function () {
                var request = $.ajax({
                url: 'php/myphp2.php',
                type: "GET",            
                dataType: "html"
                });

                request.done(function(msg) {
                alert(msg);          
                });

                request.fail(function(jqXHR, textStatus) {
                alert( "Request failed: " + textStatus );
                });      
            },

             "3" : function () {
                var request = $.ajax({
                url: 'php/myphp3.php',
                type: "GET",            
                dataType: "html"
                });

                request.done(function(msg) {
                alert(msg);          
                });

                request.fail(function(jqXHR, textStatus) {
                alert( "Request failed: " + textStatus );
                });      
            },

            "4" : function () {
                var request = $.ajax({
                url: 'php/myphp4.php',
                type: "GET",            
                dataType: "html"
                });

                request.done(function(msg) {
                alert(msg);          
                });

                request.fail(function(jqXHR, textStatus) {
                alert( "Request failed: " + textStatus );
                });      
            },

        };
        
       if ($(".selected").length > 0) {
        $('li').off('click');
        answer = $(".selected").attr('id');

        if (answer == 'option-a') {
          score_a++;
          displayProgress();
          callPhp[1]();
        } 
        else if (answer == 'option-b') {
          score_b++;
          displayProgress();
          callPhp[2]();
        }
        else if (answer == 'option-c') {
          score_c++;
          displayProgress();
          callPhp[3]();
        }
        else if (answer == 'option-d') {
          score_d++;
          displayProgress();
          callPhp[4]();
        }
      };

      sum_score = score_a + score_b + score_c + score_d,
            percentage_a = score_a / sum_score,
            percentage_b = score_b / sum_score,
            percentage_c = score_c / sum_score,
            percentage_d = score_d / sum_score; 

      //addChart(input);
   };



    // click next button and jump to the next question
    var next = function () {
        currentQuestion++;
        buildQuiz(input);
    }

    var prev = function () {
        currentQuestion--;
        buildQuiz(input);
    }

    /*
    var nextQuestion = {

        "1" : function () {
            checkAnswer[1]();
            next();
        },

        "2" : function () {
            checkAnswer[2]();
            next();
        },

        "3" : function () {
            checkAnswer[3]();
            next();
        },

        "4" : function () {
            checkAnswer[4]();
            next();
        },

        "5" : function () {
            checkAnswer[5]();
            next();
        },

        "6" : function () {
            checkAnswer[6]();
            next();
        },

         "7" : function () {
            checkAnswer[7]();
            next();
        },

         "8" : function () {
            checkAnswer[8]();
            next();
        },

    };

    */

    // display final result card and social media sharing
    var link = "http://projects.scpr.org/static/interactives/six-californias-quiz"

    /*

    var finalScoreFinal = function () {
        checkAnswer[9]();
        finalScore();
    };

    var finalScore = function () {

        // compare scores for six states and find the highest one
        var compareScore = [
            {"state": "North California", "score": score_north},
            {"state": "Jefferson", "score": score_jeff},
            {"state": "Silicon Valley", "score": score_silicon},
            {"state": "South California", "score": score_south},
            {"state": "West California", "score": score_west},
            {"state": "Central California", "score": score_cen}
        ];

        compareScore.sort(function (a, b){
        return a.score - b.score
        });

        window.max = compareScore[compareScore.length - 1].state,
        window.max_2 = compareScore[compareScore.length - 2].state;

        // add a final question if two states got the same score
        if (compareScore[compareScore.length - 1].score ==  compareScore[compareScore.length - 2].score){
            buildExtraQuiz();
        } else {

            // show the final resuilt of quiz
            $(".quiz-container").html(
                "<div class='scorecard'>" +
                    "<div id='social-media'>Share the result on social media!</br>" +
                        "<ul>" +
                            "<li><a class=\"fb-share\" href='http://www.facebook.com/sharer.php?u=" + link + "' target='_blank'>" + facebook + "</a></li>" +
                            "<li><a class=\"twitter-share\" href='http://twitter.com/home?status=I should move to " + window.max + " according to KPCC's six Californias quiz! Check your result here. " + link + " via @" + account + "' target='_blank'>" + twitter   + "</a></li>" +
                        "</ul>" +
                    "</div>" +
                    "<div id='youbelongto'>You belong to</div>" +
                    "<div id='statename'>" + window.max + "</div>" +
                    "<div class='col-xs-12 col-sm-6 col-md-6 col-lg-6'>" +
                        "<div id='map-container'></div>" +
                    "</div>" +
                    "<div class='col-xs-12 col-sm-6 col-md-6 col-lg-6'>" +
                        "<div id='description'></div>" +
                        "<div id='facts'></div>" +
                        "<div id='clickother'>Click on the map to check other states</div>" +
                        "<button id='playagain' class='qq-button'>Play again!</button>" +
                    "</div>" +
                "</div>"
            );
        
            // social media sharing buttons
            $('.quiz-container .fb-share').click(function(){});

            $('.quiz-container .twitter-share').click(function() {});

            showDescription(input);
            loadMap();

            $("#playagain").on("click", reloadPage);

            // dynamically set the quiz container height based on div height
            var displayHeight = $(".data-visuals").height();
            $(".quiz-container").height(displayHeight + 30);
        };
    };

    function showDescription(input) {
        for (i = 0; i < 6; i++ ) {
            if (input[i].result == window.max) {
                $("#description").html(input[i].explanation);
                $("#facts").html(input[i].datapoints);
            };
        };
    };

    */

    function reloadPage() {
      location.reload();
    };

    function unpackQuizHack() {
        var newInput = [];
        for ( var i = 0; i < input.length; i++ ) {
            newInput[i] = convertUrlinJson(input[i]);
        }
        input = newInput;
        buildQuiz(input);
    }

    function convertUrlinJson( data ) {
        $.each( data, function( key, value ) {
            if ( key == 'correct' || key == 'incorrect' ) {
                var j;
                var hexes = data[key].match(/.{1,4}/g) || [];
                var back = "";
                for( j = 0; j<hexes.length; j++ ) {
                    back += String.fromCharCode( parseInt( hexes[j], 16 ) );
                }
                data[key] = back;
            }
        });
        return data;
    }

    $(document).ready(function () {
    unpackQuizHack();
  });
}

})(jQuery);
