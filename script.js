// Data from home-screen.ts converted to JavaScript
const dob = "11/10/1994";
let currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 8);

var expiryDate = new Date(currentDate);
expiryDate.setDate(expiryDate.getDate() + 30);

const calculateAge = (birthday) => {
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const MENUS = [
  {
    title: "Normal",
    img: "book_ticket_uts.png",
    isActive: true
  }, {
    title: "Quick",
    img: "quick_booking_uts.png",
    isActive: false,
  }, {
    title: "Platform",
    img: "platform_ticket_uts.png",
    isActive: false,
  },
  {
    title: "Season",
    img: "season_ticket_uts.png",
    isActive: false
  },
  {
    title: "QR",
    img: "qr_booking_uts.png",
    isActive: false,
  }
];

const CHILD_MENUS = [
  {
    title: "Cancel Ticket",
    img: "cancel_ticket_uts.png"
  },
  {
    title: "Booking History",
    img: "booking_history_uts.png"
  },
  {
    title: "Show Ticket",
    img: "show_booked_ticket_uts.png",
    routerLink: "ticket"
  },
  {
    class: "wallet",
    title: "R-Wallet",
    img: "r_wallet_uts.png"
  },
  {
    title: "Profile",
    img: "profile_avatar_uts.png"
  },
  {
    class: "transaction",
    title: "Transactions",
    img: "c_c.png"
  }
];

const TICKET_INFO = {
  source: "CHURCH GATE",
  destination: "VASAI ROAD",
  fare: "2135.00",
  via: "1RT>>DDR-MM",
  adult: 1,
  child: 0,
  trainType: "AC EMU",
  bookingDate: currentDate,
  utsNo: "XO1UDW506D",
  mobileNo: "8149698732",
  cardNumber: "547017572570",
  name: "Ms. PREETI GUPTA",
  dobInAge: calculateAge(new Date(dob)),
  sourceInHindi: "वसई रोड (27)",
  destinationInHindi: "कांदिवली",
  classInHindi: "प्रथम",
  classInSan: "प्र श्रे",
  class: "FIRST",
  trainTypeInHindi: "एसी ईएमयू",
  trainTypeInSan: "एसी इमु",
  sac: "996411",
  ir: "27AAAGM0289C2ZI",
  gst: "50.75",
  sgst: "50.75",
  totalGST: "101.50",
  expiryDate: expiryDate,
  rNo: "R19210",
  distance: "52",
};

// Date formatting function (replacing Angular date pipe)
function formatDate(date, format) {
  if (!date) return '';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  if (format === 'dd/MM/yyyy') {
    return `${day}/${month}/${year}`;
  }
  return `${day}/${month}/${year}`;
}

// Navigation system
let currentScreen = 'splash-screen';
let screenHistory = ['splash-screen'];

function showScreen(screenId) {
  // Hide all screens
  const screens = ['splash-screen', 'home-screen', 'ticket-screen', 'ticket-show-screen'];
  screens.forEach(id => {
    const screen = document.getElementById(id);
    if (screen) {
      screen.classList.remove('active');
      screen.style.display = 'none';
    }
  });

  // Show target screen
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
    targetScreen.style.display = 'block';
    currentScreen = screenId;

    // Add to history for browser back navigation
    if (screenHistory[screenHistory.length - 1] !== screenId) {
      screenHistory.push(screenId);
      // Update browser history
      window.history.pushState({ screen: screenId }, '', `#${screenId}`);
    }
  }
}

function navigateTo(screenId) {
  showScreen(screenId);
}

function goBack() {
  if (currentScreen === 'ticket-screen') {
    showScreen('home-screen');
  } else if (currentScreen === 'ticket-show-screen') {
    showScreen('ticket-screen');
  } else {
    showScreen('home-screen');
  }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function (event) {
  if (event.state && event.state.screen) {
    // Remove from history array
    screenHistory.pop();
    const previousScreen = screenHistory[screenHistory.length - 1] || 'home-screen';
    // Show screen without adding to history
    const screens = ['splash-screen', 'home-screen', 'ticket-screen', 'ticket-show-screen'];
    screens.forEach(id => {
      const screen = document.getElementById(id);
      if (screen) {
        screen.classList.remove('active');
        screen.style.display = 'none';
      }
    });

    const targetScreen = document.getElementById(previousScreen);
    if (targetScreen) {
      targetScreen.classList.add('active');
      targetScreen.style.display = 'block';
      currentScreen = previousScreen;
    }
  } else {
    // Fallback to home if no state
    showScreen('home-screen');
  }
});

// Initialize screens on load
function initializeScreens() {
  const screens = ['splash-screen', 'home-screen', 'ticket-screen', 'ticket-show-screen'];
  screens.forEach(id => {
    const screen = document.getElementById(id);
    if (screen) {
      if (id === 'splash-screen') {
        screen.style.display = 'block';
        screen.classList.add('active');
      } else {
        screen.style.display = 'none';
        screen.classList.remove('active');
      }
    }
  });
}

// Home screen interactions
let ticketType = '';

function changeActiveFlag(index) {
  MENUS.forEach((menu, i) => {
    if (i === index) {
      menu.isActive = true;
    } else {
      menu.isActive = false;
    }
  });
  updateMenuDisplay();
}

function updateMenuDisplay() {
  const menuItems = document.querySelectorAll('.tab-menu li');
  menuItems.forEach((item, index) => {
    if (MENUS[index].isActive) {
      item.classList.add('uk-active');
    } else {
      item.classList.remove('uk-active');
    }
  });
}

function changeTicketType(type) {
  ticketType = type;
  updateTicketTypeDisplay();
}

