document.addEventListener("DOMContentLoaded", () => {
	// Language translations
	const translations = {
		en: {
			"brand-name": "MyBlog",
			"welcome-title": "Welcome back",
			"welcome-subtitle": "Sign in to access your blog posts and projects",
			"email-label": "Email address",
			"email-placeholder": "Enter your email",
			"password-label": "Password",
			"password-placeholder": "Enter your password",
			"remember-me": "Remember me",
			"forgot-password": "Forgot password?",
			"signin-button": "Sign In",
			"or-continue": "or continue with",
			google: "Google",
			github: "GitHub",
			"no-account": "Don't have an account? ",
			"signup-link": "Sign up",
			"discover-title": "Explore My Blog & Projects",
			"discover-subtitle":
				"Join the community to read articles, explore projects, and share your thoughts with others.",
			"fill-fields": "Please fill in all fields",
			"valid-email": "Please enter a valid email address",
			"email-required": "Email address is required",
			"password-required": "Password is required",
			"password-min-length": "Password must be at least 8 characters",
			"password-uppercase":
				"Password must contain at least one uppercase letter",
			"password-lowercase":
				"Password must contain at least one lowercase letter",
			"password-number": "Password must contain at least one number",
			"password-special":
				"Password must contain at least one special character",
			"login-success": "Login successful! Redirecting...",
			"google-login": "Redirecting to Google login...",
			"github-login": "Redirecting to GitHub login...",
			"password-reset": "Password reset link would be sent to your email",
			"signup-redirect": "Redirecting to signup page...",
			"lang-toggle": "EN",
		},
		zh: {
			"brand-name": "我的博客",
			"welcome-title": "欢迎回来",
			"welcome-subtitle": "登录以访问您的博客文章和项目",
			"email-label": "电子邮箱",
			"email-placeholder": "请输入您的电子邮箱",
			"password-label": "密码",
			"password-placeholder": "请输入您的密码",
			"remember-me": "记住我",
			"forgot-password": "忘记密码？",
			"signin-button": "登录",
			"or-continue": "或继续使用",
			google: "谷歌",
			github: "GitHub",
			"no-account": "还没有账户？",
			"signup-link": "注册",
			"discover-title": "探索我的博客和项目",
			"discover-subtitle": "加入社区，阅读文章，探索项目，与他人分享您的想法。",
			"fill-fields": "请填写所有字段",
			"valid-email": "请输入有效的电子邮箱地址",
			"email-required": "电子邮箱地址不能为空",
			"password-required": "密码不能为空",
			"password-min-length": "密码长度至少为8个字符",
			"password-uppercase": "密码必须包含至少一个大写字母",
			"password-lowercase": "密码必须包含至少一个小写字母",
			"password-number": "密码必须包含至少一个数字",
			"password-special": "密码必须包含至少一个特殊字符",
			"login-success": "登录成功！正在重定向...",
			"google-login": "正在重定向到谷歌登录...",
			"github-login": "正在重定向到GitHub登录...",
			"password-reset": "密码重置链接将发送到您的电子邮箱",
			"signup-redirect": "正在重定向到注册页面...",
			"lang-toggle": "中文",
		},
	};

	// Language switching functionality
	const langToggle = document.getElementById("langToggle");
	let currentLang = "en"; // Default language

	// Theme switching functionality
	const themeToggle = document.getElementById("themeToggle");
	let currentTheme = "light"; // Default theme

	// Set language function
	function setLanguage(lang) {
		currentLang = lang;

		// Add fade effect to all text elements
		const textElements = document.querySelectorAll(
			"[data-lang], [data-lang-placeholder]",
		);
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
					// Handle special case for no-account which contains HTML
					if (key === "no-account") {
						// Create the complete HTML structure
						element.innerHTML =
							translations[lang][key] +
							'<a href="#" data-lang="signup-link">' +
							translations[lang]["signup-link"] +
							"</a>";
					} else {
						element.textContent = translations[lang][key];
					}
				}
			});

			// Update all placeholder attributes
			document
				.querySelectorAll("[data-lang-placeholder]")
				.forEach((element) => {
					const key = element.getAttribute("data-lang-placeholder");
					if (translations[lang]?.[key]) {
						element.setAttribute("placeholder", translations[lang][key]);
					}
				});

			// Fade in
			textElements.forEach((element) => {
				element.style.opacity = "1";
			});

			// Save language preference to localStorage
			localStorage.setItem("preferred-language", lang);
		}, 300);
	}

	// Set theme function
	function setTheme(theme) {
		currentTheme = theme;

		// Add transition effect to the body
		document.body.style.transition =
			"background-color 0.5s ease, color 0.5s ease";

		if (theme === "light") {
			document.body.classList.remove("dark-theme");
		} else {
			document.body.classList.add("dark-theme");
		}

		// Add fade effect to all icons
		const icons = document.querySelectorAll('img[src^="./icons/"]');
		icons.forEach((icon) => {
			icon.style.opacity = "0";
			icon.style.transition = "opacity 0.3s ease";
		});

		// Wait for fade out, then update src and fade in
		setTimeout(() => {
			// Update all icon src attributes based on theme
			icons.forEach((img) => {
				const src = img.getAttribute("src");
				const iconName = src.substring(src.lastIndexOf("/") + 1);
				img.setAttribute("src", `./icons/${theme}/${iconName}`);
			});

			// Fade in
			icons.forEach((icon) => {
				icon.style.opacity = "1";
			});
		}, 300);

		// Save theme preference to localStorage
		localStorage.setItem("preferred-theme", theme);
	}

	// Check for saved language preference
	const savedLang = localStorage.getItem("preferred-language");
	if (savedLang && translations[savedLang]) {
		currentLang = savedLang;
		setLanguage(currentLang);
		// Update button text
		langToggle.textContent = currentLang === "en" ? "EN" : "中文";
	}

	// Check for saved theme preference
	const savedTheme = localStorage.getItem("preferred-theme");
	if (savedTheme) {
		currentTheme = savedTheme;
		setTheme(currentTheme);
		// Update theme icon
		if (currentTheme === "dark") {
			themeToggle.innerHTML =
				'<img src="./icons/dark/moon.svg" class="icon icon-moon" alt="Theme toggle">';
		} else {
			themeToggle.innerHTML =
				'<img src="./icons/light/sun.svg" class="icon icon-sun" alt="Theme toggle">';
		}
	} else {
		// Set default theme icons if no saved preference
		document.querySelectorAll('img[src^="./icons/"]').forEach((img) => {
			const src = img.getAttribute("src");
			const iconName = src.substring(src.lastIndexOf("/") + 1);
			img.setAttribute("src", `./icons/light/${iconName}`);
		});
	}

	// Language toggle event listener
	langToggle.addEventListener("click", () => {
		// Toggle language
		currentLang = currentLang === "en" ? "zh" : "en";

		// Update button text
		langToggle.textContent = currentLang === "en" ? "EN" : "中文";

		// Save language preference
		localStorage.setItem("preferred-language", currentLang);

		// Update page content
		setLanguage(currentLang);
	});

	// Theme toggle event listener
	themeToggle.addEventListener("click", () => {
		// Toggle theme
		currentTheme = currentTheme === "light" ? "dark" : "light";

		// Update theme icon
		if (currentTheme === "dark") {
			themeToggle.innerHTML =
				'<img src="./icons/dark/moon.svg" class="icon icon-moon" alt="Theme toggle">';
		} else {
			themeToggle.innerHTML =
				'<img src="./icons/light/sun.svg" class="icon icon-sun" alt="Theme toggle">';
		}

		// Save theme preference
		localStorage.setItem("preferred-theme", currentTheme);

		// Apply theme
		setTheme(currentTheme);
	});

	// Toggle password visibility
	const togglePassword = document.getElementById("togglePassword");

	togglePassword.addEventListener("click", function () {
		const passwordInput = document.getElementById("password");
		const type =
			passwordInput.getAttribute("type") === "password" ? "text" : "password";
		passwordInput.setAttribute("type", type);

		// Toggle the eye icon
		const icon = this.querySelector("img");
		if (type === "password") {
			icon.setAttribute("src", `./icons/${currentTheme}/eye.svg`);
			icon.setAttribute("alt", "Show password");
			icon.classList.remove("icon-eye-off");
			icon.classList.add("icon-eye");
		} else {
			icon.setAttribute("src", `./icons/${currentTheme}/eye-off.svg`);
			icon.setAttribute("alt", "Hide password");
			icon.classList.remove("icon-eye");
			icon.classList.add("icon-eye-off");
		}
	});

	// Handle form submission
	const loginForm = document.getElementById("loginForm");
	const emailInput = document.getElementById("email");
	const passwordInput = document.getElementById("password");
	const emailError = document.getElementById("email-error");
	const passwordError = document.getElementById("password-error");

	// Real-time validation
	emailInput.addEventListener("blur", validateEmail);
	emailInput.addEventListener("input", clearEmailError);
	passwordInput.addEventListener("blur", validatePassword);
	passwordInput.addEventListener("input", clearPasswordError);

	// Email validation function
	function validateEmail() {
		const email = emailInput.value.trim();
		const emailGroup = emailInput.closest(".form-group");

		if (!email) {
			showFieldError(
				emailGroup,
				emailError,
				translations[currentLang]["email-required"],
			);
			return false;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			showFieldError(
				emailGroup,
				emailError,
				translations[currentLang]["valid-email"],
			);
			return false;
		}

		clearFieldError(emailGroup, emailError);
		return true;
	}

	// Password validation function
	function validatePassword() {
		const password = passwordInput.value;
		const passwordGroup = passwordInput.closest(".form-group");

		if (!password) {
			showFieldError(
				passwordGroup,
				passwordError,
				translations[currentLang]["password-required"],
			);
			return false;
		}

		if (password.length < 8) {
			showFieldError(
				passwordGroup,
				passwordError,
				translations[currentLang]["password-min-length"],
			);
			return false;
		}

		// Check for uppercase letter
		if (!/[A-Z]/.test(password)) {
			showFieldError(
				passwordGroup,
				passwordError,
				translations[currentLang]["password-uppercase"],
			);
			return false;
		}

		// Check for lowercase letter
		if (!/[a-z]/.test(password)) {
			showFieldError(
				passwordGroup,
				passwordError,
				translations[currentLang]["password-lowercase"],
			);
			return false;
		}

		// Check for number
		if (!/[0-9]/.test(password)) {
			showFieldError(
				passwordGroup,
				passwordError,
				translations[currentLang]["password-number"],
			);
			return false;
		}

		// Check for special character
		if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
			showFieldError(
				passwordGroup,
				passwordError,
				translations[currentLang]["password-special"],
			);
			return false;
		}

		clearFieldError(passwordGroup, passwordError);
		return true;
	}

	// Show field error
	function showFieldError(fieldGroup, errorElement, message) {
		fieldGroup.classList.add("error");
		const input = fieldGroup.querySelector("input");
		input.classList.add("error");
		errorElement.textContent = message;
	}

	// Clear field error
	function clearFieldError(fieldGroup, errorElement) {
		fieldGroup.classList.remove("error");
		const input = fieldGroup.querySelector("input");
		input.classList.remove("error");
		errorElement.textContent = "";
	}

	// Clear email error on input
	function clearEmailError() {
		const emailGroup = emailInput.closest(".form-group");
		if (emailGroup.classList.contains("error")) {
			clearFieldError(emailGroup, emailError);
		}
	}

	// Clear password error on input
	function clearPasswordError() {
		const passwordGroup = passwordInput.closest(".form-group");
		if (passwordGroup.classList.contains("error")) {
			clearFieldError(passwordGroup, passwordError);
		}
	}

	loginForm.addEventListener("submit", (e) => {
		e.preventDefault();

		// Validate all fields
		const isEmailValid = validateEmail();
		const isPasswordValid = validatePassword();

		if (!isEmailValid || !isPasswordValid) {
			return;
		}

		// Get form values
		const _email = emailInput.value;
		const _password = passwordInput.value;
		const _remember = document.getElementById("remember").checked;

		// Simulate login process
		const loginButton = document.querySelector(".login-button");
		loginButton.textContent = `${translations[currentLang]["signin-button"]}...`;
		loginButton.disabled = true;

		// Simulate API call
		setTimeout(() => {
			// Reset button
			loginButton.textContent = translations[currentLang]["signin-button"];
			loginButton.disabled = false;

			// Show success message
			showNotification(translations[currentLang]["login-success"], "success");

			// Redirect to dashboard after successful login (in a real app)
			setTimeout(() => {
				// window.location.href = '/dashboard';
				console.log("Redirecting to dashboard...");
			}, 1500);
		}, 1500);
	});

	// Social login handlers
	const googleButton = document.querySelector(".social-button.google");
	const githubButton = document.querySelector(".social-button.github");

	googleButton.addEventListener("click", () => {
		showNotification(translations[currentLang]["google-login"], "info");
		// In a real app, this would redirect to Google OAuth
	});

	githubButton.addEventListener("click", () => {
		showNotification(translations[currentLang]["github-login"], "info");
		// In a real app, this would redirect to GitHub OAuth
	});

	// Forgot password link
	const forgotPasswordLink = document.querySelector(".forgot-password");
	forgotPasswordLink.addEventListener("click", (e) => {
		e.preventDefault();
		showNotification(translations[currentLang]["password-reset"], "info");
	});

	// Function to handle signup link click
	function handleSignupLinkClick(e) {
		e.preventDefault();
		showNotification(translations[currentLang]["signup-redirect"], "info");
		// In a real app, this would redirect to the signup page
	}

	// Add event listener to signup link using event delegation
	document.addEventListener("click", (e) => {
		if (e.target && e.target.getAttribute("data-lang") === "signup-link") {
			handleSignupLinkClick(e);
		}
	});

	// Notification function
	function showNotification(message, type) {
		// Remove any existing notifications
		const existingNotification = document.querySelector(".notification");
		if (existingNotification) {
			existingNotification.remove();
		}

		// Create notification element
		const notification = document.createElement("div");
		notification.className = `notification ${type}`;
		notification.textContent = message;

		// Style the notification based on type
		if (type === "success") {
			notification.style.backgroundColor = "#d4edda";
			notification.style.color = "#155724";
			notification.style.borderLeft = "4px solid #28a745";
		} else if (type === "error") {
			notification.style.backgroundColor = "#f8d7da";
			notification.style.color = "#721c24";
			notification.style.borderLeft = "4px solid #dc3545";
		} else {
			notification.style.backgroundColor = "#d1ecf1";
			notification.style.color = "#0c5460";
			notification.style.borderLeft = "4px solid #17a2b8";
		}

		// Add common styles
		notification.style.position = "fixed";
		notification.style.top = "20px";
		notification.style.right = "20px";
		notification.style.padding = "15px 20px";
		notification.style.borderRadius = "4px";
		notification.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
		notification.style.zIndex = "1000";
		notification.style.maxWidth = "300px";
		notification.style.fontFamily = "Montserrat, sans-serif";
		notification.style.transition = "opacity 0.3s ease-in-out";

		// Add to DOM
		document.body.appendChild(notification);

		// Remove after 3 seconds
		setTimeout(() => {
			notification.style.opacity = "0";
			setTimeout(() => {
				notification.remove();
			}, 300);
		}, 3000);
	}
});
