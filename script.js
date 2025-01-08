document.addEventListener('DOMContentLoaded', () => {
  let currentMode = 'slot'; // 初期モードはスロット
  let mode = 0; // モードのインデックス (0: ご褒美モード, 1: ペナルティモード)
  let modeItems = [
    ["大きいボール", "中ボール2個", "鐘を鳴らしタイム", "ペナルティ選択", "投げる回数+1"],
    ["禁止マス", "全員ケンケン", "避け手の範囲拡大", "避ける範囲縮小", "一人動けない"]
  ];
  let modeNames = ["ご褒美モード", "ペナルティモード"];
  let isSpinning = false;

  // 要素を取得
  const toggleModeButton = document.getElementById('toggleMode');
  const slotCanvas = document.getElementById('slotCanvas');
  const spinButton = document.getElementById('spinButton');
  const changeModeButton = document.getElementById('changeModeButton');
  const accelerationDisplay = document.getElementById('accelerationDisplay');
  const modeDisplay = document.getElementById('modeDisplay');

  // スロットのアイテムをランダムに更新
  function updateSlotItem() {
    const index = Math.floor(Math.random() * modeItems[mode].length);
    slotCanvas.innerText = modeItems[mode][index];
  }

  // スロットボタンの動作
  spinButton.onclick = () => {
    if (currentMode === 'slot' && !isSpinning) {
      isSpinning = true;
      const spinDuration = 2000; // スロットの回転時間
      const spinInterval = 100; // スロットの更新間隔

      const spinAnimation = setInterval(updateSlotItem, spinInterval);

      setTimeout(() => {
        clearInterval(spinAnimation);
        updateSlotItem();
        isSpinning = false;
      }, spinDuration);
    }
  };

  // モード切り替えボタンの動作
  changeModeButton.onclick = () => {
    mode = (mode + 1) % 2;
    modeDisplay.innerText = "現在のモード: " + modeNames[mode];
    updateSlotItem();
  };

  // UIモード切り替えボタンの動作
  toggleModeButton.onclick = () => {
  if (currentMode === 'slot') {
    // スロットモード → 加速度センサーモードに切り替え
    currentMode = 'accelerometer';
    toggleModeButton.innerText = "スロットモードに切り替え";
    slotCanvas.style.display = 'none';
    spinButton.style.display = 'none';
    changeModeButton.style.display = 'none';
    modeDisplay.style.display = 'none';
    accelerationDisplay.style.display = 'block'; // 表示切り替え
  } else {
    // 加速度センサーモード → スロットモードに切り替え
    currentMode = 'slot';
    toggleModeButton.innerText = "加速度センサーモードに切り替え";
    slotCanvas.style.display = 'flex';
    spinButton.style.display = 'inline';
    changeModeButton.style.display = 'inline';
    modeDisplay.style.display = 'block';
    accelerationDisplay.style.display = 'none'; // 非表示
  }
};

  // 初期設定
  modeDisplay.innerText = "現在のモード: " + modeNames[mode];
  updateSlotItem();
});
