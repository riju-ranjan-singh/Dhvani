'use strict';
/* ================================================================
   DHVANI — Clean · Apple-inspired · script.js
   · Scroll reveal (Intersection Observer)
   · Nav scroll state
   · Animated counters (none needed — removed for cleanliness)
   · Progress bar in phone
   · Smooth anchor scroll
   · APK download
   ================================================================ */

/* ── Download ───────────────────────────────────────────────── */
function downloadApk() {
    // window.open works reliably from file:// — browser sees .apk as
    // an unknown type and prompts Save As instead of navigating away.
    window.open('Dhvani.apk', '_blank');
}
window.downloadApk = downloadApk;

/* ── Nav scroll state ──────────────────────────────────────── */
window.addEventListener('scroll', () => {
    // Nav already has backdrop blur always — nothing extra needed
}, { passive: true });

/* ── Scroll reveal ─────────────────────────────────────────── */
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

// Stagger feature items
document.querySelectorAll('.feat-item').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.06) + 's';
    revealObs.observe(el);
});

// Stagger preview list items
document.querySelectorAll('.preview-list li').forEach((el, i) => {
    el.style.transitionDelay = (.3 + i * 0.07) + 's';
});

/* ── Phone progress bar ────────────────────────────────────── */
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

/* ── Smooth anchor scroll ──────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
