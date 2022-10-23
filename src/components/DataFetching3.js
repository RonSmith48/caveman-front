import React, { Component } from 'react';
import axios from 'axios';

export default class DataFetching extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      day_mth_dates: [],
      drill_mtrs: []
    };
  }

  getData() {
    axios.get('http://localhost:8000/api/reports/dailyactuals/2021-12-28').then((response) => {
      var data = response.data.pda;
      this.setState({ data: data });
      this.setState({ day_mth_dates: data['day month dates'] });
      this.setState({ drill_mtrs: data.drill_mtrs });
      console.log(data);
    });
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <>
        <div>{this.state.data['next monday']}</div>
      </>
    );
  }
}
