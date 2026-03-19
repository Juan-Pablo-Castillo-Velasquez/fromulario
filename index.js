let circles = document.querySelectorAll(".pasos .circle");
let formSteps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next-btn");
const allInputs = document.querySelectorAll(".form-step input, .form-step select");
const finalForm = document.querySelector("#step-6 form");

finalForm.addEventListener("submit", (e) => {
    e.preventDefault(); 

    console.log("Registrando usuario");

    alert("Registro completado con éxito Bienvenido a nuestra comunidad de viajeros.");
    window.location.href = "index.html";
});
allInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
        const value = e.target.value;
        const type = e.target.type;
        const id = e.target.id;
        let esValido = false;

       
        if (id.includes("address")) {
           
            e.target.value = value.replace(/[^a-zA-Z0-9\s#\-\.\/]/g, '');
            esValido = e.target.value.length > 5; 
        } 
        else if (id.includes("name") || id.includes("city")) {
            e.target.value = value.replace(/[^a-zA-Z\s\u00C0-\u017F]/g, '');
            esValido = e.target.value.length > 2;
        } 
        else if (type === "tel" || id.includes("phone")) {
           
            e.target.value = value.replace(/\D/g, '');
            esValido = e.target.value.length >= 7;
        } 
        else if (type === "email" || id.includes("email")) {
            
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            esValido = regexEmail.test(value);
        } 
        else {
            esValido = value.length > 3;
        }

        if (value.length === 0) {
            e.target.classList.remove("estabien", "error");
        } 
        else if (esValido) {
            e.target.classList.add("estabien");
            e.target.classList.remove("error");
        } 
        else {
            e.target.classList.add("error");
            e.target.classList.remove("estabien");
        }
    });
});


circles.forEach((circle, index) => {
    circle.addEventListener("click", () => {
        circles.forEach(c => c.classList.remove("active"));


        formSteps.forEach(section => section.classList.remove("active"));

        circle.classList.add("active");
        formSteps[index].classList.add("active");
    });
});
nextBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault(); 
        const currentStep = btn.closest(".form-step");
        const inputs = currentStep.querySelectorAll("input[required], select[required]");
        
        let stepValido = Array.from(inputs).every(i => i.classList.contains("estabien"));

        if (stepValido) {
            let currentIdx = Array.from(formSteps).findIndex(step => step.classList.contains("active"));
            if (currentIdx < formSteps.length - 1) { 
                formSteps[currentIdx].classList.remove("active");
                circles[currentIdx].classList.remove("active");
                formSteps[currentIdx + 1].classList.add("active");
                circles[currentIdx + 1].classList.add("active");
            }
        } else {
            alert("Por favor, completa los campos correctamente antes de seguir.");
            inputs.forEach(i => !i.classList.contains("estabien") && i.classList.add("error"));
        }
    });
});
