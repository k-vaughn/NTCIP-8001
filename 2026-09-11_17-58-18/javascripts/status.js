(function () {
  function normalizeHost(url) {
    try {
      return new URL(url).hostname.toLowerCase();
    } catch (e) {
      return "";
    }
  }

  function updateDocStatus() {
    const el = document.getElementById("doc-status");
    if (!el) return;

    const runtimeHost = window.location.hostname.toLowerCase();
    const configuredHost = normalizeHost(el.dataset.officialUrl);

    const statusText = {
      proposal: "Proposal: This is a newly proposed project that does not yet reflect broad community input",
      draft: "Draft: This is a draft document that is subject to significant changes at any time",
      preliminary: "Preliminary: This is a preliminary document and may experience changes prior to finalization",
      recommended: "Recommended: This document has been recommended for balloting but is not yet approved",
      ifr: "IFR: This is an approved Interim for Field Release (IFR) document",
      approved: "Approved: This is an approved formal standard"
    };

    const configuredStatus = (el.dataset.status || "proposal").toLowerCase();

    const isOfficial = runtimeHost === configuredHost;

    const finalStatus = isOfficial ? configuredStatus : "proposal";

    el.className = "status-badge " + finalStatus;
    el.textContent = statusText[finalStatus];
  }

  updateDocStatus();

  // Handle Material instant navigation
  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(updateDocStatus);
  }
})();