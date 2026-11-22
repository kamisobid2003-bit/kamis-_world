const slides = [...document.querySelectorAll('.slide')];
const dotsWrap = document.getElementById('dots');
const counter = document.getElementById('counter');
const progress = document.getElementById('progressBar');
let current = 0;
slides.forEach((slide, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `انتقل إلى الشريحة ${i + 1}: ${slide.dataset.title}`);
  dot.addEventListener('click', () => show(i));
  dotsWrap.appendChild(dot);
});
const dots = [...dotsWrap.children];
function show(index) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((s, i) => s.classList.toggle('active', i === current));
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
  counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  progress.style.width = `${((current + 1) / slides.length) * 100}%`;
  document.getElementById('prevBtn').disabled = current === 0;
  document.getElementById('nextBtn').disabled = current === slides.length - 1;
}
document.getElementById('prevBtn').addEventListener('click', () => show(current - 1));
document.getElementById('nextBtn').addEventListener('click', () => show(current + 1));
document.addEventListener('keydown', (e) => {
  if (['ArrowLeft', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); show(current + 1); }
  if (['ArrowRight', 'PageUp'].includes(e.key)) { e.preventDefault(); show(current - 1); }
  if (e.key === 'Home') show(0);
  if (e.key === 'End') show(slides.length - 1);
});
let touchX = 0;
document.addEventListener('touchstart', e => { touchX = e.changedTouches[0].screenX; }, {passive:true});
document.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].screenX - touchX;
  if (Math.abs(dx) > 55) show(current + (dx < 0 ? 1 : -1));
}, {passive:true});
show(0);
