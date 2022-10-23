import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataFetching() {
  const [pda, setPda] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get('http://localhost:8000/api/reports/dailyactuals/2021-12-28')
        .then((response) => {
          setPda(response.data.pda);
        })
        .catch((err) => {
          console.log(err);
        });

      setLoading(false);
    };
    fetchData();
  }, []);

  //const drillslist = Object.keys(pda.drill_mtrs).map((drill) => <li key={drill}>{drill}</li>);

  //const drillvals = Object.values(pda.drill_mtrs);
  console.log(pda);

  //console.log(Object.keys(pda.drill_mtrs));
  //console.log(pda['last monday']);

  return (
    <div>
      {loading && <div>Loading</div>}
      {!loading && (
        <ul>
          {/* {drillslist} */}
          <li>test</li>
          <li>testing</li>
          <li></li>
        </ul>
      )}
    </div>
  );
}

export default DataFetching;
