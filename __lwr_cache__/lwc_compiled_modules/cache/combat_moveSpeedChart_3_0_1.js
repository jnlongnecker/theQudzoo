import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./moveSpeedChart.html";
class MoveSpeedChart extends LightningElement {
  constructor() {
    super();
    this.data = void 0;
    let dataArray = [];
    for (let i = -50; i <= 1500; i += 10) {
      dataArray.push({
        x: 100 + i,
        y: this.calculatePoints(this.calculateEfficiency(100 - i))
      });
    }
    this.data = {
      dataArray,
      xRange: [0, 1600],
      yRange: [2000, 50],
      color: "white"
    };
  }
  calculateEfficiency(val) {
    return 100 - Math.floor(100 / ((100 - val) / 100 + 1));
  }
  calculatePoints(val) {
    return 1000 * (100 - val) / 100;
  }
}
_registerDecorators(MoveSpeedChart, {
  track: {
    data: 1
  }
});
export default _registerComponent(MoveSpeedChart, {
  tmpl: _tmpl
});