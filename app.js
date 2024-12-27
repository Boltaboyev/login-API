const form = document.getElementById("form")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const error = document.querySelector(".error")
const API_BASE_URL = "https://api.escuelajs.co/api/v1/auth/login"

if (window.location.pathname === "/index.html") {
    const token = localStorage.getItem("token")
    if (token) {
        window.location.href = "/profile.html"
    }
    form.addEventListener("submit", (e) => {
        e.preventDefault()

        const email = emailInput.value.trim()
        const password = passwordInput.value.trim()

        fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((err) => {
                        throw new Error(err.message || "Login failed")
                    })
                }
                return res.json()
            })
            .then((data) => {
                const token = data.access_token
                if (token) {
                    localStorage.setItem("token", token)
                    window.location.href = "/profile.html"
                }
            })
            .catch(() => showError())
    })

    function showError() {
        error.classList.remove("hidden")
    }
}

if (window.location.pathname === "/profile.html") {
    const logoutButton = document.getElementById("logout")
    const token = localStorage.getItem("token")
    if (!token) {
        window.location.href = "/index.html"
    }
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token")
        window.location.href = "/index.html"
    })
}

const showPass = document.querySelector(".fa-eye")

showPass.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text" 
        showPass.classList.remove("fa-eye")
        showPass.classList.add("fa-eye-slash")
    } else {
        passwordInput.type = "password"
        showPass.classList.remove("fa-eye-slash")
        showPass.classList.add("fa-eye") 
    }
})
