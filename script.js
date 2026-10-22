'use strict';
// Altere o contato somente após confirmar com a empresa.
const CONTACT = { phone: '5511991074316', message: 'Olá! Vi uma demonstração de site criada pela LR Tech para o Turma do Carinha. Gostaria de confirmar se este é o contato do buffet e consultar opções para uma festa. Data: __. Convidados: __. Idade: __.' };
document.querySelectorAll('[data-wa]').forEach(link => {
  link.href = `https://wa.me/${CONTACT.phone}?text=${encodeURIComponent(CONTACT.message)}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#nav');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Abrir menu'); menuButton.textContent = '☰'; }
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  menuButton.textContent = open ? '×' : '☰';
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.nav-wrap')) closeMenu(); });
window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
  document.documentElement.classList.add('motion');
}
const dialog = document.querySelector('#lightbox');
const gallery = [...document.querySelectorAll('.gallery-item')];
let currentImage = 0;
let previousOverflow = '';
function showImage(index) {
  currentImage = (index + gallery.length) % gallery.length;
  const button = gallery[currentImage];
  const source = button.querySelector('img');
  dialog.querySelector('img').src = source.src;
  dialog.querySelector('img').alt = source.alt;
  dialog.querySelector('figcaption').textContent = `${currentImage + 1} / ${gallery.length} · ${button.dataset.caption}`;
}
gallery.forEach((button, index) => button.addEventListener('click', () => {
  showImage(index); previousOverflow = document.body.style.overflow;
  dialog.showModal(); document.body.style.overflow = 'hidden';
}));
dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
dialog.querySelector('.lightbox-prev').addEventListener('click', () => showImage(currentImage - 1));
dialog.querySelector('.lightbox-next').addEventListener('click', () => showImage(currentImage + 1));
dialog.addEventListener('close', () => { document.body.style.overflow = previousOverflow; });
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('keydown', event => { if (event.key === 'ArrowRight') { event.preventDefault(); showImage(currentImage + 1); } if (event.key === 'ArrowLeft') { event.preventDefault(); showImage(currentImage - 1); } });
