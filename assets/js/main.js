(function () {
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
  }

  document.querySelectorAll("[data-compare]").forEach(function (card) {
    const range = card.querySelector(".aps-compare__range");
    const before = card.querySelector(".aps-compare__before");
    const handle = card.querySelector(".aps-compare__handle");

    if (!range || !before || !handle) return;

    const setValue = function (v) {
      const value = Math.max(0, Math.min(100, Number(v)));
      before.style.clipPath = "inset(0 " + (100 - value) + "% 0 0)";
      handle.style.left = value + "%";
    };

    range.addEventListener("input", function (e) {
      setValue(e.target.value);
    });

    setValue(range.value || 50);
  });

  function encode(data) {
    return Object.keys(data)
      .map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
      })
      .join("&");
  }

  const form = document.getElementById("apsQuoteForm");
  const msg = document.getElementById("apsFormMsg");

  if (form && msg) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const lang = document.documentElement.lang === "fr" ? "fr" : "en";
      const submitBtn = form.querySelector('button[type="submit"]');
      const formData = new FormData(form);
      const data = {};

      formData.forEach(function (value, key) {
        data[key] = value;
      });

      if (!data["form-name"]) {
        data["form-name"] = form.getAttribute("name") || "contact";
      }

      if (submitBtn) {
        submitBtn.disabled = true;
      }

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(data)
      })
        .then(function () {
          msg.classList.remove("is-error");
          msg.classList.add("is-success");
          msg.textContent =
            lang === "fr"
              ? "Merci. Votre demande a bien été envoyée. Nous vous répondrons rapidement."
              : "Thank you. Your request has been sent successfully. We will get back to you shortly.";
          form.reset();
        })
        .catch(function () {
          msg.classList.remove("is-success");
          msg.classList.add("is-error");
          msg.textContent =
            lang === "fr"
              ? "Une erreur est survenue pendant l’envoi. Veuillez réessayer ou nous contacter directement au (438) 470-2590."
              : "An error occurred while sending your request. Please try again or contact us directly at (438) 470-2590.";
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
          }
        });
    });
  }

  document.querySelectorAll(".aps-accordion").forEach(function (item) {
    const trigger = item.querySelector(".aps-accordion__trigger");
    const content = item.querySelector(".aps-accordion__content");
    if (!trigger || !content) return;

    trigger.addEventListener("click", function () {
      const open = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", open ? "false" : "true");
      item.classList.toggle("is-open", !open);
      const icon = trigger.querySelector(".aps-accordion__icon");
      if (icon) icon.textContent = open ? "+" : "−";
    });
  });
})();
