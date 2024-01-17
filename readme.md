# InteractiveTypoWeb

## Interactive Typo Web

세계에는 다양한 언어와 문자가 존재한다. 이 문자들을 사용자가 인터랙티브하게 경험해볼 수 있는 재밌는 웹페이지를 프레임 워크 없이 순수 javascript를 이용해 제작하였다.

---

### 개발 환경

**Front-end:** `javascript` `three.js` `css` `gsap`

---

### 팀원

[박강태](https://www.notion.so/3c906b5d84de4a73b555e1dd539b35ce?pvs=21)

[강승완](https://www.notion.so/98421a53097e4bddbfa8013b711a4075?pvs=21)

---

### 메인 화면

<aside>
🌐 지구의 어떤 나라가 화면의 중앙에 오는지에 따라서 뒷배경에 있는 글자의 언어가 바뀌는 인터랙티브 메인 페이지를 제작하였다. 각 언어가 반영된 상태에서 CLICK 버튼을 누르면 해당 언어와 관련된 인터랙티브 페이지로 전환된다.

</aside>

**[overview]**

![Untitled](InteractiveTypoWeb%20706944b6d0f14b6097848afcabc5efcd/Untitled.png)

![Untitled](InteractiveTypoWeb%20706944b6d0f14b6097848afcabc5efcd/Untitled%201.png)

**[구현 방법]**

- 3D 오브젝트를 그릴 수 있는 webgl 캔버스에 SphereGeometry, TextGeometry, 조명, 카메라를 배치한다.
- SphereGeometry의 위치는 고정시키고 TextGeometry는 항상 카메라의 반대편에 위치하도록 설정한다.
- 주요 국가들의 좌표를 찾아 각 국가들의 벡터와 현재 카메라 위치의 벡터의 내적 값들 중 최댓값을 찾아 해당하는 언어로 뒤의 글자를 바꾼다. (화면 중앙에 정확한 위치가 오지 않아도 언어가 반영되기 위함이다.)

![영상1.gif](InteractiveTypoWeb%20706944b6d0f14b6097848afcabc5efcd/%25EC%2598%2581%25EC%2583%25811.gif)

### 한글

<aside>
🇰🇷 한글의 독특한 특징 중 하나인 천지인을 응용하였다. 천지인은 각각 하늘을 상징하는 ‘．’, 땅을 상징하는 ‘ㅡ’, 사람을 상징하는 ‘ㅣ’를 조합하여 모음을 나타내는 방식이다. 이것을 응용하여 사용자들이 천지인 버튼을 통해 모음을 그려보는 페이지를 제작하였다.

</aside>

**[overview]**

![Untitled](InteractiveTypoWeb%20706944b6d0f14b6097848afcabc5efcd/Untitled%202.png)

![Untitled](InteractiveTypoWeb%20706944b6d0f14b6097848afcabc5efcd/Untitled%203.png)

**[구현 방법]**

- 화면 하단에 버튼 3개를 ‘ㅣ’, ‘．’, ‘ㅡ’의 형태로 만들고 화면 중앙에는 가로 21개, 세로 7개의 원들이 canvas를 채우도록 하였다.
- 한글에는 총 21개의 모음 조합이 존재하는데, 각 모음을 조합할 때 생기는 천지인 조합을 배열로 만들어 조건문으로 작성하였다.
- 3초동안 버튼 입력이 없으면 새로고침되어 새로운 모음을 그릴 수 있도록 하였다.

![영상2_gif.gif](InteractiveTypoWeb%20706944b6d0f14b6097848afcabc5efcd/%25EC%2598%2581%25EC%2583%25812_gif.gif)

### 영어

<aside>
🇺🇸 마이크 버튼을 누르고 영어 단어를 말하면 처음엔 파형이 나오고 점차 영어단어 형태로 변환하는 음성 반응형 페이지를 제작하였다.

</aside>

**[overview]**

![Untitled](InteractiveTypoWeb%20706944b6d0f14b6097848afcabc5efcd/Untitled%204.png)

![Untitled](InteractiveTypoWeb%20706944b6d0f14b6097848afcabc5efcd/Untitled%205.png)

**[구현 방법]**

- 웹 음성인식 api 및 녹음 api를 동시에 사용하여 녹음 버튼을 클릭하였을 때 언어와, 파형을 인식하여 가져온다.
- 간격을 설정하여 해당 간격에 해당하는 파형을 canvas상에 그린다.
- 시간이 지남에 따라 글씨를 canvas에 그린 후 이를 좌표에 따라 옮겨그리는 방식으로 시각화한다.

![2배속](InteractiveTypoWeb%20706944b6d0f14b6097848afcabc5efcd/%25EC%2598%2581%25EC%2583%25813_gif.gif)

2배속

### 일본어

<aside>
🇯🇵 일본은 아날로그적인 감성을 추구한다. 때문에 언어적으로도 활자 및 종이에 대한 응용이 적절하다고 생각하였다. 스크롤을 통해 글씨가 나타나고 클릭을 통해 뒤에 겹쳐진 종이의 글씨를 보여지도록 구상하였다.

</aside>

**[overview]**

![Untitled](InteractiveTypoWeb%20706944b6d0f14b6097848afcabc5efcd/Untitled%206.png)

![Untitled](InteractiveTypoWeb%20706944b6d0f14b6097848afcabc5efcd/Untitled%207.png)

**[구현 방법]**

- GSAP을 이용하여 스크롤함에 따라 글자가 나타나도록 구현하였다
- 버튼을 클릭시 비활성화된 글자들을 영역에 맞추어 활성화되도록 css를 구상하였다.

![영상4_gif.gif](InteractiveTypoWeb%20706944b6d0f14b6097848afcabc5efcd/%25EC%2598%2581%25EC%2583%25814_gif.gif)

---

[스크럼](https://www.notion.so/88ed2c3a2eb84ef48fcf7339d8a25703?pvs=21)