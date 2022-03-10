console.log('svg');

// metadata
const width = window.innerWidth, height = window.innerHeight;

// elements
const svg = d3.select('svg');
const zoom = d3
  .zoom()
  .scaleExtent([0.6, 10])
  .on('zoom', () => {
    svg
      .selectAll('path')
      .attr('transform', d3.event.transform);
  });

const path = d3
  .geoPath()
  .projection(
    d3
      .geoMercator()
      .center([120.97388, 23.6])
      .scale(width * 5.5)
      .translate([width / 2, height / 2])
      .precision(0.1)
  );


var nowValue = [{
          title: "同意",
          value: 101149,
          all: 129812
      },
      {
          title: "不同意",
          value: 28663,
          all: 129812
      }
];
var nowValueMajor = [{
          title: "國民黨",
          value: 61546,
          all:  150070
      },
      {
          title: "民進黨",
          value: 21747,
          all: 150070
      },
      {
          title: "其他",
          value: 66777,
          all: 150070
      }
];
// data
const regionMap = 'data/town_1090324.json';
const townVote = 'data/townvotecity.json';
const case7 = 'data/case_7.json';
const case8 = 'data/case_8.json';
const case9 = 'data/case_9.json';
const case10 = 'data/case_10.json';
const case11 = 'data/case_11.json';
const case12 = 'data/case_12.json';
const case13 = 'data/case_13.json';
const case14 = 'data/case_14.json';
const case15 = 'data/case_15.json';
const case16 = 'data/case_16.json';
const caseDiscript = 'data/Referendum_detail.json';
const caseRate = 'data/pass_rate_file.json';

svg.call(zoom);

var nowVoteData = 2;
var nowVoteStandard = 0;


var passGroup = ['同意','不同意'];
var voteGroup = ['國民黨', '民進黨', '其他'];

var donut_width_Div = 175;
var donut_height_Div = 175;
var radius = Math.min(donut_width_Div, donut_height_Div) / 2;
var donutWidth = 41;
var colorDonut = d3.scaleOrdinal().domain(passGroup).range(["#9F353A", "#4A225D"]);
var colorDonutMajor = d3.scaleOrdinal().domain(voteGroup).range(['#0B346E', '#1B813E', '#91989F']);

var svgDonut = d3.select('#donut')
    .append('svg')
    .attr('width', donut_width_Div)
    .attr('height', donut_height_Div)
    .append('g')
    .attr('transform', 'translate(' + (donut_width_Div / 2 + 20) +
        ',' + (donut_height_Div / 2  ) + ')');
var svgDonutMajor = d3.select('#donutMajor')
    .append('svg')
    .attr('width', donut_width_Div)
    .attr('height', donut_height_Div)
    .append('g')
    .attr('transform', 'translate(' + (donut_width_Div / 2 + 20) +
          ',' + (donut_height_Div / 2 ) + ')');

var arc = d3.arc()
    .innerRadius(radius - donutWidth)
    .outerRadius(radius);

var pie = d3.pie()
    .value(function (d) {
        return d.value;
    })
    .sort(null);

var legendRectSize = 14;
var legendSpacing = 8;

var donutTip = d3.select("body").append("div")
      .attr("class", "donut-tip")
      .style("opacity", 0);

var donutTipMajor = d3.select("body").append("div")
      .attr("class", "donut-tip")
      .style("opacity", 0);

var pathDonut = svgDonut.selectAll('path')
        .data(pie(nowValue))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) {
            return colorDonut(d.data.title);
        })
      .attr('transform', 'translate(0, 0)')
      .on('mouseover', function (d, i) {
          d3.select(this).transition()
              .duration('50')
              .attr('opacity', '.85');
          donutTip.transition()
              .duration(50)
              .style("opacity", 1);
          let num = (Math.round((d.value / d.data.all) * 100)).toString() + '%';
          donutTip.html(num)
              .style("left", (d3.event.pageX + 10) + "px")
              .style("top", (d3.event.pageY - 15) + "px");
      })
      .on('mouseout', function (d, i) {
          d3.select(this).transition()
              .duration('50')
              .attr('opacity', '1');
          donutTip.transition()
              .duration('50')
              .style("opacity", 0);
      });


var pathDonutMajor = svgDonutMajor.selectAll('path')
        .data(pie(nowValueMajor))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) {
            return colorDonutMajor(d.data.title);
        })
        .attr('transform', 'translate(0, 0)')
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '.85');
            donutTipMajor.transition()
                .duration(50)
                .style("opacity", 1);
            let num = (Math.round((d.value / d.data.all) * 100)).toString() + '%';
                donutTipMajor.html(num)
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 15) + "px");
            })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1');
            donutTipMajor.transition()
                .duration('50')
                .style("opacity", 0);
        });
