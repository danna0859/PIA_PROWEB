
const scholarships = [
    {
        id: "benito",
        name: "Beca Benito Juárez",
        category: "gobierno",
        minPromedio: 80,
        prioridadEconomica: true
    },
    {
        id: "jovenes",
        name: "Jóvenes Escribiendo el Futuro",
        category: "gobierno",
        minPromedio: 80,
        prioridadEconomica: true
    },
    {
        id: "becalos",
        name: "Bécalos Programas de tecnología",
        category: "privado",
        minPromedio: 85,
        prioridadEconomica: false
    },
    {
        id: "fundacion",
        name: "Fundación Telmex Educación superior",
        category: "privado",
        minPromedio: 90,
        prioridadEconomica: false
    }
];


document.addEventListener("DOMContentLoaded", () => {
    const alertMessage = document.getElementById("alert-message");
    const btnElegibilidad = document.getElementById("btn-elegibilidad");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const sections = document.querySelectorAll(".scholarship-section");
    const applyButtons = document.querySelectorAll(".btn-apply");

    
    btnElegibilidad.addEventListener("click", () => {
        const promedioStr = prompt("Ingresa tu promedio general (ejemplo: 85):");
        const promedio = Number(promedioStr);

        if (isNaN(promedio) || promedio <= 0) {
            alert("Por favor ingresa un promedio válido.");
            return;
        }

        const situacion = confirm("¿Tu situación económica es complicada? Aceptar = Sí, Cancelar = No");

        const recomendadas = scholarships.filter(beca => {
            if (promedio < beca.minPromedio) return false;
            if (situacion && beca.prioridadEconomica) return true;
            if (!situacion && !beca.prioridadEconomica) return true;
            return false;
        });

        if (recomendadas.length === 0) {
            alertMessage.textContent = "Por ahora no cumples los requisitos principales de las becas listadas. Aumenta tu promedio o revisa nuevas convocatorias.";
            alert("No se encontró una beca ideal con ese promedio. 😕");
        } else {
            const nombres = recomendadas.map(r => r.name).join(", ");
            alertMessage.textContent = "Con tu promedio y situación, las becas que más te convienen son: " + nombres + ".";
            alert("Te conviene aplicar a: " + nombres);
        }
    });


    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const filtro = btn.getAttribute("data-filter");

            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            sections.forEach(sec => {
                const categoria = sec.getAttribute("data-category");
                if (filtro === "all" || filtro === categoria) {
                    sec.style.display = "block";
                } else {
                    sec.style.display = "none";
                }
            });
        });
    });

    
    applyButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const name = btn.getAttribute("data-scholarship");
            const url = btn.getAttribute("data-url");

            const confirmar = confirm(`Vas a salir a la página oficial para aplicar a: ${name}. ¿Quieres continuar?`);

            if (confirmar) {
                window.open(url, "_blank");
            }
        });
    });
});
