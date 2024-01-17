gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".anime").forEach((letter, i) => {
    gsap.to(letter, {
        scrollTrigger: {
            trigger: letter,
            start: "top center+=50",
            toggleActions: "play none none reverse",
        },
        opacity: 1,
        duration: 1,
        ease: "power2.out",
    });
});

gsap.utils.toArray(".lines").forEach((letter, i) => {
    gsap.to(letter, {
        scrollTrigger: {
            trigger: letter,
            start: "top center+=100",
            toggleActions: "play none none reverse",
        },
        opacity: 1,
        duration: 1,
        ease: "power2.out",
    });
});

// 스크롤 이벤트 리스너 추가
window.addEventListener("scroll", () => {
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrolledHeight = window.scrollY;
});

// document.addEventListener("mousemove", function (e) {
//     const hiddenContent = document.getElementById("hiddenContent");
//     const rect = hiddenContent.getBoundingClientRect();
//     const hiddenContentX = rect.left + window.scrollX;
//     const hiddenContentY = rect.top + window.scrollY;
//     const x = e.clientX - hiddenContentX + window.scrollX;
//     const y = e.clientY - hiddenContentY + window.scrollY;
//     hiddenContent.style.visibility = "visible";
//     hiddenContent.style.clipPath = `circle(30% at ${x}px ${y}px)`;
// });

document.addEventListener("mousemove", function (e) {
    const hiddenContents = document.querySelectorAll(".hiddenContent");
    hiddenContents.forEach((hiddenContent) => {
        const rect = hiddenContent.getBoundingClientRect();
        const hiddenContentX = rect.left + window.scrollX;
        const hiddenContentY = rect.top + window.scrollY;
        const x = e.clientX - hiddenContentX + window.scrollX;
        const y = e.clientY - hiddenContentY + window.scrollY;

        hiddenContent.style.visibility = "visible";
        hiddenContent.style.clipPath = `circle(8% at ${x}px ${y}px)`;
    });
});
