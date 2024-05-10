import {variables} from "./variables.js";
let expenses = []

variables.btnAddNode.addEventListener('click', main)
variables.changeLimitNode.addEventListener('click', addLimit)
variables.btnResetNode.addEventListener('click', resetExpense)

getLocalStorage()
render()

function render () {
    renderExpense()
    sumTotal()
    calcDifference() 
    checkStatus()
}

function getLocalStorage() {
    let localLimit = window.localStorage.getItem('limit')
    let localTotal = window.localStorage.getItem('total')

    if (localLimit && localTotal) {
        variables.cashTotalNode.innerHTML = localTotal + ' руб.'
        variables.cashLimitNode.innerHTML = localLimit + ' руб.'
    }

}   

function clearInput(input) {
    input.value = ''
}

function getCurrentLimit() {
    return parseInt(variables.cashLimitNode.innerText)
}

function getCurrentTotal() {
    return parseInt(variables.cashTotalNode.innerText)
}

function getCurrentAmount() {
    return parseInt(variables.inputNode.value)
}

function getCurrentCategory() {
    return variables.selectNode.value
}

function getCurrentDifference() {
    let limit = getCurrentLimit()
    let total = getCurrentTotal()
    
    return limit - total
}

function resetExpense() {
    variables.cashTotalNode.innerText = '0 руб.'
    variables.listHistoryNode.innerHTML = ''
    variables.differenceNode.innerHTML = ''
    variables.cashLimitNode.innerHTML = '0 руб.'
    window.localStorage.clear()
    expenses = []
    checkStatus()
    
}

function sumTotal() {
    let sum = 0
    expenses.forEach((i) => {
        sum += i.amount
    })
    variables.cashTotalNode.innerHTML = sum + ' руб.'
    window.localStorage.setItem('total', parseInt(sum))
}

function addLimit () {
    let curLimit = prompt()
    variables.cashLimitNode.innerHTML = parseInt(curLimit) + " руб."
    window.localStorage.setItem('limit', parseInt(curLimit))
    calcDifference()
    checkStatus()
}

function addExpense() {
    let curCategory = getCurrentCategory()
    let curAmount = getCurrentAmount()

    let newExpense = {
        amount: curAmount,
        category: curCategory
    }
    
    expenses.push(newExpense)
    window.localStorage.setItem('expenses', JSON.stringify(expenses))
}

function renderExpense() {
    expenses = JSON.parse(window.localStorage.getItem('expenses')) ? JSON.parse(window.localStorage.getItem('expenses')) : []
    let html = ''
    expenses.forEach((i) => {
        html += `<li>${i.amount} руб. - ${i.category}</li>`
    })

    variables.listHistoryNode.innerHTML = html
}

function main() {

    let curCategory = getCurrentCategory()
    let curAmount = getCurrentAmount()

    if (!curAmount) {
        alert('Введите сумму')
        return null
    }
    if (curCategory == 'Категории') {
        alert('Выберите категорию')
        return
    }
    addExpense()
    render()
    clearInput(variables.inputNode)

}

function calcDifference () {
    let difference = getCurrentDifference()
    if (difference < 0) {
        variables.differenceNode.innerHTML = `(${difference} руб.)`
    }  else {
        variables.differenceNode.innerHTML = ''
    }
}

function checkStatus() {
    if (getCurrentLimit() > getCurrentTotal() - 1) {
        variables.statusTextNode.innerText = 'Все хорошо'
        variables.statusTextNode.classList.add('data__cash-status_green')
        variables.statusTextNode.classList.remove('data__cash-status_red')
    } else {
        variables.statusTextNode.innerText = 'Все плохо'
        variables.statusTextNode.classList.add('data__cash-status_red')
        variables.statusTextNode.classList.remove('data__cash-status_green')
        
    }
}
