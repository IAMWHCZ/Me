// Translations for different languages
const translations = {
	en: {
		"brand-name": "MyBlog",
		"signout-title": "Sign Out",
		"signout-message": "Are you sure you want to sign out of your account?",
		"confirm-signout": "Sign Out",
		cancel: "Cancel",
		"signed-in-as": "Signed in as:",
		"signout-success": "You have been successfully signed out.",
		"signout-error": "An error occurred while signing out. Please try again.",
		redirecting: "Redirecting to home page...",
		"lang-toggle": "EN",
	},
	zh: {
		"brand-name": "我的博客",
		"signout-title": "退出登录",
		"signout-message": "您确定要退出登录吗？",
		"confirm-signout": "退出登录",
		cancel: "取消",
		"signed-in-as": "当前登录账户：",
		"signout-success": "您已成功退出登录。",
		"signout-error": "退出登录时发生错误，请重试。",
		redirecting: "正在跳转到首页...",
		"lang-toggle": "中文",
	},
};

// Initialize variables
let currentLang = localStorage.getItem("language") || "en";
let currentTheme = localStorage.getItem("theme") || "light";

// DOM elements
const langToggle = document.getElementById("langToggle");
const themeToggle = document.getElementById("themeToggle");
const confirmSignoutBtn = document.getElementById("confirmSignout");
const cancelSignoutBtn = document.getElementById("cancelSignout");
const userEmailElement = document.querySelector(".user-email");
const notification = document.getElementById("notification");

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
	// Set initial language
	setLanguage(currentLang);

	// Set initial theme
	setTheme(currentTheme);

	// Get user email from localStorage (in a real app, this would come from the session)
	const userEmail = localStorage.getItem("userEmail") || "user@example.com";
	userEmailElement.textContent = userEmail;
});

// Set language function
function setLanguage(lang) {
	currentLang = lang;
	localStorage.setItem("language", lang);

	// Add fade effect to all text elements
	const textElements = document.querySelectorAll("[data-lang]");
	textElements.forEach((element) => {
		element.style.opacity = "0";
		element.style.transition = "opacity 0.3s ease";
	});

	// Wait for fade out, then update content and fade in
	setTimeout(() => {
		// Update all text elements with data-lang attribute
		document.querySelectorAll("[data-lang]").forEach((element) => {
			const key = element.getAttribute("data-lang");
			if (translations[lang]?.[key]) {
				element.textContent = translations[lang][key];
			}
		});

		// Update language toggle button text
		langToggle.textContent = translations[lang]["lang-toggle"];

		// Fade in
		textElements.forEach((element) => {
			element.style.opacity = "1";
		});
	}, 300);
}

// Set theme function
function setTheme(theme) {
	currentTheme = theme;
	localStorage.setItem("theme", theme);

	// Add transition effect to the body
	document.body.style.transition =
		"background-color 0.5s ease, color 0.5s ease";

	if (theme === "dark") {
		document.body.classList.add("dark-theme");
	} else {
		document.body.classList.remove("dark-theme");
	}

	// Add fade effect to all icons
	const icons = document.querySelectorAll('img[src^="./icons/"]');
	icons.forEach((icon) => {
		icon.style.opacity = "0";
		icon.style.transition = "opacity 0.3s ease";
	});

	// Wait for fade out, then update src and fade in
	setTimeout(() => {
		document.querySelectorAll('img[src^="./icons/"]').forEach((img) => {
			const src = img.getAttribute("src");
			const iconName = src.substring(src.lastIndexOf("/") + 1);
			img.setAttribute("src", `./icons/${theme}/${iconName}`);
		});

		// Fade in
		icons.forEach((icon) => {
			icon.style.opacity = "1";
		});
	}, 300);

	localStorage.setItem("preferred-theme", theme);
}

// Show notification function
function showNotification(message, type = "info") {
	notification.textContent = message;
	notification.className = "notification";
	notification.classList.add(type);
	notification.classList.add("show");

	// Hide notification after 3 seconds
	setTimeout(() => {
		notification.classList.remove("show");
	}, 3000);
}

// Sign out function
function signOut() {
	// Disable buttons during sign out process
	confirmSignoutBtn.disabled = true;
	cancelSignoutBtn.disabled = true;
	confirmSignoutBtn.textContent = `${translations[currentLang]["confirm-signout"]}...`;

	// Simulate sign out process (in a real app, this would make an API call)
	setTimeout(() => {
		// Show success notification
		showNotification(translations[currentLang]["signout-success"], "success");

		// Show redirecting notification
		setTimeout(() => {
			showNotification(translations[currentLang].redirecting, "info");
			setTimeout(() => {
				window.location.reload();
			}, 1500);
		}, 1000);
	}, 1500);

	localStorage.clear();
	sessionStorage.clear();
}

// Add event listeners
langToggle.addEventListener("click", () => {
	// Toggle between languages
	const newLang = currentLang === "en" ? "zh" : "en";
	setLanguage(newLang);
});

themeToggle.addEventListener("click", () => {
	// Toggle between themes
	const newTheme = currentTheme === "light" ? "dark" : "light";
	setTheme(newTheme);
});

confirmSignoutBtn.addEventListener("click", signOut);

cancelSignoutBtn.addEventListener("click", () => {
	// In a real app, this would redirect back to the previous page or dashboard
	// window.history.back();
	showNotification("Redirecting back...", "info");
	console.log("Redirecting back...");

	// For demo purposes, we'll just reload the page
	setTimeout(() => {
		window.location.reload();
	}, 1000);
});
