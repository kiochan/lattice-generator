//---------------------------------------界面按钮功能触发--------------------------------------
function FAQ() {
  alert(
    "Q:图片可以下载吗？\nA:由于开发时间有限，您只能截图（无限高清放大）而不是直接下载图片。\nQ:如何制作格裙样机？\nA:。\nQ:如何制作格裙？\nA:找别人帮你做。\nQ:成图可以商用吗？\nA:我认为店主不会要。\nQ:这个工具怎么使用？\nA:点击页面下方'月亮猹'观看教程视频。\nQ:为什么有的图有bug？\nA:因为开发者累了。\nQ:你还有什么问题？\nA:你没有了。"
  );
  alert(document.getElementById('svg_img').innerHTML);
}

function download(filename, content) {
  var blob = new Blob([content], { type: 'image/svg+xml' });
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.style = 'display: none';
  a.href = url;
  a.download = filename; // 下载的文件名
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 5);
}

function predown() {
  var filename = new Date().getTime() + '.svg';
  var content = document.getElementById('svg_img').querySelector('svg').outerHTML;
  download(filename, content);
}

//---------------------------------------随机遮罩--------------------------------------
var MaskArray = [
  'bag',
  'Bigunderpants',
  'bottle',
  'bowtie',
  'camera',
  'fakeskirt',
  'notebook',
  'Ordinaryskirt',
];
// 获取窗口的宽度和高度，不包括滚动条
var w = document.documentElement.clientWidth;
var h = document.documentElement.clientHeight;
var parent = document.getElementById('img_mask');
var maskimg = document.getElementById('img_current');
var masknumber = Math.ceil(Math.random() * MaskArray.length);

// 生成SVG,保持标题、svg、色盘居中
var mysvg = document.getElementById('svg_my');
var mymask = document.getElementById('img_mask');
var mysvgWidth;

function resizeElements() {
  w = document.documentElement.clientWidth;
  h = document.documentElement.clientHeight;
  maskimg = document.getElementById('img_current');
  mysvg = document.getElementById('svg_my');
  mymask = document.getElementById('img_mask');
  if (window.innerWidth < window.innerHeight) {
    mysvgWidth = window.innerHeight * 0.26;
  } else {
    mysvgWidth = window.innerWidth * 0.26;
  }
  mysvg.setAttribute('style', 'width:' + mysvgWidth + 'px;height:' + mysvgWidth + 'px;');
}

window.addEventListener('resize', resizeElements);

// 打开/关闭 遮罩
function onMask(isMaskOn) {
  if (isMaskOn) {
    parent = document.getElementById('img_mask');
    maskimg = document.getElementById('img_current');
    masknumber = Math.ceil(Math.random() * MaskArray.length);
    if (maskimg) {
      maskimg.src = 'img/' + MaskArray[masknumber - 1] + '.png'; //随机mask
    } else {
      maskimg = document.createElement('img');
      maskimg.id = 'img_current';
      maskimg.src = 'img/' + MaskArray[masknumber - 1] + '.png';
      parent.appendChild(maskimg);
      resizeElements();
    }
  } else {
    maskimg.remove();
  }
}

// 随机获取名字
function onName() {
  var request;
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    request = new ActiveXObject('Microsoft.XMLHTTP');
  }
  if (request != null) {
    request.open('GET', 'res/CustomNameStrings.json', false);
    request.send(null);
    if (request.status == 200) {
      var name = JSON.parse(request.responseText).nouns;
      var btn = document.getElementById('namebutton');
      var span = document.getElementById('namebutton_span');
      span.innerHTML =
        name[Math.floor(Math.random() * name.length)] +
        name[Math.floor(Math.random() * name.length)];
    } else if (request.status == 0) {
      alert(
        'Status: ' +
          request.status +
          '\nHTTP Status should never be 0, please refresh page or restart your browser.'
      );
    } else {
      alert('Status: ' + request.status + '\nResponse: ' + request.responseText);
    }
  } else {
    alert('Your environment does not support XMLHTTP.');
  }
}

