(() => {
  window.onload = () => {
    const coinflip = document.getElementById('coinflip');
    const seed = document.getElementById('seed');
    coinflip.addEventListener('click', () => {
      $.ajax({
        url: "/bracket",
        data: {
          strategy: 'coinflip'
        },
        success: (data) => {
          $('#coinflip-games').remove();
          const html = '<pre id="coinflip-games" class="prettyprint games-box"> ' + JSON.stringify(data, null, 4) + '</pre>';
          $('#coinflip-container').append(html);
          $('#coinflip-champion').text(' ' + data[1].school + ' (' + data[1].seed + ')');
          window.PR.prettyPrint();
        }
      });
    });

    seed.addEventListener('click', () => {
      $.ajax({
        url: "/bracket",
        data: {
          strategy: 'seed'
        },
        success: (data) => {
          $('#seed-games').remove();
          const html = '<pre id="seed-games" class="prettyprint games-box"> ' + JSON.stringify(data, null, 4) + '</pre>';
          $('#seed-container').append(html);
          $('#seed-champion').text(' ' + data[1].school + ' (' + data[1].seed + ')');
          window.PR.prettyPrint();
        }
      });
    });
  }
})();