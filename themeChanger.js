const themeChangerBtn = document.querySelector(".navRight .themeChanger");
const lightTheme = document.querySelector(".navRight .themeChanger svg:last-child");
const darkTheme = document.querySelector(".navRight .themeChanger svg:first-child");
const html = document.querySelector("html");

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