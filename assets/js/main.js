(function () {
  // =========================
  // BUSINESS INFO - CHANGE THIS
  // =========================
  const BUSINESS_NAME = "Apex Property Services Montréal";
  const BUSINESS_PHONE_DISPLAY = "(514) 220-5945";
  const BUSINESS_PHONE_RAW = "15142205945"; // format international without spaces
  const BUSINESS_EMAIL = "contact@apexpropertyservicesmtl.ca";
  const BUSINESS_ADDRESS = "2250 rue Guy, app. 1801, Montréal, QC H3H 2M2";

  // =========================
  // BASIC UI
  // =========================
  const header = document.getElementById("apsHeader");
  const burger = document.getElementById("apsBurger");
  const mobile = document.getElementById("apsMobile");
  const yearNodes = document.querySelectorAll("[data-year]");

  yearNodes.forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (burger && mobile) {
    burger.addEventListener("click", function () {
      const open = mobile.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });

    mobile.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        mobile.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // =========================
  // BEFORE / AFTER SLIDER
  // =========================
  document.querySelectorAll("[data-compare]").forEach(function (card) {
    const range = card.querySelector(".aps-compare__range");
    const before = card.querySelector(".aps-compare__before");
    const handle = card.querySelector(".aps-compare__handle");

    if (!range || !before || !handle) return;

    function setValue(v) {
      const value = Math.max(0, Math.min(100, Number(v)));
      before.style.clipPath = "inset(0 " + (100 - value) + "% 0 0)";
      handle.style.left = value + "%";
    }

    range.addEventListener("input", function (e) {
      setValue(e.target.value);
    });

    setValue(range.value || 50);
  });

  // =========================
  // CONTACT FORM
  // =========================
  const form = document.getElementById("apsQuoteForm");
  const msg = document.getElementById("apsFormMsg");

  function sanitize(value) {
    return String(value || "").trim();
  }

  function getLang() {
    return document.documentElement.lang === "fr" ? "fr" : "en";
  }

  function buildMailSubject(data, lang) {
    if (lang === "fr") {
      return `Nouvelle demande de devis - ${data.service || "Service non précisé"}`;
    }
    return `New quote request - ${data.service || "Service not specified"}`;
  }

  function buildMailBody(data, lang) {
    if (lang === "fr") {
      return [
        `Bonjour ${BUSINESS_NAME},`,
        ``,
        `Je souhaite demander un devis.`,
        ``,
        `Nom : ${data.name}`,
        `Email : ${data.email}`,
        `Téléphone : ${data.phone || "Non indiqué"}`,
        `Service : ${data.service || "Non indiqué"}`,
        `Ville / secteur : ${data.city || "Non indiqué"}`,
        `Message : ${data.message || "Aucun message supplémentaire"}`,
        ``,
        `Merci,`
      ].join("\n");
    }

    return [
      `Hello ${BUSINESS_NAME},`,
      ``,
      `I would like to request a quote.`,
      ``,
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "Not provided"}`,
      `Service: ${data.service || "Not provided"}`,
      `City / area: ${data.city || "Not provided"}`,
      `Message: ${data.message || "No additional message"}`,
      ``,
      `Thank you,`
    ].join("\n");
  }

  if (form && msg) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const lang = getLang();

      const data = {
        name:
          sanitize(form.querySelector('[name="name"]')?.value),
        email:
          sanitize(form.querySelector('[name="email"]')?.value),
        phone:
          sanitize(form.querySelector('[name="phone"]')?.value),
        service:
          sanitize(form.querySelector('[name="service"]')?.value),
        city:
          sanitize(form.querySelector('[name="city"]')?.value),
        message:
          sanitize(form.querySelector('[name="message"]')?.value)
      };

      // Basic validation
      if (!data.name || !data.email || !data.service) {
        msg.classList.remove("is-success");
        msg.classList.add("is-error");
        msg.innerHTML =
          lang === "fr"
            ? "Merci de remplir au minimum <strong>votre nom</strong>, <strong>votre email</strong> et <strong>le service souhaité</strong>."
            : "Please fill in at least <strong>your name</strong>, <strong>your email</strong> and <strong>the requested service</strong>.";
        return;
      }

      const subject = buildMailSubject(data, lang);
      const body = buildMailBody(data, lang);

      const mailtoUrl =
        "mailto:" +
        encodeURIComponent(BUSINESS_EMAIL) +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      // Success message with your actual business info
      msg.classList.remove("is-error");
      msg.classList.add("is-success");
      msg.innerHTML =
        lang === "fr"
          ? `
            <strong>Merci. Votre demande est prête.</strong><br>
            Si votre application mail ne s’ouvre pas, contactez-nous directement :<br>
            <strong>Email :</strong> <a href="mailto:${BUSINESS_EMAIL}">${BUSINESS_EMAIL}</a><br>
            <strong>Téléphone :</strong> <a href="tel:${BUSINESS_PHONE_RAW}">${BUSINESS_PHONE_DISPLAY}</a><br>
            <strong>Adresse :</strong> ${BUSINESS_ADDRESS}
          `
          : `
            <strong>Thank you. Your request is ready.</strong><br>
            If your mail app does not open, contact us directly:<br>
            <strong>Email:</strong> <a href="mailto:${BUSINESS_EMAIL}">${BUSINESS_EMAIL}</a><br>
            <strong>Phone:</strong> <a href="tel:${BUSINESS_PHONE_RAW}">${BUSINESS_PHONE_DISPLAY}</a><br>
            <strong>Address:</strong> ${BUSINESS_ADDRESS}
          `;

      // Open mail client
      window.location.href = mailtoUrl;

      form.reset();
    });
  }

  // =========================
  // FAQ ACCORDION
  // =========================
  document.querySelectorAll(".aps-accordion").forEach(function (item) {
    const trigger = item.querySelector(".aps-accordion__trigger");
    const content = item.querySelector(".aps-accordion__content");
    const icon = trigger?.querySelector(".aps-accordion__icon");

    if (!trigger || !content) return;

    // start closed
    trigger.setAttribute("aria-expanded", "false");
    item.classList.remove("is-open");
    content.style.maxHeight = "0px";
    if (icon) icon.textContent = "+";

    trigger.addEventListener("click", function () {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      // close all
      document.querySelectorAll(".aps-accordion").forEach(function (otherItem) {
        const otherTrigger = otherItem.querySelector(".aps-accordion__trigger");
        const otherContent = otherItem.querySelector(".aps-accordion__content");
        const otherIcon = otherTrigger?.querySelector(".aps-accordion__icon");

        if (!otherTrigger || !otherContent) return;

        otherTrigger.setAttribute("aria-expanded", "false");
        otherItem.classList.remove("is-open");
        otherContent.style.maxHeight = "0px";
        if (otherIcon) otherIcon.textContent = "+";
      });

      // open clicked one if it was closed
      if (!isOpen) {
        trigger.setAttribute("aria-expanded", "true");
        item.classList.add("is-open");
        content.style.maxHeight = content.scrollHeight + "px";
        if (icon) icon.textContent = "−";
      }
    });
  });
})();