function updateTicketTypeDisplay() {
  const paperlessDiv = document.getElementById('paperless-info');
  const paperDiv = document.getElementById('paper-info');

  if (paperlessDiv && paperDiv) {
    if (ticketType === 'PAPERLESS') {
      paperlessDiv.style.display = 'block';
      paperDiv.style.display = 'none';
    } else if (ticketType === 'PAPER') {
      paperlessDiv.style.display = 'none';
      paperDiv.style.display = 'block';
    } else {
      paperlessDiv.style.display = 'none';
      paperDiv.style.display = 'none';
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
  // Initialize screens
  initializeScreens();

  // Check if there's a hash in URL (for direct navigation or browser back)
  const hash = window.location.hash.replace('#', '');
  if (hash && ['splash-screen', 'home-screen', 'ticket-screen', 'ticket-show-screen'].includes(hash)) {
    screenHistory = [hash];
    showScreen(hash);
  } else {
    // Initialize browser history
    window.history.replaceState({ screen: 'splash-screen' }, '', '#splash-screen');

    // Initialize splash screen redirect
    setTimeout(() => {
      showScreen('home-screen');
    }, 5000);
  }

  // Set Paperless as default selected and show info
  changeTicketType('PAPERLESS');

  // Set up menu click handlers
  const menuItems = document.querySelectorAll('.tab-menu li a');
  menuItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      changeActiveFlag(index);
    });
  });

  // Set up radio button handlers
  const radioButtons = document.querySelectorAll('input[name="radio2"]');
  radioButtons.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.value === 'PAPERLESS') {
        changeTicketType('PAPERLESS');
      } else if (e.target.value === 'PAPER') {
        changeTicketType('PAPER');
      }
    });
  });

  // Set up back button
  const backButton = document.querySelector('.back');
  if (backButton) {
    backButton.addEventListener('click', (e) => {
      e.preventDefault();
      goBack();
    });
  }

  // Set up ticket card click
  const ticketCard = document.querySelector('.ticket-card-link');
  if (ticketCard) {
    ticketCard.addEventListener('click', (e) => {
      e.preventDefault();
      showScreen('ticket-show-screen');
    });
  }

  // Set up child menu clicks - specifically the "Show Ticket" link
  const showTicketLink = document.querySelector('.show-ticket-link');
  if (showTicketLink) {
    showTicketLink.addEventListener('click', (e) => {
      e.preventDefault();
      showScreen('ticket-screen');
    });
  }

  // Initialize UIkit components
  if (typeof UIkit !== 'undefined') {
    // UIkit will auto-initialize components
  }

  // Populate ticket data
  populateTicketData();
});

function populateTicketData() {
  // Populate ticket screen
  const ticketElements = {
    'ticket-fare': TICKET_INFO.fare,
    'ticket-source': TICKET_INFO.source,
    'ticket-destination': TICKET_INFO.destination,
    'ticket-via': TICKET_INFO.via,
    'ticket-adult': TICKET_INFO.adult.toString(),
    'ticket-child': TICKET_INFO.child.toString(),
    'ticket-train-type': TICKET_INFO.trainType,
    'ticket-booking-date': formatDate(TICKET_INFO.bookingDate, 'dd/MM/yyyy'),
    'ticket-uts-no': TICKET_INFO.utsNo
  };

  Object.keys(ticketElements).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = ticketElements[id];
    }
  });

  // Populate ticket show screen
  const ticketShowElements = {
    'show-booking-date': formatDate(TICKET_INFO.bookingDate, 'dd/MM/yyyy'),
    'show-fare': TICKET_INFO.fare,
    'show-mobile': TICKET_INFO.mobileNo,
    'show-uts-no': TICKET_INFO.utsNo,
    'show-card-number': TICKET_INFO.cardNumber,
    'show-name': TICKET_INFO.name,
    'show-age': TICKET_INFO.dobInAge.toString(),
    'show-source-hindi': TICKET_INFO.sourceInHindi,
    'show-source': TICKET_INFO.source,
    'show-source-hindi-2': TICKET_INFO.sourceInHindi,
    'show-destination-hindi': TICKET_INFO.destinationInHindi,
    'show-destination': TICKET_INFO.destination,
    'show-destination-hindi-2': TICKET_INFO.destinationInHindi,
    'show-destination-btn': TICKET_INFO.destination,
    'show-class-hindi': TICKET_INFO.classInHindi,
    'show-class-san': TICKET_INFO.classInSan,
    'show-train-type-hindi': TICKET_INFO.trainTypeInHindi,
    'show-train-type': TICKET_INFO.trainType,
    'show-train-type-san': TICKET_INFO.trainTypeInSan,
    'show-via': TICKET_INFO.via,
    'show-sac': TICKET_INFO.sac,
    'show-ir': TICKET_INFO.ir,
    'show-gst': TICKET_INFO.gst,
    'show-sgst': TICKET_INFO.sgst,
    'show-total-gst': TICKET_INFO.totalGST,
    'show-expiry-date': formatDate(TICKET_INFO.expiryDate, 'dd/MM/yyyy'),
    'show-r-no': TICKET_INFO.rNo,
    'show-distance': TICKET_INFO.distance
  };

  Object.keys(ticketShowElements).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = ticketShowElements[id];
    }
  });

  // Set dates in multiple places
  const bookingDateElements = document.querySelectorAll('[data-booking-date]');
  bookingDateElements.forEach(el => {
    el.textContent = formatDate(TICKET_INFO.bookingDate, 'dd/MM/yyyy');
  });

  const expiryDateElements = document.querySelectorAll('[data-expiry-date]');
  expiryDateElements.forEach(el => {
    el.textContent = formatDate(TICKET_INFO.expiryDate, 'dd/MM/yyyy');
  });
}
