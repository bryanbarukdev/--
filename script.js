(function () {
  function preventSelect(e) {
    e.preventDefault();
  }
  document.addEventListener('selectstart', preventSelect);
  document.addEventListener('dragstart', preventSelect);
  document.addEventListener('contextmenu', preventSelect);

  var letter = document.querySelector('.letter-image');
  var scene = document.querySelector('.letter-scene');
  var modal = document.getElementById('letter-modal');
  var modalLetter = modal ? modal.querySelector('.modal-letter') : null;
  var modalCloseBtn = modal ? modal.querySelector('.modal-close') : null;
  var modalBackdrop = modal ? modal.querySelector('.modal-backdrop') : null;

  if (!letter || !scene) return;

  function openLetter() {
    letter.classList.add('open');
    scene.classList.add('open');
  }

  function closeLetter() {
    letter.classList.remove('open');
    setTimeout(function () {
      scene.classList.remove('open');
    }, 480);
  }

  function openModal() {
    if (!modal) return;
    modal.classList.remove('is-closing');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    if (!modal) return;
    if (modal.classList.contains('is-closing')) return;
    modal.classList.add('is-closing');

    var onModalAnimEnd = function () {
      if (modalLetter) modalLetter.removeEventListener('animationend', onModalAnimEnd);
      modal.classList.remove('is-open', 'is-closing');
      modal.setAttribute('aria-hidden', 'true');
      setTimeout(function () {
        closeLetter();
      }, 220);
    };

    if (modalLetter) {
      modalLetter.addEventListener('animationend', onModalAnimEnd);
    } else {
      onModalAnimEnd();
    }

    setTimeout(function () {
      if (modalLetter) modalLetter.removeEventListener('animationend', onModalAnimEnd);
      if (modal.classList.contains('is-closing')) {
        modal.classList.remove('is-open', 'is-closing');
        modal.setAttribute('aria-hidden', 'true');
        setTimeout(closeLetter, 220);
      }
    }, 650);
  }

  function onLetterTap() {
    if (letter.classList.contains('open')) {
      openModal();
    } else {
      openLetter();
    }
  }

  letter.addEventListener('click', function (e) {
    if (e.pointerType === 'touch') return;
    e.preventDefault();
    onLetterTap();
  });

  letter.addEventListener('touchstart', function (e) {
    e.preventDefault();
    onLetterTap();
  }, { passive: false });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
})();
