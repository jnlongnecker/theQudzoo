import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./chart.html";
import * as d3 from "d3";
class Chart extends LightningElement {
  constructor(...args) {
    super(...args);
    this.data = [];
    this.cachedContainer = void 0;
  }
  get info() {
    return null;
  }
  set info(value) {
    this.data = value;
  }
  renderedCallback() {
    this.chart();
  }
  chart() {
    if (!this.cachedContainer) this.cachedContainer = this.template.querySelector(".container");
    let container = this.cachedContainer;
    while (container.lastChild) {
      container.removeChild(container.lastChild);
    }

    // Declare the chart dimensions and margins.
    const width = container.getBoundingClientRect().width;
    const height = 600;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 40;

    // Declare the x (horizontal position) scale.
    let x = d3.scaleLinear().domain(this.data.xRange).range([marginLeft, width - marginRight]);

    // Declare the y (vertical position) scale.
    let y = d3.scaleLinear().domain(this.data.yRange).range([height - marginBottom, marginTop]);

    // Create the SVG container.
    let chart = d3.create("svg").attr("width", "100%").attr("height", "100%").attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMinYMin');

    // Add the x-axis.
    chart.append("g").attr("transform", `translate(0, ${height - marginBottom})`).call(d3.axisBottom(x));

    // Add the y-axis.
    chart.append("g").attr("transform", `translate(${marginLeft}, 0)`).call(d3.axisLeft(y));
    const line = d3.line().x(d => x(d.x)).y(d => y(d.y));
    chart.append("path").attr("fill", "none").attr("stroke", this.data.color).attr("stroke-width", 1.5).attr("d", line(this.data.dataArray));

    // Append the SVG element.
    container.append(chart.node());
  }
}
_registerDecorators(Chart, {
  publicProps: {
    info: {
      config: 3
    }
  },
  track: {
    data: 1
  },
  fields: ["cachedContainer"]
});
export default _registerComponent(Chart, {
  tmpl: _tmpl
});