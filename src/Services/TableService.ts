import { Subject } from 'rxjs';

import uuid from '../Helpers/uuid';
import { userType } from '../Types/UserType';
import { tableType } from '../Types/TableType';

const subject = new Subject();
const store:tableType[] = [
    {index: 'master', data: []}
];

export const tableService = {
    submitToTable: (user: userType, tableIndex: string, index: number) => {
        if (index >= 0) {
            store.map((table) => {
                if (table.index === tableIndex) {
                    table.data[index] = user;
                }

                return table;
            });
        } else {
            const foundIndex = store.findIndex((table: tableType) => table.index === tableIndex);
            const tableData = store[foundIndex].data;
            store[foundIndex].data = [...tableData, user];
        }

        subject.next([...store]);
    },
    copyTable: (tableIndex: string) => {
        let foundIndex = store.findIndex((table: tableType) => table.index === tableIndex);
        const tableData = store[foundIndex].data;
        store.splice(++foundIndex, 0, {index: uuid(), data: [...tableData]});
        subject.next([...store]);
    },
    deleteTable: (tableIndex: string) => {
        let foundIndex = store.findIndex((table: tableType) => table.index === tableIndex);
        store.splice(foundIndex, 1);
        subject.next([...store]);
    },
    deleteRow: (tableIndex: string, index: number) => {
        let foundIndex = store.findIndex((table: tableType) => table.index === tableIndex);
        let tableData = store[foundIndex].data;
        tableData.splice(index, 1);
        store[foundIndex].data = [...tableData];
        subject.next([...store]);
    },
    onTableEvent: () => subject.asObservable(),
};