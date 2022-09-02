import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { getExpenseDatalimit } from '../services/expense.service';
import { Divider } from 'primereact/divider';
import { useNavigate } from "react-router-dom";


const DashBoardExpenseList = (props) => {
  let navigate = useNavigate();
  const [expenseTableData, setExpenseTableData] = useState([]);
  const getData = async () => {
    const response = await getExpenseDatalimit(10, props.authHandler.token);
    const data = []
    response.expenseslist.forEach((expense,index) => {
      const date = new Date (expense.expenditureDate)
      const dateString = `${date.getDate()+1}-${date.getMonth()+1}-${date.getUTCFullYear()}`
      const format = {
        index:index+1,
        name:expense.name,
        desc:expense.desc,
        category:expense.ExpenseType,
        expenditureDate:dateString,
        amount:expense.amount,
      }
      data.push(format)

    });
    setExpenseTableData([...data])
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className="col-12 md:col-12 lg:col-6">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
          <div className='my-2'>
            <span className='text-xl'>Expenses</span>
          </div>
          <Divider />

          <DataTable value={expenseTableData} removableSort responsiveLayout="scroll">
            <Column field="index" header="Index"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="desc" header="Expense Description"></Column>
            <Column field="category" header="Category" sortable></Column>
            <Column field="expenditureDate" header="Expenditure Date" sortable></Column>
            <Column field="amount" header="Amount" sortable></Column>
          </DataTable>
          <div className='flex justify-content-center mt-3' >
            <Button onClick={()=>{navigate("/");}} icon='pi pi-external-link' label='View All Expenses' className='p-button-raised'></Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashBoardExpenseList;