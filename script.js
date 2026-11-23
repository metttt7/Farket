/* =====================================================
   Şiddetin Farkında Ol — script.js
   Bölümler: 1) Menü  2) Türler kartları  3) Kırmızı bayraklar
             4) Öz-değerlendirme testi  5) Duygusal takip
   ===================================================== */

/* ---------- 1. MOBİL MENÜ ---------- */
const navToggle = document.getElementById("navToggle");
const navLinks  = document.getElementById("navLinks");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

/* ---------- 2. ŞİDDET TÜRLERİ KARTLARI ---------- */
const turler = [
  { icon: "🕳️", title: "Gaslighting", desc: "Gerçekliğini sorgulatır.",
    detail: "Karşı taraf hatıralarını, algını ve duygularını sistematik olarak çürütür: 'O öyle olmadı, sen abartıyorsun.' Uzun vadede kişi kendi gerçekliğine güvenemez hale gelir." },
  { icon: "🔗", title: "Kontrol ve Takip", desc: "Kıskançlık sevgi kılıfına girer.",
    detail: "Telefon denetimi, sürekli konum isteme, kıyafet ve arkadaş seçimine karışma. 'Seni seviyorum' diyerek kısıtlamak kontroldür, sevgi değil." },
  { icon: "🚪", title: "İzolasyon", desc: "Senin ağını keser.",
    detail: "Aile ve arkadaşlarına karşı sürekli çatışma çıkarma, görüşmelerini engelleme. Kişi yalnızlaştıkça şiddet kolaylaşır ve yardım istemek zorlaşır." },
  { icon: "😶", title: "Aşağılama ve Küçük Düşürme", desc: 'Şakaya, "espriye" saklar.',
    detail: "Sürekli alay, lakap takma, başkalarının önünde küçük düşürme, başarıları hiçe sayma. Tek başına görünse de desen halinde çalışır." },
  { icon: "🧊", title: "Duygusal İhmal", desc: "Varlığını yok sayar.",
    detail: "Soru sorulmaması, duyguların yok sayılması, cevapsız bırakılma, susarak cezalandırma. Duygusal ihmal, hırpalamadan daha az fark edilir ama derin iz bırakır." },
  { icon: "⚠️", title: "Tehdit ve Şantaj", desc: "Korkuyu araç olarak kullanır.",
    detail: "'Seni terk edersem ne yaparım bilirsin', 'Fotoğrafları yayarım', 'Çocukları alırım' gibi ifadeler fiziksel şiddet göstermeden de kişiyi esir eder." }
];

