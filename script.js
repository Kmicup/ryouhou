let currentMode = 'slot';
let isMeasuring = false;
let lastAcceleration = { x: 0, y: 0, z: 0 };
let measurementInterval;

// UI要素の取得
const toggleModeButton = document.getElementById('toggleMode');
const slotCanvas = document.getElementById('slotCanvas');
const spinButton = document.getElementById('spinButton');
const changeModeButton = document.getElementById('changeModeButton');
const modeDisplay = document.getElementById('modeDisplay');
const accelerationDisplay = document.getElementById('accelerationDisplay');
const requestPermissionButton = document.getElementById('requestPermission');
const accelerationX = document.getElementById('accelerationX');
const accelerationY = document.getElementById('accelerationY');
const accelerationZ = document.getElementById('accelerationZ');
const totalAcceleration = document.getElementById('totalAcceleration');

// モード切り替え処理
toggleModeButton.onclick = () => {
  if (currentMode === 'slot') {
    currentMode = 'accelerometer';
    toggleModeButton.innerText = "スロットモードに切り替え";
    slotCanvas.style.display = 'none';
    spinButton.style.display = 'none';
    changeModeButton.style.display = 'none';
    modeDisplay.style.display = 'none';
    accelerationDisplay.style.display = 'block';
  } else {
    currentMode = 'slot';
    toggleModeButton.innerText = "加速度センサーモードに切り替え";
    slotCanvas.style.display = 'flex';
    spinButton.style.display = 'inline';
    changeModeButton.style.display = 'inline';
    modeDisplay.style.display = 'block';
    accelerationDisplay.style.display = 'none';
    stopMeasurement();
  }
};

// 加速度センサーの計測を開始
requestPermissionButton.onclick = async () => {
  if (isMeasuring) return;

  // 権限の確認 (iOSの場合)
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    const permission = await DeviceMotionEvent.requestPermission();
    if (permission !== 'granted') {
      alert("加速度センサーへのアクセスが許可されませんでした。");
      return;
    }
  }

  // 2秒後に計測を開始
  setTimeout(() => {
    startMeasurement();
  }, 2000);
};

// 計測を開始
function startMeasurement() {
  if (isMeasuring) return;

  window.addEventListener('devicemotion', updateAcceleration);
  measurementInterval = setInterval(() => {
    const x = lastAcceleration.x || 0;
    const y = lastAcceleration.y || 0;
    const z = lastAcceleration.z || 0;
    const totalAccel = Math.sqrt(x ** 2 + y ** 2 + z ** 2);

    accelerationX.textContent = x.toFixed(2);
    accelerationY.textContent = y.toFixed(2);
    accelerationZ.textContent = z.toFixed(2);
    totalAcceleration.textContent = totalAccel.toFixed(2);
  }, 200);

  isMeasuring = true;
  console.log("加速度センサー計測開始");
}

// 加速度センサーのデータ更新
function updateAcceleration(event) {
  if (!event.acceleration) return;

  lastAcceleration = {
    x: event.acceleration.x || 0,
    y: event.acceleration.y || 0,
    z: event.acceleration.z || 0,
  };
}

// 計測を停止
function stopMeasurement() {
  if (!isMeasuring) return;

  window.removeEventListener('devicemotion', updateAcceleration);
  clearInterval(measurementInterval);
  isMeasuring = false;
  console.log("加速度センサー計測停止");
}
