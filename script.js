/* =========================================================
   AE Sports & Coaching – gedeeld script voor alle pagina's
   ========================================================= */

// ---------- Hamburgermenu op smartphone ----------
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
});

// =========================================================
// CONTACT: AUTOMATISCHE BERICHTJES
// Pas de teksten hieronder gerust aan.
// =========================================================
const WHATSAPP_NUMMER = '32468201330';
const MAILADRES = 'aesportsencoaching@gmail.com';

// Algemeen berichtje (knoppen zonder specifiek aanbod)
const algemeen = {
  whatsapp: 'Hallo Amy! Ik kom via je website en heb interesse in AE Sports & Coaching. Kan je me meer info geven?',
  onderwerp: 'Vraag via de website – AE Sports & Coaching',
  vragen:
`Ik heb interesse in:
- Personal training / Sportmassage / Online coaching / Groepslessen / Iets anders (schrap wat niet past)

Mijn doel of vraag:


Wanneer past het mij het best (dagen/uren):
`
};

// Extra vragen in de mail per aanbod.
// De naam (bv. 'personal training') moet overeenkomen met data-onderwerp="..." op de knop.
const extraVragen = {
  'personal training':
`Waar wil ik trainen (Easy Active Studio Kasterlee / aan huis of op locatie):

Alleen of met z'n tweeën:

Mijn doel (bv. conditie, kracht, afvallen, een sportief doel):


Wanneer past het mij het best (dagen/uren):
`,
  'sportmassage of sporttaping':
`Massage of taping:

Locatie (SuperFit 2.0 Retie / Graciouscosmetics Turnhout / aan huis / bij mijn club):

Duur (30 / 45 / 60 min) en zones:

Blessures, klachten of medicatie die ik moet melden:

Wanneer past het mij het best (dagen/uren):
`,
  'online coaching':
`Welk pakket (Start Coach / Premium Coach / Wedstrijdbegeleiding):

Mijn doel of wedstrijd (en datum):

Hoe vaak train ik nu per week:
`,
  'groepslessen':
`Welke groepsles (Move & Smile / Mama & Kid / een groepsles voor mijn eigen groepje):

Met hoeveel personen ongeveer:

Welke dagen/uren passen het best:
`,
  'beweegmomenten in zorginstellingen':
`Naam van de zorginstelling:

Gemeente:

Aantal deelnemers (ongeveer):

Gewenst (eenmalig beweegmoment / maandpakket, 1 of 2 keer per week):

Contactpersoon en telefoonnummer:
`,
  'een bootcamp voor bedrijven':
`Naam van het bedrijf:

Gemeente:

Aantal deelnemers (ongeveer):

Gewenst moment (middagpauze / voor of na de shift) en duur (30 – 60 min):

Eenmalig of op regelmatige basis:

Contactpersoon en telefoonnummer:
`
};

function maakLinks(onderwerp) {
  let waTekst, mailOnderwerp, vragen;
  if (onderwerp) {
    waTekst = `Hallo Amy! Ik kom via je website en heb interesse in ${onderwerp}. Kan je me meer info geven?`;
    mailOnderwerp = `Interesse in ${onderwerp} – via de website`;
    vragen = `Ik heb interesse in ${onderwerp}.\n\n` + (extraVragen[onderwerp] || 'Mijn vraag:\n');
  } else {
    waTekst = algemeen.whatsapp;
    mailOnderwerp = algemeen.onderwerp;
    vragen = algemeen.vragen;
  }

  const mailTekst =
`Hallo Amy,

Ik kwam via je website bij AE Sports & Coaching terecht.
${vragen}
Mijn naam:
Mijn telefoonnummer:

Alvast bedankt!
Met vriendelijke groeten`;

  return {
    wa: 'https://wa.me/' + WHATSAPP_NUMMER + '?text=' + encodeURIComponent(waTekst),
    mail: 'mailto:' + MAILADRES +
      '?subject=' + encodeURIComponent(mailOnderwerp) +
      '&body=' + encodeURIComponent(mailTekst)
  };
}

// Gewone WhatsApp- en maillinks (menu, footer, ...) krijgen het algemene berichtje
const standaard = maakLinks();
document.querySelectorAll('[data-wa]').forEach(a => a.href = standaard.wa);
document.querySelectorAll('[data-mail]').forEach(a => a.href = standaard.mail);

// ---------- Keuzevenster openen / sluiten ----------
const modal = document.getElementById('contact-modal');
if (modal) {
  const modalWa = modal.querySelector('.modal-option[data-wa]');
  const modalMail = modal.querySelector('.modal-option[data-mail]');
  const modalTitel = document.getElementById('modal-title');

  const openModal = (onderwerp) => {
    const l = maakLinks(onderwerp);
    modalWa.href = l.wa;
    modalMail.href = l.mail;
    modalTitel.textContent = onderwerp
      ? 'Interesse in ' + onderwerp + '?'
      : 'Hoe wil je me contacteren?';
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-open-contact]').forEach(b =>
    b.addEventListener('click', () => openModal(b.dataset.onderwerp)));
  document.querySelectorAll('[data-close-contact]').forEach(b =>
    b.addEventListener('click', closeModal));
  modal.querySelectorAll('.modal-option').forEach(a => a.addEventListener('click', closeModal));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

// ---------- Acties met een einddatum automatisch verbergen ----------
const vandaag = new Date();
document.querySelectorAll('[data-tot]').forEach(el => {
  const einde = new Date(el.dataset.tot + 'T23:59:59');
  if (vandaag > einde) el.remove();
});

// ---------- Jaartal in de footer ----------
const jaar = document.getElementById('year');
if (jaar) jaar.textContent = new Date().getFullYear();