var legend = svgDonut.selectAll('.legend')
      .data(colorDonut.domain())
      .enter()
      .append('g')
      .attr('class', 'circle-legend')
      .attr('transform', function (d, i) {
          var height = legendRectSize + legendSpacing;
          var offset = height * colorDonut.domain().length / 2;
          var horz = -2 * legendRectSize - 13;
          var vert = i * height - offset;
          return 'translate(' + horz + ',' + vert + ')';
      });

var legendMajor = svgDonutMajor.selectAll('.legend')
      .data(colorDonutMajor.domain())
      .enter()
      .append('g')
      .attr('class', 'circle-legend')
      .attr('transform', function (d, i) {
          var height = legendRectSize + legendSpacing;
          var offset = height * colorDonutMajor.domain().length / 2;
          var horz = -2 * legendRectSize - 13;
          var vert = i * height - offset;
          return 'translate(' + horz + ',' + vert + ')';
        });

legend.append('circle')
      .style('fill', colorDonut)
      .style('stroke', colorDonut)
      .attr('cx', 15)
      .attr('cy', 8)
      .attr('r', '.5rem');

legend.append('text')
      .style('fill', '#373C38')
      .attr('x', legendRectSize + legendSpacing + 8)
      .attr('y', legendRectSize - legendSpacing + 8)
      .text(function (d) {
          return d;
      });

legendMajor.append('circle')
      .style('fill', colorDonutMajor)
      .style('stroke', colorDonutMajor)
      .attr('cx', 15)
      .attr('cy', 13)
      .attr('r', '.5rem');

legendMajor.append('text')
      .style('fill', '#373C38')
      .attr('x', legendRectSize + legendSpacing + 6)
      .attr('y', legendRectSize - legendSpacing + 13)
      .text(function (d) {
            return d;
      });

function change(data) {
      var pie = d3.pie()
          .value(function (d) {
              return d.value;
          }).sort(null)(data);
      var donut_width_Div = 175;
      var donut_height_Div = 175;
      var radius = Math.min(donut_width_Div, donut_height_Div) / 2;
      var donutWidth = 41;

      pathDonut = d3.select("#donut")
          .selectAll("path")
          .data(pie); // Compute the new angles
      var arc = d3.arc()
          .innerRadius(radius - donutWidth)
          .outerRadius(radius);
      pathDonut.attr("d", arc); // redrawing the path with a smooth transition
  };
function changeMajor(data) {
    var pie = d3.pie()
        .value(function (d) {
            return d.value;
        }).sort(null)(data);
    var donut_width_Div = 175;
    var donut_height_Div = 175;
    var radius = Math.min(donut_width_Div, donut_height_Div) / 2;
    var donutWidth = 41;

    pathDonutMajor = d3.select("#donutMajor")
            .selectAll("path")
            .data(pie); // Compute the new angles
    var arc = d3.arc()
            .innerRadius(radius - donutWidth)
            .outerRadius(radius);
    pathDonutMajor.attr("d", arc); // redrawing the path with a smooth transition
};


// draw map
Promise.all([regionMap, townVote, case7, case8, case9, case10, case11, case12, case13, case14, case15, case16, caseDiscript, caseRate].map(f => d3.json(f))).then(values => {
  document
    .querySelectorAll('.tab-controls__link')
    .forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tabs = document.querySelectorAll('.tab-controls__link');
        tabs.forEach(tab => tab.classList.remove('active'));
        e.target.classList.toggle('active');
        updateMap(e.target.dataset.index);
      });
    });

  const getColor = votes => {
    var majorColorList = ['#0B346E', '#1B813E', '#91989F'];
    var rlt = '#FFFFFF';

    switch (Math.max(...votes)) {
      case votes[0]:
        rlt = majorColorList[0];
        break;
      case votes[1]:
        rlt = majorColorList[1];
        break;
      case votes[2]:
        rlt = majorColorList[2];
        break;
    }
    return rlt;
  };

