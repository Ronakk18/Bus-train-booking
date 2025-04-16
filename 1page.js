
const searchInput = document.getElementById('nav-search');
const cards = document.querySelectorAll('.card');

searchInput.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  cards.forEach(card => {
    const service = card.getAttribute('data-service');
    if (service.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});
