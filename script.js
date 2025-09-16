const componentList = document.getElementById("componentList");
const canvas = document.getElementById("canvas");
let selected = null;

const components = {
  "角色": [
    "img/char_lt.webp",
    "img/char_hc.webp",
    "img/char_ys.webp",
    "img/char_sd.webp",
    "img/char_eh.webp",
    "https://raw.githubusercontent.com/sakanako0809/sj-game/refs/heads/main/img/dh.webp",
    "img/char_sw.webp",
    "img/char_rw.webp",
    "img/char_kh.webp"
  ],
  "水果": [
    "img/fruit_lt.webp",
    "img/fruit_hc.webp",
    "img/fruit_ys.webp",
    "img/fruit_sd.webp",
    "img/fruit_eh.webp",
    "img/fruit_dh.webp",
    "img/fruit_sw.webp",
    "img/fruit_rw.webp",
    "img/fruit_kh.webp"
  ],
  "小物件": [
    "img/item_sjlightstick_2.webp",
    "img/item_redwine.webp",
    "img/item_noodle.webp",
    "img/item_newspaper.webp",
    "img/item_lightstick_sp.webp",
    "img/item_game.webp",
    "img/item_coffee.webp",
    "img/item_clear.webp",
    "img/item_chips_2.webp",
    "img/item_chips_1.webp",
    "img/item_bottle.webp",
    "img/item_bible.webp"
  ],
  "表情": [
    "img/face_lt.webp",
    "img/face_hc.webp",
    "img/face_ys.webp",
    "img/face_sd.webp",
    "img/face_eh.webp",
    "img/face_dh.webp",
    "img/face_sw.webp",
    "img/face_rw.webp",
    "img/face_kh.webp"
  ]
};

// 載入元件分類
document.querySelectorAll('.category').forEach(cat => {
  cat.addEventListener('click', () => {
    const type = cat.dataset.type;
    componentList.innerHTML = '';
    components[type].forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      img.draggable = true;
      img.addEventListener('dragstart', e => {
        e.dataTransfer.setData("url", url);
      });
      //console.log("新增圖片", url);
      componentList.appendChild(img);
    });
  });
});

// 拖入畫布
canvas.addEventListener("dragover", e => e.preventDefault());
canvas.addEventListener("drop", e => {
  e.preventDefault();
  const url = e.dataTransfer.getData("url");

  const el = document.createElement("img");
  el.src = url;
  el.className = "item";
  el.style.left = e.offsetX + "px";
  el.style.top = e.offsetY + "px";
  el.style.width = "100px";
  el.style.zIndex = 1;
  el.dataset.angle = 0;
  el.dataset.scaleX = 1;

  el.addEventListener("mousedown", () => selectElement(el));

  canvas.appendChild(el);
  makeInteractive(el);
  selectElement(el);
});

// Interact.js 控制：拖曳 + 縮放
function makeInteractive(el) {
  interact(el)
    .draggable({
      listeners: {
        move(event) {
          const x = (parseFloat(el.getAttribute('data-x')) || 0) + event.dx;
          const y = (parseFloat(el.getAttribute('data-y')) || 0) + event.dy;

          el.style.transform = `translate(${x}px, ${y}px) rotate(${el.dataset.angle}deg) scaleX(${el.dataset.scaleX})`;
          el.setAttribute('data-x', x);
          el.setAttribute('data-y', y);
        }
      }
    })
    .resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      listeners: {
        move(event) {
          let { width, height } = event.rect;
          el.style.width = width + "px";
          el.style.height = height + "px";
        }
      }
    });
}

// 操作選取元件
function selectElement(el) {
  if (selected) selected.style.outline = 'none';
  selected = el;
  selected.style.outline = '2px dashed red';
}

function rotate() {
  if (!selected) return;
  let angle = parseFloat(selected.dataset.angle || "0");
  angle += 15;
  selected.dataset.angle = angle;
  updateTransform();
}

function flip() {
  if (!selected) return;
  selected.dataset.scaleX = selected.dataset.scaleX == 1 ? -1 : 1;
  updateTransform();
}

function updateTransform() {
  if (!selected) return;
  const x = parseFloat(selected.getAttribute("data-x")) || 0;
  const y = parseFloat(selected.getAttribute("data-y")) || 0;
  const angle = parseFloat(selected.dataset.angle);
  const scaleX = parseFloat(selected.dataset.scaleX);
  selected.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg) scaleX(${scaleX})`;
}

function bringForward() {
  if (!selected) return;
  selected.style.zIndex = parseInt(selected.style.zIndex || 1) + 1;
}

function sendBackward() {
  if (!selected) return;
  selected.style.zIndex = Math.max(1, parseInt(selected.style.zIndex || 1) - 1);
}

function remove() {
  if (!selected) return;
  selected.remove();
  selected = null;
}
