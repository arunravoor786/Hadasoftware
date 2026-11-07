document.addEventListener('DOMContentLoaded', function () {
  var btn = document.querySelector('.menu-btn');
  var bar = document.querySelector('.appbar');
  if (btn && bar) {
    btn.addEventListener('click', function () { bar.classList.toggle('open'); });
    document.querySelectorAll('.navlinks a').forEach(function (a) {
      a.addEventListener('click', function () { bar.classList.remove('open'); });
    });
  }
  var page = (window.location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.navlinks a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });
});
