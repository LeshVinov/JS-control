'use strict'

const submitButton = document.querySelector('.form-submit__button')
const nameInput = document.getElementById('form-text__name')
const secnameInput = document.getElementById('form-text__secname')
const ageInput = document.getElementById('form-text__age')
const childInput = document.getElementById('form-text__child')
const selectInput = document.querySelector('select')
const orgInput = document.getElementById('form-text__org')
const rankInput= document.getElementById('form-text__rank')
const dateInput = document.getElementById('form-text__date')

const table = document.querySelector('table')
const trOld = document.querySelector('.output-string-clone')

let dataItems = []

let dataI = {
    name:  '',
    secName: '',
    age: 0,
    child: false,
    select: '',
    org: '',
    rank: 0,
    date: ''
}
const startFunc = function () {
    dataBring()
    // toLocalStorageFunc()
    fromLocalStorageFunc()
    newTableStringFunc()
}

const dataBring = function () {
    dataI.name = nameInput.value
    dataI.secName = secnameInput.value
    dataI.age = ageInput.value
    dataI.child = childInput.value
    dataI.select = selectInput.value
    dataI.org = orgInput.value
    dataI.rank = rankInput.value
    dataI.date = dateInput.value

    nameInput.value = ""
    secnameInput.value =""
    ageInput.value = ""
    childInput.value = ""
    selectInput.value = ""
    orgInput.value = ""
    rankInput.value = ""
    dateInput.value = ""

    // dataItems.push(dataI)

    localStorage.setItem("dataItems", JSON.stringify(dataItems))
    if (dataItems.length === 0) {
      localStorage.clear()
    }
    if (dataItems.length >= 1) {
        localStorage.setItem("dataItems", JSON.stringify(dataItems))
    }
}
// const toLocalStorageFunc = function () {
//     if (dataItems.length >= 1) {
//         localStorage.setItem("dataI", JSON.stringify(dataI))
//     }
//     if (dataItems.length === 0) {
//         localStorage.clear()
//       }
//     //   dataItems.push(dataI)
// }
const fromLocalStorageFunc = function () {
    dataItems = localStorage.getItem("dataI")
    ? JSON.parse(localStorage.getItem("dataI"))
    : {}
    console.log(dataI);
}
const newTableStringFunc = function () {


    const newTr = trOld.cloneNode(true)
    newTr.classList.remove('dNone')

    const tdName = newTr.querySelector('.output-block__name')
    const tdsecName = newTr.querySelector('.output-block__secname')
    const tdAge = newTr.querySelector('.output-block__age')
    const tdChild = newTr.querySelector('.output-block__child')
    const tdRole = newTr.querySelector('.output-block__role')
    const tdRank = newTr.querySelector('.output-block__rank')
    const tdDate = newTr.querySelector('.output-block__date')
    
    tdName.textContent = dataI.name
    tdsecName.textContent = dataI.secName
    tdAge.textContent = dataI.age
    if (childInput.checked) {
        tdChild.textContent = 'Есть'
    } else {
        tdChild.textContent = 'Нет'
    }
    tdRole.textContent = dataI.select
    tdRank.textContent = dataI.rank
    tdDate.textContent = dataI.date

    table.append(newTr)
}


submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    startFunc()
})

fromLocalStorageFunc()

