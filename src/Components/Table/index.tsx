import React, { useState, useEffect } from 'react';

import './Table.scss';
import { userType } from '../../Types/UserType';
import {TableProps} from '../../Props/TableProps';
import {formService} from '../../Services/FormService';
import {tableService} from '../../Services/TableService';

const Table = ({ tableIndex, data}: TableProps) => {
    const [tableData, setTableData] = useState<userType[]>([]);

    useEffect(() => {
        setTableData(data);
    }, [data]);

    return (
        <div className="Table">
            <div className="buttons">
                <button className="button-copy" onClick={() => tableService.copyTable(tableIndex)}>Copy table</button>
                {
                    tableIndex !== 'master' &&
                    <span className="button-delete" onClick={() => tableService.deleteTable(tableIndex)}>
                        <img src="btn_delete.svg" alt=""/>
                    </span>
                }
            </div>
            <table>
                <thead className="Table__head">
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Age</th>
                    <th>City</th>
                    <th></th>
                </tr>
                </thead>
                <tbody className="Table__body">
                { tableData.map((user: userType, index: number) => (
                    <tr key={tableIndex + index}>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.age}</td>
                        <td>{user.city}</td>
                        <td className="Table__action">
                            <span className="Table__action--edit"
                                  onClick={() => formService.sendToForm(user, tableIndex, index)}>
                                Edit
                            </span>
                            <span className="Table__action--delete"
                                  onClick={() => tableService.deleteRow(tableIndex, index)}>
                                Delete
                            </span>
                        </td>
                    </tr>
                )) }
                </tbody>
            </table>
        </div>
    );
};

export default Table;
