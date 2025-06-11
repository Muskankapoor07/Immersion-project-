function addProgressBar() {
  const container = document.getElementById('barContainer');

  const progressBar = document.createElement('div');
  progressBar.classList.add('progress-bar');

  const fill = document.createElement('div');
  fill.classList.add('fill');

  progressBar.appendChild(fill);
  container.appendChild(progressBar);

  // Trigger fill animation on next tick
  setTimeout(() => {
    fill.style.width = '100%';
  }, 100); // slight delay ensures transition applies
}
