<template>
  <v-container>
    <v-row no-gutters>
      <span id="mousePosition"></span>
    </v-row>
    <div style="height: 400px" id="klu-map-box">
    </div>
    <v-snackbar
        :timeout="timeout"
        v-model="invalidArea"
        color="pink accent-2"
        elevation="24"
        top
    >
        <v-icon class="mr-3">mdi-alert</v-icon>
        <span>Invalid area! Side lines can't cross each other</span>
    </v-snackbar>
  </v-container>
</template>

<script>
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import LineEquation from "./LineEquation";
export default {
  name: "KluMapBox",
  props: {
    geoTolerance: {
      type: Number,
      default: 0.0001
    }
  },
  data() {
    return {
      map: null,
      drawer: null,
      areaCoordinatesCount: 0,
      invalidArea: false,
      timeout: 2000,
    }
  },
  created() {
  },
  mounted() {
    console.log('mounted');
  },
  methods: {
    drawMap() {
      if (this.map === null) {
        this.map = new this.$mapboxgl.Map({
          container: "klu-map-box", // container ID
          style: "mapbox://styles/mapbox/streets-v11", // style URL
          center: [37.64, 55.76], // starting position [lng, lat]
          zoom: 10 // starting zoom
        });
        this.map.addControl(new this.$mapboxgl.FullscreenControl({
          container: document.querySelector('body')
        }));
        this.map.addControl(new this.$mapboxgl.NavigationControl(), 'top-left');
        this.drawer = new MapboxDraw({
          displayControlsDefault: false,
          // Select which mapbox-gl-draw control buttons to add to the map.
          controls: {
            // polygon: true,
            line_string: true,
            trash: true
          },
          // Set mapbox-gl-draw to draw by default.
          // The user does not have to click the polygon control button first.
          defaultMode: 'draw_line_string'
        });
        this.map.on('mousemove', function (e) {
          document.getElementById('mousePosition').innerHTML = JSON.stringify(e.lngLat.wrap());
        });
        this.map.addControl(this.drawer);

        this.map.on('draw.create', this.updateArea);
        this.map.on('draw.update', this.updateArea);
        this.map.on('draw.render', this.validateArea);
      }
      this.map.resize();
    },
    updateArea() {
      let data = this.drawer.getAll();
      // var answer = document.getElementById('calculated-area');
      if (data.features.length > 0) {
        let lastIndex = data.features.length - 1;
        this.$emit('area-created', data.features[lastIndex].geometry.coordinates);
      }
    },
    validateArea() {
      let data = this.drawer.getAll();
      // если ничего не нарисовали, то выходим
      if (data.features.length === 0) {
        return;
      }
      let drawingArea = data.features[data.features.length - 1];
      // Если в нарисованном меньше двух точек, выходим
      if (drawingArea.geometry.coordinates.length < 2) {
        return;
      }
      let coordinates = drawingArea.geometry.coordinates;
      // Если две последние координаты одинаковые, значит ещё рисуем, и надо последнюю отбросить
      let currentCoordinatesCount = this.checkPointsAreEqual(
          coordinates[coordinates.length - 1],
          coordinates[coordinates.length - 2]
      ) ? coordinates.length - 1 : coordinates.length;
      // Начинаем валидировать фигуру только если поставили больше 3 точек
      // и если количество точек с момента последней перерисовки изменилось
      if (
          currentCoordinatesCount > 3 &&
          this.areaCoordinatesCount < drawingArea.geometry.coordinates.length
      ) {
        // получаем уравнение прямой последнего нарисованного отрезка
        let lineEquation = this.findLineEquation(coordinates[currentCoordinatesCount - 1], coordinates[currentCoordinatesCount - 2])
        // надо выяснить, не нарушена ли выпуклость фигуры
        let isAreaConvex = coordinates.reduce((result, coordinate, index) => {
          if (index < currentCoordinatesCount - 3) {
            // получаем уравнение прямой проверяемого на этой итерации отрезка
            let checkingLineEquation = this.findLineEquation(coordinates[index], coordinates[index + 1]);
            // находим точку пересечения прямых
            let intersectionPoint = this.findIntersection(lineEquation, checkingLineEquation);
            //проверим, не принадлежит ли она хотя бы одной уже нарисованной линии (выпуклый многоугольник)
            // return result && !this.checkPointBelongsToSection(intersectionPoint, coordinates[index], coordinates[index + 1]);
            //проверим, не принадлежит ли она текущей рисуемой линии (многоугольник без самопересечений)
            return result && !this.checkPointBelongsToSection(intersectionPoint, coordinates[currentCoordinatesCount - 1], coordinates[currentCoordinatesCount - 2]);
          }
          return result;
        }, true);
        if (!isAreaConvex) {
          // отбрасываем последнюю ЗНАЧИМУЮ точку (если две последние точки одинаковые, то отбросится предпоследняя)
          this.invalidArea = true;
          console.log(isAreaConvex);
        }
      }
      this.areaCoordinatesCount = drawingArea.geometry.coordinates.length;
    },
    findLineEquation(startPoint, endPoint) {
      let x1 = startPoint[0];
      let y1 = startPoint[1];
      let x2 = endPoint[0];
      let y2 = endPoint[1];
      return  new LineEquation(
          (y2 - y1) / (x2 - x1),
          (y1 * x2 - y2 * x1) / (x2 - x1)
      )
    },
    findIntersection(line1, line2) {
      let intersectionPoint = [];
      let xCoord = (line1.getIntercept() - line2.getIntercept()) / (line2.getSlope() - line1.getSlope());
      let yCoord = line1.getSlope() * xCoord + line1.getIntercept();
      intersectionPoint.push(xCoord);
      intersectionPoint.push(yCoord);
      return intersectionPoint;
    },
    // Точка принадлежит отрезку когда её координаты находятся между концами отрезка одновременно
    checkPointBelongsToSection(checkingPoint, startPoint, endPoint) {
      return (checkingPoint[0] - startPoint[0]) * (checkingPoint[0] - endPoint[0]) < 0 &&
          (checkingPoint[1] - startPoint[1]) * (checkingPoint[1] - endPoint[1]) < 0
    },
    checkPointsAreEqual(point1, point2) {
      return (point1[0] - point2[0]) < this.geoTolerance &&
          (point1[1] - point2[1]) < this.geoTolerance;
    }
  }
}
</script>

<style>

</style>