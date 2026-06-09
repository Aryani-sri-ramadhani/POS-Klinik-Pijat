"use strict";

/* =================== FORMAT & UTILS =================== */
function rupiah(n) {
  n = Math.round(n || 0);
  return (n < 0 ? "-Rp " : "Rp ") + Math.abs(n).toLocaleString("id-ID");
}

function pad(n) {
  return (n < 10 ? "0" : "") + n;
}

function todayStr() {
  var d = new Date();
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}

function monthOf(s) {
  return (s || "").slice(0, 7);
}

function thisMonth() {
  return todayStr().slice(0, 7);
}

function namaBulan(ym) {
  var b = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  var p = ym.split("-");
  return b[parseInt(p[1], 10) - 1] + " " + p[0];
}

function tglPanjang(s) {
  var b = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  var p = s.split("-");
  return parseInt(p[2], 10) + " " + b[parseInt(p[1], 10) - 1] + " " + p[0];
}

function cleanPhone(num) {
  num = String(num || "").replace(/\D/g, "");
  if (num.startsWith("0")) {
    num = "62" + num.slice(1);
  }
  return num;
}

function terbilang(n) {
  n = Math.round(Math.abs(n));
  if (n === 0) return "nol";
  var sa = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];
  
  function w(x) {
    if (x < 12) return sa[x];
    if (x < 20) return w(x - 10) + " belas";
    if (x < 100) {
      var p = Math.floor(x / 10), r = x % 10;
      return sa[p] + " puluh" + (r ? " " + sa[r] : "");
    }
    if (x < 200) return "seratus" + (x - 100 ? " " + w(x - 100) : "");
    if (x < 1000) {
      var p = Math.floor(x / 100), r = x % 100;
      return sa[p] + " ratus" + (r ? " " + w(r) : "");
    }
    if (x < 2000) return "seribu" + (x - 1000 ? " " + w(x - 1000) : "");
    if (x < 1000000) {
      var p = Math.floor(x / 1000), r = x % 1000;
      return w(p) + " ribu" + (r ? " " + w(r) : "");
    }
    if (x < 1000000000) {
      var p = Math.floor(x / 1000000), r = x % 1000000;
      return w(p) + " juta" + (r ? " " + w(r) : "");
    }
    var p = Math.floor(x / 1000000000), r = x % 1000000000;
    return w(p) + " miliar" + (r ? " " + w(r) : "");
  }
  
  return w(n);
}

/* =================== TAMPILAN & DOM HELPERS =================== */
var app = document.getElementById("app");

function announce(m) {
  var e = document.getElementById("announce");
  if (e) {
    e.textContent = "";
    setTimeout(function () {
      e.textContent = m;
    }, 60);
  }
}

function setHeader() {
  var sub = document.getElementById("appSub");
  if (sub) {
    sub.textContent = db.settings.pantiName || "SEHAT NUSANTARA";
  }
}

function render(html) {
  if (!app) app = document.getElementById("app");
  
  // Apply fade-out and fade-in transition
  app.style.opacity = 0;
  setTimeout(function () {
    app.innerHTML = html;
    setHeader();
    
    // Accessibility focus management
    var t = app.querySelector(".screen-title");
    if (t) {
      t.setAttribute("tabindex", "-1");
      t.focus();
    }
    app.style.opacity = 1;
  }, 100);
}

function el(id) {
  return document.getElementById(id);
}

function on(id, ev, fn) {
  var e = el(id);
  if (e) e.addEventListener(ev, fn);
}

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function digits(v) {
  return parseInt(String(v || "").replace(/\D/g, ""), 10) || 0;
}

function each(sel, fn) {
  var items = app.querySelectorAll(sel);
  Array.prototype.forEach.call(items, fn);
}
