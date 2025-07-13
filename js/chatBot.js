//Chat Bot
(function () {
  if (!window.chatbase || window.chatbase("getState") !== "initialized") {
    window.chatbase = (...arguments) => {
      if (!window.chatbase.q) {
        window.chatbase.q = [];
      }
      window.chatbase.q.push(arguments);
    };
    window.chatbase = new Proxy(window.chatbase, {
      get(target, prop) {
        if (prop === "q") {
          return target.q;
        }
        return (...args) => target(prop, ...args);
      },
    });
  }
  const onLoad = function () {
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "2TMNaB2n5MPKDAEYXB8wB";
    script.domain = "www.chatbase.co";
    document.body.appendChild(script);
  };
  if (document.readyState === "complete") {
    onLoad();
  } else {
    window.addEventListener("load", onLoad);
  }
})();

window.chatbaseConfig = {
  chatbotId: "2TMNaB2n5MPKDAEYXB8wB",
  chatTitle: "Ask Bilal 🤖",
  welcomeMessage: "Hi! I'm Bilal's assistant. Ask me anything about my work!",
  disableDefaultLauncher: true,
};

//Custom Button
document.addEventListener("DOMContentLoaded", function () {
  const chatButton = document.createElement("button");
  chatButton.innerHTML = "Ask Bilal 🤖";
  chatButton.id = "custom-chat-button";
  chatButton.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          background: #6366f1;
          color: white;
          border: none;
          border-radius: 50px;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
          transition: all 0.3s ease;
        `;

  chatButton.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)";
    this.style.boxShadow = "0 6px 20px rgba(99, 102, 241, 0.4)";
  });

  chatButton.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
    this.style.boxShadow = "0 4px 12px rgba(99, 102, 241, 0.3)";
  });

  chatButton.addEventListener("click", function () {
    if (window.chatbase) {
      window.chatbase("open");
      setTimeout(() => {
        const defaultLauncher = document.querySelector(
          '[data-testid="launcher"]'
        );
        if (defaultLauncher) {
          defaultLauncher.style.display = "none";
        }
        const launcherElements = document.querySelectorAll(
          '[class*="launcher"], [id*="launcher"]'
        );
        launcherElements.forEach((el) => {
          if (el !== chatButton) {
            el.style.display = "none";
          }
        });
      }, 100);
    }
  });

  document.body.appendChild(chatButton);
});
