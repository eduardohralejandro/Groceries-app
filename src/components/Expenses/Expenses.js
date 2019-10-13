import React, { Fragment, Component } from "react";
import * as d3 from "d3";

import styles from "./expenses.module.scss";

class Expenses extends Component {
   state = {
      charData: [],
      dates: null
   };

   async componentDidMount() {
      const { shoppingLists } = this.props;
      await shoppingLists.map(element => {
         return element.items.map(el => {
            const dataChartValues = { month: el.month, value: el.price };
            return this.setState(prevState => ({ charData: [...prevState.charData, dataChartValues] }));
         });
      });
      this.drawBarChartCompany();
   }

   drawBarChartCompany = () => {
      const { charData } = this.state;

      const dates = [
         { month: "January", value: 0 },
         { month: "February", value: 0 },
         { month: "March", value: 0 },
         { month: "April", value: 0 },
         { month: "May", value: 0 },
         { month: "June", value: 0 },
         { month: "July", value: 0 },
         { month: "August", value: 0 },
         { month: "September", value: 0 },
         { month: "October", value: 0 },
         { month: "November", value: 0 },
         { month: "December", value: 0 }
      ];
      /** add all the values from charData(shoppingLists data)  & assign it to dates array to feed the graph*/
      charData.map(el => {
         return dates.map(element => {
            if (element.month === el.month) {
               const sumValues = [parseInt(el.value) + parseInt(element.value)];
               const sum = sumValues.reduce((a, b) => {
                  return a + b;
               }, 0);
               return (element.value = sum);
            }
            return element;
         });
      });

      /** select div from ref, pass it as argument select from d3 library*/
      const svg = d3.select(this.refs.canvas);
      d3.select("#container");

      const margin = 60;
      const width = 550;
      const height = 200;

      const chart = svg.append("g").attr("transform", `translate(${margin}, ${margin})`);

      const xScale = d3
         .scaleBand()
         .range([0, width])
         .domain(dates.map(element => element.month))
         .padding(0.0);

      const yScale = d3
         .scaleLinear()
         .range([height, 0])
         .domain([0, 1000]);

      chart
         .append("g")
         .attr("transform", `translate(0, ${height})`)
         .call(d3.axisBottom(xScale));

      chart.append("g").call(d3.axisLeft(yScale));

      chart
         .selectAll()
         .data(dates)
         .enter()
         .append("rect")
         .style("fill", "green")
         .attr("x", el => xScale(el.month))
         .attr("y", el => yScale(el.value))
         .attr("height", el => height - yScale(el.value))
         .attr("width", xScale.bandwidth());
   };
   render() {
      return (
         <Fragment>
            <div className={styles.container} id='svgContainer'>
               <svg width='800' height='500' className={styles.svg} ref={"canvas"} />
            </div>
         </Fragment>
      );
   }
}

export default Expenses;