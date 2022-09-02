import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useRecoilValue } from 'recoil';
import { authStatus } from '../store/authstore';
import { getAllExpenses } from '../services/expense.service'
import DialogEditExpense from './detail.dialog.editexpense';



const DetailExpense = (props) => {
    const cols = [
        { field: 'index', header: 'Index' },
        { field: 'name', header: 'Name' },
        { field: 'desc', header: 'Expense Description' },
        { field: 'category', header: 'Category' },
        { field: 'expenditureDate', header: 'Expenditure Date' },
        { field: 'amount', header: 'Amount' },
    ];
    const [expenses, setExpenses] = useState([]);
    const [editExpenseDialog, setEditExpenseDialog] = useState(false);
    const [position, setPosition] = useState('center');
    const [expenseData,setExpenseData] = useState({
        expenditureDate: "",
        amount: 0,
        name: "",
        desc: "",
        category:{name:""},
    })
    const dialogFuncMap = {
        'editExpenseDialog': setEditExpenseDialog,
    }
    const onClick = (name, position,rowData) => {
        dialogFuncMap[`${name}`](true);
        if (position) {
            setPosition(position);
        }
        setExpenseData(rowData)
    }
    const dt = useRef(null);
    const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));
    const exportPdf = () => {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(exportColumns, expenses);
                doc.save('expenses.pdf');
            })
        })
    }
    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(expenses);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, 'expenses');
        });
    }
    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then(module => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });
                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    }
    const header = (
        <div className="flex align-items-center export-buttons">
            <Button type="button" icon="pi pi-file-excel" onClick={exportExcel} className="p-button-success mr-2" data-pr-tooltip="XLS" />
            <Button type="button" icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning mr-2" data-pr-tooltip="PDF" />
        </div>
    );
    const getData = async () => {
        const response = await getAllExpenses(props.authHandler.token)
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
        setExpenses([...data])
    }
    const deleteExpense = async (rowData) =>{
        console.log(rowData)
    }

    const actionBody = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => onClick('editExpenseDialog', 'center', rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={()=> deleteExpense(rowData)} />
            </>
        )
    }
    useEffect(() => {
        getData()
    }, [])
    return (<>
        <div className='flex flex-row justify-content-center'>
            <DialogEditExpense data={expenseData} auth={props.authHandler} position={position} dialogFuncMap={dialogFuncMap} displayResponsive={editExpenseDialog}></DialogEditExpense>
            <DataTable className='w-10 shadow-2' ref={dt} value={expenses} header={header} dataKey="id" responsiveLayout="scroll" paginator rows={10} removableSort>
            <Column field="index" header="Index"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="desc" header="Expense Description"></Column>
            <Column field="category" header="Category" sortable></Column>
            <Column field="expenditureDate" header="Expenditure Date" sortable></Column>
            <Column field="amount" header="Amount" sortable></Column>
            <Column body={actionBody} exportable={false} style={{ minWidth: '8rem' }} />
            </DataTable>
        </div>
    </>)
}

export default DetailExpense;