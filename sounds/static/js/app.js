$(document).ready(() => {
  let items;

  $.ajax({
    url: endpoint,
    method: 'GET'
  })
    .then(response => {
      console.log(response);
      if (response.length === 0) {
        $('.error').html(`<h2 class="text-center">No sounds here yet</h2>`);
      } else {
        items = response;

        items.forEach(sound => {
          let link = sound.audio;
          sound.audio = new Audio(link);
        });
        layout(items);
        genNavItems();
        countAll();
      }
    })
    .catch(err => {
      console.log(err);
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

  const genNavItems = () => {
    const itemsCopy = [...items];
    const filterByCharId = itemsCopy.filter(item => item.charId < 5);

    const sortedItems = filterByCharId.sort((a, b) => {
      if (a.charId > b.charId) return 1;
      if (a.charId < b.charId) return -1;
      return 0;
    });

    //return new array of only with character names and ids
    let characters = sortedItems.map(character => {
      return { character: character.character, charId: character.charId };
    });

    //filter out duplicates by character name
    characters = characters.filter((charObj, index) => {
      return (
        characters
          .map(mapObj => mapObj.character)
          .indexOf(charObj.character) === index
      );
    });

    for (let eachCharacter of characters) {
      const { character, charId } = eachCharacter;

      $('.start-buttons').before(`
      <li>
        <button class="btn badge m-1 name gen animated fadeIn badge-secondary" value="${character}">${character}&nbsp
          <span class="char-${charId} badge badge-light"></span>
        </button>
      </li>`);
    }
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

  const random = () => {
    const item = items[Math.floor(Math.random() * items.length)].audio;
    item.play();
  };

  const countAll = () => {
    const newItems = [...items];
    const charOne = newItems.filter(item => item.charId === 1);
    const charTwo = newItems.filter(item => item.charId === 2);
    const charThree = newItems.filter(item => item.charId === 3);
    const charFour = newItems.filter(item => item.charId === 4);
    const other = newItems.filter(item => item.charId > 4);
    $('.char-1').text(charOne.length);
    $('.char-2').text(charTwo.length);
    $('.char-3').text(charThree.length);
    $('.char-4').text(charFour.length);
    $('.other-total').text(other.length);
  };

  const filterByCharacter = event => {
    const { id, value } = event.target;
    const itemsClone = [...items];
    const filteredArray = itemsClone.filter(item => value === item.character);
    const otherArray = itemsClone.filter(
      item => id === 'Other' && item.charId > 4
    );
    $('.start').empty();
    if (id === 'Other') {
      otherArray.sort(sortByCharacter);
      layout(otherArray);
    } else {
      filteredArray.sort(sortById);
      layout(filteredArray);
    }
  };

  const sortByCharacter = (a, b) => {
    if (a.character > b.character) return 1;
    if (a.character < b.character) return -1;
    return 0;
  };

  const sortById = (a, b) => {
    if (a.id < b.id) return 1;
    if (a.id > b.id) return -1;
    return 0;
  };

  const sortAll = event => {
    const counter = `
      <span class="total-count badge badge-light">
        ${items.length}
      </span>`;
    const { value } = event.target;
    switch (value) {
      case 'sortbynew':
        items.sort(sortById);
        $('.start').empty();
        layout(items);
        $('.sort')
          .html('Sort by Name &nbsp')
          .val('sortbyname')
          .append(counter);
        break;
      case 'sortbyname':
        items.sort(sortByCharacter);
        $('.start').empty();
        layout(items);
        $('.sort')
          .html('Sort By New &nbsp')
          .val('sortbynew')
          .append(counter);
        break;
    }
  };

  const checkTheme = () => {
    if ($('body').hasClass('bg-light')) {
      $('body, .card, .sticky-footer').removeClass('bg-light');
      $('.navbar-brand, .card-header, .fab').removeClass('text-dark');
      $('.navbar').removeClass(`bg-light navbar-light`);
      $('.theme').removeClass('badge-dark');
      $('.extra').removeClass(`badge-light text-dark`);

      //
      $('body, .sticky-footer').addClass('bg-dark');
      $('.navbar-brand, .card-header, .fab').addClass('text-light');
      $('.navbar').addClass(`navbar-dark bg-dark`);
      $('.card').addClass(`bg-dark border-light`);
      $('.theme').text('Light');
      $('.theme').addClass('badge-light');
      $('.extra').addClass(`badge-dark text-light`);

      //
    } else if ($('body').hasClass('bg-dark')) {
      $('body, .sticky-footer').removeClass('bg-dark');
      $('.navbar-brand, .card-header, .fab').removeClass('text-light');
      $('.navbar').removeClass(`bg-dark navbar-dark`);
      $('.card').removeClass(`bg-dark border-light`);
      $('.theme').removeClass('badge-light');
      $('.extra').removeClass(`badge-dark text-light`);

      //
      $('body, .sticky-footer').addClass('bg-light');
      $('.navbar-brand, .card-header, .fab').addClass('text-dark');
      $('.navbar').addClass(`bg-light navbar-light`);
      $('.theme')
        .text('Dark')
        .addClass('badge-dark');
      $('.extra').addClass(`badge-light text-dark`);
    }
  };

  $(document).on('click', '.play', playSound);
  $(document).on('click', '.stop', stopSound);
  $(document).on('click', '.sort', sortAll);
  $(document).on('click', '.name', filterByCharacter);
  $('.random').on('click', random);
  $('.theme').on('click', checkTheme);
});
