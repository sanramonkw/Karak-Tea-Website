/**
 * Contact form — validation and submit (FormSubmit.co + mailto fallback).
 */
(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const responseEl = document.getElementById("contact-form-response");
  const submitBtn = form.querySelector('[type="submit"]');

  function t(key) {
    return typeof KarakI18n !== "undefined" ? KarakI18n.t(key) : key;
  }

  function showResponse(type, message) {
    if (!responseEl) return;
    responseEl.hidden = false;
    responseEl.className = "contact-form-response contact-form-response--" + type;
    responseEl.textContent = message;
  }

  function clearFieldErrors() {
    form.querySelectorAll(".contact-field").forEach((f) => f.classList.remove("is-invalid"));
  }

  function validate() {
    clearFieldErrors();
    let valid = true;

    const name = form.elements.name?.value.trim();
    const email = form.elements.email?.value.trim();
    const phone = form.elements.phone?.value.trim();

    if (!name) {
      form.elements.name?.closest(".contact-field")?.classList.add("is-invalid");
      valid = false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      form.elements.email?.closest(".contact-field")?.classList.add("is-invalid");
      valid = false;
    }

    if (!phone) {
      form.elements.phone?.closest(".contact-field")?.classList.add("is-invalid");
      valid = false;
    }

    if (!valid) showResponse("error", t("contact.form.invalid"));
    return valid;
  }

  function mailtoFallback() {
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const phone = form.elements.phone.value.trim();
    const message = form.elements.message.value.trim();
    const subject = encodeURIComponent("Karak Tea — Contact form");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message || "(none)"}`
    );
    const to =
      (typeof KarakAssets !== "undefined" && KarakAssets.contactEmail) ||
      "info@karaktea.com";
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    showResponse("success", t("contact.form.success"));
  }

  async function submitForm() {
    const endpoint =
      (typeof KarakAssets !== "undefined" && KarakAssets.contactFormEndpoint) ||
      "https://formsubmit.co/ajax/info@karaktea.com";

    const data = new FormData(form);
    data.append("_subject", "Karak Tea — Contact form");
    data.append("_captcha", "false");
    data.append("_template", "table");

    const prevLabel = submitBtn?.value;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.value = t("contact.form.sending");
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        form.reset();
        showResponse("success", t("contact.form.success"));
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.value = t("contact.form.submit");
        }
        return;
      }
    } catch (_) {
      /* network or CORS — try mailto */
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.value = prevLabel || t("contact.form.submit");
    }
    mailtoFallback();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    responseEl && (responseEl.hidden = true);
    if (!validate()) return;
    submitForm();
  });

  document.addEventListener("karak:langchange", () => {
    if (responseEl && !responseEl.hidden && responseEl.classList.contains("contact-form-response--success")) {
      showResponse("success", t("contact.form.success"));
    }
  });
})();
