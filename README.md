# Spacefullness

## Description
    Space-fullness is a web-based game based on the classic game "Where's Waldo" except in space.
    Players are shown space images with hidden elements that they need to find.
    NASAs APOD API is used to fetch daily images and author-created hidden elements are placed ontop of the image. 

## Prerequisites
    Vite
    Git
    Node.js

# Installation

**1. Clone the repository**

```bash
git clone https://github.com/Shania-a/Webbteknik-projekt
```

**2. Install**

Navigate to the project directory and run the commands
    
```
cd my-react-app
npm install
```

**3. API Key**

Create .env file in root folder "/my-react-app"
Inside the .env file add:

```
VITE_NASA_API_KEY=the_api_key
```

**4. Run the program**

Run the program through Node

```
npm run dev
```

Open the link from terminal.

## Tools, Libraries and Frameworks
    React
    Vite
    React Bootstrap
    React Router
    React Timer Hook

## Authors
**Gustav Helgesson Liljedahl** - [Gustav-HL](https://github.com/Gustav-HL)

**Alma Rangström** - [swedishllama1](https://github.com/swedishllama1)

**Shania Amin** - [Shania-a](https://github.com/Shania-a)

---------------------------------------------------------------------------------

## Choice of Framework with comparisons (Vue.js & Svelte)
Our decision to use React is supported by both industry-gathered data and a practical case-study from developers.

### Market demand and Community Support
Every year Stack Overflow performs a survey of the tools and technologies used by developers. In their 2025 survey developers were asked "Which web frameworks and web technologies have you done extensive development work in over the past year, and which do you want to work in over the next year?" where among professional developers React was chosen by nearly 47%, Vue.js received 18% and Svelte received 6.9%

React is one of the most established frameworks with a large and active community that provides developers with many libraries, tools and resources. While it has a slightly higher initial learning curve, the amount of detailed guides and community-built tools compensates for it. Vue.js has a significantly smaller ecosystem and job market presence compared to React. Svelte also has a smaller ecosystem with limited plug-ins, libraries and third-party tools compared to React and Vue.

An additional (although subjective) advantage of choosing React is its high demand in job listings, often listed as a required skill.

### Case Study: React vs. Vue vs. Svelte in Practice
To further evaluate our choice, we read and analyzed a study by a development team that built the same SaaS application using the three frameworks. This was done to identify each of the frameworks' strengths and weaknesses. The team's baseline was primarily React.

### Comparative Benchmark Data from the Case Study
Below is the technical and operational data gathered from building the same project across all three frameworks:

### React
* **Lines of Code:** Required the most boilerplate/lines of code.
* **Ecosystem:** Abundant pre-built libraries available.
* **Development Time:** 80 hours (Baseline).
* **Initial Load (Cold Start):** 2.8s
* **Runtime Performance (Complex Table, 1000 rows):** Stable 60fps.
* **Build Size:** 487KB
* **Memory Usage (After 30 min of use):** 78MB

### Vue
* **Lines of Code:** Reduced lines of code.
* **Ecosystem:** Fewer structural options. Documentation felt fragmented due to mixing the Composition API and Options API.
* **Development Time:** 92 hours (Accounting for the learning curve + building missing parts).
* **Initial Load (Cold Start):** 2.1s
* **Runtime Performance (Complex Table, 1000 rows):** 45–55fps (with occasional drops).
* **Build Size:** 312KB
* **Memory Usage (After 30 min of use):** 52MB

### Svelte
* **Lines of Code:** Significantly reduced lines of code.
* **Ecosystem:**  Barely any component libraries available; existing ones had multiple open issues. Documentation is good but limited.
* **Development Time:** 105 hours (Due to writing many custom, tailor-made components).
* **Initial Load (Cold Start):** 1.4s
* **Runtime Performance (Complex Table, 1000 rows):** Stable 60fps.
* **Build Size:** 87KB
* **Memory Usage (After 30 min of use):** 41MB

### Key Takeaways:
**Ecosystem wins over Performance**
Svelte's bundle size was very small and fast but it lacks ready-to-use components. Choosing Svelte meant that the team had to spend hours building basic UI components from scratch. On the other hand, React's massive ecosystem saved a lot of time with their pre-built assets. For instance, a startup on a tight budget would benefit choosing React due to its time-to-market advantage.

**Developer Satisfaction Drives Better Results**
The team felt frustrated with the React codebase at times while Vue felt more intuitive. Happy developers deliver better code faster whilst a low team morale could pose financial and quality risks.

**Existing Team Competence Impacts the Learning Curve**
The team consisted of React developers. They picked up Vue in 2 weeks but struggled with Svelte for 6 weeks. Ultimately, the best framework is the one your team already knows. Forcing a team into a completely new framework without experts under a tight deadline is extremely risky.

### Source Links:
* [Stack Overflow](https://survey.stackoverflow.co/2025/technology#most-popular-technologies-webframe-webframe-prof)
* [Case Study](https://medium.com/@ignatovich.dm/react-vs-vue-vs-svelte-choosing-the-right-framework-for-2025-4f4bb9da35b4)
* [Vue vs React](https://alokai.com/blog/vue-vs-react )




---------------------------------------------------------------------------------

## Dependencies
    mkdir tests + mkdir dist

    npm install react-router-dom

    npm install react-bootstrap bootstrap

    npm install react-confetti

    npm install --save react-timer-hook

# CAUTION! The NASA API tends to cause freezing or lag on Google Chrome! Use another web browser if possible.