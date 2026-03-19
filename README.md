# Calc
https://hsj71.github.io/Calc/

# For React
1. Create a React app (Vite recommended):
```
npm create vite@latest calculator
cd calculator
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
2. Configure Tailwind (tailwind.config.js):
```
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
```
3. Add Tailwind to index.css:
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
4. Replace App.jsx with:
```
import Calculator from "./Calculator";

function App() {
  return <Calculator />;
}
```
5. Put the canvas code into Calculator.jsx
export default App;

Put the canvas code into Calculator.jsx
