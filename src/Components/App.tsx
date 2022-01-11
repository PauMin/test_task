import React, {useEffect, useState} from 'react';
import './App.scss';
import Form from "./Form";
import {tableType} from "../Types/TableType";
import Table from "./Table";
import {tableService} from "../Services/TableService";

function App() {
  const [tables, setTables] = useState<tableType[]>([]);

  useEffect(() => {
    const subscriber = tableService.onTableEvent().subscribe((store) => {
      //@ts-ignore
      setTables(store);
    });

    return subscriber.unsubscribe;
  }, []);

  return (
    <div className="App">
      <Form/>
      {
        tables.map(
            ({index, data}) =>
                <Table key={index} data={data} tableIndex={index}/>
        )
      }
    </div>
  );
}

export default App;
