
$(document).ready(function(){
  "use strict";
  
  var questions = [{
    question: "Lambang bilangan dari seratus enam puluh tujuh adalah ....",
    pilihan: [170, 107, 167, 176],
    jawaban: 2
  }, {
    question: "Seorang pedagang pepaya telah menjual 1 truk buah sebanyak 963 buah. Buah yang sudah masak sebanyak 868 buah. Berapa banyaknya buah yang belum masak?",
    pilihan: ["93 buah", "97 buah", "95 buah", "96 buah"],
    jawaban: 2
  }, {
    question: "18 + 40 – 18 = ....",
    pilihan: [40, 42, 41, 43],
    jawaban: 0
  }, {
    question: "Lina mengikuti kursus menari mulai pukul 15.00 sampai 16.00. Berapa lama Lina menari?",
    pilihan: ['1 jam','3 jam','2 jam','4 jam'],
    jawaban: 0
  }, {
    question: "Anita mempunyai bermacam-macam buah, yaitu pisang, jambu, duku, durian, dan semangka. Masing-masing sebanyak 1 buah. Berat keseluruhan buah tersebut adalah 34 dekagram. Berapa gram berat buah Anita?",
    pilihan: ["340 gram", "343 gram", "344 gram", "443 gram"],
    jawaban: 0
  }, {
    question: "Manakah benda-benda di bawah ini yang mempunyai berat yang lebih besar ....",
    pilihan: ["bantal", "almari", "buku", "jam"],
    jawaban: 1
  }, {
    question: "Selesaikanlah soal berikut ini! 5 + 4 – (2 x 4) + 8 = ....",
    pilihan: [9, 8, 7, 6,],
    jawaban: 0
  }, {
    question: "10 : 5 + (7 + 3) x 2 = ....",
    pilihan: [22, 23, 24, 26],
    jawaban: 0
  }, {
    question: "4 x 5 penjumlahan berulangnya adalah ....",
    pilihan: ['4 + 4 + 4 + 4 + 4', '4 + 4 + 4 + 4 + 4 + 4', '5 + 5 + 5 + 5', '5 + 4 + 5 + 4'],
    jawaban: 0
  }, {
    question: "1 Kg = ..... gram",
    pilihan: [10, 1000, 100, 10000],
    jawaban: 1
  }
  ];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user pilihan
  var quiz = $('.content'); //Quiz div object
  
  // Display initial question

  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped

    if (isNaN(selections[questionCounter])) {
      $('#warning').text('Belum ada yang dipilih!');
    } else {
      questionCounter++;
      displayNext();
	  $('#warning').text('');
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Soal ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
	// this is new
	var warningText = $('<p id="warning">');
	qElement.append(warningText);
	
	return qElement;

  }
    displayNext();
  // Creates a list of the answer pilihan as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].pilihan.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].pilihan[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
       }else {
        var skorElem = displayskor();
        quiz.append(skorElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes skor and returns a paragraph element to be displayed
  function displayskor() {
    var skor = $('<h3>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].jawaban) {
        numCorrect++;
      }
    }
	// Calculate skor and display relevant message
	var persen = numCorrect / questions.length;
	if (persen >= 0.9){
    	skor.append('Keren! Kamu dapat menjawab ' + numCorrect + ' dari ' +
                 questions.length + ' soal dengan benar !');
	}
	
	else if (persen >= 0.7){
    	skor.append('Selamat! Kamu dapat menjawab' + numCorrect + ' dari ' +
                 questions.length + ' soal dengan benar !');
	}
	
	else if (persen >= 0.5){
    	skor.append('Kamu dapat menjawab ' + numCorrect + ' dari ' +
                 questions.length + ' soal dengan benar !');
	}
	
	else {
    	skor.append('Kamu hanya dapat mnenjawab ' + numCorrect + ' dari ' +
                 questions.length + ' soal dengan benar. Mau coba lagi?');
	}
    return skor;
  }


});