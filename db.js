"use strict";

/* =================== PENYIMPANAN =================== */
var DB_KEY = "kasir_panti_v2";

function defaultServices() {
  return [
    { id: "s1", name: "Pijat Relaksasi", price: 100000, recipe: { itemId: "oil", qty: 50 } },
    { id: "s2", name: "Pijat Keseleo", price: 100000, recipe: { itemId: "oil", qty: 50 } },
    { id: "s3", name: "Refleksi", price: 100000, recipe: { itemId: "oil", qty: 50 } },
    { id: "s4", name: "Acupressure", price: 100000, recipe: null }
  ];
}

function defaultInventory() {
  return [
    { id: "oil", name: "Minyak Pijat", currentStock: 0, minStockAlert: 500, unit: "ml" }
  ];
}

function blankDB() {
  return {
    settings: {
      pantiName: "Klinik Pijat Tunanetra SEHAT NUSANTARA",
      ownerPin: "",
      phone: "0813 1850 744",
      address: "Jl. Kramat Sentiong No. 57A, Jakarta Pusat",
      transportFee: 20000,
      defaultCommission: 60,
      setupDone: false,
      promoTemplate: "Halo {nama}, kami rindu pelayanan kami untuk Anda. Dapatkan diskon khusus kunjungan berikutnya!"
    },
    services: defaultServices(),
    therapists: [],
    transactions: [],
    expenses: [],
    commissionPayments: [],
    capital: [],
    assets: [],
    customers: [],
    inventory: defaultInventory()
  };
}

var db = loadDB();

function loadDB() {
  try {
    var raw = localStorage.getItem(DB_KEY);
    if (!raw) return blankDB();
    var d = JSON.parse(raw);
    var b = blankDB();
    for (var k in b) {
      if (!(k in d)) d[k] = b[k];
    }
    for (var s in b.settings) {
      if (!(s in d.settings)) d.settings[s] = b.settings[s];
    }
    if (d.services) {
      d.services.forEach(function (s) {
        if (s.recipe === undefined) {
          if (s.id === "s1" || s.id === "s2" || s.id === "s3") {
            s.recipe = { itemId: "oil", qty: 50 };
          } else {
            s.recipe = null;
          }
        }
      });
    }
    return d;
  } catch (e) {
    return blankDB();
  }
}

function saveDB() {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (e) {
    alert("Data gagal disimpan di perangkat.");
  }
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
