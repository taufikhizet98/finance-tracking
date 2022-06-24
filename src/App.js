// gatau muncul
// import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import { useState, useEffect } from "react";

import Form from "./components/Form";
import List from "./components/List";

const App = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  const getDataFromAirtable = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer keyUkyfkoUgbdNccs",
        },
      };

      setLoading(true);
      const response = await axios(
        "https://api.airtable.com/v0/appw4PrQ0YBTa1uaV/Table%201?maxRecords=100&view=Grid%20view",
        config
      );

      const newData = response.data.records.map((item) => ({
        id: item.id,
        name: item.fields.name,
        description: item.fields.description,
        nominal: item.fields.nominal,
        type: item.fields.type,
      }));

      setData(newData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataFromAirtable();
  }, []);

  const addData = async (newData) => {
    try {
      const sendData = JSON.stringify({
        records: [
          {
            fields: newData,
          },
        ],
      });
      const config = {
        headers: {
          Authorization: "Bearer keyUkyfkoUgbdNccs",
          "Content-Type": "application/json",
        },
      };

      setPostLoading(true);
      const response = await axios.post(
        "https://api.airtable.com/v0/appw4PrQ0YBTa1uaV/Table%201",
        sendData,
        config
      );
      const responseData = response.data.records[0];
      const fixData = {
        id: responseData.id,
        name: responseData.fields.name,
        description: responseData.fields.description,
        nominal: responseData.fields.nominal,
        type: responseData.fields.type,
      };
      setData([...data, fixData]);
    } catch (error) {
      console.log(error);
    } finally {
      setPostLoading(false);
    }
  };

  const removeData = async (id) => {
    try {
      const axiosParams = {
        method: "delete",
        url: `https://api.airtable.com/v0/appw4PrQ0YBTa1uaV/Table%201/${id}`,
        headers: {
          Authorization: "Bearer keyUkyfkoUgbdNccs",
          "content-type": "application/json",
        },
      };

      setLoading(true);

      await axios(axiosParams);

      const newData = data.filter((item) => item.id !== id);

      setData(newData);
      alert("menghapus data?");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container text-white">
      <div className="row mt-3">
        <h1 className="text-center mb-3">Aplikasi Tracking Keuangan</h1>
        <List
          data={data}
          type="income"
          bg="primary"
          removeData={removeData}
          loading={loading}
        />
        <Form addData={addData} postLoading={postLoading} />
        <List
          data={data}
          type="expense"
          bg="danger"
          removeData={removeData}
          loading={loading}
        ></List>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default App;
