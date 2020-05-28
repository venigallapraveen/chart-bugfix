import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { isEqual } from "lodash";
import { genData } from "./util";

am4core.useTheme(am4themes_animated);

export default class index extends Component {
  componentDidMount() {
    let chart = am4core.create(this.props.name, am4charts.XYChart);
    chart.colors.list = [
      am4core.color("#3c70a4"),
      am4core.color("#ff6f5e"),
      am4core.color("#FFC75F"),
    ];
    chart.dateFormatter.dateFormat = "yyyy-MM-dd";
    chart.dateFormatter.utc = true;
    chart.paddingRight = 20;

    let data = genData() || [];

    chart.data = data;
    chart.legend = new am4charts.Legend();
    chart.legend.labels.template.fill = am4core.color("#FFFFFF");
    chart.legend.labels.template.propertyFields.fill = "stroke";
    chart.legend.position = "top";
    chart.legend.itemContainers.template.paddingTop = 5;
    chart.legend.itemContainers.template.paddingBottom = 5;
    chart.legend.fontSize = 15;
    chart.legend.marginBottom = 25;

    let marker = chart.legend.markers.template.children.getIndex(0);
    marker.cornerRadius(12, 12, 12, 12);
    marker.strokeWidth = 5;

    let markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 10;
    markerTemplate.height = 10;
    chart.legend.labels.template.maxWidth = 500;
    chart.legend.labels.template.truncate = true;
    chart.legend.maxWidth = 1000;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.labels.template.fill = am4core.color("#FFFFFF");
    dateAxis.title.text = "Time (UTC)";
    dateAxis.title.fill = am4core.color("#FFFFFF");
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.fontSize = 15;
    dateAxis.dateFormats.setKey("day", "yyyy-MM-dd");
    dateAxis.periodChangeDateFormats.setKey("day", "yyyy-MM-dd");
    dateAxis.skipEmptyPeriods = false;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fill = am4core.color("#FFFFFF");
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.title.text = "Value";
    valueAxis.fontSize = 15;
    valueAxis.title.fill = am4core.color("#FFFFFF");
    valueAxis.min = 0;
    let series = chart.series.push(new am4charts.ColumnSeries());

    series.name = "Series1";
    series.tooltipText = `{name}: [bold]{valueY.value}[/]
    Time (UTC): {dateX.formatDate('yyyy-MM-dd HH:mm:ss')}[/]`;
    series.dataFields.dateX = "timestamp";
    series.dataFields.valueY = "series1";
    series.stroke = am4core.color("#3c70a4");
    series.color = am4core.color("#3c70a4");

    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.name = `Series2`;
    series1.tooltipText = `{name}: [bold]{valueY.value}[/]
    Time (UTC): {dateX.formatDate('yyyy-MM-dd HH:mm:ss')}[/]`;
    series1.dataFields.dateX = "timestamp";
    series1.dataFields.valueY = "series2";
    series1.stroke = am4core.color("#ff6f5e");
    series1.color = am4core.color("#ff6f5e");

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.name = "Series3";
    series2.tooltipText = `{name}: [bold]{valueY.value}[/]
    Time (UTC): {dateX.formatDate('yyyy-MM-dd HH:mm:ss')}[/]`;
    series2.dataFields.dateX = "timestamp";
    series2.dataFields.valueY = "series3";
    series2.tooltip.getFillFromObject = false;
    series2.tooltip.background.fill = am4core.color("#FFC75F");
    series2.tooltip.label.fill = am4core.color("#000");
    series2.stroke = am4core.color("#FFC75F");
    series2.strokeWidth = 2;

    chart.cursor = new am4charts.XYCursor();
    chart.events.on("hit", () => {
      for (const series of chart.series) {
        if (this.props.isTooltipActive) {
          series.cursorTooltipEnabled = true;
        } else {
          series.cursorTooltipEnabled = false;
        }
      }
    });
    this.chart = chart;
  }

  componentDidUpdate(oldProps) {
    if (!isEqual(oldProps.isTooltipActive, this.props.isTooltipActive)) {
      for (const series of this.chart.series) {
        if (this.props.isTooltipActive) {
          series.cursorTooltipEnabled = true;
        } else {
          series.cursorTooltipEnabled = false;
        }
      }
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <>
        <div
          id={this.props.name}
          style={{ width: "100%", height: "500px" }}
        ></div>
      </>
    );
  }
}
