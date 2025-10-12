'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const bg = document.querySelector('.bg');
  const year = document.getElementById('year');
  const form = document.getElementById('waitlistForm');
  const email = document.getElementById('email');
  const msg = document.getElementById('formMessage');
  const logo = document.getElementById('brandLogo');
  const qrImg = document.getElementById('surveyQR');

  if (year) year.textContent = new Date().getFullYear();

  // Background fade on scroll: fades from 1 to 0.25 over first 600px
  const max = 600;
  const onScroll = () => {
    if (!bg) return;
    const y = Math.min(window.scrollY, max);
    const t = 1 - y / max * 0.75; // 1 -> 0.25
    bg.style.opacity = t.toFixed(3);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Email capture: validate and allow real submission to FormSubmit
  if (form && email && msg) {
    form.addEventListener('submit', (e) => {
      const value = email.value.trim();
      const valid = /.+@.+\..+/.test(value);
      if (!valid) {
        e.preventDefault();
        msg.textContent = 'Please enter a valid email address.';
        msg.style.color = '#ff4d4f';
        email.focus();
        return;
      }
      // Let the browser submit the form; show a quick hint
      msg.textContent = 'Submitting...';
      msg.style.color = '#34d399';
    });

    // Handle redirect back from FormSubmit
    const params = new URLSearchParams(location.search);
    if (params.get('subscribed') === '1') {
      msg.textContent = 'Thanks! You\'re on the list. We\'ll keep you posted.';
      msg.style.color = '#10b981';
    }
  }

  // Dynamic QR code for the survey (only if no local src provided)
  const surveyUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSc7Wlrm1hpc_YLq0piCgWzVcUE0c5a9kRk9TEKoNFOrPiX8pg/viewform?usp=dialog';
  if (qrImg) {
    const current = qrImg.getAttribute('src') || '';
    const isHttp = current.startsWith('http://') || current.startsWith('https://');
    if (!current || isHttp) {
      const base = 'https://chart.googleapis.com/chart?cht=qr&chs=400x400&choe=UTF-8&chl=';
      qrImg.src = base + encodeURIComponent(surveyUrl);
    }
    qrImg.width = 240;
    qrImg.height = 240;
  }

  // Graceful fallback if logo image is missing
  if (logo) {
    logo.addEventListener('error', () => {
      logo.style.display = 'none';
      const fallback = document.getElementById('brandLogoFallback');
      if (fallback) fallback.style.display = 'inline-block';
    });
  }
});