const getCaseColor = (votes, caseNum) => {
    var caseColorList = ['#9F353A', '#D75455','#77428D', '#4A225D'];
    var rlt = '#FFFFFF';
    const voted_rate = votes[0] / (votes[0] + votes[1]); //voted_rate是現在的
    if(values[13][caseNum].pass_rate >= 0.5){ //這案Pass的
  		if (voted_rate >= values[13][caseNum].pass_rate){ //values[13][caseNum].pass_rate是該案的平均
  			rlt = caseColorList[0];
  		}else if (voted_rate >= 0.5 && voted_rate < values[13][caseNum].pass_rate){
  			rlt = caseColorList[1];
  		}else if (voted_rate < 0.5 && voted_rate > (1 - values[13][caseNum].pass_rate)){ // >不通過率
  			rlt = caseColorList[2];
  		}else{
  			rlt = caseColorList[3];
  		}
    }else { //這案not pass的 pass_rate<0.5 //0.2
  		if (voted_rate < values[13][caseNum].pass_rate){ //>=通過率
  			rlt = caseColorList[3];
  		}else if ((voted_rate < 0.5) && (voted_rate >= values[13][caseNum].pass_rate)){ //
  			rlt = caseColorList[2];
  		}else if ((voted_rate > 0.5) && (voted_rate <= (1 - values[13][caseNum].pass_rate)) ){
  			rlt = caseColorList[1];
  		}else{
  			rlt = caseColorList[0];
  		}
    }
    return rlt;
  };


  const getCaseVote = (townCode, caseNum) => {
    rlt = []
    values[caseNum].forEach((town) => {
      if (town.Code == townCode) {
        rlt = town
      }
    });
    return rlt
  };

  const getTownVote = townCode => {
    rlt = []
    values[1].forEach((town) => {
      if (town.Code == townCode) {
        rlt = town
      }
    });
    return rlt
  };
  var div = d3.select("body").append("div")
              .attr("class", "tooltip")
              .style("opacity", 0);

  const regionTopo = topojson.feature(values[0], values[0].objects.TOWN_MOI_1090324);

  updateMap(0);

  function updateMap(index) {
    if (index < 10){
      nowVoteData = Number(index) + 2;
      nowVoteStandard = index
      // document.write(nowVoteData);
    }
    svg.selectAll('path').remove()
    if (index < 10) {
      svg.selectAll('path')
        .data(regionTopo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('id', d => `r-${d.properties.TOWNCODE}`)
        .attr('class', 'map-region')
        .attr('fill', d => {
          const voteData = getCaseVote(d.properties.TOWNCODE, nowVoteData);
          return getCaseColor([voteData.Pass, voteData.Not_pass], nowVoteStandard);
        })
        .on('mouseover', d => {
          const voteData = getCaseVote(d.properties.TOWNCODE, nowVoteData);
          const voteDataMajor = getTownVote(d.properties.TOWNCODE);
          nowValue = [{
                    title: "同意",
                    value: voteData.Pass,
                    all:  voteData.Pass + voteData.Not_pass
                },
                {
                    title: "不同意",
                    value: voteData.Not_pass,
                    all: voteData.Pass + voteData.Not_pass
                }
          ];
          change(nowValue);
          nowValueMajor = [{
                    title: "國民黨",
                    value: voteDataMajor.Candidate_1,
                    all:  voteDataMajor.Candidate_1 + voteDataMajor.Candidate_2
                },
                {
                    title: "民進黨",
                    value: voteDataMajor.Candidate_2,
                    all: voteDataMajor.Candidate_1 + voteDataMajor.Candidate_2
                },
                {
                    title: "其他",
                    value: voteDataMajor.Candidate_3,
                    all: voteDataMajor.Candidate_1 + voteDataMajor.Candidate_2 + voteDataMajor.Candidate_3
                }
          ];
          changeMajor(nowValueMajor)

          div.transition()
             .duration(200)
             .style("opacity", .9);
          div.html(`${d.properties.COUNTYNAME} ${d.properties.TOWNNAME}<br>
                      同意票數 ${voteData.Pass}  票<br>
                      不同意票數 ${voteData.Not_pass} 票<br>`)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 100) + "px");

          d3.select('#case-region')
            .text(`${d.properties.COUNTYNAME} ${d.properties.TOWNNAME}`);
          d3.select('#vote-region')
            .text(`${d.properties.COUNTYNAME} ${d.properties.TOWNNAME}`);
          d3.select('#vote-pass')
              .text(((voteData.Pass/(voteData.Pass+voteData.Not_pass))*100).toFixed(2)+ '%');
          d3.select('#vote-pass')
            .text(((voteData.Pass/(voteData.Pass+voteData.Not_pass))*100).toFixed(2)+ '%');
          d3.select('#vote-notpass')
            .text(((voteData.Not_pass/(voteData.Pass+voteData.Not_pass))*100).toFixed(2) + '%');
          d3.select('#vote-region')
            .text(`${d.properties.COUNTYNAME} ${d.properties.TOWNNAME}`);
          d3.select('#vote-count-1')
            .text(((voteDataMajor.Candidate_1/(voteDataMajor.Candidate_1 + voteDataMajor.Candidate_2 + voteDataMajor.Candidate_3))*100).toFixed(2) + '%');
          d3.select('#vote-count-2')
            .text(((voteDataMajor.Candidate_2/(voteDataMajor.Candidate_1 + voteDataMajor.Candidate_2 + voteDataMajor.Candidate_3))*100).toFixed(2) + '%');
          d3.select('#vote-count-3')
            .text(((voteDataMajor.Candidate_3/(voteDataMajor.Candidate_1 + voteDataMajor.Candidate_2 + voteDataMajor.Candidate_3))*100).toFixed(2) + '%');
        })
        .on("mouseout", function(d) {
            div.transition()
               .duration(500)
               .style("opacity", 0);
        });
    } else {
          svg.selectAll('path')
            .data(regionTopo.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('id', d => `t-${d.properties.TOWNCODE}`)
            .attr('class', 'map-region')
            .attr('fill', d => {
              const voteData = getTownVote(d.properties.TOWNCODE);
              return getColor([voteData.Candidate_1, voteData.Candidate_2, voteData.Candidate_3]);
            })
            .on('mouseover', d => {
              const voteData = getTownVote(d.properties.TOWNCODE);
              nowValueMajor = [{
                        title: "國民黨",
                        value: voteData.Candidate_1,
                        all:  voteData.Candidate_1 + voteData.Candidate_2
                    },
                    {
                        title: "民進黨",
                        value: voteData.Candidate_2,
                        all: voteData.Candidate_1 + voteData.Candidate_2
                    },
                    {
                        title: "其他",
                        value: voteData.Candidate_3,
                        all: voteData.Candidate_1 + voteData.Candidate_2 + voteData.Candidate_3
                    }
              ];
              changeMajor(nowValueMajor)
              div.transition()
                 .duration(200)
                 .style("opacity", .9);
              div.html(`${d.properties.COUNTYNAME} ${d.properties.TOWNNAME}<br>
                          國民黨 ${voteData.Candidate_1}  票<br>
                          民進黨 ${voteData.Candidate_2}  票<br>
                          其  他 ${voteData.Candidate_3}  票`)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 100) + "px");

              d3.select('#vote-region')
                .text(`${d.properties.COUNTYNAME} ${d.properties.TOWNNAME}`);
              d3.select('#vote-count-1')
                .text(((voteData.Candidate_1/(voteData.Candidate_1 + voteData.Candidate_2 + voteData.Candidate_3))*100).toFixed(2) + '%');
              d3.select('#vote-count-2')
                .text(((voteData.Candidate_2/(voteData.Candidate_1 + voteData.Candidate_2 + voteData.Candidate_3))*100).toFixed(2) + '%');
              d3.select('#vote-count-3')
                .text(((voteData.Candidate_3/(voteData.Candidate_1 + voteData.Candidate_2 + voteData.Candidate_3))*100).toFixed(2) + '%');
            }).on("mouseout", function(d) {
                div.transition()
                   .duration(500)
                   .style("opacity", 0);
            });
        }
        d3.select('#vote-String')
            .text(values[13][nowVoteStandard].case_num + '同意率');
        d3.select('#vote-total-pass')
          .text(((values[13][nowVoteStandard].pass_rate)*100).toFixed(2) +  '%');
        d3.select('#case-num')
          .text(values[12][index].case_num);
        d3.select('#case-question')
          .text(values[12][index].case_question);
        d3.select('#case-analysis')
          .text(values[12][index].case_analysis);
        if (values[13][nowVoteStandard].pass_rate >= 0.5){
          d3.select('#passCase')
            .text(">" + ((values[13][nowVoteStandard].pass_rate)*100).toFixed(0) +  '%');
          d3.select('#notpassCase')
            .text("<" + ((1 - (values[13][nowVoteStandard].pass_rate))*100).toFixed(0) +  '%');
        }else{
          d3.select('#notpassCase')
            .text("<" + ((values[13][nowVoteStandard].pass_rate)*100).toFixed(0) +  '%');
          d3.select('#passCase')
            .text(">" + ((1 - (values[13][nowVoteStandard].pass_rate))*100).toFixed(0) +  '%');
        }


        svg.append('path')
          .datum(regionTopo)
          .attr('d', path)
          .attr('class', 'map-county-boundary')
          .attr('id', d => {
          console.log(d);
          return `r-${d.properties.TOWNID}`
        });
  }
});
