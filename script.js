// スロットマシン関連
let slotResult = ["🍒", "🍋", "🍉", "🍊", "🍇", "🍓"];
let spinInterval;

// スロットマシンを回す
spinButton.onclick = () => {
  slotCanvas.innerHTML = "回転中...";

  spinInterval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * slotResult.length);
    slotCanvas.innerHTML = slotResult[randomIndex];
  }, 100);

  setTimeout(() => {
    clearInterval(spinInterval);
    const randomIndex = Math.floor(Math.random() * slotResult.length);
    slotCanvas.innerHTML = slotResult[randomIndex];
  }, 3000); // 3秒後にスロット停止
};

// モード切り替えボタン
changeModeButton.onclick = () => {
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
  }
};

// 加速度センサー関連
let accelerationX = 0;
let accelerationY = 0;
let accelerationZ = 0;
let totalAcceleration = 0;
let sensor;

const requestPermissionButton = document.getElementById('requestPermission');
const stopMeasurementButton = document.getElementById('stopMeasurement');

requestPermissionButton.onclick = () => {
  // 加速度センサーの使用許可をリクエスト
  if ("Accelerometer" in window) {
    sensor = new Accelerometer({ frequency: 60 });
    sensor.addEventListener('reading', () => {
      // 加速度の値を取得
      accelerationX = sensor.x;
      accelerationY = sensor.y;
      accelerationZ = sensor.z;

      // 総合加速度を計算
      totalAcceleration = Math.sqrt(accelerationX ** 2 + accelerationY ** 2 + accelerationZ ** 2).toFixed(2);

      // 値を画面に表示
      document.getElementById('accelerationX').innerText = accelerationX.toFixed(2);
      document.getElementById('accelerationY').innerText = accelerationY.toFixed(2);
      document.getElementById('accelerationZ').innerText = accelerationZ.toFixed(2);
      document.getElementById('totalAcceleration').innerText = totalAcceleration;
    });

    sensor.start();
    stopMeasurementButton.style.display = 'inline';
    requestPermissionButton.style.display = 'none';
  } else {
    alert("加速度センサーはサポートされていません。");
  }
};

stopMeasurementButton.onclick = () => {
  // 加速度センサーの計測停止
  if (sensor) {
    sensor.stop();
    stopMeasurementButton.style.display = 'none';
    requestPermissionButton.style.display = 'inline';
  }
};

