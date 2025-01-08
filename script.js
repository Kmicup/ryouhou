// 初期設定
let currentMode = 'slot'; // 現在のモード ('slot' or 'accelerometer')
const slotCanvas = document.getElementById('slotCanvas');
const accelerationDisplay = document.getElementById('accelerationDisplay');
const toggleModeButton = document.getElementById('toggleMode');
const spinButton = document.getElementById('spinButton');
const changeModeButton = document.getElementById('changeModeButton');
const modeDisplay = document.getElementById('modeDisplay');

// モード切り替え処理
toggleModeButton.onclick = () => {
  if (currentMode === 'slot') {
    // スロットモード → 加速度センサーモードに切り替え
    currentMode = 'accelerometer';
    toggleModeButton.innerText = "スロットモードに切り替え";
    slotCanvas.style.display = 'none';
    spinButton.style.display = 'none';
    changeModeButton.style.display = 'none';
    modeDisplay.style.display = 'none';
    accelerationDisplay.style.display = 'block'; // 加速度センサーUIを表示
  } else {
    // 加速度センサーモード → スロットモードに切り替え
    currentMode = 'slot';
    toggleModeButton.innerText = "加速度センサーモードに切り替え";
    slotCanvas.style.display = 'flex';
    spinButton.style.display = 'inline';
    changeModeButton.style.display = 'inline';
    modeDisplay.style.display = 'block';
    accelerationDisplay.style.display = 'none'; // 加速度センサーUIを非表示
  }
};

// デバッグ用ログ
console.log("JavaScriptがロードされました。初期モード:", currentMode);
