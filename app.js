/* ============================================================
   Fédération Nationale de Pêche — single-file SPA
   Vanilla JS · hash routing · cart (localStorage) · EN/FR i18n
   ============================================================ */
(function () {
  "use strict";

  /* ---- persistent shell elements ---- */
  var app = document.getElementById("app");
  var overlayEl = document.getElementById("overlay");
  var drawerEl = document.getElementById("drawer");
  var toastEl = document.getElementById("toast");

  /* ======================================================
     ICONS  (24x24 line icons, currentColor)
     ====================================================== */
  var SOLID = { facebook: 1 };
  var ICONS = {
    "chevron-down": `<path d="M6 9l6 6 6-6"/>`,
    "chevron-right": `<path d="M9 6l6 6-6 6"/>`,
    "arrow-right": `<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>`,
    user: `<path d="M19 21v-1.5a4.5 4.5 0 0 0-4.5-4.5h-5A4.5 4.5 0 0 0 5 19.5V21"/><circle cx="12" cy="7.5" r="4"/>`,
    woman: `<circle cx="12" cy="5.6" r="3.1"/><path d="M12 8.7c-2.3 0-3.8 1.4-4.4 3.4L6.5 16.5h11l-1.1-4.4C15.8 10.1 14.3 8.7 12 8.7Z"/><path d="M9.6 21l.7-4.5M14.4 21l-.7-4.5"/>`,
    family: `<path d="M16 21v-1.5a3.5 3.5 0 0 0-3.5-3.5H7.5A3.5 3.5 0 0 0 4 19.5V21"/><circle cx="10" cy="7.5" r="3.5"/><path d="M22 21v-1.5a3.5 3.5 0 0 0-2.6-3.4"/><path d="M16 3.7a3.5 3.5 0 0 1 0 6.8"/>`,
    calendar: `<rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9.5h18"/><path d="M8 2.5v4"/><path d="M16 2.5v4"/>`,
    idcard: `<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><circle cx="8.2" cy="11" r="2.2"/><path d="M5 16c.5-1.6 1.8-2.3 3.2-2.3s2.7.7 3.2 2.3"/><path d="M14.5 9.5h4.5M14.5 12.5h4.5M14.5 15.5h2.8"/>`,
    cart: `<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2.5 3h2.3l2.3 12.2a1.8 1.8 0 0 0 1.8 1.5h8.6a1.8 1.8 0 0 0 1.8-1.4L21 7.5H6.2"/>`,
    "shield-check": `<path d="M12 22s7.5-3.8 7.5-9.5V5.4L12 2.5 4.5 5.4v7.1C4.5 18.2 12 22 12 22Z"/><path d="M8.8 12l2.2 2.2 4.3-4.4"/>`,
    clock: `<circle cx="12" cy="12" r="9"/><path d="M12 7.2v5l3.2 2"/>`,
    smartphone: `<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>`,
    leaf: `<path d="M4 13c0-5.5 4.5-9 16-9 0 8.5-4 12.5-9.5 12.5C7 16.5 4 16 4 13Z"/><path d="M8 18c1.5-4 5-7 9.5-8"/>`,
    lock: `<rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>`,
    help: `<circle cx="12" cy="12" r="9"/><path d="M9.4 9.3a2.7 2.7 0 0 1 5.2 1c0 1.8-2.6 2.4-2.6 2.4"/><path d="M12 16.8h.01"/>`,
    check: `<path d="M5 12.5l4.5 4.5L19 6.5"/>`,
    "check-circle": `<circle cx="12" cy="12" r="9"/><path d="M8.4 12.3l2.4 2.4 4.6-4.8"/>`,
    trash: `<path d="M4 7h16"/><path d="M9 7V5.2A2.2 2.2 0 0 1 11.2 3h1.6A2.2 2.2 0 0 1 15 5.2V7"/><path d="M6 7l1 12.2A2 2 0 0 0 9 21h6a2 2 0 0 0 2-1.8L18 7"/><path d="M10 11v6M14 11v6"/>`,
    plus: `<path d="M12 5v14M5 12h14"/>`,
    minus: `<path d="M5 12h14"/>`,
    menu: `<path d="M3 6h18M3 12h18M3 18h18"/>`,
    close: `<path d="M6 6l12 12M18 6 6 18"/>`,
    mappin: `<path d="M12 21s7-5.6 7-11a7 7 0 0 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>`,
    book: `<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v14H6.5A2.5 2.5 0 0 0 4 19.5Z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v4H6.5A2.5 2.5 0 0 1 4 19.5Z"/>`,
    fish: `<path d="M3 12c4-6 11-7.5 16-5 1.6-1.4 3.4-2.1 5-2.2-.7 1.9-1 3.5-1 5.2s.3 3.3 1 5.2c-1.6-.1-3.4-.8-5-2.2-5 2.5-12 1-16-4Z"/><path d="M14 9.2c-.9 1-1.4 2-1.4 2.8s.5 1.8 1.4 2.8"/><circle cx="7.5" cy="10.6" r=".9"/>`,
    refresh: `<path d="M20.5 12a8.5 8.5 0 1 1-2.4-5.9"/><path d="M20.5 4v4.5H16"/>`,
    mail: `<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M4 7.5l8 5.5 8-5.5"/>`,
    phone: `<path d="M21 16.4v2.6a2 2 0 0 1-2.2 2 18.6 18.6 0 0 1-8.1-2.9 18.3 18.3 0 0 1-5.6-5.6A18.6 18.6 0 0 1 2.2 4.2 2 2 0 0 1 4.2 2h2.6a2 2 0 0 1 2 1.7c.1.9.3 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.5a14.6 14.6 0 0 0 5.5 5.5l1.1-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7a2 2 0 0 1 1.7 2Z"/>`,
    message: `<path d="M21 14.5a2.5 2.5 0 0 1-2.5 2.5H8l-4 4V5.5A2.5 2.5 0 0 1 6.5 3h12A2.5 2.5 0 0 1 21 5.5Z"/>`,
    info: `<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 7.6h.01"/>`,
    facebook: `<path d="M14 9.5V7.8c0-.9.4-1.3 1.4-1.3H17V3.3h-2.6c-2.6 0-3.9 1.4-3.9 4.1V9.5H8v3.2h2.5V21h3.5v-8.3h2.4l.5-3.2H14Z"/>`,
    instagram: `<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/>`,
    youtube: `<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10.2 9.2l5.2 2.8-5.2 2.8Z" fill="currentColor" stroke="none"/>`,
  };

  function icon(name, cls) {
    var p = ICONS[name] || ICONS.info;
    var solid = SOLID[name];
    return (
      '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="' +
      (solid ? "currentColor" : "none") + '" stroke="' +
      (solid ? "none" : "currentColor") +
      '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      p + "</svg>"
    );
  }

  /* ---- brand fish mark ---- */
  var BRAND_FISH =
    '<svg viewBox="0 0 50 40" fill="none" aria-hidden="true">' +
    '<path d="M6 21C12 12 24 8 34 11.5C39 13 41 16.5 41 19.5C41 22.5 39 26 34 27.5C24 31 12 30 6 21Z" fill="currentColor"/>' +
    '<path d="M39 19.5L48 13L45.5 19.5L48 26L39 19.5Z" fill="currentColor"/>' +
    '<path d="M20 27.5C23 30 27 30 30 28.5" stroke="#15336a" stroke-width="1.3" stroke-linecap="round" opacity="0.35"/>' +
    '<circle cx="14.5" cy="18.5" r="1.7" fill="#15336a"/></svg>';

  /* ---- flags ---- */
  function euStars() {
    var s = "";
    for (var i = 0; i < 12; i++) {
      var a = (i * Math.PI) / 6;
      var x = (30 + 13 * Math.sin(a)).toFixed(1);
      var y = (20 - 13 * Math.cos(a)).toFixed(1);
      s += '<circle cx="' + x + '" cy="' + y + '" r="1.8" fill="#FFCC00"/>';
    }
    return s;
  }
  var FLAG_SVG = {
    uk:
      '<svg viewBox="0 0 60 40" preserveAspectRatio="none"><rect width="60" height="40" fill="#012169"/>' +
      '<path d="M0 0 60 40M60 0 0 40" stroke="#fff" stroke-width="8"/>' +
      '<path d="M0 0 60 40M60 0 0 40" stroke="#C8102E" stroke-width="4"/>' +
      '<path d="M30 0V40M0 20H60" stroke="#fff" stroke-width="12"/>' +
      '<path d="M30 0V40M0 20H60" stroke="#C8102E" stroke-width="6"/></svg>',
    fr:
      '<svg viewBox="0 0 60 40"><rect width="20" height="40" fill="#0055A4"/>' +
      '<rect x="20" width="20" height="40" fill="#fff"/><rect x="40" width="20" height="40" fill="#EF4135"/></svg>',
    eu: '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#003399"/>' + euStars() + "</svg>",
  };
  function flag(code, cls) {
    return '<span class="flag ' + (cls || "") + '">' + (FLAG_SVG[code] || "") + "</span>";
  }

  /* ======================================================
     HERO SCENE  (self-contained SVG landscape + angler)
     ====================================================== */
  function heroScene() {
    return '<img class="media-photo" src="hero.png" alt="Angler fishing in a French lake" />';
  }

  /* ======================================================
     DATA
     ====================================================== */
  var LICENSES = [
    {
      id: "adult", icon: "user", price: 100, popular: true,
      name: { en: "Adult Interfederal", fr: "Adulte Interfédérale" },
      sub: { en: "Ages 18 and over", fr: "18 ans et plus" },
      period: { en: "per year", fr: "par an" },
      desc: {
        en: "The complete annual membership giving an adult the right to fish across every reciprocal federation in France.",
        fr: "L’adhésion annuelle complète qui donne à un adulte le droit de pêcher dans toutes les fédérations réciprocitaires de France.",
      },
      features: {
        en: ["Valid 1 January – 31 December", "Fishing in 91 reciprocal departments (EHGO, URNE, CHI)", "1st and 2nd category waters", "Supports aquatic habitat restoration"],
        fr: ["Valable du 1ᵉʳ janvier au 31 décembre", "Pêche dans 91 départements réciprocitaires (EHGO, URNE, CHI)", "Eaux de 1ʳᵉ et 2ᵉ catégorie", "Soutient la restauration des milieux aquatiques"],
      },
    },
    {
      id: "women", icon: "woman", price: 35,
      name: { en: "Women’s Discovery", fr: "Découverte Femme" },
      cardTitle: { en: "Women’s Information License", fr: "Carte Découverte Femme" },
      sub: { en: "For women anglers", fr: "Pour les femmes" },
      period: { en: "per year", fr: "par an" },
      desc: {
        en: "A reduced-rate annual license created to welcome more women to angling, with full access to reciprocal waters.",
        fr: "Une carte annuelle à tarif réduit pour accueillir davantage de femmes à la pêche, avec accès complet aux eaux réciprocitaires.",
      },
      features: {
        en: ["Valid for the full calendar year", "Single-line fishing", "Access to reciprocal waters", "Reduced annual rate"],
        fr: ["Valable toute l’année civile", "Pêche à une ligne", "Accès aux eaux réciprocitaires", "Tarif annuel réduit"],
      },
    },
    {
      id: "minor", icon: "user", price: 22,
      name: { en: "Minor License", fr: "Mineur" },
      cardTitle: { en: "Minor License", fr: "Carte Mineur" },
      sub: { en: "Ages 12 to 18", fr: "De 12 à 18 ans" },
      period: { en: "per year", fr: "par an" },
      desc: {
        en: "Annual license at a reduced rate for young anglers aged 12 to 18 on 1 January of the current year.",
        fr: "Carte annuelle à tarif réduit pour les jeunes pêcheurs de 12 à 18 ans au 1ᵉʳ janvier de l’année.",
      },
      features: {
        en: ["Valid 1 January – 31 December", "Reciprocal access in most departments", "1st and 2nd category waters", "Reduced youth rate"],
        fr: ["Valable du 1ᵉʳ janvier au 31 décembre", "Accès réciprocitaire dans la plupart des départements", "Eaux de 1ʳᵉ et 2ᵉ catégorie", "Tarif jeune réduit"],
      },
    },
    {
      id: "children", icon: "family", price: 6,
      name: { en: "Discovery — Children", fr: "Découverte Enfant" },
      cardTitle: { en: "Discovery License for children", fr: "Carte Découverte Enfant" },
      cardCap: { en: "Up to 12 years old", fr: "Jusqu’à 12 ans" },
      sub: { en: "Up to 12 years old", fr: "Jusqu’à 12 ans" },
      period: { en: "per year", fr: "par an" },
      desc: {
        en: "A low-cost discovery license so children up to 12 can learn to fish safely with one line.",
        fr: "Une carte découverte à petit prix pour que les enfants jusqu’à 12 ans apprennent à pêcher à une ligne.",
      },
      features: {
        en: ["Valid for the full calendar year", "Single-line fishing", "Ideal for a first season", "Symbolic price"],
        fr: ["Valable toute l’année civile", "Pêche à une ligne", "Idéale pour une première saison", "Prix symbolique"],
      },
    },
    {
      id: "weekly", icon: "calendar", price: 32,
      name: { en: "Weekly License", fr: "Hebdomadaire" },
      cardTitle: { en: "Weekly License", fr: "Carte Hebdomadaire" },
      sub: { en: "7 consecutive days", fr: "7 jours consécutifs" },
      period: { en: "for 7 days", fr: "pour 7 jours" },
      desc: {
        en: "Seven consecutive days of fishing — perfect for a holiday on the water in France.",
        fr: "Sept jours consécutifs de pêche — parfait pour des vacances au bord de l’eau en France.",
      },
      features: {
        en: ["7 consecutive days of your choice", "Access to reciprocal waters", "1st and 2nd category waters", "Great for holidays"],
        fr: ["7 jours consécutifs au choix", "Accès aux eaux réciprocitaires", "Eaux de 1ʳᵉ et 2ᵉ catégorie", "Idéale pour les vacances"],
      },
    },
    {
      id: "daily", icon: "idcard", price: 12,
      name: { en: "Daily License", fr: "Journalière" },
      cardTitle: { en: "Daily License", fr: "Carte Journalière" },
      sub: { en: "Valid for one day", fr: "Valable un jour" },
      period: { en: "for 1 day", fr: "pour 1 jour" },
      desc: {
        en: "A single day on the water — the easiest way to try fishing or to fish while travelling.",
        fr: "Une seule journée au bord de l’eau — le moyen le plus simple d’essayer la pêche ou de pêcher en voyage.",
      },
      features: {
        en: ["Valid for one calendar day", "Access to reciprocal waters", "No annual commitment", "Instant digital delivery"],
        fr: ["Valable une journée civile", "Accès aux eaux réciprocitaires", "Sans engagement annuel", "Livraison numérique immédiate"],
      },
    },
  ];

  var PRACTICAL = [
    { icon: "book", title: { en: "Regulations", fr: "Réglementation" }, desc: { en: "Open seasons, daily limits and legal sizes by species and water category.", fr: "Périodes d’ouverture, quotas et tailles légales par espèce et catégorie." } },
    { icon: "mappin", title: { en: "Where to fish", fr: "Où pêcher" }, desc: { en: "Find rivers, lakes and reciprocal waters near you across France.", fr: "Trouvez rivières, lacs et eaux réciprocitaires près de chez vous." } },
    { icon: "calendar", title: { en: "Fishing calendar", fr: "Calendrier de pêche" }, desc: { en: "Opening dates for 1st and 2nd category waters in 2026.", fr: "Dates d’ouverture des eaux de 1ʳᵉ et 2ᵉ catégorie en 2026." } },
    { icon: "fish", title: { en: "Species guide", fr: "Guide des espèces" }, desc: { en: "Identify trout, pike, carp, perch and more, with their legal sizes.", fr: "Identifiez truite, brochet, carpe, perche… avec les tailles légales." } },
  ];

  var FEATURES = [
    { icon: "shield-check", t: "feat.secure.t", d: "feat.secure.d" },
    { icon: "clock", t: "feat.instant.t", d: "feat.instant.d" },
    { icon: "smartphone", t: "feat.mobile.t", d: "feat.mobile.d" },
    { icon: "leaf", t: "feat.env.t", d: "feat.env.d" },
  ];

  var TRUST = [
    { icon: "lock", t: "trust.pay.t", d: "trust.pay.d" },
    { icon: "help", t: "trust.help.t", d: "trust.help.d" },
  ];

  var FAQ = [
    {
      q: { en: "Are these valid fishing licenses in France?", fr: "Est-ce que ce sont des cartes de pêche valables en France ?" },
      a: { en: "Yes — every license sold here is a valid interfederal fishing card recognised across participating departments throughout France.", fr: "Oui — chaque carte vendue ici est une carte de pêche interfédérale valable dans les départements participants en France." },
    },
    {
      q: { en: "When does my license become valid?", fr: "Quand ma carte devient-elle valable ?" },
      a: { en: "Annual licenses run for the calendar year (1 January – 31 December). Weekly and daily licenses start on the date you choose during checkout.", fr: "Les cartes annuelles couvrent l’année civile (1ᵉʳ janvier – 31 décembre). Les cartes hebdomadaires et journalières démarrent à la date choisie au paiement." },
    },
    {
      q: { en: "Can I fish anywhere in France?", fr: "Puis-je pêcher partout en France ?" },
      a: { en: "Annual interfederal licenses cover the 91 reciprocal departments (EHGO, URNE and CHI agreements). Always check the local rules for each water.", fr: "Les cartes annuelles interfédérales couvrent les 91 départements réciprocitaires (accords EHGO, URNE et CHI). Vérifiez toujours la réglementation locale de chaque parcours." },
    },
    {
      q: { en: "How do I receive my license?", fr: "Comment vais-je recevoir ma carte ?" },
      a: { en: "Instantly. After payment your license is available in your account as a PDF to keep on your phone or print at home.", fr: "Immédiatement. Après le paiement, votre carte est disponible dans votre compte au format PDF à garder sur votre téléphone ou à imprimer." },
    },
  ];


  /* ======================================================
     I18N
     ====================================================== */
  var I18N = {
    en: {
      "nav.licenses": "Fishing licenses", "nav.renew": "Renew my license", "nav.practical": "Practical information", "nav.help": "Help", "nav.account": "My account", "nav.cart": "Cart",
      "hero.eyebrow": "Join over 1.5 million anglers in France", "hero.title": "Get your fishing license", "hero.subtitle": "Valid throughout France. Simple, fast and 100% secure.", "hero.choose": "Choose your license", "hero.viewAll": "View all licenses",
      "feat.secure.t": "Secure & reliable", "feat.secure.d": "Safe and trusted fishing license platform", "feat.instant.t": "Instant access", "feat.instant.d": "Your license available immediately", "feat.mobile.t": "Mobile & print", "feat.mobile.d": "On your smartphone or print at home", "feat.env.t": "Committed to our environment", "feat.env.d": "Together, let’s protect our waterways",
      "trust.pay.t": "100% secure payment", "trust.pay.d": "All transactions are encrypted and 100% secure.", "trust.help.t": "Need help?", "trust.help.d": "Our team is here to help you 7 days a week.",
      "common.popular": "Most popular", "common.add": "Add", "common.addToCart": "Add to cart", "common.details": "Details", "common.included": "What’s included", "common.home": "Home",
      "licenses.eyebrow": "Licenses", "licenses.title": "All fishing licenses", "licenses.subtitle": "Choose the license that fits how and when you fish — every option is valid throughout France.",
      "cart.added": "Added to cart", "cart.yourcart": "Your cart", "cart.empty": "Your cart is empty", "cart.emptyText": "Browse our licenses and add the one that fits your fishing.", "cart.browse": "Browse licenses", "cart.total": "Total", "cart.secure": "Secure encrypted payment", "cart.checkout": "Proceed to checkout", "cart.continue": "Continue shopping", "cart.title": "Your cart", "cart.summary": "Order summary", "cart.subtotal": "Subtotal", "cart.vat": "VAT", "cart.included": "Included", "cart.remove": "Remove",
      "detail.secure": "Secure payment · instant digital delivery",
      "checkout.title": "Checkout", "checkout.subtitle": "You are one step away from your license. Payment is encrypted and secure.", "checkout.payTitle": "Payment details", "checkout.name": "Cardholder name", "checkout.email": "Email address", "checkout.card": "Card number", "checkout.expiry": "Expiry", "checkout.cvc": "CVC", "checkout.pay": "Pay", "checkout.demo": "This is a demo store — no real payment is taken.", "checkout.orderSummary": "Order summary", "checkout.successTitle": "Payment confirmed", "checkout.successText": "Your fishing license is ready. A copy has been sent to your email and saved to your account.", "checkout.ref": "Order reference", "checkout.backHome": "Back to home",
      "renew.eyebrow": "Renewal", "renew.title": "Renew my license", "renew.subtitle": "Already fished with us? Renew in under a minute — your details are carried over.", "renew.number": "Previous license number", "renew.numberHint": "Printed at the top of your last license, e.g. 2025-04821736.", "renew.lastname": "Last name", "renew.email": "Email address", "renew.submit": "Find my license", "renew.success": "We found your record. Your renewal has been added to the cart.", "renew.asideTitle": "Renewing is faster", "renew.asideText": "We keep your information from last season so you can be back on the water in moments.", "renew.b1": "Pre-filled with your details", "renew.b2": "Keep the same license number", "renew.b3": "Instant PDF after payment",
      "help.eyebrow": "Support", "help.title": "Help & support", "help.subtitle": "Questions about licenses, regulations or your account? We’re here to help.", "help.email.t": "Email us", "help.email.d": "We reply within one business day.", "help.email.cta": "support@cartedepeche.fr", "help.phone.t": "Call us", "help.phone.d": "Monday to Sunday, 9am – 7pm.", "help.phone.cta": "+33 1 86 65 00 00", "help.chat.t": "Live chat", "help.chat.d": "Chat with our team in real time.", "help.chat.cta": "Start a chat", "help.faqTitle": "Frequently asked questions",
      "account.eyebrow": "My account", "account.title": "Sign in to your account", "account.subtitle": "Access your licenses, receipts and renewals in one place.", "account.email": "Email address", "account.password": "Password", "account.signin": "Sign in", "account.forgot": "Forgot password?", "account.create": "Create an account", "account.success": "Welcome back! You are now signed in (demo).", "account.asideTitle": "Everything in one place", "account.b1": "Find all your licenses in one place", "account.b2": "Re-download your PDF anytime", "account.b3": "Renew in two clicks each year", "account.b4": "Manage your details and receipts",
      "practical.eyebrow": "Practical information", "practical.title": "Practical information", "practical.subtitle": "Everything you need to fish responsibly and legally in France.", "practical.note": "Regulations vary by department and water category. Always confirm local by-laws before fishing.",
      "footer.tagline": "The simple, secure way to buy your fishing license and support the protection of French waterways.", "footer.col.licenses": "Licenses", "footer.col.info": "Information", "footer.col.support": "Support", "footer.allLicenses": "All licenses", "footer.rights": "All rights reserved.", "footer.contact": "Contact us",
      "notFound.text": "We couldn’t find the page you were looking for.", "notFound.cta": "Back to home",
      "logo.title": "Upload Logo", "logo.subtitle": "Upload your organization logo without background. Optimal size: 300×240px.", "logo.size": "Optimal size: 300×240px", "logo.format": "PNG or JPG without background", "logo.upload": "Upload logo", "logo.success": "Logo uploaded successfully!",
    },
    fr: {
      "nav.licenses": "Cartes de pêche", "nav.renew": "Renouveler ma carte", "nav.practical": "Informations pratiques", "nav.help": "Aide", "nav.account": "Mon compte", "nav.cart": "Panier",
      "hero.eyebrow": "Rejoignez plus de 1,5 million de pêcheurs en France", "hero.title": "Obtenez votre carte de pêche", "hero.subtitle": "Valable partout en France. Simple, rapide et 100% sécurisé.", "hero.choose": "Choisissez votre carte", "hero.viewAll": "Voir toutes les cartes",
      "feat.secure.t": "Sécurisé & fiable", "feat.secure.d": "Plateforme de cartes de pêche sûre et fiable", "feat.instant.t": "Accès immédiat", "feat.instant.d": "Votre carte disponible immédiatement", "feat.mobile.t": "Mobile & impression", "feat.mobile.d": "Sur votre smartphone ou imprimée chez vous", "feat.env.t": "Engagés pour l’environnement", "feat.env.d": "Ensemble, protégeons nos cours d’eau",
      "trust.pay.t": "Paiement 100% sécurisé", "trust.pay.d": "Toutes les transactions sont chiffrées et 100% sécurisées.", "trust.help.t": "Besoin d’aide ?", "trust.help.d": "Notre équipe est là pour vous 7j/7.",
      "common.popular": "Le plus choisi", "common.add": "Ajouter", "common.addToCart": "Ajouter au panier", "common.details": "Détails", "common.included": "Ce qui est inclus", "common.home": "Accueil",
      "licenses.eyebrow": "Cartes", "licenses.title": "Toutes les cartes de pêche", "licenses.subtitle": "Choisissez la carte adaptée à votre pratique — toutes sont valables partout en France.",
      "cart.added": "Ajouté au panier", "cart.yourcart": "Votre panier", "cart.empty": "Votre panier est vide", "cart.emptyText": "Parcourez nos cartes et ajoutez celle qui correspond à votre pêche.", "cart.browse": "Voir les cartes", "cart.total": "Total", "cart.secure": "Paiement chiffré et sécurisé", "cart.checkout": "Passer au paiement", "cart.continue": "Continuer mes achats", "cart.title": "Votre panier", "cart.summary": "Récapitulatif", "cart.subtotal": "Sous-total", "cart.vat": "TVA", "cart.included": "Incluse", "cart.remove": "Retirer",
      "detail.secure": "Paiement sécurisé · livraison numérique immédiate",
      "checkout.title": "Paiement", "checkout.subtitle": "Vous êtes à une étape de votre carte. Le paiement est chiffré et sécurisé.", "checkout.payTitle": "Détails du paiement", "checkout.name": "Nom du titulaire", "checkout.email": "Adresse e-mail", "checkout.card": "Numéro de carte", "checkout.expiry": "Expiration", "checkout.cvc": "CVC", "checkout.pay": "Payer", "checkout.demo": "Boutique de démonstration — aucun paiement réel n’est effectué.", "checkout.orderSummary": "Récapitulatif", "checkout.successTitle": "Paiement confirmé", "checkout.successText": "Votre carte de pêche est prête. Une copie a été envoyée par e-mail et enregistrée dans votre compte.", "checkout.ref": "Référence de commande", "checkout.backHome": "Retour à l’accueil",
      "renew.eyebrow": "Renouvellement", "renew.title": "Renouveler ma carte", "renew.subtitle": "Déjà pêché avec nous ? Renouvelez en moins d’une minute — vos informations sont reprises.", "renew.number": "Numéro de carte précédent", "renew.numberHint": "Inscrit en haut de votre dernière carte, ex. 2025-04821736.", "renew.lastname": "Nom", "renew.email": "Adresse e-mail", "renew.submit": "Retrouver ma carte", "renew.success": "Nous avons retrouvé votre dossier. Votre renouvellement a été ajouté au panier.", "renew.asideTitle": "Le renouvellement est plus rapide", "renew.asideText": "Nous conservons vos informations de la saison passée pour vous remettre à l’eau en un instant.", "renew.b1": "Pré-rempli avec vos informations", "renew.b2": "Conservez le même numéro de carte", "renew.b3": "PDF immédiat après paiement",
      "help.eyebrow": "Assistance", "help.title": "Aide & assistance", "help.subtitle": "Des questions sur les cartes, la réglementation ou votre compte ? Nous sommes là.", "help.email.t": "Écrivez-nous", "help.email.d": "Nous répondons sous un jour ouvré.", "help.email.cta": "support@cartedepeche.fr", "help.phone.t": "Appelez-nous", "help.phone.d": "Du lundi au dimanche, 9h – 19h.", "help.phone.cta": "+33 1 86 65 00 00", "help.chat.t": "Chat en direct", "help.chat.d": "Discutez avec notre équipe en temps réel.", "help.chat.cta": "Démarrer le chat", "help.faqTitle": "Questions fréquentes",
      "account.eyebrow": "Mon compte", "account.title": "Connectez-vous à votre compte", "account.subtitle": "Accédez à vos cartes, reçus et renouvellements au même endroit.", "account.email": "Adresse e-mail", "account.password": "Mot de passe", "account.signin": "Se connecter", "account.forgot": "Mot de passe oublié ?", "account.create": "Créer un compte", "account.success": "Bon retour ! Vous êtes maintenant connecté (démo).", "account.asideTitle": "Tout au même endroit", "account.b1": "Retrouvez toutes vos cartes au même endroit", "account.b2": "Re-téléchargez votre PDF à tout moment", "account.b3": "Renouvelez en deux clics chaque année", "account.b4": "Gérez vos informations et vos reçus",
      "practical.eyebrow": "Informations pratiques", "practical.title": "Informations pratiques", "practical.subtitle": "Tout ce qu’il faut pour pêcher de façon responsable et légale en France.", "practical.note": "La réglementation varie selon le département et la catégorie de l’eau. Vérifiez toujours les arrêtés locaux avant de pêcher.",
      "footer.tagline": "La façon simple et sécurisée d’acheter votre carte de pêche et de soutenir la protection des cours d’eau français.", "footer.col.licenses": "Cartes", "footer.col.info": "Informations", "footer.col.support": "Assistance", "footer.allLicenses": "Toutes les cartes", "footer.rights": "Tous droits réservés.", "footer.contact": "Nous contacter",
      "notFound.text": "Nous n’avons pas trouvé la page que vous cherchiez.", "notFound.cta": "Retour à l’accueil",
      "logo.title": "Charger le logo", "logo.subtitle": "Téléchargez votre logo sans arrière-plan. Taille optimale : 300×240px.", "logo.size": "Taille optimale : 300×240px", "logo.format": "PNG ou JPG sans arrière-plan", "logo.upload": "Télécharger le logo", "logo.success": "Logo téléchargé avec succès!",
    },
  };

  /* ======================================================
     STATE + HELPERS
     ====================================================== */
  var KEY = "fnp_state_v1";
  var LOGO_KEY = "fnp_logo_v1";
  var state = { lang: "en", cart: [] };
  var lastOrder = null;
  var FLASH = null;
  var customLogo = null;

  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY));
      if (s) { state.lang = s.lang === "fr" ? "fr" : "en"; state.cart = Array.isArray(s.cart) ? s.cart : []; }
      customLogo = localStorage.getItem(LOGO_KEY);
      // Auto-load logo from server if not in localStorage
      if (!customLogo) {
        fetch('/logo.PNG')
          .then(r => r.blob())
          .then(blob => {
            var reader = new FileReader();
            reader.onload = function(e) {
              customLogo = e.target.result;
              try { localStorage.setItem(LOGO_KEY, customLogo); } catch (ex) {}
              render();
            };
            reader.readAsDataURL(blob);
          })
          .catch(e => {});
      }
    } catch (e) {}
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  function t(k) { var d = I18N[state.lang] || I18N.en; return d[k] != null ? d[k] : (I18N.en[k] != null ? I18N.en[k] : k); }
  function tx(o) { return o ? (o[state.lang] != null ? o[state.lang] : o.en) : ""; }
  function money(n) { return state.lang === "fr" ? n + " €" : "€" + n; }
  function byId(id) { for (var i = 0; i < LICENSES.length; i++) if (LICENSES[i].id === id) return LICENSES[i]; return null; }
  function cartCount() { return state.cart.reduce(function (s, c) { return s + c.qty; }, 0); }
  function cartTotal() { return state.cart.reduce(function (s, c) { var l = byId(c.id); return s + (l ? l.price * c.qty : 0); }, 0); }
  function genRef() { return "FNP-" + Date.now().toString(36).slice(-4).toUpperCase() + "-" + Math.floor(100 + Math.random() * 900); }
  function currentRoute() { return location.hash.replace(/^#/, "") || "/"; }
  function flashFor() { if (FLASH && FLASH.route === currentRoute()) { var m = FLASH.msg; FLASH = null; return '<div class="notice ok">' + icon("check-circle") + " " + m + "</div>"; } return ""; }

  /* ======================================================
     RENDER — chrome
     ====================================================== */
  function isActive(prefix) { var r = currentRoute(); return r === prefix || (prefix !== "/" && r.indexOf(prefix) === 0) ? "active" : ""; }

  function Brand(markClass) {
    return (
      '<a class="brand" href="#/" aria-label="All Fishing Licenses — home" style="align-items:center;justify-content:center">' +
      '<img src="logo.PNG" style="height:290px;object-fit:contain;display:block;filter:brightness(0) invert(1);margin-left:-80px;margin-top:15px" onerror="this.style.display=\'none\'">' +
      '</a>'
    );
  }

  function navLink(href, key) { return '<a class="nav-link ' + isActive(href.slice(1)) + '" href="' + href + '">' + t(key) + "</a>"; }

  function LangSwitcher() {
    var cur = state.lang;
    return (
      '<div class="lang"><button class="lang-btn" data-lang-toggle aria-haspopup="true">' +
      flag(cur === "en" ? "uk" : "fr") + "<span>" + cur.toUpperCase() + "</span>" + icon("chevron-down", "chev") + "</button>" +
      '<div class="lang-menu" id="lang-menu" hidden>' +
      '<button class="lang-opt ' + (cur === "en" ? "active" : "") + '" data-set-lang="en">' + flag("uk") + " English</button>" +
      '<button class="lang-opt ' + (cur === "fr" ? "active" : "") + '" data-set-lang="fr">' + flag("fr") + " Français</button>" +
      "</div></div>"
    );
  }

  function Header() {
    var c = cartCount();
    var dd = PRACTICAL.map(function (p) {
      return '<a class="dd-item" href="#/practical">' + icon(p.icon) + "<span><span class='dd-t'>" + tx(p.title) + "</span><span class='dd-d'>" + tx(p.desc) + "</span></span></a>";
    }).join("");
    return (
      '<header class="site-header"><div class="container header-inner">' +
      Brand() +
      '<nav class="main-nav">' +
      navLink("#/licenses", "nav.licenses") +
      navLink("#/renew", "nav.renew") +
      '<div class="has-dropdown"><a class="nav-link ' + isActive("/practical") + '" href="#/practical">' + t("nav.practical") + " " + icon("chevron-down") + '</a><div class="dropdown">' + dd + "</div></div>" +
      navLink("#/help", "nav.help") +
      "</nav>" +
      '<div class="header-actions">' +
      '<a class="icon-link" href="#/account">' + icon("user") + '<span class="label-text">' + t("nav.account") + "</span></a>" +
      '<div class="hsep"></div>' +
      '<a class="icon-link cart-link" href="#/cart" data-cart-open>' + icon("cart") + '<span class="cart-text"><span class="label-text">' + t("nav.cart") + "</span> (" + c + ")</span></a>" +
      '<div class="hsep"></div>' +
      LangSwitcher() +
      '<button class="hamburger" data-menu-toggle aria-label="Menu">' + icon("menu") + "</button>" +
      "</div></div></header>"
    );
  }

  function MobileMenu() {
    var rows = [
      ["#/licenses", "idcard", "nav.licenses"], ["#/renew", "refresh", "nav.renew"],
      ["#/practical", "book", "nav.practical"], ["#/help", "help", "nav.help"],
      ["#/account", "user", "nav.account"], ["#/cart", "cart", "nav.cart"],
    ].map(function (r) { return '<a href="' + r[0] + '">' + icon(r[1]) + " " + t(r[2]) + (r[0] === "#/cart" ? " (" + cartCount() + ")" : "") + "</a>"; }).join("");
    return '<div class="mobile-menu" id="mobile-menu">' + rows + "</div>";
  }

  function crumbs(items) {
    return '<div class="breadcrumbs">' + items.map(function (it, i) {
      var sep = i ? icon("chevron-right") : "";
      return sep + (it.href ? '<a href="' + it.href + '">' + it.label + "</a>" : "<span>" + it.label + "</span>");
    }).join("") + "</div>";
  }

  /* ======================================================
     RENDER — home sections
     ====================================================== */
  function heroCard(l) {
    var title = tx(l.cardTitle || l.name);
    var cap = l.cardCap ? tx(l.cardCap) : "";
    return (
      '<a class="license-card" href="#/licenses/' + l.id + '"><span class="lc-icon">' + icon(l.icon) + "</span>" +
      '<span class="lc-body"><span class="lc-title">' + title + "</span>" + (cap ? '<span class="lc-cap">' + cap + "</span>" : "") + "</span>" +
      '<span class="lc-arrow">' + icon("chevron-right") + "</span></a>"
    );
  }

  function Hero() {
    return (
      '<section class="hero"><div class="container hero-grid"><div class="hero-left">' +
      '<div class="kicker"><span class="kicker-line"></span><span class="kicker-text">' + t("hero.eyebrow") + "</span></div>" +
      '<h1 class="hero-title">' + t("hero.title") + "</h1>" +
      '<p class="hero-sub">' + t("hero.subtitle") + "</p>" +
      '<div class="choose-label">' + t("hero.choose") + "</div>" +
      '<div class="license-grid">' + LICENSES.map(heroCard).join("") + "</div>" +
      '<a class="btn btn-primary btn-lg btn-block btn-spread view-all" href="#/licenses">' + t("hero.viewAll") + " " + icon("arrow-right") + "</a>" +
      '</div><div class="hero-media">' + heroScene("hero") + "</div></div></section>"
    );
  }

  function Features() {
    return '<section class="features"><div class="container features-grid">' + FEATURES.map(function (f) {
      return '<div class="feature"><span class="feat-icon">' + icon(f.icon) + '</span><div><div class="feat-t">' + t(f.t) + '</div><div class="feat-d">' + t(f.d) + "</div></div></div>";
    }).join("") + "</div></section>";
  }

  function Trust() {
    return '<section class="trust"><div class="container trust-grid">' + TRUST.map(function (x) {
      var ic = x.icon === "eu" ? flag("eu", "flag-lg") : icon(x.icon);
      return '<div class="trust-item"><span class="trust-ic">' + ic + '</span><div><div class="trust-t">' + t(x.t) + '</div><div class="trust-d">' + t(x.d) + "</div></div></div>";
    }).join("") + "</div></section>";
  }

  function Footer() {
    var lic = LICENSES.map(function (l) { return '<a href="#/licenses/' + l.id + '">' + tx(l.cardTitle || l.name) + "</a>"; }).join("");
    var info = PRACTICAL.map(function (p) { return '<a href="#/practical">' + tx(p.title) + "</a>"; }).join("") + '<a href="#/renew">' + t("nav.renew") + "</a>";
    return (
      '<footer class="site-footer"><div class="container"><div class="footer-top">' +
      '<div class="footer-brand">' + Brand() + "<p>" + t("footer.tagline") + "</p>" +
      '<div class="foot-social"><a href="#/" aria-label="Facebook">' + icon("facebook") + '</a><a href="#/" aria-label="Instagram">' + icon("instagram") + '</a><a href="#/" aria-label="YouTube">' + icon("youtube") + "</a></div></div>" +
      '<div class="footer-col"><h4>' + t("footer.col.licenses") + "</h4>" + lic + '<a href="#/licenses">' + t("footer.allLicenses") + "</a></div>" +
      '<div class="footer-col"><h4>' + t("footer.col.info") + "</h4>" + info + "</div>" +
      '<div class="footer-col"><h4>' + t("footer.col.support") + '</h4><a href="#/help">' + t("nav.help") + '</a><a href="#/account">' + t("nav.account") + '</a><a href="#/cart">' + t("nav.cart") + '</a><a href="#/help">' + t("footer.contact") + "</a></div>" +
      "</div><div class='footer-bottom'><div style='flex:1'><p>© " + new Date().getFullYear() + " All Fishing Licenses — " + t("footer.rights") + "</p><div style='margin-top:10px;font-size:12px;display:flex;gap:16px;flex-wrap:wrap'><a href='#/terms' style='color:#aebfda'>Terms of Service</a><a href='#/privacy' style='color:#aebfda'>Privacy Policy</a><a href='#/refund' style='color:#aebfda'>Refund Policy</a><a href='#/cookies' style='color:#aebfda'>Cookies Policy</a><a href='#/contact' style='color:#aebfda'>Contact Us</a></div><div style='margin-top:16px;font-size:12px;color:#8ca1c4'><p style='margin:0;font-weight:500'>TechnoDucks Inc</p><p style='margin:4px 0 0;line-height:1.5'>5348 Vegas Drive # 1485<br/>Las Vegas, NV 89108</p></div></div></div></div></footer>'
    );
  }

  function HomePage() { return Hero() + Features() + Trust(); }

  /* ======================================================
     RENDER — inner pages
     ====================================================== */
  function catCard(l) {
    return (
      '<div class="cat-card ' + (l.popular ? "popular" : "") + '">' +
      (l.popular ? '<span class="ribbon">' + t("common.popular") + "</span>" : "") +
      '<div class="cat-ic">' + icon(l.icon) + "</div>" +
      "<h3>" + tx(l.cardTitle || l.name) + '</h3><div class="cat-sub">' + tx(l.sub) + "</div>" +
      '<p class="cat-desc">' + tx(l.desc) + "</p>" +
      '<div class="price-row"><span class="price">' + money(l.price) + '</span><span class="price-per">' + tx(l.period) + "</span></div>" +
      '<div class="cat-actions"><a class="btn btn-ghost" href="#/licenses/' + l.id + '">' + t("common.details") + '</a>' +
      '<button class="btn btn-primary" data-add="' + l.id + '">' + icon("cart") + " " + t("common.add") + "</button></div></div>"
    );
  }

  function LicensesPage() {
    return (
      '<section class="page"><div class="container">' +
      crumbs([{ href: "#/", label: t("common.home") }, { label: t("nav.licenses") }]) +
      '<div class="page-head"><span class="eyebrow">' + t("licenses.eyebrow") + "</span><h1>" + t("licenses.title") + "</h1><p>" + t("licenses.subtitle") + "</p></div>" +
      '<div class="catalog">' + LICENSES.map(catCard).join("") + "</div></div></section>"
    );
  }

  function DetailPage(id) {
    var l = byId(id);
    if (!l) return NotFound();
    var feats = tx(l.features).map(function (f) { return "<li>" + icon("check") + " " + f + "</li>"; }).join("");
    return (
      '<section class="page"><div class="container">' +
      crumbs([{ href: "#/", label: t("common.home") }, { href: "#/licenses", label: t("nav.licenses") }, { label: tx(l.cardTitle || l.name) }]) +
      '<div class="detail-grid"><div class="detail-media">' + heroScene("detail") + "</div>" +
      '<div class="detail-info"><div class="detail-ic">' + icon(l.icon) + "</div>" +
      "<h1>" + tx(l.cardTitle || l.name) + '</h1><div class="sub">' + tx(l.sub) + "</div>" +
      '<p class="lead">' + tx(l.desc) + "</p>" +
      '<div class="buy-card"><div class="price-row"><span class="price">' + money(l.price) + '</span><span class="price-per">' + tx(l.period) + "</span></div>" +
      '<button class="btn btn-primary btn-lg btn-block" data-add="' + l.id + '">' + icon("cart") + " " + t("common.addToCart") + "</button>" +
      '<div class="foot-note" style="justify-content:center;margin-top:12px">' + icon("lock") + " " + t("detail.secure") + "</div></div>" +
      '<div class="included-title">' + t("common.included") + '</div><ul class="feature-list">' + feats + "</ul></div></div></div></section>"
    );
  }

  function cartLine(l, ci) {
    return (
      '<div class="cart-line"><span class="cl-ic">' + icon(l.icon) + '</span><div class="cl-main">' +
      '<div class="cl-title">' + tx(l.cardTitle || l.name) + '</div><div class="cl-price">' + money(l.price) + " · " + tx(l.period) + "</div>" +
      '<div class="cl-controls"><span class="qty"><button data-dec="' + l.id + '" aria-label="-">' + icon("minus") + "</button><span>" + ci.qty + '</span><button data-inc="' + l.id + '" aria-label="+">' + icon("plus") + "</button></span>" +
      '<button class="cl-remove" data-remove="' + l.id + '">' + icon("trash") + " " + t("cart.remove") + "</button></div></div>" +
      '<div class="cl-line-total">' + money(l.price * ci.qty) + "</div></div>"
    );
  }

  function EmptyState() {
    return (
      '<section class="page"><div class="container"><div class="drawer-empty" style="padding:80px 20px">' + icon("cart") +
      '<h2 style="margin:6px 0 4px">' + t("cart.empty") + "</h2><p>" + t("cart.emptyText") + "</p>" +
      '<a class="btn btn-primary btn-lg" href="#/licenses" style="margin-top:20px">' + t("cart.browse") + "</a></div></div></section>"
    );
  }

  function CartPage() {
    if (!state.cart.length) return EmptyState();
    var lines = state.cart.map(function (ci) { return cartLine(byId(ci.id), ci); }).join("");
    var total = cartTotal();
    return (
      '<section class="page"><div class="container">' +
      crumbs([{ href: "#/", label: t("common.home") }, { label: t("cart.title") }]) +
      '<div class="page-head"><h1>' + t("cart.title") + "</h1></div>" +
      '<div class="cart-layout"><div class="cart-items">' + lines + "</div>" +
      '<aside class="summary"><h3>' + t("cart.summary") + "</h3>" +
      '<div class="foot-row"><span class="lbl">' + t("cart.subtotal") + '</span><span class="val">' + money(total) + "</span></div>" +
      '<div class="foot-row"><span class="lbl">' + t("cart.vat") + '</span><span class="val">' + t("cart.included") + "</span></div>" +
      '<div class="foot-row total" style="border-top:1px solid var(--line-2);padding-top:14px;margin-top:4px"><span class="lbl">' + t("cart.total") + '</span><span class="val">' + money(total) + "</span></div>" +
      '<a class="btn btn-primary btn-lg btn-block" href="#/checkout" style="margin-top:18px">' + t("cart.checkout") + " " + icon("arrow-right") + "</a>" +
      '<div class="foot-note" style="justify-content:center;margin-top:12px">' + icon("lock") + " " + t("cart.secure") + "</div></aside></div></div></section>"
    );
  }

  function CheckoutPage() {
    if (lastOrder) return CheckoutSuccess();
    if (!state.cart.length) return EmptyState();
    var total = cartTotal();
    var summary = state.cart.map(function (ci) {
      var l = byId(ci.id);
      return '<div class="foot-row"><span class="lbl">' + tx(l.cardTitle || l.name) + " × " + ci.qty + '</span><span class="val">' + money(l.price * ci.qty) + "</span></div>";
    }).join("");
    return (
      '<section class="page"><div class="container">' +
      crumbs([{ href: "#/", label: t("common.home") }, { href: "#/cart", label: t("cart.title") }, { label: t("checkout.title") }]) +
      '<div class="page-head"><h1>' + t("checkout.title") + "</h1><p>" + t("checkout.subtitle") + "</p></div>" +
      '<div class="form-wrap"><form class="form-card" data-form="checkout">' +
      '<h3 style="margin-bottom:18px">' + t("checkout.payTitle") + "</h3>" +
      '<div class="field"><label>' + t("checkout.name") + '</label><input name="name" required placeholder="Jean Dupont"></div>' +
      '<div class="field"><label>' + t("checkout.email") + '</label><input type="email" name="email" required placeholder="jean@email.fr"></div>' +
      '<div class="field"><label>' + t("checkout.card") + '</label><input name="card" required inputmode="numeric" placeholder="4242 4242 4242 4242"></div>' +
      '<div class="field-row"><div class="field"><label>' + t("checkout.expiry") + '</label><input name="exp" required placeholder="12/28"></div>' +
      '<div class="field"><label>' + t("checkout.cvc") + '</label><input name="cvc" required placeholder="123"></div></div>' +
      '<button class="btn btn-primary btn-lg btn-block" type="submit">' + icon("lock") + " " + t("checkout.pay") + " " + money(total) + "</button>" +
      '<div class="foot-note" style="justify-content:center;margin-top:12px">' + icon("shield-check") + " " + t("checkout.demo") + "</div></form>" +
      '<aside class="summary" style="position:static"><h3>' + t("checkout.orderSummary") + "</h3>" + summary +
      '<div class="foot-row total" style="border-top:1px solid var(--line-2);padding-top:14px;margin-top:8px"><span class="lbl">' + t("cart.total") + '</span><span class="val">' + money(total) + "</span></div></aside></div></div></section>"
    );
  }

  function CheckoutSuccess() {
    var o = lastOrder;
    return (
      '<section class="page"><div class="container" style="max-width:640px;text-align:center">' +
      '<div class="success-ic" style="width:84px;height:84px;border-radius:50%;background:#e7f6ef;color:#1f9d6b;display:grid;place-items:center;margin:10px auto 22px">' + icon("check-circle", "ic-lg") + "</div>" +
      "<h1>" + t("checkout.successTitle") + '</h1><p style="color:var(--muted);font-size:17px;margin-top:14px">' + t("checkout.successText") + "</p>" +
      '<div class="form-card" style="text-align:left;margin-top:26px"><div class="foot-row"><span class="lbl">' + t("checkout.ref") + '</span><span class="val" style="font-weight:800">' + o.ref + "</span></div>" +
      '<div class="foot-row total" style="margin-top:6px"><span class="lbl">' + t("cart.total") + '</span><span class="val">' + money(o.total) + "</span></div></div>" +
      '<a class="btn btn-primary btn-lg" href="#/" style="margin-top:24px">' + t("checkout.backHome") + "</a></div></section>"
    );
  }

  function RenewPage() {
    return (
      '<section class="page"><div class="container">' +
      crumbs([{ href: "#/", label: t("common.home") }, { label: t("nav.renew") }]) +
      '<div class="page-head"><span class="eyebrow">' + t("renew.eyebrow") + "</span><h1>" + t("renew.title") + "</h1><p>" + t("renew.subtitle") + "</p></div>" +
      '<div class="form-wrap"><form class="form-card" data-form="renew">' + flashFor() +
      '<div class="field"><label>' + t("renew.number") + '</label><input name="num" required placeholder="2025-04821736"><div class="hint">' + t("renew.numberHint") + "</div></div>" +
      '<div class="field-row"><div class="field"><label>' + t("renew.lastname") + '</label><input name="last" required></div>' +
      '<div class="field"><label>' + t("renew.email") + '</label><input type="email" name="email" required></div></div>' +
      '<button class="btn btn-primary btn-lg btn-block" type="submit">' + icon("refresh") + " " + t("renew.submit") + "</button></form>" +
      '<aside class="form-aside"><h3>' + t("renew.asideTitle") + "</h3><p>" + t("renew.asideText") + "</p>" +
      "<ul><li>" + icon("check") + " " + t("renew.b1") + "</li><li>" + icon("check") + " " + t("renew.b2") + "</li><li>" + icon("check") + " " + t("renew.b3") + "</li></ul></aside></div></div></section>"
    );
  }

  function helpCard(ic, key) {
    return (
      '<div class="help-card"><div class="h-ic">' + icon(ic) + "</div><h3>" + t(key + ".t") + "</h3><p>" + t(key + ".d") + "</p>" +
      '<a class="h-link" href="#/help">' + t(key + ".cta") + " " + icon("arrow-right") + "</a></div>"
    );
  }

  function HelpPage() {
    var faq = FAQ.map(function (f, i) {
      return '<div class="faq-item ' + (i === 0 ? "open" : "") + '"><button class="faq-q" data-faq>' + tx(f.q) + " " + icon("plus") + '</button><div class="faq-a"><p>' + tx(f.a) + "</p></div></div>";
    }).join("");
    return (
      '<section class="page"><div class="container">' +
      crumbs([{ href: "#/", label: t("common.home") }, { label: t("nav.help") }]) +
      '<div class="page-head"><span class="eyebrow">' + t("help.eyebrow") + "</span><h1>" + t("help.title") + "</h1><p>" + t("help.subtitle") + "</p></div>" +
      '<div class="help-cards">' + helpCard("mail", "help.email") + helpCard("phone", "help.phone") + helpCard("message", "help.chat") + "</div>" +
      '<h2 style="font-size:26px;margin:8px 0 18px">' + t("help.faqTitle") + '</h2><div class="faq">' + faq + "</div></div></section>"
    );
  }

  function AccountPage() {
    return (
      '<section class="page"><div class="container">' +
      crumbs([{ href: "#/", label: t("common.home") }, { label: t("nav.account") }]) +
      '<div class="page-head"><span class="eyebrow">' + t("account.eyebrow") + "</span><h1>" + t("account.title") + "</h1><p>" + t("account.subtitle") + "</p></div>" +
      '<div style="margin-bottom:28px"><a class="btn btn-ghost" href="#/upload-logo">' + icon("plus") + " Upload Logo</a></div>" +
      '<div class="form-wrap"><form class="form-card" data-form="account">' + flashFor() +
      '<div class="field"><label>' + t("account.email") + '</label><input type="email" name="email" required placeholder="you@email.com"></div>' +
      '<div class="field"><label>' + t("account.password") + '</label><input type="password" name="password" required placeholder="••••••••"></div>' +
      '<button class="btn btn-primary btn-lg btn-block" type="submit">' + t("account.signin") + "</button>" +
      '<div style="display:flex;justify-content:space-between;margin-top:14px;font-size:13.5px"><a href="#/account" style="color:var(--blue);font-weight:600">' + t("account.forgot") + '</a><a href="#/account" style="color:var(--blue);font-weight:600">' + t("account.create") + "</a></div></form>" +
      '<aside class="form-aside"><h3>' + t("account.asideTitle") + '</h3><ul style="margin-top:20px"><li>' + icon("check") + " " + t("account.b1") + "</li><li>" + icon("check") + " " + t("account.b2") + "</li><li>" + icon("check") + " " + t("account.b3") + "</li><li>" + icon("check") + " " + t("account.b4") + "</li></ul></aside></div></div></section>"
    );
  }

  function PracticalPage() {
    var cards = PRACTICAL.map(function (p) {
      return '<div class="info-card"><div class="i-ic">' + icon(p.icon) + "</div><h3>" + tx(p.title) + "</h3><p>" + tx(p.desc) + "</p></div>";
    }).join("");
    return (
      '<section class="page"><div class="container">' +
      crumbs([{ href: "#/", label: t("common.home") }, { label: t("nav.practical") }]) +
      '<div class="page-head"><span class="eyebrow">' + t("practical.eyebrow") + "</span><h1>" + t("practical.title") + "</h1><p>" + t("practical.subtitle") + "</p></div>" +
      '<div class="info-grid">' + cards + "</div>" +
      '<div class="notice" style="background:var(--soft);color:var(--muted);margin-top:28px;border:1px solid var(--line)">' + icon("info") + " " + t("practical.note") + "</div></div></section>"
    );
  }

  function NotFound() {
    return (
      '<section class="page"><div class="container" style="text-align:center;padding:80px 0">' +
      '<h1 style="font-size:64px">404</h1><p style="color:var(--muted);font-size:18px;margin-top:10px">' + t("notFound.text") + "</p>" +
      '<a class="btn btn-primary btn-lg" href="#/" style="margin-top:22px">' + t("notFound.cta") + "</a></div></section>"
    );
  }

  function TermsPage() {
    return '<section class="page"><div class="container">' + crumbs([{ href: "#/", label: t("common.home") }, { label: "Terms of Service" }]) + '<div class="page-head"><h1>Terms of Service</h1><p style="color:var(--muted);font-size:14px">Last updated: June 2026</p></div><div style="max-width:820px;color:var(--muted);line-height:1.7;font-size:15px"><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">1. About this service</h3><p>This website is an independent online platform for purchasing fishing licenses in France. We provide a convenient way to obtain valid interfederal fishing cards (cartes de pêche) for fishing in French waters. We are not a government agency and are not affiliated with official French fishing authorities. All licenses purchased through us are valid legal documents recognized by French fishing federations.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">2. What the Service does</h3><p>When you place an order, we:<br/>• Collect your personal and passport information<br/>• Process your payment via secure payment processing<br/>• Generate your fishing license certificate<br/>• Email you the confirmation with your license details<br/>Our service fee is included in the displayed price. The final price is always shown before payment.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">3. Your responsibilities</h3><p><strong>Accuracy of Data:</strong> You must provide accurate personal information. Errors may result in an invalid license or denial of fishing rights.<br/><strong>Legal Compliance:</strong> You are responsible for complying with all French fishing laws, regulations, and local water-specific rules.<br/><strong>Payment:</strong> Pay using a valid payment method authorized for your use.<br/><strong>License Validity:</strong> Possession of a license does not guarantee fishing rights. Local authorities retain the authority to enforce fishing regulations.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">4. Delivery and processing</h3><p>Most licenses are processed and confirmed within 24 hours. You will receive your license via email as soon as processing is complete. We are not responsible for delays caused by system outages or high processing volumes.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">5. Refunds and cancellations</h3><p>Please see our Refund Policy for complete details on refund eligibility and procedures.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">6. Liability</h3><p>We take care to process applications correctly. However, we cannot be liable for:<br/>• Incorrect information you provide<br/>• Denial of fishing rights by authorities<br/>• System outages or disruptions<br/>• Losses arising from processing delays<br/>Our total liability is limited to the amount you paid for your order.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">7. Data and privacy</h3><p>Your personal data is handled according to our Privacy Policy.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">8. Governing law</h3><p>These terms are governed by applicable French and international law. Any disputes are resolved according to the laws applicable to online services in France.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">9. Contact</h3><p>For questions about these terms, please contact us using the contact form on this website.</p></div></div></section>';
  }

  function PrivacyPage() {
    return '<section class="page"><div class="container">' + crumbs([{ href: "#/", label: t("common.home") }, { label: "Privacy Policy" }]) + '<div class="page-head"><h1>Privacy Policy</h1><p style="color:var(--muted);font-size:14px">Last updated: June 2026</p></div><div style="max-width:820px;color:var(--muted);line-height:1.7;font-size:15px"><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">1. Who we are</h3><p>Our service ("we", "our", "us") is the data controller for the personal data you submit when ordering a fishing license through this website.</p><p style="margin-top:12px"><strong style="color:var(--ink)">Legal entity and business address:</strong><br/>TechnoDucks Inc<br/>5348 Vegas Drive # 1485<br/>Las Vegas, NV 89108</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">2. What data we collect</h3><p>We collect only the information required to deliver the fishing license processing service:</p><p style="margin-top:12px"><strong style="color:var(--ink)">Angler details:</strong> Full name, passport number, nationality, date of birth, and gender.<br/><br/><strong style="color:var(--ink)">Fishing details:</strong> License type, dates of validity, preferred fishing water regions, and any specific requirements.<br/><br/><strong style="color:var(--ink)">Contact email:</strong> To deliver your license confirmation and receipt.<br/><br/><strong style="color:var(--ink)">Payment details:</strong> Processed by our PCI-compliant payment provider (we do not store full card numbers or CVV codes ourselves).<br/><br/><strong style="color:var(--ink)">Technical data:</strong> IP address, browser user-agent, and referrer URL.<br/><br/><strong style="color:var(--ink)">Marketing attribution data:</strong> (UTM tags) when present in the URL.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">3. Why we use your data</h3><p>To process and submit your fishing license application to the French authorities on your behalf.<br/><br/>To send you the license document, payment confirmation, and necessary service updates.<br/><br/>To prevent fraud and verify payment integrity.<br/><br/>To improve our service through aggregated analytics on usage patterns.<br/><br/>To comply with tax, accounting, and other legal obligations.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">4. Who we share data with</h3><p><strong>French fishing authorities:</strong> To issue your official fishing license.<br/><br/><strong>Our payment provider:</strong> For secure processing of your transaction.<br/><br/><strong>Our email delivery provider:</strong> To send confirmation messages and your completed license.<br/><br/><strong>Authorities and courts:</strong> Only if legally required.<br/><br/>We do not sell personal data to third parties for marketing purposes.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">5. Data retention</h3><p>We keep order data only for as long as required by applicable tax, accounting, and fishing record-keeping laws. After this period, data is securely deleted or anonymised.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">6. Your rights</h3><p>You have the right to:</p><p style="margin-top:12px">Access the personal data we hold about you.<br/><br/>Correct inaccurate data.<br/><br/>Request deletion of your data (where legally possible).<br/><br/>Restrict or object to processing.<br/><br/>Data portability (receive a copy of your data).<br/><br/>To exercise your rights, please contact our support team with proof of your identity.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">7. Cookies</h3><p>Please see our Cookie Policy for details on the cookies we use to enhance your experience.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">8. International transfers</h3><p>Some of our service providers may be located outside France. In such cases, we ensure that transfers are covered by appropriate safeguards to maintain the security of your data.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">9. Contact</h3><p>For privacy-related questions, please write to our data protection team via the contact form on this website.</p></div></div></section>';
  }

  function RefundPage() {
    return '<section class="page"><div class="container">' + crumbs([{ href: "#/", label: t("common.home") }, { label: "Refund Policy" }]) + '<div class="page-head"><h1>Refund Policy</h1><p style="color:var(--muted);font-size:14px">Last updated: June 2026</p></div><div style="max-width:820px;color:var(--muted);line-height:1.7;font-size:15px"><p>We want you to be satisfied with your purchase. A fishing license is a digital service that is immediately activated. Once issued, it is linked to your personal information and passport details.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">When a refund is possible</h3><p><strong>Before processing:</strong> If you cancel your order before we submit your data to the license system (typically within 30-60 minutes of payment), you can receive a full refund. Contact us immediately.<br/><br/><strong>System error:</strong> If your license cannot be issued due to a technical error on our part, we will refund the full amount.<br/><br/><strong>Duplicate charge:</strong> Accidental duplicate orders for the same person and dates will be refunded in full.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">When a refund is not possible</h3><p><strong>License already issued:</strong> Once your license has been generated and activated, the service is complete and no refund can be provided.<br/><br/><strong>Incorrect data provided:</strong> If you submitted incorrect details (wrong passport number, name, or dates), the license was issued as requested. We cannot refund for applicant errors.<br/><br/><strong>Trip cancellation:</strong> If your fishing trip is cancelled or postponed, we cannot refund the service fee. The license remains valid for its stated period.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">How to request a refund</h3><p>Contact our support team via the contact form on this website. Include your order number and a brief explanation. We aim to respond within 2 business days.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">Processing time</h3><p>Approved refunds are returned to your original payment method. Depending on your bank, it may take 3–10 business days for funds to appear on your statement.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">Consumer Rights</h3><p>By confirming your order, you consent to immediate processing of your license application. Once your data has been submitted to the system, you acknowledge that the service has begun and standard withdrawal rights may not apply.</p></div></div></section>';
  }

  function CookiesPage() {
    return '<section class="page"><div class="container">' + crumbs([{ href: "#/", label: t("common.home") }, { label: "Cookies Policy" }]) + '<div class="page-head"><h1>Cookies Policy</h1></div><div style="max-width:820px;color:var(--muted);line-height:1.7;font-size:15px"><p>This website uses cookies to enhance your experience and store your preferences.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">1. What Are Cookies?</h3><p>Cookies are small text files stored on your device that help websites remember your information and preferences.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">2. Essential Cookies</h3><p>We use essential cookies to store your language preference (EN/FR) and shopping cart contents.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">3. Analytics</h3><p>We use analytics cookies to understand how visitors use our site and improve our services.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">4. Managing Cookies</h3><p>You can control cookies through your browser settings. Disabling cookies may affect website functionality.</p><h3 style="margin-top:24px;margin-bottom:12px;color:var(--ink)">5. Third-Party Cookies</h3><p>Payment processors may set their own cookies. Check their privacy policies for details.</p></div></div></section>';
  }

  function ContactPage() {
    return '<section class="page"><div class="container">' + crumbs([{ href: "#/", label: t("common.home") }, { label: "Contact Us" }]) + '<div class="page-head"><h1>Contact Us</h1><p>Get in touch with our team. We\'re here to help with any questions about fishing licenses or your account.</p></div><div class="form-wrap"><form class="form-card" data-form="contact"><h3 style="margin-bottom:18px">Send us a message</h3><div class="field"><label>Name</label><input name="name" required></div><div class="field"><label>Email</label><input type="email" name="email" required></div><div class="field"><label>Subject</label><input name="subject" required></div><div class="field"><label>Message</label><textarea name="message" required style="min-height:150px;resize:vertical;padding:13px 14px;border:1.5px solid var(--line-2);border-radius:10px;font-family:inherit;font-size:15px"></textarea></div><button class="btn btn-primary btn-lg btn-block" type="submit">Send Message</button></form><aside class="form-aside"><h3>Other ways to reach us</h3><ul style="margin-top:20px"><li>' + icon("mail") + ' Email: support@cartedepeche.fr</li><li>' + icon("phone") + ' Phone: +33 1 86 65 00 00</li><li>' + icon("clock") + ' Hours: Mon-Sun, 9am-7pm</li></ul></aside></div></div></section>';
  }

  function UploadLogoPage() {
    return '<section class="page"><div class="container">' + crumbs([{ href: "#/", label: t("common.home") }, { label: t("logo.title") }]) + '<div class="page-head"><span class="eyebrow" style="color:var(--muted)">Admin</span><h1>' + t("logo.title") + '</h1><p>' + t("logo.subtitle") + '</p></div><div class="form-wrap"><form class="form-card" data-form="logo">' + flashFor() + (customLogo ? '<div style="margin-bottom:24px;padding:20px;background:linear-gradient(180deg,#173f7c 0%,#11305f 100%);border-radius:14px;display:flex;align-items:center;justify-content:center;min-height:200px"><img src="' + customLogo + '" style="max-width:200px;max-height:180px;object-fit:contain"/></div>' : '') + '<div class="field"><label style="display:block;margin-bottom:12px"><strong style="color:var(--ink)">' + t("logo.format") + '</strong></label><input type="file" name="logo" id="logo-input" accept="image/png,image/jpeg" required style="padding:10px;border:2px dashed var(--line-2);border-radius:10px;width:100%;cursor:pointer"><div class="hint" style="margin-top:8px">' + t("logo.size") + '</div></div><button class="btn btn-primary btn-lg btn-block" type="submit">' + icon("upload" in ICONS ? "upload" : "plus") + " " + t("logo.upload") + '</button></form>' + (customLogo ? '<div style="margin-top:24px"><button class="btn btn-ghost btn-block" data-clear-logo>Clear logo</button></div>' : '') + '</div></div></section>';
  }

  /* ======================================================
     RENDER — cart drawer
     ====================================================== */
  function drawerHTML() {
    var head = '<div class="drawer-head"><h3>' + t("cart.yourcart") + " (" + cartCount() + ')</h3><button class="close" data-close-drawer aria-label="Close">' + icon("close") + "</button></div>";
    if (!state.cart.length) {
      return head + '<div class="drawer-body"><div class="drawer-empty">' + icon("cart") + "<p>" + t("cart.empty") + '</p><a class="btn btn-primary" href="#/licenses" data-close-drawer style="margin-top:16px">' + t("cart.browse") + "</a></div></div>";
    }
    var lines = state.cart.map(function (ci) { return cartLine(byId(ci.id), ci); }).join("");
    var total = cartTotal();
    return (
      head + '<div class="drawer-body">' + lines + "</div>" +
      '<div class="drawer-foot"><div class="foot-row total"><span class="lbl">' + t("cart.total") + '</span><span class="val">' + money(total) + "</span></div>" +
      '<div class="foot-note">' + icon("lock") + " " + t("cart.secure") + "</div>" +
      '<a class="btn btn-primary btn-lg btn-block" href="#/checkout" data-close-drawer>' + t("cart.checkout") + " " + icon("arrow-right") + "</a>" +
      '<a class="btn btn-ghost btn-block" href="#/licenses" data-close-drawer style="margin-top:10px">' + t("cart.continue") + "</a></div>"
    );
  }

  /* ======================================================
     ROUTER
     ====================================================== */
  function routeView() {
    var r = currentRoute();
    if (r === "/" || r === "") return HomePage();
    if (r === "/licenses") return LicensesPage();
    var m = r.match(/^\/licenses\/(.+)$/);
    if (m) return DetailPage(m[1]);
    if (r === "/renew") return RenewPage();
    if (r === "/help") return HelpPage();
    if (r === "/account") return AccountPage();
    if (r === "/practical") return PracticalPage();
    if (r === "/cart") return CartPage();
    if (r === "/checkout") return CheckoutPage();
    if (r === "/terms") return TermsPage();
    if (r === "/privacy") return PrivacyPage();
    if (r === "/refund") return RefundPage();
    if (r === "/cookies") return CookiesPage();
    if (r === "/contact") return ContactPage();
    if (r === "/upload-logo") return UploadLogoPage();
    return NotFound();
  }

  function render() {
    app.innerHTML = Header() + '<main id="view">' + routeView() + "</main>" + Footer() + MobileMenu();
    if (drawerEl && !drawerEl.hidden) drawerEl.innerHTML = drawerHTML();
  }


  /* ======================================================
     CART OPERATIONS
     ====================================================== */
  function addToCart(id) {
    var li = null;
    for (var i = 0; i < state.cart.length; i++) if (state.cart[i].id === id) li = state.cart[i];
    if (li) li.qty++; else state.cart.push({ id: id, qty: 1 });
    save(); render();
  }
  function changeQty(id, d) {
    for (var i = 0; i < state.cart.length; i++) {
      if (state.cart[i].id === id) {
        state.cart[i].qty += d;
        if (state.cart[i].qty <= 0) state.cart.splice(i, 1);
        break;
      }
    }
    save(); render();
  }
  function removeItem(id) {
    state.cart = state.cart.filter(function (c) { return c.id !== id; });
    save(); render();
  }

  /* ======================================================
     DRAWER / MENU / LANG / TOAST
     ====================================================== */
  function openDrawer() {
    drawerEl.innerHTML = drawerHTML();
    drawerEl.hidden = false; overlayEl.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function () { overlayEl.classList.add("show"); drawerEl.classList.add("show"); });
  }
  function closeDrawer() {
    overlayEl.classList.remove("show"); drawerEl.classList.remove("show");
    document.body.style.overflow = "";
    setTimeout(function () { if (!drawerEl.classList.contains("show")) { drawerEl.hidden = true; overlayEl.hidden = true; } }, 300);
  }
  function toggleMobile() { var m = document.getElementById("mobile-menu"); if (m) m.classList.toggle("show"); }
  function closeMobile() { var m = document.getElementById("mobile-menu"); if (m) m.classList.remove("show"); }
  function toggleLang() { var m = document.getElementById("lang-menu"); if (m) m.hidden = !m.hidden; }
  function closeLang() { var m = document.getElementById("lang-menu"); if (m) m.hidden = true; }
  function setLang(l) { if (l === state.lang) return; state.lang = l; document.documentElement.lang = l; save(); render(); }

  var toastTimer;
  function showToast(msg) {
    toastEl.innerHTML = icon("check-circle") + "<span>" + msg + "</span>";
    toastEl.hidden = false;
    requestAnimationFrame(function () { toastEl.classList.add("show"); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); setTimeout(function () { toastEl.hidden = true; }, 260); }, 2200);
  }

  /* ======================================================
     FORMS
     ====================================================== */
  function handleForm(f) {
    var kind = f.getAttribute("data-form");
    if (kind === "checkout") {
      lastOrder = { ref: genRef(), total: cartTotal() };
      state.cart = []; save(); render();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (kind === "logo") {
      var file = f.querySelector('input[name="logo"]').files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function (e) {
        customLogo = e.target.result;
        try { localStorage.setItem(LOGO_KEY, customLogo); } catch (ex) { console.error("Logo too large for storage"); }
        FLASH = { route: currentRoute(), msg: t("logo.success") };
        f.reset();
        render();
      };
      reader.readAsDataURL(file);
      return;
    }
    if (kind === "renew") { addToCart("adult"); }
    if (kind === "contact") { showToast("Message sent! We'll get back to you soon."); f.reset(); return; }
    var msg = kind === "renew" ? t("renew.success") : (kind === "contact" ? "Message sent!" : t("account.success"));
    FLASH = { route: currentRoute(), msg: msg };
    f.reset();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ======================================================
     EVENTS
     ====================================================== */
  document.addEventListener("click", function (e) {
    var el = e.target;
    var hit;
    if ((hit = el.closest("[data-add]"))) { addToCart(hit.getAttribute("data-add")); openDrawer(); showToast(t("cart.added")); return; }
    if ((hit = el.closest("[data-inc]"))) { changeQty(hit.getAttribute("data-inc"), 1); return; }
    if ((hit = el.closest("[data-dec]"))) { changeQty(hit.getAttribute("data-dec"), -1); return; }
    if ((hit = el.closest("[data-remove]"))) { removeItem(hit.getAttribute("data-remove")); return; }
    if (el.closest("[data-cart-open]")) { e.preventDefault(); openDrawer(); return; }
    if (el.closest("[data-close-drawer]")) { if (el.closest("[data-close-drawer]").tagName !== "A") e.preventDefault(); closeDrawer(); return; }
    if (el.id === "overlay") { closeDrawer(); return; }
    if (el.closest("[data-menu-toggle]")) { e.preventDefault(); toggleMobile(); return; }
    if (el.closest("[data-lang-toggle]")) { e.preventDefault(); e.stopPropagation(); toggleLang(); return; }
    if ((hit = el.closest("[data-set-lang]"))) { setLang(hit.getAttribute("data-set-lang")); closeLang(); return; }
    if ((hit = el.closest("[data-faq]"))) { hit.parentElement.classList.toggle("open"); return; }
    if (el.closest("[data-clear-logo]")) { e.preventDefault(); customLogo = null; try { localStorage.removeItem(LOGO_KEY); } catch (ex) {} render(); return; }
    if (!el.closest(".lang")) closeLang();
  });

  document.addEventListener("submit", function (e) {
    var f = e.target;
    if (f.matches("[data-form]")) { e.preventDefault(); handleForm(f); }
  });

  window.addEventListener("hashchange", function () {
    if (currentRoute() !== "/checkout") lastOrder = null;
    closeDrawer(); closeMobile(); closeLang();
    render();
    window.scrollTo(0, 0);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeDrawer(); closeLang(); closeMobile(); }
  });

  /* ======================================================
     BOOT
     ====================================================== */
  load();
  document.documentElement.lang = state.lang;
  render();

  /* __BOOT__ */
})();
