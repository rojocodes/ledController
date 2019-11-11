var colorPicker = new iro.ColorPicker("#demoWheel", {
  width: 290,
  height: 360,
  handleRadius: 8,
  handleUrl: null,
  // handleUrl: "#test",
  handleOrigin: {
    y: 0,
    x: 0
  },
  color: "#f00",
  borderWidth: 2,
  padding: 8,
  wheelLightness: true,
  wheelAngle: 270,
  wheelDirection: 'anticlockwise',
  layout: [{
      component: iro.ui.Wheel,
      options: {}
    },
    {
      component: iro.ui.Slider,
      options: {}
    },
    {
      component: iro.ui.Slider,
      options: {
        sliderType: 'hue'
      }
    },
    {
      component: iro.ui.Slider,
      options: {
        sliderType: 'saturation'
      }
    }
  ]
});

colorPicker.on('mount', function () {
  //console.log('mount')
});


colorPicker.on('input:change', function (color) {
  // var rgb = convetoToRGB(color.hsv);
  // console.log(rgb);
  // sendRGB(rgb.r, rgb.g, rgb.b);
})


colorPicker.on('input:end', function (color) {
  console.log('color:change', color);
  var rgb = convetoToRGB(color.hsv);
  console.log(rgb);
  sendRGB(rgb.r, rgb.g, rgb.b);
})

colorPicker.on(['color:init', 'color:change'], function () {
  //console.log('color:change or color:init');
})


function convetoToRGB(hsv) {
  const h = hsv.h / 60;
  const s = hsv.s / 100;
  const v = hsv.v / 100;
  const i = Math.floor(h);
  const f = h - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  const mod = i % 6;
  const r = [v, q, p, p, t, v][mod];
  const g = [t, v, v, q, p, p][mod];
  const b = [p, p, t, v, v, q][mod];
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}