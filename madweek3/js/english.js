const $ = (el) => document.querySelector(el);

const store = {
    texts: "",
    isRecognizing: true,
    mediaRecorder: null,
    audioChunks: [],
    volumeList: null,
    filteredVolumeList: [],
};
const canvas = document.getElementById("waveform");
const ctx = canvas.getContext("2d");
const canvas_fake = document.getElementById("waveform_fake");
const ctx_fake = canvas_fake.getContext("2d");
var height = 1000;
const amp = canvas.height / 2;
var bufferLength = 0;
const kan = 80;
var textWidth;

const changeSceneBtn = document.getElementById('changeSceneBtn');
changeSceneBtn.addEventListener('click', () => {
    window.location.href = '../index.html';
});

(() => {
    let SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!("webkitSpeechRecognition" in window)) {
        alert("지원 안되는 브라우저 입니다. !");
    } else {
        const recognition = new SpeechRecognition();
        recognition.interimResults = true; // true면 음절을 연속적으로 인식하나 false면 한 음절만 기록함
        recognition.lang = "en-US"; // 값이 없으면 HTML의 <html lang="en">을 참고합니다. ko-KR, en-US, ar
        recognition.continuous = false; //각 인식에 대해 연속 결과가 반환되는지 아니면 단일 결과만 반환되는지를 제어합니다. 기본값은 단일( false.)
        recognition.maxAlternatives = 1; //20000; // maxAlternatives가 숫자가 작을수록 발음대로 적고, 크면 문장의 적합도에 따라 알맞은 단어로 대체합니다.

        recognition.onspeechend = async function () {};
        recognition.onresult = async function (e) {
            if (store.texts === "") {
                store.texts = Array.from(e.results)
                    .map((results) => results[0].transcript)
                    .join("");
                console.log(store.texts);
                $(".text").textContent = store.texts;
                await unactive();
            }
        };
        function startRecording(stream) {
            store.mediaRecorder = new MediaRecorder(stream);
            store.audioChunks = [];
            store.mediaRecorder.ondataavailable = (event) => {
                store.audioChunks.push(event.data);
            };
            store.mediaRecorder.start();
        }
        function stopRecording() {
            return new Promise((resolve) => {
                store.mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(store.audioChunks, {
                        type: "audio/wav",
                    });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    resolve({ audioBlob, audioUrl });
                };
                store.mediaRecorder.stop();
            });
        }
        async function getVolume(audioBlob) {
            const audioContext = new AudioContext();
            const arrayBuffer = await audioBlob.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            const channelData = await audioBuffer.getChannelData(0); // 첫 번째
            store.volumeList = channelData;
        }
        async function drawWaveform(channelData) {
            bufferLength = channelData.length;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgb(0, 0, 0)";
            var max = -1;
            var x = 0;
            var y = 0;

            for (let i = 0; i < kan; i += 1) {
                y = Math.abs(channelData[Math.floor((i * bufferLength) / kan)]);
                max = max > y ? max : y;
            }
            for (let i = 0; i < kan; i += 1) {
                x = (i * canvas.width) / kan;
                y = Math.abs(channelData[Math.floor((i * bufferLength) / kan)]);
                y = height * (y / max);
                store.filteredVolumeList.push(y);
                // ctx.fillStyle = "white"; // 바깥쪽 선 칠하기
                // ctx.fillRect(x - 3, amp - height / 2, 4, height);
                ctx.fillStyle = "#FF0038";
                ctx.fillRect(x, amp - y / 2, 10, y);
            }
        }
        async function drawText() {
            ctx_fake.font = height + "px Arial"; // 폰트 스타일 설정
            ctx_fake.fillStyle = "#FF0038"; // 텍스트 색상 설정
            var textWidth = ctx_fake.measureText(store.texts).width;
            ctx_fake.fillText(
                store.texts,
                ctx_fake.width / 2 - textWidth / 2,
                ctx_fake.height / 2 + height / 2 - 200
            );
        }
        async function drawTextWithLine(channelData) {
            const bufferLength = channelData.length;
            ctx_fake.lineWidth = 2;
            ctx_fake.strokeStyle = "rgb(0, 0, 0)";
            var x = 0;
            var y = 0;
            var width = 0;
            ctx_fake.fillStyle = "white";
            ctx_fake.fillRect(0, 0, canvas_fake.width, canvas_fake.height);

            // 글자 채우기
            ctx_fake.font = height + "px Arial"; // 폰트 스타일 설정
            ctx_fake.fillStyle = "#FF0038"; // 텍스트 색상 설정
            textWidth = ctx_fake.measureText(store.texts).width;
            ctx_fake.fillText(
                store.texts,
                canvas_fake.width / 2 - textWidth / 2,
                canvas_fake.height / 2 + height / 2 - 200
            );
            // 흰색 채우기
            for (let i = 1; i < kan + 10; i += 1) {
                x = ((i - 1) * canvas_fake.width) / kan + 10;
                width =
                    (i * canvas_fake.width) / kan -
                    ((i - 1) * canvas_fake.width) / kan -
                    10;
                ctx_fake.fillStyle = "white";
                if (x + width > canvas_fake.width) break;
                ctx_fake.fillRect(x, amp - height / 2, width, height);
            }
        }
        async function drawAnimation() {
            var imageData_fake = ctx_fake.getImageData(
                0,
                0,
                canvas_fake.width,
                canvas_fake.height
            );
            var y = 0;
            var x = 0;
            var pixelIndex = null;
            var r, g, b, a;
            var mem;
            function animate() {
                if (x < canvas_fake.width) {
                    // 파형 그림
                    var imageData = ctx.getImageData(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );
                    pixelIndex =
                        ((canvas.height / 2 + y) * canvas.width + x) * 4;
                    [r, g, mem, a] = imageData.data.slice(
                        pixelIndex,
                        pixelIndex + 4
                    );

                    //아래
                    pixelIndex =
                        ((canvas_fake.height / 2 + y) * canvas_fake.width + x) *
                        4;
                    [r, g, b, a] = imageData_fake.data.slice(
                        pixelIndex,
                        pixelIndex + 4
                    );
                    ctx.fillStyle = `rgba(${r},${g},${b},${1})`;
                    // ctx.fillStyle = "pink";
                    ctx.fillRect(x, canvas_fake.height / 2 + y, 10, 10);

                    //위
                    pixelIndex =
                        ((canvas_fake.height / 2 - y) * canvas_fake.width + x) *
                        4;
                    [r, g, b, a] = imageData_fake.data.slice(
                        pixelIndex,
                        pixelIndex + 4
                    );
                    ctx.fillStyle = `rgba(${r},${g},${b},${1})`;
                    ctx.fillRect(x, canvas_fake.height / 2 - y, 10, 10);

                    console.log(x, y, r, g, b);

                    if (
                        y < canvas_fake.height / 3 &&
                        !(
                            x < canvas_fake.width / 2 - textWidth / 2 &&
                            mem > 100
                        )
                    ) {
                        y += 10;
                    } else {
                        x += canvas.width / kan;
                        y = 0;
                    }
                    requestAnimationFrame(animate); // 다음 프레임 요청
                } else {
                    return;
                }
            }
            requestAnimationFrame(animate);
        }
        async function drawAnimationBidirecion() {
            var imageData_fake = ctx_fake.getImageData(
                0,
                0,
                canvas_fake.width,
                canvas_fake.height
            );
            var y = 0;
            var x = 0;
            var pixelIndex = null;
            var r, g, b, a;
            var mem;

            function animate() {
                if (x < canvas_fake.width / 2 + 3) {
                    //아래
                    pixelIndex =
                        ((canvas_fake.height / 2 + y) * canvas_fake.width +
                            ((kan / 2) * canvas.width) / kan +
                            x) *
                        4;
                    [r, g, b, a] = imageData_fake.data.slice(
                        pixelIndex,
                        pixelIndex + 4
                    );
                    ctx.fillStyle = `rgba(${r},${g},${b},${1})`;
                    // ctx.fillStyle = "pink";
                    ctx.fillRect(
                        ((kan / 2) * canvas.width) / kan + x,
                        canvas_fake.height / 2 + y,
                        10,
                        10
                    );

                    //위
                    pixelIndex =
                        ((canvas_fake.height / 2 - y) * canvas_fake.width +
                            ((kan / 2) * canvas.width) / kan +
                            x) *
                        4;
                    [r, g, b, a] = imageData_fake.data.slice(
                        pixelIndex,
                        pixelIndex + 4
                    );
                    ctx.fillStyle = `rgba(${r},${g},${b},${1})`;
                    ctx.fillRect(
                        ((kan / 2) * canvas.width) / kan + x,
                        canvas_fake.height / 2 - y,
                        10,
                        10
                    );

                    //아래
                    pixelIndex =
                        ((canvas_fake.height / 2 + y) * canvas_fake.width +
                            ((kan / 2) * canvas.width) / kan -
                            x) *
                        4;
                    [r, g, b, a] = imageData_fake.data.slice(
                        pixelIndex,
                        pixelIndex + 4
                    );
                    ctx.fillStyle = `rgba(${r},${g},${b},${1})`;
                    // ctx.fillStyle = "pink";
                    ctx.fillRect(
                        ((kan / 2) * canvas.width) / kan - x,
                        canvas_fake.height / 2 + y,
                        10,
                        10
                    );

                    //위
                    pixelIndex =
                        ((canvas_fake.height / 2 - y) * canvas_fake.width +
                            ((kan / 2) * canvas.width) / kan -
                            x) *
                        4;
                    [r, g, b, a] = imageData_fake.data.slice(
                        pixelIndex,
                        pixelIndex + 4
                    );
                    ctx.fillStyle = `rgba(${r},${g},${b},${1})`;
                    ctx.fillRect(
                        ((kan / 2) * canvas.width) / kan - x,
                        canvas_fake.height / 2 - y,
                        10,
                        10
                    );

                    if (y < canvas_fake.height / 3) {
                        y += 10;
                    } else {
                        x += canvas.width / kan;
                        y = 0;
                    }
                    requestAnimationFrame(animate); // 다음 프레임 요청
                } else {
                    return;
                }
            }
            requestAnimationFrame(animate);
        }

        const active = () => {
            $(".dictate").classList.add("on");
            store.isRecognizing = false;
            recognition.start();

            navigator.mediaDevices
                .getUserMedia({ audio: true, video: false })
                .then(startRecording);
        };
        const unactive = async () => {
            $(".dictate").classList.remove("on");
            $(".text").textContent = store.texts;
            store.isRecognizing = true;
            recognition.stop();
            store.mediaRecorder.stop();
            const { audioBlob, audioUrl } = await stopRecording();
            await getVolume(audioBlob);
            await drawWaveform(store.volumeList);
            await drawText();
            await drawTextWithLine(store.volumeList);
            // await drawAnimation();
            await drawAnimationBidirecion();
        };
        $(".dictate").addEventListener("click", () => {
            if (store.isRecognizing) {
                active();
                return;
            } else {
                unactive();
                return;
            }
        });
    }
})();
