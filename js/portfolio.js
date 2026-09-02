const PORTFOLIO_ICON_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"/>
    </svg>
`;

const DEFAULT_IMAGE_INTERVAL_MS = 4000;

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function createMediaElement(images) {
    const media = document.createElement("div");
    media.className = "portfolio-card__media";
    media.setAttribute("aria-hidden", "true");

    images.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "";
        img.decoding = "async";
        if (index === 0) {
            img.classList.add("is-active");
        }
        media.appendChild(img);
    });

    return media;
}

function startImageRotation(card, media, intervalMs) {
    const frames = [...media.querySelectorAll("img")];
    if (frames.length < 2 || prefersReducedMotion()) {
        return;
    }

    let index = 0;
    let timer = null;
    const interval = Number(intervalMs) > 0 ? Number(intervalMs) : DEFAULT_IMAGE_INTERVAL_MS;

    function show(nextIndex) {
        frames[index].classList.remove("is-active");
        index = nextIndex;
        frames[index].classList.add("is-active");
    }

    function stop() {
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
    }

    function start() {
        if (timer !== null || card.matches(":hover")) {
            return;
        }
        timer = setInterval(() => {
            show((index + 1) % frames.length);
        }, interval);
    }

    card.addEventListener("mouseenter", stop);
    card.addEventListener("mouseleave", start);
    card.addEventListener("focusin", stop);
    card.addEventListener("focusout", () => {
        if (!card.matches(":hover") && !card.contains(document.activeElement)) {
            start();
        }
    });

    start();
}

function createPortfolioCard(item) {
    const card = document.createElement(item.href ? "a" : "div");
    card.className = "portfolio-card";

    if (item.href) {
        card.href = item.href;
        if (item.openInNewTab !== false) {
            card.target = "_blank";
            card.rel = "noopener noreferrer";
        }
    }

    const images = Array.isArray(item.images) ? item.images.filter(Boolean) : [];

    if (images.length) {
        const media = createMediaElement(images);
        card.appendChild(media);
        startImageRotation(card, media, item.imageInterval);
    } else {
        card.insertAdjacentHTML("afterbegin", PORTFOLIO_ICON_SVG);
    }

    const content = document.createElement("div");
    content.className = "portfolio-card__content";

    const title = document.createElement("p");
    title.className = "portfolio-card__title";
    title.textContent = item.title;
    content.appendChild(title);

    const paragraphs = Array.isArray(item.description)
        ? item.description.filter(Boolean)
        : [item.description].filter(Boolean);

    paragraphs.forEach((text) => {
        const description = document.createElement("p");
        description.className = "portfolio-card__description";
        description.textContent = text;
        content.appendChild(description);
    });

    card.appendChild(content);

    return card;
}

function renderPortfolio() {
    const grid = document.querySelector(".portfolio-grid");
    if (!grid || typeof PORTFOLIO_ITEMS === "undefined") {
        return;
    }

    grid.replaceChildren();

    PORTFOLIO_ITEMS.filter((item) => item.enabled !== false).forEach((item) => {
        grid.appendChild(createPortfolioCard(item));
    });
}

document.addEventListener("DOMContentLoaded", renderPortfolio);
