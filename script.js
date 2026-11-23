// ===================================================
// JAN TAILOR FOR MEN - JAVASCRIPT LOGIC
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Smooth Active Nav Link Highlighting
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
      const sectionId = section.getAttribute('id');
      if (sectionId) {
        const sectionTop = section.offsetTop - 120;
        if (window.pageYOffset >= sectionTop) {
          current = sectionId;
        }
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});

// Quick View Modal
function openModal(imgId, title, desc) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const sourceImg = document.getElementById(imgId);

  if (modal && modalImg && sourceImg) {
    modalImg.src = sourceImg.src;
    modalTitle.innerText = title;
    modalDesc.innerText = desc;
    modal.style.display = 'flex';
  }
}

function closeModal() {
  const modal = document.getElementById('image-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Close modal on background click
window.addEventListener('click', (e) => {
  const modal = document.getElementById('image-modal');
  if (e.target === modal) {
    closeModal();
  }
});

// Select service from pricing card
function selectService(serviceName) {
  const suitSelect = document.getElementById('suit-type');
  if (suitSelect) {
    if (serviceName.includes('Simple')) {
      suitSelect.value = 'Standard Shalwar Kameez';
    } else if (serviceName.includes('Designer')) {
      suitSelect.value = 'Designer Kurta Pajama';
    } else if (serviceName.includes('Waistcoat')) {
      suitSelect.value = 'Waistcoat / Prince Coat';
    }
  }
}

// Handle Order Form Submit -> Direct WhatsApp Order
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('cust-name').value.trim();
  const phone = document.getElementById('cust-phone').value.trim();
  const suitType = document.getElementById('suit-type').value;
  const collarType = document.getElementById('collar-type').value;
  
  const kameez = document.getElementById('m-kameez').value.trim();
  const chest = document.getElementById('m-chest').value.trim();
  const teera = document.getElementById('m-teera') ? document.getElementById('m-teera').value.trim() : '';
  const sleeves = document.getElementById('m-sleeves').value.trim();
  const collar = document.getElementById('m-collar').value.trim();
  const losing = document.getElementById('m-losing') ? document.getElementById('m-losing').value.trim() : '';
  const shalwar = document.getElementById('m-shalwar').value.trim();
  const pancha = document.getElementById('m-pancha').value.trim();
  const notes = document.getElementById('cust-notes').value.trim();

  // Create WhatsApp Message Text
  let message = `*--- NEW ORDER FOR JAN TAILOR FOR MEN ---*\n\n`;
  message += `👤 *Customer Name:* ${name}\n`;
  message += `📞 *WhatsApp:* ${phone}\n`;
  message += `👔 *Suit Type:* ${suitType}\n`;
  message += `✂️ *Collar Style:* ${collarType}\n\n`;

  message += `📏 *MEASUREMENTS (Inches):*\n`;
  message += `• Shirt Length (لمبائی): ${kameez || 'Sample suit provided'}\n`;
  message += `• Chest (چھاتی): ${chest || 'Sample suit provided'}\n`;
  message += `• Shoulder (تیرا): ${teera || 'Sample suit provided'}\n`;
  message += `• Sleeves (آستین): ${sleeves || 'Sample suit provided'}\n`;
  message += `• Collar (کالر / بین): ${collar || 'Sample suit provided'}\n`;
  if (losing) {
    message += `• Losing (لوزنگ): ${losing} Inch\n`;
  }
  message += `• Trouser / Shalwar Length: ${shalwar || 'Sample suit provided'}\n`;
  message += `• Bottom Opening / Pancha: ${pancha || 'Sample suit provided'}\n\n`;

  if (notes) {
    message += `📝 *Special Instructions:* ${notes}\n\n`;
  }

  message += `_Sent via Jan Tailor Online Website_`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/923202124730?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
}
