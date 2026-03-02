import Heading from "./Components/Heading";
import Input from "./Components/Input";
import Item1 from "./Components/Item1";
import "./App.css";
import Container from "./Components/Container";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Analytics } from "@vercel/analytics/react";

const translations = {
  en: {
    appTitle: "TODO APP",
    themeLight: "☀ Light",
    themeDark: "🌙 Dark",
    emptyState: "No tasks yet. Add one above ✨",
    enterWork: "Enter Work",
    add: "Add",
    delete: "Delete",
    fillInfo: "Enter all info.",
    langEn: "EN",
    langHi: "हिंदी",
  },
  hi: {
    appTitle: "टू-डू ऐप",
    themeLight: "☀ हल्का",
    themeDark: "🌙 गहरा",
    emptyState: "अभी कोई कार्य नहीं है। ऊपर नया जोड़ें ✨",
    enterWork: "कार्य लिखें",
    add: "जोड़ें",
    delete: "हटाएँ",
    fillInfo: "सारी जानकारी भरें।",
    langEn: "EN",
    langHi: "हिंदी",
  },
};

function App() {
  let savedList = localStorage.getItem("MyList");
  let [originalList, setList] = useState(
    savedList ? JSON.parse(savedList) : [], // fallback to empty array
  );
  const [theme, setTheme] = useState(
    () => localStorage.getItem("MyTheme") || "dark",
  );
  const [language, setLanguage] = useState(
    () => localStorage.getItem("MyLanguage") || "en",
  );
  const appRef = useRef(null);
  const listRef = useRef(null);
  const t = translations[language];

  let addElement = (text, date) => {
    let newObj = { text, date };
    let list = [...originalList, newObj];
    localStorage.setItem("MyList", JSON.stringify(list));
    setList(list);
  };

  let delElement = (text, date) => {
    let index = originalList.findIndex(
      (item) => item.text === text && item.date === date,
    );
    let newArr = [...originalList];
    if (index !== -1) newArr.splice(index, 1);
    localStorage.setItem("MyList", JSON.stringify(newArr));
    setList(newArr);
  };

  useLayoutEffect(() => {
    if (!appRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".todo-app-card", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
      });
      gsap.from(".todo-title", {
        y: -18,
        opacity: 0,
        duration: 0.7,
        delay: 0.2,
        ease: "power2.out",
      });
      gsap.from(".todo-form", {
        y: 16,
        opacity: 0,
        duration: 0.65,
        delay: 0.3,
        ease: "power2.out",
      });
    }, appRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll(".todo-item");
    if (!items.length) return;

    gsap.fromTo(
      items,
      { y: 12, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.06,
      },
    );
  }, [originalList]);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("MyTheme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("MyLanguage", language);
  }, [language]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div ref={appRef} className="todo-page">
      <Container>
        <div className="theme-header">
          <Heading title={t.appTitle} />
          <div className="header-controls">
            <div
              className="lang-toggle"
              role="group"
              aria-label="Language toggle"
            >
              <button
                type="button"
                className={`btn button lang-btn ${language === "en" ? "active" : ""}`}
                onClick={() => setLanguage("en")}
              >
                {t.langEn}
              </button>
              <button
                type="button"
                className={`btn button lang-btn ${language === "hi" ? "active" : ""}`}
                onClick={() => setLanguage("hi")}
              >
                {t.langHi}
              </button>
            </div>
            <button
              type="button"
              className="btn button theme-toggle-btn"
              onClick={toggleTheme}
            >
              {theme === "dark" ? t.themeLight : t.themeDark}
            </button>
          </div>
        </div>
        <Input
          addElement={addElement}
          placeholder={t.enterWork}
          addLabel={t.add}
          validationMessage={t.fillInfo}
        />
        <div ref={listRef} className="todo-list-wrap">
          {originalList.length === 0 ? (
            <p className="empty-state">{t.emptyState}</p>
          ) : (
            originalList.map((item, index) => (
              <Item1
                key={`${item.text}-${item.date}-${index}`}
                text={item.text}
                date={item.date}
                deleteLabel={t.delete}
                onDelete={() => delElement(item.text, item.date)}
              />
            ))
          )}
        </div>
        <Analytics />
      </Container>
    </div>
  );
}

export default App;
