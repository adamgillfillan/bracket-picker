(() => {
  window.onload = () => {
    const coinflip = document.getElementById('coin-flip');
    coinflip.addEventListener('click', () => {
      $.ajax({
        url: "/bracket",
        data: {
          strategy: 'coinflip'
        },
        success: (data) => {
          console.log(data);
          $('#games').remove();
          const html = '<pre id="games" class="prettyprint"> ' + JSON.stringify(data, null, 4) + '</pre>';
          $('#games-container').append(html);
          $('#champion').text(' ' + data[1].school + ' (' + data[1].seed + ')');
          window.PR.prettyPrint();
        }
      });
      console.log('yoyo');
    })
  }
})();