# The Analysis between 2018 Referendum and Mayor Election in Taiwan
Demo Website: http://140.119.162.201:3000/homework/hw3-21/02/

Introduction
----
  >The project is aim to show whether each referendum proposal was impacted by the claims of the political parties. We showed the scale of approval or not with color intensity on the Taiwan map which divide by the districts. Red color was represent that the district was approved the referendum proposal, and purple was otherwise. Moreover, we drawed the ratio of approval or not with doughnut chart, and so did the ratio of mayor election result is. Therefore, we can observe the relationship between the referendum proposal and political parties. Each referendum proposal content is in detail on the right corner area.


Techniques
----
* ### Data
  >The election data was from Central Election Commsion in Taiwan. We formed the data to Json format. The data was set up in Js file with Document belonging to Web API. However, the map data was the topoJson format and set up with topoJson library. 

* ### UI Operation
  >The animation and interaction with the user are mainly used the svg library based on D3 js. The method geoPath(), projection(), and etc., are contributed to map operation. The data is read with the pie form to draw the doughnut chart. To modify the attributes of the object, attr() method is used. To make it animated, transition() is applied.

* ### User Interface
  >The layout is arranged by html. The attributes are designed by css.

Environment
----
  >We didn't set public to this project. Therefore, we accessed to the localhost via Xampp. Then, we made Apache server enable. After moving all the files under the path /xampp/htdoc, the project can be operated on your own pc.

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
  >The project was displayed on our teacher's website. If you wonder the pratical operation in details, you can visit it via above link. 
