<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>スロットマシン＆加速度センサー</title>
  <style>
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      font-family: 'Arial', sans-serif;
      background: #000;
      color: #fff;
    }

    #slotCanvas {
      border: 4px solid #ffea00;
      width: 300px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: bold;
      color: #000;
      background: #ffea00;
      margin-top: 20px;
      box-shadow: 0 8px 15px rgba(255, 234, 0, 0.5);
      border-radius: 10px;
    }

    button {
      font-size: 1.2em;
      padding: 10px 25px;
      margin: 10px;
      border-radius: 25px;
      background: #007bff;
      border: none;
      color: #fff;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0, 123, 255, 0.3);
    }

    #accelerationDisplay {
      visibility: hidden; /* 非表示にする */
      position: absolute;
      opacity: 0;
      transition: opacity 0.3s ease, visibility 0.3s ease;
      background: rgba(0, 0, 0, 0.8);
      padding: 20px;
      border-radius: 10px;
    }

    #accelerationDisplay.show {
      visibility: visible;
      opacity: 1;
    }

    #modeDisplay {
      font-size: 1.2em;
      margin: 10px;
      color: #007bff;
    }
  </style>
</head>
<body>
  <h1 id="title">スロットマシン</h1>
  <button id="toggleMode">加速度センサーモードに切り替え</button>
  <div id="slotCanvas">スロット結果</div>
  <div id="modeDisplay">現在のモード: ご褒美モード</div>
  <button id="spinButton">回す</button>
  <button id="changeModeButton">モード切り替え</button>
  <div id="accelerationDisplay">
    <p>加速度センサー検知</p>
    <p>X軸加速度: <span id="accelerationX">0</span></p>
  </div>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      let currentMode = 'slot';

      const toggleModeButton = document.getElementById('toggleMode');
      const accelerationDisplay = document.getElementById('accelerationDisplay');
      const slotCanvas = document.getElementById('slotCanvas');
      const spinButton = document.getElementById('spinButton');
      const changeModeButton = document.getElementById('changeModeButton');

      toggleModeButton.onclick = () => {
        if (currentMode === 'slot') {
          currentMode = 'accelerometer';
          toggleModeButton.innerText = "スロットモードに切り替え";
          slotCanvas.style.display = 'none';
          spinButton.style.display = 'none';
          changeModeButton.style.display = 'none';
          accelerationDisplay.classList.add('show');
        } else {
          currentMode = 'slot';
          toggleModeButton.innerText = "加速度センサーモードに切り替え";
          slotCanvas.style.display = 'flex';
          spinButton.style.display = 'inline';
          changeModeButton.style.display = 'inline';
          accelerationDisplay.classList.remove('show');
        }
      };

      spinButton.onclick = () => {
        alert('スロットを回す！');
      };

      changeModeButton.onclick = () => {
        alert('モードを切り替え！');
      };
    });
  </script>
</body>
</html>
