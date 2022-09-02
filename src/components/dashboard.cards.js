import { useEffect, useState } from "react";
import { getCardData } from "../services/chart.data.service";


const DashBoardCards = (props)=>{

    const [cardData,setCardData] = useState({
        totalExpense:{amount:0,expenseCount:0},
        savings:{amount:0},
        currentMonthExpense:{amount:0,expenseCount:0},
        budget:{amount: 15000}

    })

    const getData = async()=>{
        const response = await getCardData(props.authHandler.token)
        const save = cardData.budget.amount - response.data.currentMonthExpense.amount
        setCardData({...cardData,totalExpense:response.data.totalExpense,currentMonthExpense:response.data.currentMonthExpense,savings: {amount:save} })
    }

    useEffect(()=>{
        getData()
    },[])

    return(<>
    <div className="col-12 md:col-6 lg:col-3">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Total Expense</span>
                    <div className="text-900 font-medium text-xl">{`₹ ${cardData.totalExpense.amount} `}</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-money-bill text-blue-500 text-xl"></i>
                </div>
            </div>
            <span className="text-green-500 font-medium">{`${cardData.totalExpense.expenseCount}`} </span>
            <span className="text-500">Total Overheads</span>
        </div>
    </div>
    <div className="col-12 md:col-6 lg:col-3">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Current Month Expense</span>
                    <div className="text-900 font-medium text-xl">{`₹ ${cardData.currentMonthExpense.amount} `}</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-wallet text-orange-500 text-xl"></i>
                </div>
            </div>
            <span className="text-green-500 font-medium">{`${cardData.currentMonthExpense.expenseCount}`} </span>
            <span className="text-500">expenses this month</span>
        </div>
    </div>
    <div className="col-12 md:col-6 lg:col-3">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Savings</span>
                    <div className="text-900 font-medium text-xl">{`₹ ${cardData.savings.amount} `}</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-money-bill text-cyan-500 text-xl"></i>
                </div>
            </div>
            <span className="text-green-500 font-medium">&nbsp;</span>
            <span className="text-500"></span>
        </div>
    </div>
    <div className="col-12 md:col-6 lg:col-3">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Budget</span>
                    <div className="text-900 font-medium text-xl">{`₹ ${cardData.budget.amount} `}</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-money-bill text-purple-500 text-xl"></i>
                </div>
            </div>
            <span className="text-green-500 font-medium"> &nbsp;</span>
            <span className="text-500"></span>
        </div>
    </div>
    </>
     )
}

export default DashBoardCards;