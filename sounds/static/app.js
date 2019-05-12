$(document).ready(() => {
  let items;

  $.ajax({
    url: '/sounds/api/sounds?format=json',
    method: 'GET'
  }).then(function(response) {
    console.log(response);
    items = response;

    items.forEach(sound => {
      let link = sound.audio;
      sound.audio = new Audio(link);
    });
    layout(items);
    console.log(items);
  });

  const capitalizeEveryWord = str => {
    return str
      .toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
  };

  const layout = array => {
    array.forEach(item => {
      const { id, name, displayName, character } = item;
      const columnDiv = $('<div>').addClass('col-lg-4 col-md-6 col-12');
      const cardDiv = $('<div>');
      cardDiv.addClass('card shadow m-2').appendTo(columnDiv);
      const cardHeader = $('<div>');
      id >= items.length - 10
        ? cardHeader.html(
            `${character} <div id="new" class="ml-1 badge badge-pill badge-warning">NEW</div>`
          )
        : cardHeader.text(character);
      cardHeader.addClass('card-header').appendTo(cardDiv);
      const cardBody = $('<div>');
      cardBody.addClass('card-body').appendTo(cardDiv);
      const playButton = $('<button>');
      playButton
        .addClass('btn btn-primary animated btn-lg btn-block play')
        .val(name)
        .attr({
          data: 'play'
        })
        .html(
          `<i class="fas fa-play-circle ml-2"></i> ${capitalizeEveryWord(
            displayName
          )}`
        )
        .appendTo(cardBody);
      const pauseButton = $('<button>');
      pauseButton
        .addClass('btn btn-danger animated btn-lg btn-block stop')
        .val(name)
        .attr({
          data: 'stop'
        })
        .html(`<i class="far fa-pause-circle ml-2"></i> Pause`)
        .appendTo(cardBody);
      $('.start').append(columnDiv);
      $('.total-count').text(items.length);
      if ($('body').hasClass('bg-dark')) {
        $('.card').addClass(`bg-dark border-light`);
        $('.card-header').addClass('text-light');
      }
    });
  };

  //STOP FUNC
  const stopSound = event => {
    $(event.target).addClass('pulse fast');
    const { value } = event.target;
    items.forEach(sound => {
      const { name, audio } = sound;
      if (name === value) {
        audio.pause();
      }
    });
    window.setTimeout(() => {
      $(event.target).removeClass('pulse fast');
    }, 2000);
  };

  //PLAY FUNC
  const playSound = event => {
    $(event.target).addClass('pulse fast');

    const { value } = event.target;
    items.forEach(sound => {
      const { name, audio } = sound;
      if (name === value) {
        audio.play();
      } else {
        audio.pause();
      }
    });
    window.setTimeout(() => {
      $(event.target).removeClass('pulse fast stop');
    }, 2000);
  };

  //CLICK FUNCTION TO PLAY
  $(document).on('click', '.play', playSound);

  //CLICK FUNCTION TO PAUSE
  $(document).on('click', '.stop', stopSound);
});
