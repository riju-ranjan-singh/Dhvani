'use strict';
function downloadApk() {
    window.open('Dhvani.apk', '_blank');
}
window.downloadApk = downloadApk;
window.addEventListener('scroll', () => {
}, { passive: true });
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el, i) => {
    revealObs.observe(el);
});
document.querySelectorAll('.feat-item').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.06) + 's';
    revealObs.observe(el);
});
document.querySelectorAll('.preview-list li').forEach((el, i) => {
    el.style.transitionDelay = (.3 + i * 0.07) + 's';
});
(function animProgress() {
    const fill = document.getElementById('ps-fill');
    if (!fill) return;
    let p = 33;
    function tick() {
        p += 0.006;
        if (p > 100) p = 0;
        fill.style.width = p + '%';
        requestAnimationFrame(tick);
    }
    tick();
})();
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
