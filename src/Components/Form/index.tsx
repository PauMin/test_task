import React, { useState, useLayoutEffect  } from 'react';

import './Form.scss';
import Input from '../Input';
import { userType } from '../../Types/UserType';
import {formService} from '../../Services/FormService';
import {tableService} from '../../Services/TableService';

type fromTableType = {
    tableIndex: string,
    index: number
};

const Form = () => {
    const initialState = {
        name: '',
        surname: '',
        age: '',
        city: '',
    };
    const fromTableInitial = {
        tableIndex: 'master',
        index: -1,
    };

    const [formData, setFormData] = useState<userType>(initialState);
    const [fromTable, setFromTable] = useState<fromTableType>(fromTableInitial);

    useLayoutEffect(() => {
        const subscription = formService.getForForm().subscribe((data) => {
            //@ts-ignore
            const {user, tableIndex, index} = data;
            setFormData(user);
            setFromTable({ tableIndex, index });
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleDataSubmit = () => {
        tableService.submitToTable(formData, fromTable.tableIndex, fromTable.index);
        setFormData(initialState);
        setFromTable(fromTableInitial);
    };

    return (
        <div className="TableForm">
            <Input type="text"
                   placeholder="Name"
                   value={formData.name}
                   className="TableForm__input"
                   onChange={name => setFormData({...formData, name})}/>
            <Input type="text"
                   placeholder="Surname"
                   value={formData.surname}
                   className="TableForm__input"
                   onChange={surname => setFormData({...formData, surname})}/>
            <Input type="text"
                   placeholder="Age"
                   value={formData.age}
                   className="TableForm__input"
                   onChange={age => setFormData({...formData, age})}/>
            <Input type="text"
                   placeholder="City"
                   value={formData.city}
                   className="TableForm__input"
                   onChange={city => setFormData({...formData, city})}/>
            <button className="TableForm__button" onClick={() => handleDataSubmit()}>
                { fromTable.index >= 0 ? 'Edit' : 'Add' }
            </button>
        </div>
    )
};

export default Form;