//----------------------------------生成并绘制 SVG----------------------------------
function onLoad(random) {
  var color1, color2, color3;
  var colorAuxiliary = [];
  var AuxiliaryNumber;
  var numbercolor1; // 控制横纹/竖纹的数量

  if (random) {
    // 随机三主色
    color1 = '#' + Math.floor(Math.random() * 16777215).toString(16);
    color2 = '#' + Math.floor(Math.random() * 16777215).toString(16);
    color3 = '#' + Math.floor(Math.random() * 16777215).toString(16);
    // 补齐颜色位数
    if (color1.length == 6) {
      color1 = '#0' + color1.substr(1);
    }
    if (color2.length == 6) {
      color2 = '#0' + color2.substr(1);
    }
    if (color3.length == 6) {
      color3 = '#0' + color3.substr(1);
    }

    document.getElementById('color1').value = color1;
    document.getElementById('color2').value = color2;
    document.getElementById('color3').value = color3;

    var number1 = Math.random();
    var numbercolorButton = document.getElementById('numbercolor');
    numbercolorButton.value = numbercolor1 = Math.ceil(number1 * 6);
  } else {
    // 半自动
    color1 = document.getElementById('color1').value;
    color2 = document.getElementById('color2').value;
    color3 = document.getElementById('color3').value;

    var number1 = Math.random();
    numbercolor1 = Math.ceil(number1 * document.getElementById('numbercolor').value);
  }

  // 生成随机辅色
  AuxiliaryNumber = Math.ceil(Math.random() * 5);
  if (document.getElementsByName('colorAdd')) {
    var parent = document.getElementById('colorCnotroll');
    var child = document.getElementsByName('colorAdd');
    // 把之前的辅色按钮清空
    for (var j = child.length - 1; j >= 0; j--) {
      parent.removeChild(child[j]);
    }
  }
  for (var i = 1; i <= AuxiliaryNumber; i++) {
    var tempColr = '#' + Math.floor(Math.random() * 16777215).toString(16);
    colorAuxiliary.push(tempColr);
    var addColor = document.getElementById('colorCnotroll');
    var input = document.createElement('input');
    input.type = 'color';
    input.id = 'colorAdds';
    input.value = tempColr;
    input.className = 'colorbuttonsmall';
    input.name = 'colorAdd';
    input.disabled = 'disabled';
    addColor.appendChild(input);
  }

  // 调整 svg 大小
  mysvg = document.getElementById('svg_my');
  mymask = document.getElementById('img_mask');
  if (window.innerWidth < window.innerHeight) {
    mysvgWidth = window.innerHeight * 0.26;
  } else {
    mysvgWidth = window.innerWidth * 0.26;
  }
  mysvg.setAttribute('style', 'width:' + mysvgWidth + 'px;height:' + mysvgWidth + 'px;');

  //************ 下面正式开始绘制 ************//

  // -- 1) 背景色 (Rect) --
  var rectObj0 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  // 原先有 href=#petal，这里AI不支持 -> 移除
  rectObj0.setAttribute('width', '100%');
  rectObj0.setAttribute('height', '100%');
  rectObj0.setAttribute('fill', color1);
  rectObj0.setAttribute('stroke', color1);
  rectObj0.setAttribute('stroke-width', '0');
  document.querySelector('svg').appendChild(rectObj0);

  // -- 2) 绘制横纹 (color2, color3) --
  // 主色1 (color2)
  var rectObj1Array = [];
  for (var i = 1; i <= numbercolor1; i++) {
    var rectObj1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectObj1.setAttribute('width', '100%');
    var temph = Math.ceil(Math.random() * 50);
    var tempy = Math.ceil(Math.random() * mysvgWidth);
    // 防止重叠
    for (var m = 0; m < rectObj1Array.length; m++) {
      for (var j = 0; j < 10000; j++) {
        if (rectObj1Array[m][1] < tempy && tempy < rectObj1Array[m][0] + rectObj1Array[m][1]) {
          tempy = Math.ceil(Math.random() * mysvgWidth);
        } else {
          break;
        }
      }
    }
    for (var m = 0; m < rectObj1Array.length; m++) {
      for (var j = 0; j < 10000; j++) {
        if (rectObj1Array[m][1] < temph + tempy && tempy < rectObj1Array[m][1]) {
          temph = Math.ceil(Math.random() * (rectObj1Array[m][1] - tempy));
        } else {
          break;
        }
      }
    }
    rectObj1.setAttribute('height', (temph / mysvgWidth) * 100 + '%');
    rectObj1.setAttribute('y', (tempy / mysvgWidth) * 100 + '%');
    rectObj1Array.push([temph, tempy]);
    rectObj1.setAttribute('fill', color2);
    rectObj1.setAttribute('stroke', color2);
    rectObj1.setAttribute('stroke-width', '0');
    document.querySelector('svg').appendChild(rectObj1);
  }

  // 主色2 (color3)
  var rectObj2Array = [];
  var rectObj1_2Array = rectObj1Array.concat();
  for (var i = 1; i <= numbercolor1; i++) {
    var rectObj2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectObj2.setAttribute('width', '100%');
    var temph = Math.ceil(Math.random() * 50);
    var tempy = Math.ceil(Math.random() * mysvgWidth);
    for (var m = 0; m < rectObj1_2Array.length; m++) {
      for (var j = 0; j < 10000; j++) {
        if (
          rectObj1_2Array[m][1] < tempy &&
          tempy < rectObj1_2Array[m][0] + rectObj1_2Array[m][1]
        ) {
          tempy = Math.ceil(Math.random() * mysvgWidth);
        } else {
          break;
        }
      }
    }
    for (var m = 0; m < rectObj1_2Array.length; m++) {
      for (var j = 0; j < 10000; j++) {
        if (rectObj1_2Array[m][1] < temph + tempy && tempy < rectObj1_2Array[m][1]) {
          temph = Math.ceil(Math.random() * (rectObj1_2Array[m][1] - tempy));
        } else {
          break;
        }
      }
    }
    rectObj2.setAttribute('height', (temph / mysvgWidth) * 100 + '%');
    rectObj2.setAttribute('y', (tempy / mysvgWidth) * 100 + '%');
    rectObj1_2Array.push([temph, tempy]);
    rectObj2Array.push([temph, tempy]);
    rectObj2.setAttribute('fill', color3);
    rectObj2.setAttribute('stroke', color3);
    rectObj2.setAttribute('stroke-width', '0');
    document.querySelector('svg').appendChild(rectObj2);
  }

  // -- 3) 竖纹 --
  // 主色1 (color2)
  for (var i = 1; i <= numbercolor1; i++) {
    var rectObj3 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectObj3.setAttribute('height', '100%');
    rectObj3.setAttribute('width', (rectObj1Array[i - 1][0] / mysvgWidth) * 100 + '%');
    rectObj3.setAttribute('x', (rectObj1Array[i - 1][1] / mysvgWidth) * 100 + '%');
    rectObj3.setAttribute('fill', color2);
    rectObj3.setAttribute('stroke', color2);
    rectObj3.setAttribute('stroke-width', '0');
    document.querySelector('svg').appendChild(rectObj3);
  }
  // 主色2 (color3)
  for (var i = 1; i <= numbercolor1; i++) {
    var rectObj4 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectObj4.setAttribute('height', '100%');
    rectObj4.setAttribute('width', (rectObj2Array[i - 1][0] / mysvgWidth) * 100 + '%');
    rectObj4.setAttribute('x', (rectObj2Array[i - 1][1] / mysvgWidth) * 100 + '%');
    rectObj4.setAttribute('fill', color3);
    rectObj4.setAttribute('stroke', color3);
    rectObj4.setAttribute('stroke-width', '0');
    document.querySelector('svg').appendChild(rectObj4);
  }

  // -- 4) 右上斜纹 / 左下斜纹 (color1) --
  for (var i = 1; i <= mysvgWidth; i += 2) {
    var lineObj = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    // 移除 xlink:href
    lineObj.setAttribute('x1', (i / mysvgWidth) * 100 + '%');
    lineObj.setAttribute('x2', '100%');
    lineObj.setAttribute('y1', '0');
    lineObj.setAttribute('y2', ((mysvgWidth - i) / mysvgWidth) * 100 + '%');
    lineObj.setAttribute('stroke-width', '0.5');
    lineObj.setAttribute('stroke', color1);
    document.querySelector('svg').appendChild(lineObj);
  }
  for (var i = 1; i <= mysvgWidth; i += 2) {
    var lineObj2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lineObj2.setAttribute('x1', '0');
    lineObj2.setAttribute('x2', ((mysvgWidth - i) / mysvgWidth) * 100 + '%');
    lineObj2.setAttribute('y1', (i / mysvgWidth) * 100 + '%');
    lineObj2.setAttribute('y2', '100%');
    lineObj2.setAttribute('stroke-width', '0.5');
    lineObj2.setAttribute('stroke', color1);
    document.querySelector('svg').appendChild(lineObj2);
  }

  // -- 5) 不同色交叠（半透明）--
  for (var i = 0; i < rectObj1Array.length; i++) {
    for (var j = 0; j < rectObj2Array.length; j++) {
      var rectObjNotSame = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rectObjNotSame.setAttribute('height', (rectObj1Array[i][0] / mysvgWidth) * 100 + '%');
      rectObjNotSame.setAttribute('width', (rectObj2Array[j][0] / mysvgWidth) * 100 + '%');
      rectObjNotSame.setAttribute('x', (rectObj2Array[j][1] / mysvgWidth) * 100 + '%');
      rectObjNotSame.setAttribute('y', (rectObj1Array[i][1] / mysvgWidth) * 100 + '%');
      rectObjNotSame.setAttribute('fill', color2);
      rectObjNotSame.setAttribute('stroke', color2);
      rectObjNotSame.setAttribute('stroke-width', '0');
      rectObjNotSame.setAttribute('fill-opacity', '0.5');
      document.querySelector('svg').appendChild(rectObjNotSame);
    }
  }
  for (var i = 0; i < rectObj2Array.length; i++) {
    for (var j = 0; j < rectObj1Array.length; j++) {
      var rectObjNotSame_a = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rectObjNotSame_a.setAttribute('height', (rectObj2Array[i][0] / mysvgWidth) * 100 + '%');
      rectObjNotSame_a.setAttribute('width', (rectObj1Array[j][0] / mysvgWidth) * 100 + '%');
      rectObjNotSame_a.setAttribute('x', (rectObj1Array[j][1] / mysvgWidth) * 100 + '%');
      rectObjNotSame_a.setAttribute('y', (rectObj2Array[i][1] / mysvgWidth) * 100 + '%');
      rectObjNotSame_a.setAttribute('fill', color3);
      rectObjNotSame_a.setAttribute('stroke', color3);
      rectObjNotSame_a.setAttribute('stroke-width', '0');
      rectObjNotSame_a.setAttribute('fill-opacity', '0.5');
      document.querySelector('svg').appendChild(rectObjNotSame_a);
    }
  }

  // -- 6) 同色交叠 (实色) --
  // rectObj1Array => color2
  for (var i = 0; i < rectObj1Array.length; i++) {
    for (var j = rectObj1Array.length - 1; j >= 0; j--) {
      var rectObjSame = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rectObjSame.setAttribute('height', (rectObj1Array[i][0] / mysvgWidth) * 100 + '%');
      rectObjSame.setAttribute('width', (rectObj1Array[j][0] / mysvgWidth) * 100 + '%');
      rectObjSame.setAttribute('x', (rectObj1Array[j][1] / mysvgWidth) * 100 + '%');
      rectObjSame.setAttribute('y', (rectObj1Array[i][1] / mysvgWidth) * 100 + '%');
      rectObjSame.setAttribute('fill', color2);
      rectObjSame.setAttribute('stroke', color2);
      rectObjSame.setAttribute('stroke-width', '0');
      document.querySelector('svg').appendChild(rectObjSame);
    }
  }
  // rectObj2Array => color3
  for (var i = 0; i < rectObj2Array.length; i++) {
    for (var j = rectObj1Array.length - 1; j >= 0; j--) {
      var rectObjSame2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rectObjSame2.setAttribute('height', (rectObj2Array[i][0] / mysvgWidth) * 100 + '%');
      rectObjSame2.setAttribute('width', (rectObj1Array[j][0] / mysvgWidth) * 100 + '%');
      rectObjSame2.setAttribute('x', (rectObj1Array[j][1] / mysvgWidth) * 100 + '%');
      rectObjSame2.setAttribute('y', (rectObj2Array[i][1] / mysvgWidth) * 100 + '%');
      rectObjSame2.setAttribute('fill', color3);
      rectObjSame2.setAttribute('stroke', color3);
      rectObjSame2.setAttribute('stroke-width', '0');
      document.querySelector('svg').appendChild(rectObjSame2);
    }
  }

  // -- 7) 绘制辅助色 (半透明 横+竖)
  for (var i = 0; i < colorAuxiliary.length; i++) {
    var rectObjAx = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    var temph = Math.ceil(Math.random() * 5);
    var tempy = Math.ceil(Math.random() * mysvgWidth);
    var temptrans = Math.random() / 2;
    rectObjAx.setAttribute('height', (temph / mysvgWidth) * 100 + '%');
    rectObjAx.setAttribute('width', '100%');
    rectObjAx.setAttribute('y', (tempy / mysvgWidth) * 100 + '%');
    rectObjAx.setAttribute('fill', colorAuxiliary[i]);
    rectObjAx.setAttribute('stroke', colorAuxiliary[i]);
    rectObjAx.setAttribute('stroke-width', '0');
    rectObjAx.setAttribute('fill-opacity', temptrans);
    document.querySelector('svg').appendChild(rectObjAx);

    var rectObjAx_a = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectObjAx_a.setAttribute('width', (temph / mysvgWidth) * 100 + '%');
    rectObjAx_a.setAttribute('height', '100%');
    rectObjAx_a.setAttribute('x', (tempy / mysvgWidth) * 100 + '%');
    rectObjAx_a.setAttribute('fill', colorAuxiliary[i]);
    rectObjAx_a.setAttribute('stroke', colorAuxiliary[i]);
    rectObjAx_a.setAttribute('stroke-width', '0');
    rectObjAx_a.setAttribute('fill-opacity', temptrans);
    document.querySelector('svg').appendChild(rectObjAx_a);
  }
}

// 首次加载自动生成
window.onload = onLoad;
