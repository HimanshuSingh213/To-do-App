const themeChangerBtn = document.querySelector(".navRight .themeChanger");
const lightTheme = document.querySelector(".navRight .themeChanger svg:last-child");
const darkTheme = document.querySelector(".navRight .themeChanger svg:first-child");
const html = document.querySelector("html");

function applyDeviceTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        if (savedTheme === 'dark') {
            lightTheme.style.visibility = "visible";
            darkTheme.style.visibility = "hidden";
            html.classList.add("dark");
        } 
        
        else {
            lightTheme.style.visibility = "hidden";
            darkTheme.style.visibility = "visible";
            html.classList.remove("dark");
        }
    }

    else {
        if (prefersDark) {
            lightTheme.style.visibility = "visible";
            darkTheme.style.visibility = "hidden";
            html.classList.add("dark");
        } else {
            lightTheme.style.visibility = "hidden";
            darkTheme.style.visibility = "visible";
            html.classList.remove("dark");
        }
    }
}

window.addEventListener('DOMContentLoaded', applyDeviceTheme);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            lightTheme.style.visibility = "visible";
            darkTheme.style.visibility = "hidden";
            html.classList.add("dark");
        } else {
            lightTheme.style.visibility = "hidden";
            darkTheme.style.visibility = "visible";
            html.classList.remove("dark");
        }
    }
});


themeChangerBtn.addEventListener("click", () => {
    if (lightTheme.style.visibility !== "visible") {   
        lightTheme.style.visibility = "visible";
        darkTheme.style.visibility = "hidden";
        html.classList.add("dark");
        
    }
    else{
        lightTheme.style.visibility = "hidden";
        darkTheme.style.visibility = "visible";
        html.classList.remove("dark");
    }
})