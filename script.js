// The intro (curtain, fades, slide to the left) runs in style.css.
// This file handles the Bangladesh clock and the "Show more" panels.

/* ---------- Bangladesh clock ---------- */
const timeEl = document.getElementById('bd-time');
const diffEl = document.getElementById('bd-diff');

const bdFormat = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dhaka',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
});

const BD_OFFSET_MINUTES = 6 * 60; // Bangladesh is UTC+6 (no daylight saving)

function plural(n, word) {
    return n + ' ' + word + (n === 1 ? '' : 's');
}

function describeDifference() {
    // the visitor's own offset from UTC, in minutes (handles their daylight saving)
    const yourOffset = -new Date().getTimezoneOffset();
    const diff = BD_OFFSET_MINUTES - yourOffset;

    if (diff === 0) return 'Same time as you';

    const abs = Math.abs(diff);
    const hours = Math.floor(abs / 60);
    const minutes = abs % 60;
    const parts = [];
    if (hours) parts.push(plural(hours, 'hour'));
    if (minutes) parts.push(plural(minutes, 'minute'));

    return parts.join(' ') + (diff > 0 ? ' ahead of you' : ' behind you');
}

function tick() {
    if (timeEl) timeEl.textContent = bdFormat.format(new Date());
    if (diffEl) diffEl.textContent = describeDifference();
}
tick();
setInterval(tick, 1000);

/* ---------- Show more / Show less ---------- */
document.querySelectorAll('.panel .more').forEach((btn) => {
    btn.addEventListener('click', () => {
        const panel = btn.closest('.panel');
        const isOpen = panel.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(isOpen));
        btn.querySelector('.more-label').textContent = isOpen ? 'Show less' : 'Show more';
    });
});