const turlerGrid = document.getElementById("turlerGrid");
turler.forEach((t, i) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="card-icon">${t.icon}</div>
    <h3>${t.title}</h3>
    <p>${t.desc}</p>
    <span class="card-toggle">Detay için tıkla ▾</span>
    <div class="card-detail"><p>${t.detail}</p></div>`;
  card.addEventListener("click", () => {
    card.classList.toggle("open");
    card.querySelector(".card-toggle").textContent =
      card.classList.contains("open") ? "Kapat ▴" : "Detay için tıkla ▾";
  });
  turlerGrid.appendChild(card);
});

/* ---------- 3. KIRMIZI BAYRAKLAR ---------- */
const bayraklar = [
  "Sürekli telefonunu / mesajlarını denetliyor veya konumunu istiyor.",
  "'Kıskandığı için' arkadaşlarınla ve ailenle görüşmeni engelliyor.",
  "Yaşadıklarını hatırlamıyormuş gibi yapıp senin gerçekliğini çürütüyor.",
  "Başkalarının yanında seni aşağılayıp 'şaka yaptım' diyor.",
  "Ne giydiğine, ne yediğine, ne izlediğine karışıyor.",
  "Duygularını önemsiz buluyor: 'Ağlama, abartıyorsun.'",
  "Seni suçluyor: 'Seni ben böyle yaptım', 'Beni kendime bu hale getirdin.'",
  "Ayrılmakla, kendine zarar vermekle ya da seni ifşa etmekle tehdit ediyor.",
  "Sevgiyi ve ilgiyi ceza/ödül aracı olarak kullanıyor.",
  "Başarılarını küçümsüyor ya da seni rekabet edemeyeceği şeylerle kıyaslıyor.",
  "Tartışmalarda seni suskunluğa, uzaklaşmaya (duvar örmeye) zorluyor.",
  "Çevrendekilerin ona karşı olduğunu söyleyip seni iyice yalnızlaştırıyor."
];

const flagsList   = document.getElementById("flagsList");
const flagCount   = document.getElementById("flagCount");
const flagFill    = document.getElementById("flagFill");
const flagMsg     = document.getElementById("flagMsg");
const flagsSummary = document.getElementById("flagsSummary");
const checkedFlags = new Set();

bayraklar.forEach((text, i) => {
  const item = document.createElement("div");
  item.className = "flag-item";
  item.innerHTML = `<span class="flag-check">✓</span><p>${text}</p>`;
  item.addEventListener("click", () => {
    item.classList.toggle("checked");
    item.classList.contains("checked") ? checkedFlags.add(i) : checkedFlags.delete(i);
    updateFlagsSummary();
  });
  flagsList.appendChild(item);
});

function updateFlagsSummary() {
  const n = checkedFlags.size;
  flagCount.textContent = n;
  flagFill.style.width = (n / bayraklar.length * 100) + "%";
  if (n === 0)      flagMsg.textContent = "Henüz işaretleme yapmadın.";
  else if (n <= 3)  flagMsg.textContent = "Düşük sayıda işaret. Yine de deseni izlemeye devam et; tek bir bayrak bile ciddiye alınmalı.";
  else if (n <= 6)  flagMsg.textContent = "Orta düzeyde uyarı işareti var. Güvendiğin birine anlatmayı ve kayıt tutmayı düşün.";
  else if (n <= 9)  flagMsg.textContent = "Yüksek sayıda kırmızı bayrak. Bu bir desen — profesyonel destek almak için geç değil.";
  else              flagMsg.textContent = "Kritik düzeyde uyarı işaretleri. Güvenliğini önceliklendir; acil durumda 112'yi ara.";
}
document.getElementById("flagReset").addEventListener("click", () => {
  checkedFlags.clear();
  flagsList.querySelectorAll(".flag-item").forEach(el => el.classList.remove("checked"));
  updateFlagsSummary();
});

/* ---------- 4. ÖZ-DEĞERLENDİRME TESTİ ---------- */
const quizSorulari = [
  { q: "Partnerim / yakınım sık sık hatıralarımı ve yaşananları 'öyle olmadı' diyerek çürütüyor.", puan: 3 },
  { q: "Telefonumu kontrol etmesi veya sürekli nerede olduğumu bilmesi 'sevgi göstergesi' sayılıyor.", puan: 3 },
  { q: "Ailem ve arkadaşlarımla görüşmelerimi azalttım veya görüşmemeye başladım.", puan: 3 },
  { q: "Kendimi sürekli hata yapıyormuş, yetersizmişim gibi hissediyorum.", puan: 2 },
  { q: "Duygularım ve endişelerim 'abartı' veya 'hassasiyet' olarak yaftalanıyor.", puan: 2 },
  { q: "Ayrılmak, kendine zarar vermek ya da bilgilerimi ifşa etmekle tehdit edildim.", puan: 3 },
  { q: "Başkalarının yanında aşağılandığımda buna 'şaka' deniliyor.", puan: 2 },
  { q: "Hangi kıyafeti giyeceğime, nereye gideceğime, kimi göreceğime karışılıyor.", puan: 2 },
  { q: "Sevgi ve ilgi gösterilmesi, itaatime bağlı olarak artıp azalıyor.", puan: 2 },
  { q: "Yaşadıklarımı birine anlatmaktan çekiniyorum; 'kimse inanmaz' diye düşünüyorum.", puan: 2 }
];

const quizBox      = document.getElementById("quizBox");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions  = document.getElementById("quizOptions");
const quizCounter  = document.getElementById("quizCounter");
const quizFill     = document.getElementById("quizFill");
const quizResult   = document.getElementById("quizResult");
let quizIndex = 0, quizScore = 0;

const cevaplar = [
  { label: "Hiçbir zaman",    v: 0 },
  { label: "Nadiren",         v: 0.5 },
  { label: "Bazen",           v: 1 },
  { label: "Sık sık",         v: 1 },
  { label: "Neredeyse her zaman", v: 1 }
];

function soruGoster() {
  const s = quizSorulari[quizIndex];
  quizCounter.textContent = `Soru ${quizIndex + 1} / ${quizSorulari.length}`;
  quizFill.style.width = (quizIndex / quizSorulari.length * 100) + "%";
  quizQuestion.textContent = s.q;
  quizOptions.innerHTML = "";
  cevaplar.forEach(c => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.textContent = c.label;
    btn.addEventListener("click", () => {
      if (c.v >= 1) quizScore += s.puan;
      else if (c.v > 0) quizScore += Math.round(s.puan / 2);
      quizIndex++;
      quizIndex < quizSorulari.length ? soruGoster() : quizBitir();
    });
    quizOptions.appendChild(btn);
  });
}

function quizBitir() {
  quizBox.classList.add("hidden");
  quizResult.classList.remove("hidden");
  document.getElementById("quizScore").textContent = quizScore;
  const t = document.getElementById("quizResultText");
  if (quizScore <= 5)
    t.textContent = "Düşük puan. Şu anki ilişki deseninde belirgin bir psikolojik şiddet işareti gözükmüyor. Yine de farkındalığını koru ve duygusal takip alışkanlığını sürdür.";
  else if (quizScore <= 12)
    t.textContent = "Orta düzeyde uyarı işaretleri var. Tek başına anlam ifade etmeyen davranışlar desen halinde tehlikelidir. Güvendiğin birine anlatmayı ve kayıt tutmayı düşün.";
  else if (quizScore <= 20)
    t.textContent = "Yüksek düzeyde uyarı işaretleri. Psikolojik şiddet ihtimali ciddi. Profesyonel destek alman ve güvenlik planı yapman önerilir.";
  else
    t.textContent = "Kritik düzeyde uyarı işaretleri. Bu desen acil değerlendirilmeli. 183 Aile, Kadın ve Çocuk Danışma Hattı veya bir psikologla konuş. Güvende olmadığını düşünüyorsan 112'yi ara.";
}

document.getElementById("quizRestart").addEventListener("click", () => {
  quizIndex = 0; quizScore = 0;
  quizResult.classList.add("hidden");
  quizBox.classList.remove("hidden");
  soruGoster();
});
soruGoster();

/* ---------- 5. DUYGUSAL TAKİP ---------- */
const STORE_KEY = "duyguTakipKayitlari";
const moods = { 1: "😞", 2: "😟", 3: "😐", 4: "🙂", 5: "😄" };
const etiketler = ["korku", "kaygı", "çaresizlik", "yalnızlık", "öfke", "utanç", "umut", "rahatlık"];

const trackerForm = document.getElementById("trackerForm");
const moodPicker  = document.getElementById("moodPicker");
const tagPicker   = document.getElementById("tagPicker");
const logList     = document.getElementById("logList");
const logStats    = document.getElementById("logStats");
const logCountEl  = document.getElementById("logCount");
const logClearBtn = document.getElementById("logClear");

let seciliMood = null;
const seciliEtiketler = new Set();

etiketler.forEach(et => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "tag-pick";
  b.textContent = et;
  b.addEventListener("click", () => {
    seciliEtiketler.has(et) ? seciliEtiketler.delete(et) : seciliEtiketler.add(et);
    b.classList.toggle("active");
  });
  tagPicker.appendChild(b);
});

moodPicker.querySelectorAll("button").forEach(b => {
  b.addEventListener("click", () => {
    moodPicker.querySelectorAll("button").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    seciliMood = Number(b.dataset.mood);
  });
});

function kayitlariYukle() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; }
  catch { return []; }
}
function kayitlariKaydet(liste) {
  localStorage.setItem(STORE_KEY, JSON.stringify(liste));
}

trackerForm.addEventListener("submit", e => {
  e.preventDefault();
  if (!seciliMood) { alert("Önce bugünkü ruh halini seç."); return; }
  const liste = kayitlariYukle();
  liste.unshift({
    tarih: new Date().toISOString(),
    mood: seciliMood,
    etiketler: [...seciliEtiketler],
    not: document.getElementById("trackerNote").value.trim()
  });
  kayitlariKaydet(liste);
  trackerForm.reset();
  seciliMood = null; seciliEtiketler.clear();
  moodPicker.querySelectorAll("button").forEach(x => x.classList.remove("active"));
  tagPicker.querySelectorAll(".tag-pick").forEach(x => x.classList.remove("active"));
  renderLog();
});

function renderLog() {
  const liste = kayitlariYukle();
  logCountEl.textContent = `(${liste.length} kayıt)`;
  logClearBtn.classList.toggle("hidden", liste.length === 0);
  logList.innerHTML = liste.length === 0
    ? '<p style="color:var(--muted);font-size:.9rem">Henüz kayıt yok. İlk girdini bugün yap — desenler ancak veriyle görünür.</p>'
    : "";
  liste.forEach((k, i) => {
    const d = new Date(k.tarih);
    const div = document.createElement("div");
    div.className = "log-entry";
    div.innerHTML = `
      <div>
        <div>${moods[k.mood]} <strong>${d.toLocaleDateString("tr-TR")}</strong> ${d.toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"})}</div>
        <div class="log-tags">${k.etiketler.map(e => "#" + e).join(" ") || ""}${k.not ? " — " + k.not : ""}</div>
      </div>
      <button class="log-delete" data-i="${i}" title="Sil">✕</button>`;
    logList.appendChild(div);
  });

  if (liste.length > 0) {
    const ort = (liste.reduce((t, k) => t + k.mood, 0) / liste.length).toFixed(1);
    const son7 = liste.filter(k => (Date.now() - new Date(k.tarih)) < 7 * 864e5);
    const ort7 = son7.length ? (son7.reduce((t, k) => t + k.mood, 0) / son7.length).toFixed(1) : "—";
    logStats.innerHTML = `Toplam <strong>${liste.length}</strong> kayıt · Genel ortalama: <strong>${ort}</strong> · Son 7 gün ortalaması: <strong>${ort7}</strong>`;
  } else {
    logStats.textContent = "";
  }
}

logList.addEventListener("click", e => {
  if (!e.target.classList.contains("log-delete")) return;
  const liste = kayitlariYukle();
  liste.splice(Number(e.target.dataset.i), 1);
  kayitlariKaydet(liste);
  renderLog();
});

logClearBtn.addEventListener("click", () => {
  if (confirm("Tüm kayıtlar silinsin mi? Bu işlem geri alınamaz.")) {
    localStorage.removeItem(STORE_KEY);
    renderLog();
  }
});

renderLog();
