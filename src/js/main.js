/* ========== FANCYBOX ========== */
Fancybox.bind('[data-fancybox]', {});
/* ========== END FANCYBOX ========== */

/* ========== AOS ========== */
// AOS.init({
//   startEvent: "DOMContentLoaded",
//   duration: 500,
// });
/* ========== END AOS ========== */

/* ========== IMASK ========== */
// function startImask() {
//   const element = document.querySelector("*[data-imask]");
//   const maskOptions = {
//     mask: "+{7} (000) 000-00-00",
//   };
//   if (!element) return;
//   const mask = IMask(element, maskOptions);
// }
// startImask();
/* ========== END IMASK ========== */

/* ========== HEADER SCROLL ========== */
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');

  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
/* ========== END HEADER SCROLL ========== */

/* ========== MODAL LOGIC ========== */
function modal() {
  let btnOpenModal = document.querySelectorAll('*[data-modal-open]');
  const btnCloseModal = document.querySelectorAll('*[data-modal-close]');
  const btnBlockModal = document.querySelectorAll('*[data-modal-block]');

  btnOpenModal.forEach((btn) => {
    btn.addEventListener('click', toggleModalClass);
  });
  btnCloseModal.forEach((btn) => {
    btn.addEventListener('click', toggleModalClass);
  });

  document.addEventListener('click', (e) => {
    const modal = e.target.classList.contains('modal-wrapper') ? e.target : null;

    if (modal) {
      modal?.classList.remove('active');
    }
  });

  function toggleModalClass() {
    btnBlockModal.forEach((block) => {
      if (
        this.dataset.modalOpen === block.dataset.modalBlock ||
        this.dataset.modalClose === block.dataset.modalBlock
      ) {
        block.classList.toggle('active');
        this.classList.toggle('active');
      }
    });
  }
}
modal();
/* ========== END MODAL LOGIC ========== */

/* ========== PLAY AUDIO ========== */
function playAudio() {
  document.addEventListener('click', function (e) {
    const audioBtn = e.target.closest('*[data-audio-btn]');
    if (!audioBtn) return;

    const audioBlock = audioBtn.closest('*[data-audio]');
    const audioTrack = audioBlock.querySelector('*[data-audio-track]');
    console.log(audioBlock, audioBtn, audioTrack);

    if (audioTrack.paused) {
      audioBlock.classList.add('active');
      audioTrack.currentTime = 0;
      audioTrack.play();
    } else {
      audioBlock.classList.remove('active');
      audioTrack.pause();
    }

    audioTrack.addEventListener(
      'ended',
      function () {
        audioBlock.classList.remove('active');
      },
      { once: true }
    );
  });
}
playAudio();
/* ========== END PLAY AUDIO ========== */

/* ========== SELECT TARIF ========== */
function selectTarif() {
  const tarifs = document.querySelectorAll('*[data-tarif]');

  document.addEventListener('click', (e) => {
    const tarif = e.target.closest('*[data-tarif]');
    if (!tarif) return;

    const tarifModal = document.querySelector("*[data-modal-block='form-tarifs']");
    tarifModal.classList.add('active');

    const select = tarifModal.querySelector("select[name='tarif']");
    const tarifName = tarif.dataset.tarif?.toLowerCase();
    select.value = tarifName;
  });
}
selectTarif();
/* ========== END SELECT TARIF ========== */

/* ========== SEND FORM ========== */
function sendForm() {
  const forms = document.querySelectorAll('form');

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const object = {};

      formData.forEach((value, key) => {
        object[key] = value;
      });
      console.log(object);

      fetch('php/mail.php', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.ok) {
            openModalSuccess(form);
          } else {
            openModalFail(form);
          }
        })
        .catch(() => {
          openModalFail(form);
        });
    });
  });
}
sendForm();
/* ========== END SEND FORM ========== */

function openModalSuccess(node) {
  const curModal = node.closest('*[data-modal-block]');
  curModal?.classList?.remove('active');

  const successModal = document.querySelector("*[data-modal-block='form-success']");
  successModal.classList.add('active');
}
function openModalFail(node) {
  const curModal = node.closest('*[data-modal-block]');
  curModal?.classList?.remove('active');

  const successModal = document.querySelector("*[data-modal-block='form-fail']");
  successModal.classList.add('active');
}

/* ========== SWIPER ========== */
const swiperAtmosphere = new Swiper('.swiper-atmosphere', {
  slidesPerView: 'auto',
  navigation: {
    nextEl: '.swiper-button-atmosphere.swiper-button-next',
    prevEl: '.swiper-button-atmosphere.swiper-button-prev',
  },
});

const swiperReviews = new Swiper('.swiper-reviews', {
  slidesPerView: 'auto',

  navigation: {
    nextEl: '.swiper-button-reviews.swiper-button-next',
    prevEl: '.swiper-button-reviews.swiper-button-prev',
  },
});

const swiperSimulators = new Swiper('.swiper-sims', {
  slidesPerView: 1,
  spaceBetween: 15,
});

const swiperRental = new Swiper('.swiper-rental', {
  slidesPerView: 'auto',
});

const swiperMerch = new Swiper('.swiper-merch', {
  slidesPerView: 'auto',
});

const swiperAdressGallery = new Swiper('.swiper-address-gallery', {
  slidesPerView: 'auto',
});

const swiperAcdCatalog = new Swiper('.swiper-acd-catalog', {
  slidesPerView: 'auto',
});

const swiperOffsiteRental = new Swiper('.swiper-offsite-rental', {
  slidesPerView: 'auto',
});

const swiperPorDrive = new Swiper('.swiper-por-drive', {
  slidesPerView: 'auto',
});

const swiperOrPartner = new Swiper('.swiper-or-partner', {
  slidesPerView: 'auto',
});

const swiperPorGallery = new Swiper('.swiper-por-gallery', {
  slidesPerView: 'auto',
});
/* ========== SWIPER END ========== */

/* ========== TABS ========== */
function tabs() {
  document.addEventListener('click', (e) => {
    const tabBtn = e.target.closest('*[data-tab-btn]');
    if (!tabBtn) return;
    const tabsWrapper = e.target.closest('*[data-tabs-wrapper]');
    const tabBtns = tabsWrapper.querySelectorAll('*[data-tab-btn]');
    const tabItems = tabsWrapper.querySelectorAll('*[data-tab-item]');

    tabItems.forEach((item, index) => {
      tabBtns[index].classList.remove('active');
      tabItems[index].classList.remove('active');

      if (tabBtn.dataset.tabBtn === item.dataset.tabItem) {
        item.classList.add('active');
        tabBtn.classList.add('active');
      }
    });
  });
}
tabs();
/* ========== TABS END ========== */
