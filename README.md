# The Analysis between 2018 Referendum and Mayor Election in Taiwan
Demo Website: http://140.119.162.201:3000/homework/hw3-21/02/

Introduction
----
  >The project is aim to analyze whether each referendum proposal is impacted by the claims of the political parties. We show the scale of approval or not with color intensity on the Taiwan map which is divided by the districts. Red color is presented that the district is approved the referendum proposal, and purple is not. Moreover, we display the ratio of approval or not in each region with doughnut chart, and so does the ratio of mayor election result. Therefore, we can simply figure out the relationship between the referendum proposal and political parties with two doughnut chart. Each referendum proposal content is written in details on the right corner area.


Techniques
----
* ### Data
  >The election data is from Central Election Commission in Taiwan. We formed the data to Json format. The data was set in Javascript files with Document method belonging to Web API. The map data is the topoJson format and set with topoJson library.

* ### UI Operation
  >The animation and interaction with the user are mainly applied the svg library based on D3 js. The method geoPath(), projection(), and etc., support to the map operation. The data converts to the pie form to draw the doughnut chart. To modify the attributes of the object, attr() method is used. To animate it, transition() method is applied.

* ### User Interface
  >The layout is arranged by HTML. The attributes are designed by CSS.

Environment
----
  >We didn't set public for this project. Therefore, we accessed to the localhost via Xampp. Then, we made Apache server enable. After moving all the files to the path /xampp/htdoc, the project can be implemented on your own PC.

Reference
----
* ### TopoJson
  >https://gist.github.com/PM25/2674f28945c36a394aa4d4c9e410485a
* ### 天下雜誌2018台灣選舉地圖製作分享：技術的部分
  >https://medium.com/@imandylin2_38094/%E5%A4%A9%E4%B8%8B%E9%9B%9C%E8%AA%8C2018%E5%8F%B0%E7%81%A3%E9%81%B8%E8%88%89%E5%9C%B0%E5%9C%96%E8%A3%BD%E4%BD%9C%E5%88%86%E4%BA%AB-%E6%8A%80%E8%A1%93%E7%9A%84%E9%83%A8%E5%88%86-de82c38da77b
* ### Making an animated donut chart with d3.js
  >https://medium.com/@kj_schmidt/making-an-animated-donut-chart-with-d3-js-17751fde4679

Supplement
----
  >The project is displayed on our teacher's website. If you want to understand our systems work in details, you can manipulate our system via above link.
