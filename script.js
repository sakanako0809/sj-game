const componentList = document.getElementById("componentList");
const canvas = document.getElementById("canvas");
let selected = null;
let zIndexCounter = 1;

const components = {
  "角色": [
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/char_lt.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/char_hc.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/char_ys.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/char_sd.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/char_eh.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/char_dh.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/char_sw.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/char_rw.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/char_kh.webp"
  ],
  "水果": [
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/fruit_lt.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/fruit_hc.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/fruit_ys.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/fruit_sd.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/fruit_eh.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/fruit_dh.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/fruit_sw.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/fruit_rw.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/fruit_kh.webp"
  ],
  "小物件": [
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/item_sjlightstick_2.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/item_redwine.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/item_noodle.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/item_newspaper.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/item_lightstick_sp.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/item_game.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/item_coffee.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/item_clear.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/item_chips_2.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/item_chips_1.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/item_bottle.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/item_bible.webp"
  ],
  "表情": [
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/face_lt.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/face_hc.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/face_ys.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/face_sd.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/face_eh.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/face_dh.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/face_sw.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/face_rw.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/face_kh.webp"
  ]
};

// 點分類 → 載入元件列表
document.querySelectorAll('.category').forEach(cat => {
  cat.addEventListener('click', () => {
    const type = cat.dataset.type;
    loadComponentList(type);
  });
});

function loadComponentList(type) {
  componentList.innerHTML = '';
  components[type].forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.draggable = true;
    img.addEventListener('dragstart', e => {
      e.dataTransfer.setData("text/plain", url);
    });
    componentList.appendChild(img);
  });
}

// 頁面一載入就預設載入「角色」
window.addEventListener("DOMContentLoaded", () => {
  loadComponentList("角色");

  canvas.addEventListener("click", (e) => {
    if (!e.target.closest(".item")) {
      if (selected) {
        selected.style.outline = "none";
        const handle = selected.querySelector('.rotate-handle');
        if (handle) handle.style.display = 'none';
        selected = null;
      }
    }
  });

});

// 畫布拖曳放入
canvas.addEventListener("dragover", e => e.preventDefault());

canvas.addEventListener("drop", e => {
  e.preventDefault();
  const url = e.dataTransfer.getData("text/plain");
  if (!url) return;

  const wrapper = document.createElement("div");
  wrapper.className = "item";
  wrapper.style.position = "absolute";
  wrapper.style.left = e.offsetX + "px";
  wrapper.style.top = e.offsetY + "px";
  wrapper.style.width = "100px";
  wrapper.style.zIndex = zIndexCounter++;
  wrapper.dataset.angle = 0;
  wrapper.dataset.scaleX = 1;
  wrapper.setAttribute("data-x", 0);
  wrapper.setAttribute("data-y", 0);

  const img = document.createElement("img");
  img.src = url;
  img.style.width = "100%";
  img.draggable = false;

  const rotateHandle = document.createElement("div");
  rotateHandle.className = "rotate-handle";

  wrapper.appendChild(img);
  wrapper.appendChild(rotateHandle);
  canvas.appendChild(wrapper);

  makeInteractive(wrapper);
  selectElement(wrapper);

  wrapper.addEventListener("pointerdown", () => {
    selectElement(wrapper);
  });
});

// 設定選取
function selectElement(el) {
  if (selected) {
    selected.style.outline = 'none';
    const prevHandle = selected.querySelector('.rotate-handle');
    if (prevHandle) prevHandle.style.display = 'none';
  }

  selected = el;
  selected.style.outline = '2px dashed red';

  const handle = selected.querySelector('.rotate-handle');
  if (handle) handle.style.display = 'block';
}

// 調整元件的 transform
function applyTransform(el) {
  const x = parseFloat(el.getAttribute('data-x')) || 0;
  const y = parseFloat(el.getAttribute('data-y')) || 0;
  const angle = parseFloat(el.dataset.angle) || 0;
  const scaleX = parseFloat(el.dataset.scaleX) || 1;
  el.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg) scaleX(${scaleX})`;
}

// 互動控制：拖曳與縮放（等比例）
function makeInteractive(el) {
  interact(el)
    .draggable({
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: canvas,
          endOnly: true
        })
      ],
      listeners: {
        start(event) {
          selectElement(event.target);
        },
        move(event) {
          const target = event.target;
          const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
          const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
          applyTransform(target);
        }
      }
    })
    .resizable({
      edges: { top: true, left: true, bottom: true, right: true },
      modifiers: [
        interact.modifiers.aspectRatio({ ratio: 'preserve' }),
        interact.modifiers.restrictEdges({
          outer: canvas,
          endOnly: true
        })
      ],
      listeners: {
        move(event) {
          const { width, height } = event.rect;
          el.style.width = width + "px";
          el.style.height = height + "px";
        }
      }
    });
}

// 拖曳旋轉手把來旋轉
interact('.rotate-handle').draggable({
  listeners: {
    start(event) {
      const wrapper = event.target.parentElement;
      const rect = wrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // 記錄滑鼠起始角度
      const startAngle = Math.atan2(
        event.clientY - centerY,
        event.clientX - centerX
      ) * 180 / Math.PI;

      wrapper.dataset._rotateStartAngle = startAngle;
      wrapper.dataset._rotateStartValue = parseFloat(wrapper.dataset.angle) || 0;
    },

    move(event) {
      const wrapper = event.target.parentElement;
      const rect = wrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const currentAngle = Math.atan2(
        event.clientY - centerY,
        event.clientX - centerX
      ) * 180 / Math.PI;

      const startMouseAngle = parseFloat(wrapper.dataset._rotateStartAngle);
      const startValue = parseFloat(wrapper.dataset._rotateStartValue);

      const delta = currentAngle - startMouseAngle;
      const newAngle = startValue + delta;

      wrapper.dataset.angle = newAngle.toFixed(1);
      applyTransform(wrapper);
    }
  }
});

// 層級操作
function bringForward() {
  if (!selected) return;
  const all = [...canvas.querySelectorAll(".item")];
  const current = parseInt(selected.style.zIndex);
  const next = all.map(el => parseInt(el.style.zIndex)).filter(z => z > current).sort()[0];
  if (next) {
    all.forEach(el => {
      if (parseInt(el.style.zIndex) === next) el.style.zIndex = current;
    });
    selected.style.zIndex = next;
  }
}

function sendBackward() {
  if (!selected) return;
  const all = [...canvas.querySelectorAll(".item")];
  const current = parseInt(selected.style.zIndex);
  const prev = all.map(el => parseInt(el.style.zIndex)).filter(z => z < current).sort().reverse()[0];
  if (prev) {
    all.forEach(el => {
      if (parseInt(el.style.zIndex) === prev) el.style.zIndex = current;
    });
    selected.style.zIndex = prev;
  }
}

function rotate() {
  if (!selected) return;
  let angle = parseFloat(selected.dataset.angle || "0");
  angle += 15;
  selected.dataset.angle = angle;
  applyTransform(selected);
}

function flip() {
  if (!selected) return;
  selected.dataset.scaleX = selected.dataset.scaleX == 1 ? -1 : 1;
  applyTransform(selected);
}

window.addEventListener("keydown", (e) => {
  if (!selected) return;

  // Delete 或 Backspace 鍵
  if (e.key === "Delete" || e.key === "Backspace") {
    e.preventDefault();  // 防止退格造成返回上一頁
    remove();            // 
  }
});

function remove() {
  if (!selected) return;
  selected.remove();
  selected = null;
}
