gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".anime").forEach((letter, i) => {
    gsap.to(letter, {
        scrollTrigger: {
            trigger: letter,
            start: "top center-=70",
            toggleActions: "play none none reverse",
            // markers: true,
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
            start: "top center+=10",
            toggleActions: "play none none reverse",
            // markers: true,
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

// let clickPositions = [{ x: 0, y: 0 }];
let clickPositions = [];

document.addEventListener("click", function (e) {
    const hiddenContents = document.querySelectorAll(".hiddenContent");
    hiddenContents.forEach((hiddenContent) => {
        const rect = hiddenContent.getBoundingClientRect();
        const hiddenContentX = rect.left + window.scrollX;
        const hiddenContentY = rect.top + window.scrollY;
        const x = e.clientX - hiddenContentX + window.scrollX;
        const y = e.clientY - hiddenContentY + window.scrollY;
        clickPositions.push({ x, y });

        hiddenContent.style.visibility = "visible";
        hiddenContent.style.transition = "mask-image 1s ease-out";

        // 각 클릭 위치에 대해 radial-gradient를 생성하여 마스크 이미지를 만듭니다.
        let maskImageValue = clickPositions
            .map(
                (pos) =>
                    `radial-gradient(circle at ${pos.x + 4}px ${
                        pos.y + 4
                    }px, black 0, transparent 100px, transparent 100px)`
            )
            .join(", ");

        // 마스크 이미지를 적용합니다.
        hiddenContent.style.maskImage = maskImageValue;
        hiddenContent.style.maskSize = "cover"; // 마스크 크기를 설정합니다.
        hiddenContent.style.maskMode = "alpha"; // 마스크 모드를 설정합니다.
        hiddenContent.style.maskComposite = "source-in"; // 마스크를 합성하는 방식을 'source-in'으로 설정합니다.
    });
});

const changeSceneBtn = document.getElementById('changeSceneBtn');
  changeSceneBtn.addEventListener('click', () => {
    window.location.href = '../index.html';
});