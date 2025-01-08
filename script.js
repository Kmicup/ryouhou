document.addEventListener('DOMContentLoaded', () => {
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
  const stopMeasurementButton = document.createElement('button');
  const countdownDisplay = document.createElement('p');

  stopMeasurementButton.innerText = "計測を停止";
  stopMeasurementButton.style.display = 'none';
  accelerationDisplay.appendChild(countdownDisplay);
  accelerationDisplay.appendChild(stopMeasurementButton);

  // モード切り替え処理
  toggleModeButton.onclick = () => {
    if (currentMode === 'slot') {
      currentMode = 'accelerometer';
      toggleModeButton.innerText = "スロットモードに切り替え";
      slotCanvas.style.visibility = 'hidden';
      spinButton.style.visibility = 'hidden';
      changeModeButton.style.visibility = 'hidden';
      modeDisplay.style.visibility = 'hidden';
      accelerationDisplay.style.visibility = 'visible';
      accelerationDisplay.style.opacity = '1';
    } else {
      currentMode = 'slot';
      toggleModeButton.innerText = "加速度センサーモードに切り替え";
      slotCanvas.style.visibility = 'visible';
      spinButton.style.visibility = 'visible';
      changeModeButton.style.visibility = 'visible';
      modeDisplay.style.visibility = 'visible';
      accelerationDisplay.style.visibility = 'hidden';
      accelerationDisplay.style.opacity = '0';
      stopMeasurement();
    }
  };

  // スロットの回転処理
  spinButton.onclick = () => {
    if (currentMode !== 'slot') return;
    alert('スロット回転！');  // デバッグ用
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

    // 2秒間のカウントダウンを表示
    let countdown = 2;
    countdownDisplay.innerText = `${countdown}秒後に計測開始...`;

    const countdownInterval = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        countdownDisplay.innerText = `${countdown}秒後に計測開始...`;
      } else {
        clearInterval(countdownInterval);
        countdownDisplay.innerText = "計測中...";
        startMeasurement();
      }
    }, 1000);
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

      if (totalAccel < threshold) {
        audio.play();
      }
    }, 200);

    isMeasuring = true;
    stopMeasurementButton.style.display = 'inline';
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
  stopMeasurementButton.onclick = stopMeasurement;

  function stopMeasurement() {
    if (!isMeasuring) return;

    window.removeEventListener('devicemotion', updateAcceleration);
    clearInterval(measurementInterval);
    isMeasuring = false;
    countdownDisplay.innerText = "計測を停止しました。";
    stopMeasurementButton.style.display = 'none';
  }
});
