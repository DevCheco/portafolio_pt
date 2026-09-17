# Portafolio — Pedro Tomas Pacheco Pérez

Portafolio personal desarrollado con HTML, CSS y JavaScript vanilla. Muestra mi formación, experiencia, proyectos y habilidades como Ingeniero de Sistemas egresado de la UNAD y técnico en Programación de Software del SENA.



---

## Contenido del portafolio

| Sección | Descripción |
|---|---|
| Hero | Presentación con terminal interactiva y datos de contacto rápido |
| Sobre mí | Descripción profesional y enfoque de trabajo |
| Experiencia | Historial de roles académicos y freelance |
| Formación | Trayectoria educativa (UNAD, SENA, ONE) |
| Habilidades | Tecnologías organizadas por categoría + habilidades blandas |
| Proyectos | Proyectos desarrollados con descripción, stack y enlaces |
| Forma de trabajo | Metodología de desarrollo paso a paso |
| Contacto | GitHub, LinkedIn, email y WhatsApp |

---

## Proyectos incluidos

1. **E-commerce Multivendedor** — PHP · MySQL · Bootstrap · JavaScript
2. **Sistema de Gestión de Eventos UNAD** — HTML · CSS · JavaScript · Node.js · Express · MySQL
3. **Simulador de Pruebas ICFES** — HTML · CSS · Tailwind CSS · PHP · MySQL · JavaScript
4. **ThomyBot AI** — TensorFlow.js · NLP · JavaScript
5. **Plataforma de Evaluación Psicológica** — React · Node.js · MySQL
6. **Consultorio Virtual de Formación Financiera y Emprendimiento** — HTML · CSS · JavaScript

---

## Stack del portafolio

- **HTML5** semántico con landmarks ARIA
- **CSS3** — variables custom, Grid, Flexbox, diseño responsivo
- **JavaScript** vanilla — sin frameworks ni dependencias de build
- **Fuente:** Inter (Google Fonts)
- **Iconos:** Font Awesome 6
- **Deploy:** GitHub Pages con dominio personalizado

---

## Estructura del proyecto

```
portafolio_pt/
├── index.html          # Documento principal
├── styles.css          # Todos los estilos
├── script.js           # Lógica de interacción
├── CNAME               # Dominio personalizado (checodev.com)
├── assets/
│   ├── linkedin-foto.webp
│   ├── proyecto_1.webp
│   ├── proyecto_1_2.webp
│   └── proyecto_1_3.webp
└── pdf/
    └── CV_Pedro_Pacheco.pdf
```

---

## Características técnicas

- **Tema claro / oscuro** con persistencia en `localStorage`
- **Navegación responsiva** con menú hamburguesa y overlay
- **Animaciones** de entrada por scroll con `IntersectionObserver`
- **Modal de galería** con navegación por teclado (←, →, Esc)
- **Skip link** para accesibilidad por teclado
- **Sin dependencias de build** — abre directamente en el navegador
- **`preload`** de imagen LCP para rendimiento

---

## Cómo ejecutar localmente

No requiere instalación. Basta con clonar el repositorio y abrir el archivo:

```bash
git clone https://github.com/DevCheco/portafolio_pt.git
cd portafolio_pt
# Abrir index.html en el navegador
```

O con un servidor local para evitar restricciones CORS:

```bash
# Con Python
python -m http.server 3000

# Con Node.js (npx)
npx serve .
```

---

## Contacto

| Canal | Enlace |
|---|---|
| GitHub | [@DevCheco](https://github.com/DevCheco) |
| LinkedIn | [Pedro Pacheco](https://www.linkedin.com/in/pachecopérez/) |
| Email | pedrotompachecop@gmail.com |
| WhatsApp | +57 324 565 1430 |

---

&copy; 2026 Pedro Tomas Pacheco Pérez. Todos los derechos reservados.
