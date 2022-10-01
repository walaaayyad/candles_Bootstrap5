const text = document.querySelector('.textLogo p');
// text.innerHTML = text.innerHTML.split("").map((char,i) => {
//     `<span style="transform:rotate(${i * 8}deg)">${char}</span>`
// }).join("")
text.innerHTML = text.innerHTML.split("").map(
(char,i) =>
    `<span style="transform:rotate(${i * 9}deg)">${char}</span>`
).join("");