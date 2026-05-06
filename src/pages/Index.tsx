import { useState } from "react";
import Icon from "@/components/ui/icon";

const CLINIC_HERO_IMG = "https://cdn.poehali.dev/projects/3158ed33-02d8-482e-afcc-61b439bd1846/files/6590d733-030e-47a7-a21e-9cc52b6ab04f.jpg";
const DOCTOR_IMG = "https://cdn.poehali.dev/projects/3158ed33-02d8-482e-afcc-61b439bd1846/files/8598db77-3db1-4b55-9adf-8f71ee7c75d7.jpg";

const NAV_LINKS = [
  { label: "О враче", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Прейскурант", href: "#prices" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Запись", href: "#booking" },
];

const SERVICES = [
  { icon: "Stethoscope", title: "Терапевтическая стоматология", desc: "Лечение кариеса, пульпита, восстановление зубов фотополимерными материалами последнего поколения." },
  { icon: "Sparkles", title: "Эстетическая стоматология", desc: "Отбеливание, виниры, реставрация. Возвращаем белоснежную улыбку без вреда для эмали." },
  { icon: "Shield", title: "Профилактика и гигиена", desc: "Профессиональная чистка, снятие зубного камня, покрытие фторлаком. Здоровые зубы на долгие годы." },
  { icon: "Zap", title: "Хирургическая стоматология", desc: "Удаление зубов, имплантация, синус-лифтинг. Работаем с анестезией — безболезненно и безопасно." },
  { icon: "Star", title: "Ортодонтия", desc: "Брекеты, элайнеры, ретейнеры. Исправление прикуса и выравнивание зубов в любом возрасте." },
  { icon: "Heart", title: "Детская стоматология", desc: "Лечение молочных и постоянных зубов у детей в дружелюбной атмосфере, без страха и боли." },
];

const PRICES = [
  { category: "Терапия", items: [
    { name: "Консультация врача", price: "Бесплатно" },
    { name: "Лечение кариеса (1 поверхность)", price: "Бесплатно" },
    { name: "Лечение кариеса (2-3 поверхности)", price: "Бесплатно" },
    { name: "Лечение пульпита", price: "Бесплатно" },
  ]},
  { category: "Эстетика", items: [
    { name: "Отбеливание Beyond", price: "от 15 000 ₽" },
    { name: "Винир керамический", price: "от 25 000 ₽" },
    { name: "Реставрация зуба", price: "от 6 000 ₽" },
  ]},
  { category: "Гигиена", items: [
    { name: "Профессиональная чистка", price: "от 4 500 ₽" },
    { name: "Снятие зубного камня (1 зуб)", price: "от 500 ₽" },
    { name: "Покрытие фторлаком", price: "от 1 500 ₽" },
  ]},
  { category: "Хирургия", items: [
    { name: "Удаление простое", price: "от 3 000 ₽" },
    { name: "Удаление сложное", price: "от 7 000 ₽" },
    { name: "Имплантация (1 зуб)", price: "от 50 000 ₽" },
  ]},
];

const REVIEWS = [
  {
    name: "Анна Михайлова",
    text: "Наконец-то нашла стоматолога, которому доверяю. Профессиональный подход, современное оборудование. Лечила зуб — совершенно безболезненно!",
    date: "март 2026",
    stars: 5,
  },
  {
    name: "Дмитрий Соколов",
    text: "Отличная клиника! Сделал имплантацию — результат превзошёл ожидания. Врач объяснял каждый шаг, никакого дискомфорта.",
    date: "февраль 2026",
    stars: 5,
  },
  {
    name: "Елена Петрова",
    text: "Привела ребёнка 6 лет — он не испугался, даже понравилось! Доктор нашёл подход, всё сделал быстро и аккуратно.",
    date: "январь 2026",
    stars: 5,
  },
  {
    name: "Игорь Васильев",
    text: "Делал отбеливание — результат виден сразу. Зубы светлее на несколько тонов. Очень доволен, рекомендую всем!",
    date: "апрель 2026",
    stars: 5,
  },
];

const DOCTORS = [
  { name: "Ордина Анна Алексеевна", spec: "Терапевт, хирург" },
  { name: "Смирнова Ольга Николаевна", spec: "Ортодонт, эстетист" },
  { name: "Козлов Андрей Викторович", spec: "Имплантолог, хирург" },
];

const TIME_SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "17:00"];

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [activePriceTab, setActivePriceTab] = useState(0);
  const [bookingDone, setBookingDone] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    } else {
      setBookingDone(true);
    }
  };

  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d;
  }).filter(d => d.getDay() !== 0);

  return (
    <div className="min-h-screen bg-background font-ibm">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-navy rounded-sm flex items-center justify-center">
              <Icon name="Heart" size={16} className="text-white" />
            </div>
            <div>
              <div className="font-cormorant text-lg font-semibold text-navy leading-tight">ДентАрт</div>
              <div className="text-[10px] text-muted-foreground tracking-widest uppercase">Стоматологическая клиника</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(l => (
              <button
                key={l.href}
                onClick={() => handleNavClick(l.href)}
                className={`text-sm transition-colors duration-200 ${l.href === "#booking" ? "bg-navy text-white px-4 py-2 rounded-sm hover:bg-navy/90" : "text-foreground hover:text-gold"}`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} className="text-navy" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-3 animate-fade-in">
            {NAV_LINKS.map(l => (
              <button
                key={l.href}
                onClick={() => handleNavClick(l.href)}
                className="text-left text-sm py-2 border-b border-border last:border-0 text-foreground"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${CLINIC_HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/92 via-navy/75 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-24">
          <div className="max-w-xl animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.2em] uppercase font-ibm font-medium">Профессиональная стоматология</span>
            </div>
            <h1 className="font-cormorant text-5xl sm:text-6xl text-white font-light leading-tight mb-6">
              Здоровые зубы —<br />
              <em className="text-gold font-light">красивая улыбка</em>
            </h1>
            <p className="text-white/75 text-base font-ibm leading-relaxed mb-8 font-light">
              Современная стоматологическая клиника с опытом более 15 лет. Безболезненное лечение, передовые технологии, индивидуальный подход к каждому пациенту.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleNavClick("#booking")}
                className="bg-gold text-navy px-8 py-3 text-sm font-medium tracking-wide hover:bg-gold/90 transition-colors"
              >
                Записаться на приём
              </button>
              <button
                onClick={() => handleNavClick("#services")}
                className="border border-white/40 text-white px-8 py-3 text-sm font-medium tracking-wide hover:border-white transition-colors"
              >
                Наши услуги
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 grid grid-cols-3 divide-x divide-white/20">
            {[
              { num: "15+", label: "лет опыта" },
              { num: "8 000+", label: "довольных пациентов" },
              { num: "3", label: "опытных врача" },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center px-4 text-center">
                <span className="font-cormorant text-2xl text-gold font-medium">{s.num}</span>
                <span className="text-white/70 text-xs mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border border-gold/30 rounded-sm" />
              <img
                src={DOCTOR_IMG}
                alt="Главный врач клиники"
                className="relative rounded-sm w-full object-cover aspect-[3/4] max-w-sm mx-auto md:mx-0"
              />
              <div className="absolute bottom-6 -right-4 bg-navy text-white p-4 rounded-sm shadow-lg">
                <div className="font-cormorant text-2xl font-medium text-gold">15+</div>
                <div className="text-xs text-white/80 mt-1">лет практики</div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-gold" />
                <span className="text-gold text-xs tracking-[0.2em] uppercase font-medium">О враче</span>
              </div>
              <h2 className="font-cormorant text-4xl text-navy font-light mb-6 leading-tight">
                Ордина Анна<br /><em>Алексеевна</em>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Врач-стоматолог высшей категории. Окончила Архангельский государственный медицинский университет. Постоянно повышает квалификацию на международных конференциях.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Специализируется на сложных случаях восстановительной и эстетической стоматологии. Главный принцип — лечить пациента, а не зуб.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Award", text: "Высшая квалификационная категория" },
                  { icon: "GraduationCap", text: "Кандидат медицинских наук" },
                  { icon: "Globe", text: "Стажировки в Германии и Израиле" },
                  { icon: "Users", text: "Автор 12 научных публикаций" },
                ].map(item => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gold/10 rounded-sm flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name={item.icon} size={14} className="text-gold" fallback="Star" />
                    </div>
                    <span className="text-sm text-foreground leading-snug">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.2em] uppercase font-medium">Что мы лечим</span>
              <div className="w-8 h-px bg-gold" />
            </div>
            <h2 className="font-cormorant text-4xl text-navy font-light">Наши услуги</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group border border-border p-6 rounded-sm hover:border-gold/50 hover:shadow-md transition-all duration-300 bg-white"
              >
                <div className="w-10 h-10 bg-navy/5 group-hover:bg-gold/10 rounded-sm flex items-center justify-center mb-4 transition-colors">
                  <Icon name={s.icon} size={18} className="text-navy group-hover:text-gold transition-colors" fallback="Star" />
                </div>
                <h3 className="font-cormorant text-xl text-navy font-medium mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-24 bg-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.2em] uppercase font-medium">Стоимость лечения</span>
              <div className="w-8 h-px bg-gold" />
            </div>
            <h2 className="font-cormorant text-4xl text-white font-light">Прейскурант</h2>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {PRICES.map((cat, i) => (
              <button
                key={cat.category}
                onClick={() => setActivePriceTab(i)}
                className={`px-5 py-2 text-sm rounded-sm transition-all duration-200 ${activePriceTab === i ? "bg-gold text-navy font-medium" : "border border-white/20 text-white/70 hover:border-gold/50 hover:text-white"}`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-sm overflow-hidden">
            {PRICES[activePriceTab].items.map((item, i) => (
              <div
                key={item.name}
                className={`flex items-center justify-between px-6 py-4 ${i !== PRICES[activePriceTab].items.length - 1 ? "border-b border-white/10" : ""}`}
              >
                <span className="text-white/85 text-sm">{item.name}</span>
                <span className="text-gold font-medium text-sm whitespace-nowrap ml-4">{item.price}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-white/40 text-xs mt-6">
            * Точная стоимость определяется после консультации врача. Первичная консультация — бесплатно.
          </p>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.2em] uppercase font-medium">Пациенты о нас</span>
              <div className="w-8 h-px bg-gold" />
            </div>
            <h2 className="font-cormorant text-4xl text-navy font-light">Отзывы</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-white border border-border rounded-sm p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Icon key={i} name="Star" size={14} className="text-gold" />
                  ))}
                </div>
                <p className="font-cormorant text-lg text-foreground leading-relaxed mb-4 font-light italic">
                  «{r.text}»
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-navy text-sm">{r.name}</span>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.2em] uppercase font-medium">Удобно и быстро</span>
              <div className="w-8 h-px bg-gold" />
            </div>
            <h2 className="font-cormorant text-4xl text-navy font-light">Онлайн-запись на приём</h2>
          </div>

          {bookingDone ? (
            <div className="text-center bg-secondary/50 border border-border rounded-sm p-12 animate-fade-in">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-gold" />
              </div>
              <h3 className="font-cormorant text-2xl text-navy font-medium mb-2">Запись принята!</h3>
              <p className="text-muted-foreground text-sm mb-1">
                <strong className="text-navy">{patientName}</strong>, мы свяжемся с вами по номеру <strong className="text-navy">{patientPhone}</strong>
              </p>
              <p className="text-muted-foreground text-sm">
                для подтверждения записи к <strong className="text-navy">{selectedDoctor}</strong>
              </p>
              <button
                onClick={() => { setBookingStep(1); setBookingDone(false); setSelectedDoctor(""); setSelectedDate(""); setSelectedTime(""); setPatientName(""); setPatientPhone(""); }}
                className="mt-6 text-sm text-gold hover:underline"
              >
                Записаться ещё раз
              </button>
            </div>
          ) : (
            <>
              {/* Steps */}
              <div className="flex items-center justify-center gap-0 mb-10">
                {["Врач", "Дата и время", "Ваши данные"].map((step, i) => (
                  <div key={step} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${bookingStep > i + 1 ? "bg-gold text-navy" : bookingStep === i + 1 ? "bg-navy text-white" : "bg-secondary text-muted-foreground"}`}>
                        {bookingStep > i + 1 ? <Icon name="Check" size={14} /> : i + 1}
                      </div>
                      <span className={`text-xs mt-1 whitespace-nowrap ${bookingStep === i + 1 ? "text-navy font-medium" : "text-muted-foreground"}`}>{step}</span>
                    </div>
                    {i < 2 && <div className={`w-16 sm:w-24 h-px mx-1 mb-4 transition-all ${bookingStep > i + 1 ? "bg-gold" : "bg-border"}`} />}
                  </div>
                ))}
              </div>

              <form onSubmit={handleBookingSubmit} className="bg-secondary/50 border border-border rounded-sm p-6 sm:p-8">
                {bookingStep === 1 && (
                  <div className="animate-fade-in">
                    <h3 className="font-cormorant text-xl text-navy mb-4 font-medium">Выберите врача</h3>
                    <div className="space-y-3">
                      {DOCTORS.map(doc => (
                        <label key={doc.name} className={`flex items-center gap-4 p-4 border rounded-sm cursor-pointer transition-all ${selectedDoctor === doc.name ? "border-navy bg-navy/5" : "border-border bg-white hover:border-navy/40"}`}>
                          <input
                            type="radio"
                            name="doctor"
                            value={doc.name}
                            checked={selectedDoctor === doc.name}
                            onChange={() => setSelectedDoctor(doc.name)}
                            className="accent-navy"
                          />
                          <div>
                            <div className="text-sm font-medium text-navy">{doc.name}</div>
                            <div className="text-xs text-muted-foreground">{doc.spec}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                    <button
                      type="submit"
                      disabled={!selectedDoctor}
                      className="mt-6 w-full bg-navy text-white py-3 text-sm font-medium rounded-sm hover:bg-navy/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Выбрать дату и время →
                    </button>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="animate-fade-in">
                    <h3 className="font-cormorant text-xl text-navy mb-4 font-medium">Выберите дату</h3>
                    <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
                      {dates.map(d => (
                        <button
                          key={d.toISOString()}
                          type="button"
                          onClick={() => setSelectedDate(d.toISOString())}
                          className={`flex flex-col items-center min-w-[60px] px-2 py-3 border rounded-sm text-xs transition-all ${selectedDate === d.toISOString() ? "border-navy bg-navy text-white" : "border-border bg-white hover:border-navy/50"}`}
                        >
                          <span className={`text-[10px] uppercase ${selectedDate === d.toISOString() ? "text-white/70" : "text-muted-foreground"}`}>
                            {d.toLocaleDateString("ru-RU", { weekday: "short" })}
                          </span>
                          <span className="font-medium text-sm mt-1">{d.getDate()}</span>
                          <span className={`text-[10px] ${selectedDate === d.toISOString() ? "text-white/70" : "text-muted-foreground"}`}>
                            {d.toLocaleDateString("ru-RU", { month: "short" })}
                          </span>
                        </button>
                      ))}
                    </div>

                    <h3 className="font-cormorant text-xl text-navy mb-4 font-medium">Выберите время</h3>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {TIME_SLOTS.map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSelectedTime(t)}
                          className={`py-2 text-sm border rounded-sm transition-all ${selectedTime === t ? "border-gold bg-gold text-navy font-medium" : "border-border bg-white hover:border-gold/50"}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setBookingStep(1)}
                        className="flex-1 border border-border py-3 text-sm rounded-sm hover:border-navy transition-colors"
                      >
                        ← Назад
                      </button>
                      <button
                        type="submit"
                        disabled={!selectedDate || !selectedTime}
                        className="flex-1 bg-navy text-white py-3 text-sm font-medium rounded-sm hover:bg-navy/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Далее →
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="animate-fade-in">
                    <h3 className="font-cormorant text-xl text-navy mb-2 font-medium">Ваши данные</h3>
                    <div className="bg-gold/10 border border-gold/30 rounded-sm p-3 mb-6 text-sm text-navy">
                      <strong>{selectedDoctor}</strong><br />
                      {selectedDate && new Date(selectedDate).toLocaleDateString("ru-RU", { day: "numeric", month: "long", weekday: "long" })}, {selectedTime}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wide">Ваше имя</label>
                        <input
                          type="text"
                          placeholder="Иванова Мария Петровна"
                          value={patientName}
                          onChange={e => setPatientName(e.target.value)}
                          className="w-full border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-navy bg-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wide">Телефон</label>
                        <input
                          type="tel"
                          placeholder="+7 (___) ___-__-__"
                          value={patientPhone}
                          onChange={e => setPatientPhone(e.target.value)}
                          className="w-full border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-navy bg-white"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setBookingStep(2)}
                        className="flex-1 border border-border py-3 text-sm rounded-sm hover:border-navy transition-colors"
                      >
                        ← Назад
                      </button>
                      <button
                        type="submit"
                        disabled={!patientName || !patientPhone}
                        className="flex-1 bg-gold text-navy py-3 text-sm font-medium rounded-sm hover:bg-gold/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Записаться
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-3">
                      Нажимая «Записаться», вы соглашаетесь с условиями обработки персональных данных
                    </p>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 bg-gold/20 rounded-sm flex items-center justify-center">
                  <Icon name="Heart" size={14} className="text-gold" />
                </div>
                <span className="font-cormorant text-xl text-white font-medium">ДентАрт</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">Профессиональная стоматология с заботой о каждом пациенте</p>
            </div>
            <div>
              <h4 className="text-white text-sm font-medium mb-4 tracking-wide uppercase">Контакты</h4>
              <div className="space-y-2 text-white/60 text-sm">
                <div className="flex items-center gap-2"><Icon name="Phone" size={14} className="text-gold" />+7 (996) 502-89-64</div>
                <div className="flex items-center gap-2"><Icon name="Mail" size={14} className="text-gold" />info@dentart.ru</div>
                <div className="flex items-center gap-2"><Icon name="MapPin" size={14} className="text-gold" />Москва, ул. Примерная, 15</div>
              </div>
            </div>
            <div>
              <h4 className="text-white text-sm font-medium mb-4 tracking-wide uppercase">Часы работы</h4>
              <div className="space-y-2 text-white/60 text-sm">
                <div className="flex justify-between"><span>Пн – Пт</span><span className="text-white/80">09:00 – 20:00</span></div>
                <div className="flex justify-between"><span>Суббота</span><span className="text-white/80">10:00 – 18:00</span></div>
                <div className="flex justify-between"><span>Воскресенье</span><span className="text-white/40">Выходной</span></div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-white/30 text-xs">
            © 2026 ДентАрт. Все права защищены. Лицензия на медицинскую деятельность № ЛО-77-01-000000
          </div>
        </div>
      </footer>
    </div>
  );
}